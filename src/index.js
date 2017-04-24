const MORNING_SESSION = 180;
const AFTERNOON_SESSION = 240;

const mapAll = (arr) => new Conference(arr[0], arr[3]? +arr[3]: 5, !arr[3] );
const mapAllPromises = (line) => Promise.resolve(line.match(/(.*)(?:(([0-9]{2})(min)|lightning))/)).then(mapAll);
const transformTrack = (lines) => Promise.all(lines.map(mapAllPromises));
const trackCount = (arr) => arr.reduce((ant, next) => ant + next.duration, 0);

function Conference(event, duration, isLigthning) {
    this.event = event;
    this.duration = duration;
    this.isLigthning = isLigthning;
    this.inUse = false;
}

function DayConference(){
    this.morningSessions = [];
    this.afternoonSessions = [];

    const startMorningDateHours = new Date();
    startMorningDateHours.setHours(9, 0, 0, 0); //9 AM starting day conference

    calcNextSession = (time, duration) => new Date(time.getTime() + (duration * 60 * 1000));
    formatTime = (time) => time.toLocaleTimeString('pt-BR', { hour : '2-digit', minute : '2-digit',  hour12 : true } ).replace(' ', '').replace(/(^[0-9]{1}):/,'0\$1:');// no white-spaces and adding left zero to hour
    outputFormat = (time, event) => `${formatTime(time)} ${event}\n`;
    unifiedSession = (ant, prox) => Object.assign({output: ant.output + outputFormat(ant.startTime, prox.event), startTime: calcNextSession(ant.startTime, prox.duration)});

    this.printSession = () => {
        return Promise.resolve().then(()=> {
            const allSessions = [];
            allSessions.push.apply(allSessions, this.morningSessions);
            allSessions.push(new Conference('Lunch', 60, false));
            allSessions.push.apply(allSessions, this.afternoonSessions);
            allSessions.push(new Conference('Networking Event', 60, false));
            return allSessions;
        })
        .then((sessions) => sessions.reduce(unifiedSession, { output: '', startTime: startMorningDateHours}))
        .then((unified) => unified.output);
    }
}

const organizeEvents = (conferencias, pos, tempo, accum) => {
    if(!conferencias[pos] || tempo < 0){
        return false;
    }

    if((tempo - conferencias[pos].duration) === 0){
        accum.push(conferencias[pos]);
        conferencias.splice(pos, 1);
        return true;
    }

    const feasible = organizeEvents(conferencias, pos+1, tempo - conferencias[pos].duration, accum);
    if(feasible){
        accum.push(conferencias[pos]);
        conferencias.splice(pos, 1);
        return true;
    } else {
        return organizeEvents(conferencias, pos + 1, tempo, accum);
    }
}

const organizeDayConference = (tracks) => {
    const dayConference = new DayConference();
    organizeEvents(tracks, 0, MORNING_SESSION, dayConference.morningSessions);
    if(trackCount(tracks) >= AFTERNOON_SESSION)
        organizeEvents(tracks, 0, AFTERNOON_SESSION, dayConference.afternoonSessions);
    else
        dayConference.afternoonSessions = tracks.splice(0);
    dayConference.morningSessions.reverse();
    dayConference.afternoonSessions.reverse();

    return dayConference;
}

const manage = (tracks, accum) => {
    const dayConferences = accum || [];
    dayConferences.push(organizeDayConference(tracks));
    if( tracks.length > 0) {
        manage(tracks, dayConferences);
    }
    return dayConferences;
}

const printTrack = (dayConferences) => {
    dayConferences.forEach((track) => {
        track.printSession().then((session) => console.log(session));
    });
}

process.stdin.on('readable', function () {
    var key = String(process.stdin.read());
    _show(key);
});


function _show(event) {
   const lines = event.split('\n');
   if(!lines || lines.length === 0){
       console.log('nothing to organize');
       return;
   }
   console.log(JSON.stringify(event));
   transformTrack(lines).then((tracks) => {
       const _manage = manage(tracks);
       printTrack(_manage);
   }).catch(err => console.log(err.stack));


}



module.exports = {
  show: _show
};