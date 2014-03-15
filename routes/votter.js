
/*
 * GET home page.
 */

 exports.top = function(req, res){
  //get top ** data from table
  //TODO I don't know how to access DB lol
  
  res.render('top', 
    { title: 'votter',
    events : [] 
  });
};

exports.newform = function(req, res){
  res.render('form', { title: 'votter - new form' });
};

exports.create = function(req, res){
  //insert data to table
  //TODO I don't know how to access DB lol
  var password = req.param("password")
  var password2 = req.param("password2")
  var title = req.param("title")
  var detail = req.param("detail")
  res.redirect('/');
};




exports.vote = function(req, res){
  //get data from table
  var vote_form_id = req.params.id;
  //TODO I don't know how to access DB lol
  res.render('vote', { title: 'votter - vote now' });
};

exports.voted = function(req, res){
  //get data from table
  var vote_form_id = req.params.id;
  var itle = req.param("elect");
  var itle = req.param("comment");
  //TODO I don't know how to access DB lol
  res.redirect('/');
};




exports.mng = function(req, res){
  //get data from table
  var vote_form_id = req.params.id;
  //TODO I don't know how to access DB lol
  res.render('mng', { title: 'votter - manage and satisfictions' });
};