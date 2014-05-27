
var lib = process.env.COVERAGE_MODULE_STUDY ? '../lib-cov/' : '../lib/';
var temp = require('../lib/event');
var votterDB = require('../lib/votter');
var mongojs = require('mongojs');

var Util = require(lib +'util');
var util = new Util();

var Vote  = require(lib + 'votter');
var db = new Vote;

/*
 * GET home page.
 */

 exports.top = function(req, res){
  //get top ** data from table
  //TODO I don't know how to access DB lol
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
  var isOkay = false;
  if(req.param("password") 
   && req.param("password").length >= 6
   && req.param("title")
   && req.param("detail")
   && req.param("contents")
   && req.param("password") == req.param("password2")){
    isOkay = true;
}


if(isOkay){
  var contents = req.param("contents").split(/\r\n|\r|\n/);
  var newEvent = new temp.EventTemplate();
  newEvent.eventName = req.param("title");
  newEvent.eventDetail = req.param("detail");
  newEvent.password = util.sha256(req.param("password"));
  newEvent.status = "open";
  newEvent.veilFlg = false;
  newEvent.candidates = [];
  for(var i = 0; contents.length > i ; i++){
    newEvent.candidates[i] = {
      "candidateId" : i,
      "candidateName" : contents[i],
      "reason" : contents[i].split(",")[1]
    }
  }
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

  db.getEvent(vote_form_id,function(err, data){
    res.render('vote', { title: 'votter - vote now' ,event:data, form:{}});
  });
  
};



exports.voted = function(req, res){
  //get data from table
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
  db.getEvent(vote_form_id,function(err, data){
    var opened = (! data.status || data.status == "open");
    if(opened && req.param("name") && ! req.cookies[req.params.id]){
      var ballot = new temp.BallotTemplate();
      ballot.eventId = req.params.id;
      ballot.userName = req.param("name");
      ballot.candidateId = req.param("elect");
      ballot.comment = req.param("comment");

      db.vote2Candidate(ballot,function(err, data){});
      res.cookie(req.params.id, Date.now(),{ maxAge: 86400000, httpOnly: true });
      res.redirect('/');
    }else{
      res.redirect('vote/' + req.params.id);
    }
  });
};




exports.result = function(req, res){
  //get data from table
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
  var vote_id = {eventId:req.params.id};

  db.getEvent(vote_form_id,function(err, event){
    db.getVotes(vote_id,function(err, vote){
      db.sumUpCandidates(vote,function(err, score){
        res.render('result', 
          { title: 'votter - satisfictions' ,
          event:event,
          vote:vote,
          score:score
        });
      });
    });
  });
};


exports.mng = function(req, res){
  //get data from table
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
  var vote_id = {eventId:req.params.id};

  db.getEvent(vote_form_id,function(err, event){
    if (event.password == util.sha256(req.param("password"))) {

      res.render('mng', 
        { title: 'votter - manage' ,
        event:event ,
        id_token: util.md5(req.params.id)
      });
    }else{
      res.redirect('/result/' + req.params.id);
    }
  });
};


exports.deleteall = function(req, res){
  //get data from table
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
  var vote_id = {eventId:req.params.id};

  if(util.md5(req.params.id) == req.params.id_token){
    db.removeEvent(vote_id,function(err, vote){
      res.redirect('/result/' + req.params.id);
    });
  }else{
    res.redirect('/result/' + req.params.id);
  }
};

exports.openEvent = function(req, res){
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
  db.getEvent(vote_form_id,function(err, event){
    event.status = "open";
    db.updateEvent(event,function(err,event){
      res.redirect('/result/' + req.params.id);
    });
  });
};

exports.closeEvent = function(req, res){
  var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
  db.getEvent(vote_form_id,function(err, event){
    event.status = "false";
    db.updateEvent(event,function(err,event){
      res.redirect('/result/' + req.params.id);
    });
  });
};

exports.updPrivateStatus = function(req, res){
    var vote_form_id = {_id:mongojs.ObjectId(req.params.id)};
    db.getEvent(vote_form_id,function(err, event){
        if(req.params.status === "public") {
            event.publicStatus = true;
        } else {
            event.publicStatus = false;
        }

        db.updateEvent(event,function(err,event){
            res.redirect('/result/' + req.params.id);
        });
    });
};