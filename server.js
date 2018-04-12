// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');

var PORT = process.env.PORT || 3001;
var app = express();


// Set the app up with morgan
app.use(logger("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Database configuration
var databaseUrl = "mongodb://localhost/showflow";
var collections = ["shows", "users"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl , collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
  //allow the api to be accessed by other apps
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });

  app.get('/checkuser', function(req, res) {
    db.users.find(req.query, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  app.get('/getuser/:id', function(req, res) {
    db.users.find({_id: mongojs.ObjectId(req.params.id)}, function(err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  app.get('/checkdup', function(req, res) {
    db.users.find({ $or: [{'name': req.query.name}, {'email': req.query.email}]}, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  app.post('/createuser', function(req, res) {
    db.users.insert({'name': req.body.name, 'password': req.body.pass, 'email': req.body.email}, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  app.post('/saveshow/:save', function(req, res) {
    db.users.findAndModify({query: {_id: mongojs.ObjectId(req.body.userId)}, update : { $push : { "shows" : {showid : req.body.saveId, showtitle : req.body.saveTitle, showimage : req.body.saveImage, showstatus: req.body.saveStatus}}} }, function(err, result) {
      if (err) throw err;
      res.json(result);
    })
  });







/////////////////////






  // Account information
  app.get('/account/:userid', function(req, res) {

  })

  // Show routes
  app.get('/show/:id', function(req, res) {
    db.shows.find({
      "_id": mongojs.ObjectID(req.params.id)
    }, function(error, result){
        res.json(result);
    })
  });

  // Test post route
  app.post('/createshow', function(req, res) {
    db.shows.insert({name: "Game of Thrones", rating: 10}, function(error, show) {
      if (error) {
        res.send(error);
      }else {
        res.json(show);
      }
    })
  })

  // Feed routes
  app.get('/feed', function(req, res) {
    db.shows.find({}, function(err, result) {
        res.json(result)
  })
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Listen on port 3001
  app.listen(PORT, function() {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
  });




