var assert = require('assert');

var lib = process.env.COVERAGE_MODULE_STUDY ? '../lib-cov/' : '../lib/';

describe('votter',function(){
    var Vote  = require(lib + 'votter');
    describe('event',function(){
        it('should return data from an event information',function(done){
            var votter = new Vote;
            var obj = {eventId: 1};
            votter.getEvent(obj, function(err, data){
                assert.strictEqual(data.eventId,1);
                assert.strictEqual(data.candidates[0].candidateName, 'daigoro');

                done();
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
            var MongoDB  = require(lib + 'mongo');
            var mongo = new MongoDB;

            mongo.findMongo('vote',obj, function(err, data){
                data.toArray(function(err, results){
                    votter.sumUpCandidates(results, function(err, res){
                        console.log(res);
                        assert.ok(res);
                        done();

                    });

                });
            });
        });
    });

});
