const should = require('chai').should();
const path = require('path');
const assert = require('assert');
const DayConference = require(path.resolve('src/model/dayConference')).DayConference;
const Conference = require(path.resolve('src/model/dayConference')).Conference;


describe("Conference Track Management", function() {
    describe("Should create and print models for conference", function() {
        it("new conference model", function() {
            const conference = new Conference('Test', 60, false);
            should.exist(conference);
        });

        it("print daily confereces", function(done) {

            const dayConference = new DayConference();
            const valueOutput = '09:00AM Test morning 1\n10:00AM Test morning 2\n11:00AM Test morning 3\n12:00PM Lunch\n01:00PM Test afternoon 1\n02:00PM Test afternoon 2\n03:00PM Test afternoon 3\n04:00PM Test afternoon 4\n05:00PM Networking Event\n';

            dayConference.morningSessions.push(new Conference('Test morning 1', 60, false));
            dayConference.morningSessions.push(new Conference('Test morning 2', 60, false));
            dayConference.morningSessions.push(new Conference('Test morning 3', 60, false));
            dayConference.afternoonSessions.push(new Conference('Test afternoon 1', 60, false));
            dayConference.afternoonSessions.push(new Conference('Test afternoon 2', 60, false));
            dayConference.afternoonSessions.push(new Conference('Test afternoon 3', 60, false));
            dayConference.afternoonSessions.push(new Conference('Test afternoon 4', 60, false));

            dayConference.outputSession().then((session) => {
                should.exist(session);
                assert.equal(session, valueOutput);
                done();
            });


        });
    });
});