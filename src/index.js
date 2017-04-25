const fs = require('fs');
const dayConferenceService = require('./service/dayConference');

const readFileTrack = (err, data) => {
    if (err) throw err;
    dayConferenceService.organizeAndPrint(data)
        .then(console.log);
};


fs.stat('TracksInput.txt', function(err,stats){
    if(!err) fs.readFile('TracksInput.txt', 'utf8', readFileTrack);
});
