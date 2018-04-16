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
var collections = ["flow", "users"];

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
    db.users.find(req.query, {password: 0}, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  app.get('/getuser/:id', function(req, res) {
    db.users.find({_id: mongojs.ObjectId(req.params.id)}, {password: 0}, function(err, result) {
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

  app.get('/usersbyshow', function (req, res) {
    db.users.find({ "shows.showtitle": req.query.title }, {password: 0}, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  })

  app.post('/createuser', function(req, res) {
    db.users.insert({'name': req.body.name, 'password': req.body.pass, 'email': req.body.email}, function (err, result) {
      if (err) throw err;
      res.json(result);
      db.flow.insert({'userId': result._id, 'name': result.name, 'date': new Date(), 'action': 'joined', 'target' : 'ShowFlow' }, function (err, result) {
        if (err) throw err;
      })
    })
  })

  app.get('/flow', function(req, res) {
    db.flow.find({}).sort({'date': -1}, function(err, docs) {
      res.json(docs)
    })
  })

  app.get('/showshows', function(req, res) {
    db.users.aggregate([ 
      {$unwind: "$shows"},
      {$group: {_id: "$shows", number: {$sum: 1}}}, 
      {$sort: {number: -1}}
    ],
      function(error, result) {
        res.json(result);
      }
    );
    })

  app.post('/saveshow/:save', function(req, res) {
    db.users.findAndModify({query: {_id: mongojs.ObjectId(req.body.userId)}, update : { $addToSet : { "shows" : { showid : req.body.saveId, showtitle : req.body.saveTitle, showimage : req.body.saveImage, showstatus: req.body.saveStatus}}} }, function(err, result) {
      if(result.shows !== undefined) {
          if(result.shows.filter(e => e.showid === req.body.saveId).length === 0) {
          db.flow.insert({'userId': req.body.userId, 'name': req.body.userName, 'date': new Date(), 'action': req.body.saveStatus, 'target' : req.body.saveTitle, 'showimg' : req.body.saveImage }, function (err, showresult) {
          res.json(showresult);
          })
          } 
      } else {
        db.flow.insert({'userId': req.body.userId, 'name': req.body.userName, 'date': new Date(), 'action': req.body.saveStatus, 'target' : req.body.saveTitle, 'showimg' : req.body.saveImage }, function (err, showresult) {
          if (err) throw err;
          res.json(showresult);
          })
      }

    })
  });

  app.post('/updateshow/:update', function(req, res) {
    db.users.findAndModify({query: {"_id": mongojs.ObjectID(req.body.userId)}, update: { $set : { "shows.$[elem].showstatus" : req.body.updateStatus }}, arrayFilters: [ { "elem.showid":  req.body.showId } ] } , function(err, result) {
      if (err) throw err;
      db.flow.insert({'userId': req.body.userId, 'name': req.body.userName, 'date': new Date(), 'action': 'updated the watch status of', 'target' : req.body.showTitle, 'showstatus': req.body.updateStatus, 'showimg' : req.body.showImage }, function (err, result) {
        if (err) throw err;
        res.json(result);
      })

    })
  });

    app.post('/updateshow/:update', function(req, res) {
    db.users.findAndModify({query: {"_id": mongojs.ObjectID(req.body.userId)}, update: { $set : { "shows.$[elem].showstatus" : req.body.updateStatus }}, arrayFilters: [ { "elem.showid":  req.body.showId } ] } , function(err, result) {
      if (err) throw err;
      db.flow.insert({'userId': req.body.userId, 'name': req.body.userName, 'date': new Date(), 'action': 'updated the watch status of', 'target' : req.body.showTitle, 'showstatus': req.body.updateStatus, 'showimg' : req.body.showImage }, function (err, result) {
        if (err) throw err;
        res.json(result);
      })

    })
  });

  
  app.post('/savecomments', function(req, res){
    console.log(req.body);
    db.flow.insert(req.body, function(err, result) {
    if (err) throw err;
    res.json(result)
    })
  })


  app.get('/comments/:show', function(req, res) {
    console.log(req.params.show);
    db.flow.find({'target' : req.params.show, 'action' : 'commented on'}, function(err, docs) {
      console.log(docs);
      res.json(docs)
    })
  });




/////////////////////


  // Show routes
  app.get('/show/:id', function(req, res) {
    db.shows.find({
      "_id": mongojs.ObjectID(req.params.id)
    }, function(error, result){
        res.json(result);
    })
  });

    app.get("/showallusers", function(req, res) {
      db.users.find({}, {password: 0},
        function(error, result) {
          res.json(result);
        }
      );
    });

    app.get("/toptrending", function(req, res) {
      db.users.aggregate([ 
        {$unwind: "$shows"},
        {$group: {_id: "$shows", number: {$sum: 1}}}, 
        {$sort: {number: -1}}, 
        {$limit:5}
      ],
        function(error, result) {
          res.json(result);
        }
      );
    });

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Listen on port 3001
  app.listen(PORT, function() {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
  });




