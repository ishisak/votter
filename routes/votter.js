
var lib = process.env.COVERAGE_MODULE_STUDY ? '../lib-cov/' : '../lib/';
var temp = require('../lib/event');
var votterDB = require('../lib/votter');
var mongojs = require('mongojs');

/*
 * GET home page.
 */

 exports.top = function(req, res){
  //get top ** data from table
  //TODO I don't know how to access DB lol
  var Vote  = require(lib + 'votter');
  db = new Vote
  db.getEvents(function(err, events){
    res.render('top', 
      { title: 'votter',
      events : events 
    });
  });
};

exports.newform = function(req, res){
  res.render('form', { title: 'votter - new form' });
};

exports.create = function(req, res){
  //insert data to table
  //validate 
  if(req.param("password")){
  }
  if(req.param("password2")){
  }
  if(req.param("title")){
  }
  if(req.param("detail")){
  }
  if(req.param("contents")){
  }

  var contents = req.param("contents").split(/\r\n|\r|\n/);
  if(req.param("password") == req.param("password2")){
    var newEvent = new temp.EventTemplate();
    newEvent.eventName = req.param("title");
    newEvent.eventDetail = req.param("detail");
    newEvent.password = req.param("password");
    newEvent.candidates = [];
    for(var i = 0; contents.length > i ; i++){
      newEvent.candidates[i] = {
        "candidateId" : i,
        "candidateName" : contents[i].split(",")[0],
        "reason" : contents[i].split(",")[1],
      }
    }
    console.log(newEvent);
    var Vote  = require(lib + 'votter');
    db = new Vote
    db.setEvent(newEvent,function(err, data){});
    res.redirect('/');
  }else{
    res.redirect('newform');
  }
};




exports.vote = function(req, res){
  //get data from table
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};

  var Vote  = require(lib + 'votter');
  db = new Vote
  db.getEvent(vote_form_id,function(err, data){
    res.render('vote', { title: 'votter - vote now' ,event:data});
  });
  
  //TODO I don't know how to access DB lol
};



exports.voted = function(req, res){
  //get data from table
  var ballot = new temp.BallotTemplate();
  ballot.eventId = req.params.id;
  ballot.userName = req.param("name");
  ballot.candidateId = req.param("elect");
  ballot.comment = req.param("comment");

  console.log(ballot)

  var Vote  = require(lib + 'votter');
  db = new Vote
  db.vote2Candidate(ballot,function(err, data){});
  res.redirect('/');
};




exports.mng = function(req, res){
  //get data from table
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
  var vote_id = {eventId:req.params.id};

  var Vote  = require(lib + 'votter');
  db = new Vote
  db.getEvent(vote_form_id,function(err, event){
    db.getVotes(vote_id,function(err, vote){
      db.sumUpCandidates(vote,function(err, score){
        console.log(score)
        res.render('mng', 
          { title: 'votter - manage and satisfictions' ,
          event:event,
          vote:vote,
          score:score
        });
      });
    });
  });

};