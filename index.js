var express = require('express');
var dotenv = require('dotenv').config();

var app = express();
var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URL);

var eventSchema = new schema({
  title: String,
  allDay: Boolean,
  start: {$date: Date},
  end: {$date: Date},
  desc: String
});

var Event = mongoose.model('Event', eventSchema);

app.set('port', 3001);

app.get('/api/events',function(req,res,next){
  Event.find({}, (err, docs) => {
    if (err) {
      next(err);
      return;
    }
    res.send({"events": docs});
  });
});

app.use(function(req,res){
  res.status(404);
  res.send("404 Error");
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.send("500 Error");
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
