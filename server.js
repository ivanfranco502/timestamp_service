// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let bodyParser = require("body-parser");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let dateString = req.params.date_string;
  let date;
  try {
    if(/\d{5,}/.test(dateString))
    { // could be timestamp
      let timestamp = parseInt(dateString);
      date = dateString ? new Date(timestamp) : new Date();
    }
    else
      date = dateString ? new Date(dateString) : new Date();

    let utcDate = date.toUTCString();
    if(utcDate === "Invalid Date")
      throw 'error';
    
    res.json({
      unix: date.getTime(), 
      utc: utcDate
    });
  }catch(exception){
    res.json({error: "Invalid Date"});
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});