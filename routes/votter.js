
/*
 * GET home page.
 */

exports.top = function(req, res){
  //get top ** data from table
  //TODO I don't know how to access DB lol
  res.render('top', { title: 'votter' });
};

exports.newform = function(req, res){
  res.render('form', { title: 'votter - new form' });
};

exports.create = function(req, res){
  //insert data to table
  //TODO I don't know how to access DB lol
  res.redirect('/');
};


exports.vote = function(req, res){
  //get data from table
  var vote_form_id = req.params.id;
  //TODO I don't know how to access DB lol
  res.render('vote', { title: 'votter - vote now' });
};