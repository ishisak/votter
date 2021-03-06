'use strict';
var config    = require('../config.js');
var mongo = require('mongodb');

function Mongo() {

}

var myDb;
function connect(callback) {
  if (myDb === undefined) {
    mongo.Db.connect(config.mongoUri, function(err, db) {
      if(err) { return callback(err)};
      myDb = db;
      callback(null, db);
    });
  } else {
    callback(null, myDb);
  }
}

/*
 * findOneMongo(coll, query, callback)
 *
 * @params :
 *    coll : @string name of the collection
 *    query : @object the query to execute against (I.E. {'eventId':<STRING>, candidates:<OBJECT>})
 *    callback  : @function callback
 *
 * @description:
 *    This method looks for a data in the mongodb.
 */
 Mongo.prototype.findOneMongo = function (coll, query, callback) {
    connect(function (err, db) {
        db.collection(coll, function(er, collection) {
            collection.findOne(query, function(er, dbRecord) {
                callback(er, dbRecord);
            });
        });
    });

};

/*
 * findMongo(coll, query, callback)
 *
 * @params :
 *    coll : @string name of the collection
 *    query : @object the query to execute against (I.E. {'eventId':<STRING>, candidates:<OBJECT>})
 *    callback  : @function callback
 *
 * @description:
 *    This method looks for all data to be retrieved in the mongodb.
 */
 Mongo.prototype.findMongo = function (coll, query, callback) {
    connect(function (err, db) {
        if(err) {console.log(err)}
        db.collection(coll, function(er, collection) {
            if(query){
                collection.find(query, function(er, dbRecord) {
                    callback(er, dbRecord);
                });
            }else{
                collection.find(function(er, dbRecord) {
                    callback(er, dbRecord);
                });
            }
        });
    });
};

/*
 * insertMongo(coll, query, callback)
 *
 * @params :
 *    coll : @string name of the collection
 *    query : @object the query to execute against (I.E. {'eventId':<STRING>, candidates:<OBJECT>})
 *    callback  : @function callback
 *
 * @description:
 *    This method register for a data in the mongodb.
 */
 Mongo.prototype.insertMongo = function (coll, query, callback) {
    connect(function (err, db) {
        db.collection(coll, function(er, collection) {
            collection.insert(query, function(er,dbRecord) {
                callback(er, dbRecord) ;

            });
        });
    });
};


/*
 * updateMongo(coll, query, callback)
 *
 * @params :
 *    coll : @string name of the collection
 *    _id : @string object id of mongodb
 *    query : @object the query to execute against (I.E. {'eventId':<STRING>, candidates:<OBJECT>})
 *    callback  : @function callback
 *
 * @description:
 *    This method register for a data in the mongodb.
 */
 Mongo.prototype.updateMongo = function (coll, _id ,query, callback) {
    connect(function (err, db) {
        db.collection(coll, function(er, collection) {
            collection.update(_id, query, function(er,dbRecord) {
                callback(er, dbRecord) ;
            });
        });
    });
};


/*
 * removeMongo(coll, query, callback)
 *
 * @params :
 *    coll : @string name of the collection
 *    query : @object the query to execute against (I.E. {'eventId':<STRING>})
 *    callback  : @function callback
 *
 * @description:
 *    This method register for a data in the mongodb.
 */
Mongo.prototype.removeMongo = function (coll, query, callback) {
    connect(function (err, db) {
        db.collection(coll, function(er, collection) {
            collection.remove(query, function(er,dbRecord) {
                callback(er, dbRecord) ;

            });
        });
    });
};
module.exports = Mongo;