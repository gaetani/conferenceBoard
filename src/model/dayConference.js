
function Conference(event, duration, isLigthning) {
    this.event = event;
    this.duration = duration;
    this.isLigthning = isLigthning;
}

function DayConference(){
    this.morningSessions = [];
    this.afternoonSessions = [];

    const startMorningDateHours = new Date(); // no moment allowed
    startMorningDateHours.setHours(9, 0, 0, 0); //9 AM starting day conference

    calcNextSession = (time, duration) => new Date(time.getTime() + (duration * 60 * 1000));
    formatTime = (time) => time.toLocaleTimeString('pt-BR', { hour : '2-digit', minute : '2-digit',  hour12 : true } ).replace(' ', '').replace(/(^[0-9]{1}):/,'0\$1:');// no white-spaces and adding left zero to hour
    outputFormat = (time, event) => `${formatTime(time)} ${event}\n`;
    unifiedSession = (ant, prox) => Object.assign({output: ant.output + outputFormat(ant.startTime, prox.event), startTime: calcNextSession(ant.startTime, prox.duration)});

    this.outputSession = () => {
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


module.exports = {
    DayConference: DayConference,
    Conference: Conference
};