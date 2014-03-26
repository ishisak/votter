var assert = require('assert');

var lib = process.env.COVERAGE_MODULE_STUDY ? '../lib-cov/' : '../lib/';
var MongoDB  = require(lib + 'mongo');

describe('votter',function(){
    var Vote  = require(lib + 'votter');
    describe('event',function(){
        it('should return data from an event information',function(done){
            var votter = new Vote;
            var setObj = {eventName:"get test event ", candidates:[{candidateId:1,candidateName:'daigoro',reason:"You're amazing"}]};
            var mongo = new MongoDB;

            mongo.insertMongo('event', setObj, function(err, data){
                var getObj = {"_id":data[0]._id };
                votter.getEvent(getObj, function(err, res){
                   // assert.equal(res._id, data[0]._id);
                    assert.strictEqual(res.candidates[0].candidateName, 'daigoro');

                    done();
                });
            });
        });

        it('should return data from an event information',function(done){
            var votter = new Vote;
            var obj = {eventName:"test event 02", candidates:[{candidateId:1,candidateName:'masaki',reason:'kookokk'}]};

            votter.setEvent(obj, function(err, data){
                assert.ok(data[0]._id);
                assert.strictEqual(data[0].candidates[0].candidateName, 'masaki');
                done();
            });
        });

        it('should return data from an event information',function(done){
            var votter = new Vote;
            var obj = {eventId:"531f222afcf1a12059f1fd41", candidateId:1, userName:"ishisaka", comment:"You're amazing"};

            votter.vote2Candidate(obj, function(err, data){
                assert.ok(data[0]._id);
                done();
            });
        });
        it('should return data from an event information',function(done){
            var votter = new Vote;
            var obj = {eventId:"531f222afcf1a12059f1fd41"};
            var mongo = new MongoDB;

            mongo.findMongo('vote',obj, function(err, data){
                data.toArray(function(err, results){
                    votter.sumUpCandidates(results, function(err, res){
                        assert.ok(res);
                        done();

                    });

                });
            });
        });
        it('should delete data',function(done){
            var votter = new Vote;
            var setObj = {eventName:"test event 02", candidates:[{candidateId:1,candidateName:'masaki',reason:'kookokk'}]};
            var mongo = new MongoDB;

            mongo.insertMongo('vote', setObj, function(err, data){
                var removeObj = {"_id":"ObjectId(" + data[0]._id +")"};
                votter.removeEvent(removeObj, function(err, res){
                    mongo.findOneMongo('vote',removeObj, function(err, result){
                        assert.strictEqual(err, null);
                        assert.strictEqual(result, null);
                        done();
                    });
                });
            });

        });
    });

});
