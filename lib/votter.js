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
    mongo.findOneMongo('vote', eventObj, function(err, result) {
        callback(err, result);
    });
};

/**
 * @param {object} eventObj event information for setting
 * @param {Function} callback handling db returns
 */
Vote.prototype.setEvent = function (eventObj, callback) {
    var mongo = new Mongo();
    mongo.insertMongo('vote', eventObj, function(err, result) {
        callback(err, result);
    });
};

/**
 * @param {object} eventObj event information for setting
 * @param {Function} callback handling db returns
 */
Vote.prototype.sumUpCandidates =  function (resultVoteArr, callback) {
    var calcVote = {};
    for(var i=0; i<resultVoteArr.length; i++) {
        var canId = resultVoteArr[i].candidateId;
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






module.exports = Vote;