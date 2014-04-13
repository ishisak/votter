'use strict';

var Mongo = require('./mongo.js');
function Vote() {

}

/**
 * @param {object} eventObj search information for an event
 * @param {Function} callback handling db returns
 */
 Vote.prototype.getEvent = function (eventObj, callback) {
    var mongo = new Mongo();
    mongo.findOneMongo('event', eventObj, function(err, result) {
        callback(err, result);
    });
};

/**
 * get all events
 *
 * @param {Function} callback handling db returns
 */
Vote.prototype.getEvents = function (callback) {
    var mongo = new Mongo();
    mongo.findMongo('event', null, function(err, result) {
        result.sort({"_id": -1}).toArray(function(err, data){
            callback(err, data);
        });
    });
};

/**
 * @param {object} eventObj event information for setting
 * @param {Function} callback handling db returns
 */
 Vote.prototype.setEvent = function (eventObj, callback) {
    var mongo = new Mongo();
    mongo.insertMongo('event', eventObj, function(err, result) {
        callback(err, result);
    });
};

/**
 * @param {object} eventObj event information for udpateing
 * @param {Function} callback handling db returns
 */
 Vote.prototype.updateEvent = function (eventObj, callback) {
    var mongo = new Mongo();
    mongo.updateMongo('event', {_id:eventObj._id },eventObj, function(err, result) {
        console.log(result);
        callback(err, result);
    });
};  


Vote.prototype.getVotes = function (eventObj, callback) {
    var mongo = new Mongo();
    mongo.findMongo('vote', eventObj, function(err, result) {
        result.toArray(function(err, data){
            callback(err, data);
        });
    });
};

/**
 * @param {object} eventObj event information for setting
 * @param {Function} callback handling result of vote
 */
 Vote.prototype.sumUpCandidates =  function (resultVoteArr, callback) {
    var calcVote = {};
    for(var i=0; i<resultVoteArr.length; i++) {
        var canId = resultVoteArr[i].candidateId;

        if(typeof calcVote[canId] === 'undefined') {
            calcVote[canId] = 0;
        } 
        calcVote[canId] ++;
        
    }

    callback(null,calcVote);
};

/**
 * @param {object} ballotObj someone's opinion for voting
 * @param {Function} callback handling db returns
 */
 Vote.prototype.vote2Candidate =  function (ballotObj, callback) {
    var mongo = new Mongo();
    mongo.insertMongo('vote', ballotObj, function(err, result) {
        callback(err, result);
    });
};

/**
 * @param {object} eventObj eventId
 * @param {Function} callback handling db returns
 */
Vote.prototype.removeEvent =  function (eventObj, callback) {
    var mongo = new Mongo();
    mongo.removeMongo('vote', eventObj, function(err, result) {
        callback(err, result);
    });
};


module.exports = Vote;