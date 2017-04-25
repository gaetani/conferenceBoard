const DayConference = require('../model/dayConference').DayConference;
const Conference = require('../model/dayConference').Conference;

const MORNING_SESSION = 180;
const AFTERNOON_SESSION = 240;

const trackCount = (arr) => arr.reduce((ant, next) => ant + next.duration, 0);
const mapAll = (arr) => new Conference(arr[0], arr[3]? +arr[3]: 5, !arr[3] );
const mapAllPromises = (line) => Promise.resolve(line.match(/(.*)(?:(([0-9]{2})(min)|lightning))/)).then(mapAll);
const transformTrack = (lines) => Promise.all(lines.map(mapAllPromises));


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
};


const organizeDayConference = (tracks) => {
    const dayConference = new DayConference();
    organizeEvents(tracks, 0, MORNING_SESSION, dayConference.morningSessions);
    if(trackCount(tracks) >= AFTERNOON_SESSION)
        organizeEvents(tracks, 0, AFTERNOON_SESSION, dayConference.afternoonSessions);
    else
        dayConference.afternoonSessions = tracks.splice(0);
    //reverse the lists
    dayConference.morningSessions.reverse();
    dayConference.afternoonSessions.reverse();

    return dayConference;
};

const manage = (tracks, accum) => {
    const dayConferences = accum || [];
    dayConferences.push(organizeDayConference(tracks));
    if( tracks.length > 0) {
        manage(tracks, dayConferences);
    }
    return dayConferences;
};

const transform = (dayConferences) => {
    return Promise.all(dayConferences.map((track) => track.outputSession()));
};

const logInOutput = (outputs) => {
    const template = (index, description) => `Track ${index}\n${description}`;
    const output = outputs.reduce((previous, after, index) => {
        return previous + template(index+1, after);
    }, '');
    return output;
};

function organizeAndPrint(event) {
    const lines = event.split('\n');
    if(!lines || lines.length === 0){
        console.log('nothing to organize');
        return;
    }
    return  transformTrack(lines)
        .then(manage)
        .then(transform)
        .then(logInOutput)
        .catch(err => console.log(err.beauty || err.stack));
}

module.exports = {
    organizeAndPrint: organizeAndPrint,
    manage: manage,
    organizeEvents: organizeEvents,
    organizeDayConference: organizeDayConference
};