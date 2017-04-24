
const path = require('path');
const track = require(path.resolve('src/index'));
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

const output = 'Track 1:' +
    '09:00AM Writing Fast Tests Against Enterprise Rails 60min' +
    '10:00AM Overdoing it in Python 45min' +
    '10:45AM Lua for the Masses 30min' +
    '11:15AM Ruby Errors from Mismatched Gem Versions 45min' +
    '12:00PM Lunch' +
    '01:00PM Ruby on Rails: Why We Should Move On 60min' +
    '02:00PM Common Ruby Errors 45min' +
    '02:45PM Pair Programming vs Noise 45min' +
    '03:30PM Programming in the Boondocks of Seattle 30min' +
    '04:00PM Ruby vs. Clojure for Back-End Development 30min' +
    '04:30PM User Interface CSS in Rails Apps 30min' +
    '05:00PM Networking Event' +
    'Track 2:' +
    '09:00AM Communicating Over Distance 60min' +
    '10:00AM Rails Magic 60min' +
    '11:00AM Woah 30min' +
    '11:30AM Sit Down and Write 30min' +
    '12:00PM Lunch' +
    '01:00PM Accounting-Driven Development 45min' +
    '01:45PM Clojure Ate Scala (on my project) 45min' +
    '02:30PM A World Without HackerNews 30min' +
    '03:00PM Ruby on Rails Legacy App Maintenance 60min' +
    '04:00PM Rails for Python Developers lightning' +
    '05:00PM Networking Event';

describe("Conference Track Management", function() {
    describe("Should organize the conference", function() {
        it("organize all the conference", function() {
            track.organizeAndPrint(conference);
        });
    });
});