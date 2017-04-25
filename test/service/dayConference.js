const should = require('chai').should();
const path = require('path');
const assert = require('assert');
const dayConferenceService = require(path.resolve('src/service/dayConference'));
const DayConference = require(path.resolve('src/model/dayConference')).DayConference;
const Conference = require(path.resolve('src/model/dayConference')).Conference;

describe("Conference Service Track Management", function() {
    describe("Should test services for aggregation", function() {
        it("should organize an unorganized  morning events ", function() {
            const tracks = [];
            tracks.push(new Conference('Test session 1', 60));
            tracks.push(new Conference('Test session 2', 45));
            tracks.push(new Conference('Test session 3', 45));
            tracks.push(new Conference('Test session 3', 30));
            tracks.push(new Conference('Test session 5', 60));
            tracks.push(new Conference('Test session 6', 45));
            tracks.push(new Conference('Test session 7', 45));
            tracks.push(new Conference('Test session 8', 60));


            const accum = [];
            const dailyEvent = dayConferenceService.organizeEvents(tracks, 0, 180, accum);
            assert.equal(true, dailyEvent);
            assert.equal(4, accum.length);
            assert.equal(4, tracks.length);
        });

        it("should organize an unorganized  afternoon events ", function() {
            const tracks = [];
            tracks.push(new Conference('Test session 1', 60));
            tracks.push(new Conference('Test session 2', 45));
            tracks.push(new Conference('Test session 3', 45));
            tracks.push(new Conference('Test session 3', 5));
            tracks.push(new Conference('Test session 5', 60));
            tracks.push(new Conference('Test session 6', 45));
            tracks.push(new Conference('Test session 7', 45));
            tracks.push(new Conference('Test session 8', 60));


            const accum = [];
            const dailyEvent = dayConferenceService.organizeEvents(tracks, 0, 240, accum);
            assert.equal(true, dailyEvent);
            assert.equal(5, accum.length);
            assert.equal(3, tracks.length);
        });

        it("should organize an entirely daily conference ", function() {
            const tracks = [];
            tracks.push(new Conference('Test session 1', 60));
            tracks.push(new Conference('Test session 2', 45));
            tracks.push(new Conference('Test session 3', 45));
            tracks.push(new Conference('Test session 3', 30));
            tracks.push(new Conference('Test session 5', 60));
            tracks.push(new Conference('Test session 6', 45));
            tracks.push(new Conference('Test session 7', 45));
            tracks.push(new Conference('Test session 8', 60));
            tracks.push(new Conference('Test session 9', 30));


            const dayConference = dayConferenceService.organizeDayConference(tracks);
            should.exist(dayConference);

            assert.equal(4, dayConference.morningSessions.length);
            assert.equal(5, dayConference.afternoonSessions.length);
        });

        it("should organize an entirely daily conference into days", function() {
            const tracks = [];
            tracks.push(new Conference('Test session 1', 60));
            tracks.push(new Conference('Test session 2', 45));
            tracks.push(new Conference('Test session 3', 45));
            tracks.push(new Conference('Test session 4', 30));
            tracks.push(new Conference('Test session 5', 60));
            tracks.push(new Conference('Test session 6', 45));
            tracks.push(new Conference('Test session 7', 45));
            tracks.push(new Conference('Test session 8', 60));
            tracks.push(new Conference('Test session 9', 30));
            tracks.push(new Conference('Test session 10', 60));
            tracks.push(new Conference('Test session 11', 30));
            tracks.push(new Conference('Test session 12', 30));
            tracks.push(new Conference('Test session 13', 60));
            tracks.push(new Conference('Test session 14', 5));
            tracks.push(new Conference('Test session 15', 60));
            tracks.push(new Conference('Test session 16', 45));
            tracks.push(new Conference('Test session 17', 45));
            tracks.push(new Conference('Test session 18', 30));
            tracks.push(new Conference('Test session 19', 30));


            const dayConferences = dayConferenceService.manage(tracks);
            should.exist(dayConferences);

            assert.equal(2, dayConferences.length);
            assert.equal(0, tracks.length);
        });

        it("should organize an entirely daily conference into days", function(done) {
            const conference = 'Writing Fast Tests Against Enterprise Rails 60min\n'+
                'Overdoing it in Python 45min\n' +
                'Lua for the Masses 30min\n' +
                'Ruby Errors from Mismatched Gem Versions 45min\n' +
                'Common Ruby Errors 45min\n' +
                'Rails for Python Developers lightning\n' +
                'Communicating Over Distance 60min\n' +
                'Accounting-Driven Development 45min\n' +
                'Woah 30min\n' +
                'Sit Down and Write 30min\n' +
                'Pair Programming vs Noise 45min\n' +
                'Rails Magic 60min\n' +
                'Ruby on Rails: Why We Should Move On 60min\n' +
                'Clojure Ate Scala (on my project) 45min\n' +
                'Programming in the Boondocks of Seattle 30min\n' +
                'Ruby vs. Clojure for Back-End Development 30min\n' +
                'Ruby on Rails Legacy App Maintenance 60min\n' +
                'A World Without HackerNews 30min\n' +
                'User Interface CSS in Rails Apps 30min';

            const outputConference = 'Track 1\n09:00AM Writing Fast Tests Against Enterprise Rails 60min\n10:00AM Overdoing it in Python 45min\n10:45AM Lua for the Masses 30min\n11:15AM Ruby Errors from Mismatched Gem Versions 45min\n12:00PM Lunch\n01:00PM Common Ruby Errors 45min\n01:45PM Communicating Over Distance 60min\n02:45PM Accounting-Driven Development 45min\n03:30PM Woah 30min\n04:00PM Sit Down and Write 30min\n04:30PM Programming in the Boondocks of Seattle 30min\n05:00PM Networking Event\nTrack 2\n09:00AM Pair Programming vs Noise 45min\n09:45AM Rails Magic 60min\n10:45AM Clojure Ate Scala (on my project) 45min\n11:30AM Ruby vs. Clojure for Back-End Development 30min\n12:00PM Lunch\n01:00PM User Interface CSS in Rails Apps 30min\n01:30PM A World Without HackerNews 30min\n02:00PM Ruby on Rails Legacy App Maintenance 60min\n03:00PM Ruby on Rails: Why We Should Move On 60min\n04:00PM Rails for Python Developers lightning\n04:05PM Networking Event\n';


            dayConferenceService.organizeAndPrint(conference).then(output => {
                assert.equal(output, outputConference);
            }).then(done);

        });

        it("print daily confereces", function(done) {

          done();


        });
    });
});