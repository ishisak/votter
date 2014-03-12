'use strict';

var mongoUri = process.env.MONGOLAB_URI ||
               process.env.MONGOHQ_URL ||
               'mongodb://127.0.0.1:27017/vote';
mongoUri += '?safe=true';
function Vote() {

}

/**
 * @param {object} eventObj search information for an event
 * @param {Function} callback handling db returns
 */
Vote.prototype.getEvent = function (eventObj, callback) {
    var self = this;
    //{ "userId": userId, "bookInfo" : { $elemMatch : {"bookStatus":true}}}
    self.findOneMongo('vote', eventObj, function(err, result) {
        callback(err, result);
    });
};

/**
 * @param {object} eventObj event information for setting
 * @param {Function} callback handling db returns
 */
Vote.prototype.setEvent = function (eventObj, callback) {
    var self = this;
    self.insertMongo('vote', eventObj, function(err, result) {
        callback(err, result);
    });
};

/**
 * @param {object} eventObj event information for setting
 * @param {Function} callback handling db returns
 */
Vote.prototype.sumUpCandidates =  function (resultVoteArr, callback) {
    var self = this;
    var calcVote = {};
    for(var i=0;i<resultVoteArr.length;i++) {
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
    var self = this;
    self.insertMongo('vote', ballotObj, function(err, result) {
        callback(err, result);
    });
};


Vote.prototype.insertMongo = function (coll, obj, callback) {
    var mongo = require('mongodb');
    mongo.Db.connect(mongoUri, function (err, db) {
        db.collection(coll, function(er, collection) {

            collection.insert(obj, function(er,rs) {
                callback(er, rs) ;

            });
        });
    });

};

Vote.prototype.findOneMongo = function (coll, obj, callback) {
    //var MongoClient = require('mongodb').MongoClient;
    var mongo = require('mongodb');

    mongo.Db.connect(mongoUri, function (err, db) {
        db.collection(coll, function(er, collection) {
            collection.findOne(obj, function(er, rs) {
                callback(err, rs);
            });
        });
    });

};

Vote.prototype.findMongo = function (coll, obj, callback) {
    //var MongoClient = require('mongodb').MongoClient;
    var mongo = require('mongodb');

    mongo.Db.connect(mongoUri, function (err, db) {
        db.collection(coll, function(er, collection) {
            collection.find(obj, function(er, rs) {
                callback(err, rs);
            });
        });
    });

};

module.exports = Vote;