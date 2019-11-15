var express = require('express');
var bodyParser = require("body-parser");
var app = express();


app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/heart');
});
app.get('/formularz', function(req, res) {
    res.render('pages/mouth');
});
app.get('/licence', function(req, res) {
    res.render('pages/chest');
});

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mzkdb',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected');
});

app.post('/form',function(req,res){
  var name=req.body.name;
  var message=req.body.message;
  res.redirect('/');
    
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = day + "-" + month + "-" + year;

    var formobj = { name: name, message: message, date:newdate };
      db.collection("complaints").insertOne(formobj, function(err, res) {
        if (err) throw err;
        console.log("1 complaint inserted");
      });
});

app.listen(8080);
console.log('Lets get rollin!');