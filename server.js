var restify = require('restify');
var mongojs = require('mongojs');

port = 8080;

var server = restify.createServer();

var db = mongojs('cookBook');
var recipes = db.collection("recipes");
var users = db.collection("users");
var shoppers = db.collection("shoppers");

server.get('/recipes/', function (req , res, next){
  recipes.find({}, function(err, doc) {
    console.log(doc);
    res.send(200, doc);
    res.end();
  });
});

server.get('/recipes/:id', function (req , res, next){
  recipes.findOne({
      _id: mongojs.ObjectId(req.params.id)
    }, function(err, doc) {
        if(doc){
          console.log(doc);
          res.send(200, doc);
          res.end();
          }
        });
});

server.get('/users/', function (req , res, next){
  users.find({}, function(err, doc) {
    console.log(doc);
    res.send(200, doc);
    res.end();
  });
});

server.get('/users/:id', function (req , res, next){
  users.findOne({
      _id: mongojs.ObjectId(req.params.id)
    }, function(err, doc) {
        if(doc){
          console.log(doc);
          res.send(200, doc);
          res.end();
          }
        });
});

server.get('/shoppers/', function (req , res, next){
  shoppers.find({}, function(err, doc) {
    console.log(doc);
    res.send(200, doc);
    res.end();
  });
});

server.get('/shoppers/:id', function (req , res, next){
  shoppers.findOne({
      _id: mongojs.ObjectId(req.params.id)
    }, function(err, doc) {
        if(doc){
          console.log(doc);
          res.send(200, doc);
          res.end();
          }
        });
});

server.get('/shoppers/remove/:id', function (req , res, next){
  shoppers.remove({
      _id: mongojs.ObjectId(req.params.id)
    }, function(err, doc) {
        if(doc){
          console.log(doc);
          res.send(200, doc);
          res.end();
          }
        });
});

server.get('/shoppers/:userid/:recipeid', function (req , res, next){
  userid = req.params.userid;
  recipeid = req.params.recipeid;

  shoppers.findOne({
      user: userid,
      recipe: recipeid,
    }, function(err, doc) {
        console.log(doc);
        if(doc == null){
          shoppers.insert({user: userid, recipe: recipeid}, function(err, doc) {
            console.log(doc);
            res.send(200, doc);
            res.end();
          });
        }
        res.end();
  });
});






server.get('/.*/', restify.serveStatic({
  directory: __dirname,
  default: 'index.html'
}));

server.listen(port, function (){
  console.log('%s listening at %s', server.name, port)
});
