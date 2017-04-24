const should = require('chai').should();
const path = require('path');
const assert = require('assert');
const dayConferenceService = require(path.resolve('src/service/dayConference'));
const DayConference = require(path.resolve('src/model/dayConference')).DayConference;
const Conference = require(path.resolve('src/model/dayConference')).Conference;

describe("Conference Service Track Management", function() {
    describe("Should test services for aggregation", function() {
        it("should organize an unorganized events ", function() {
            const tracks = [];
            tracks.push(new Conference('Test session 1', 60, false));
            tracks.push(new Conference('Test session 2', 45, false));
            tracks.push(new Conference('Test session 3', 45, false));
            tracks.push(new Conference('Test session 3', 30, false));
            tracks.push(new Conference('Test session 5', 60, false));
            tracks.push(new Conference('Test session 6', 60, false));
            tracks.push(new Conference('Test session 7', 60, false));
            tracks.push(new Conference('Test session 8', 60, false));


            const dailyEvent = organizeEvents(tracks);
            should.exist(conference);
        });

        it("print daily confereces", function(done) {

            const dayConference = new DayConference();
            const valueOutput = '09:00AM Test morning 1\n10:00AM Test morning 2\n11:00AM Test morning 3\n12:00PM Lunch\n01:00PM Test afternoon 1\n02:00PM Test afternoon 2\n03:00PM Test afternoon 3\n04:00PM Test afternoon 4\n05:00PM Networking Event\n';

            tracks.push(new Conference('Test morning 1', 60, false));
            tracks.push(new Conference('Test morning 2', 60, false));
            tracks.push(new Conference('Test morning 3', 60, false));
            tracks.push(new Conference('Test afternoon 1', 60, false));
            tracks.push(new Conference('Test afternoon 2', 60, false));
            tracks.push(new Conference('Test afternoon 3', 60, false));
            tracks.push(new Conference('Test afternoon 4', 60, false));

            dayConference.outputSession().then((session) => {
                should.exist(session);
                assert.equal(session, valueOutput);
                done();
            });


        });
    });
});