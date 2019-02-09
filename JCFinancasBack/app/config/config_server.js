var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var moment = require('moment');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
    customValidators: {
        isValidDate: function(value){
            return moment(value,'YYYY/MM/DD').isValid();
        }
      }
}));

//var compression = require('compression');
//var schedule   = require('node-schedule');
//var http       = require('follow-redirects').http;
//var jwt        = require("jsonwebtoken");

app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});


module.exports = app;