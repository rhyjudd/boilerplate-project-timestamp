// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// This is the first test endpoint for the FCC project
app.get('/api/timestamp', (req, res)=>{
  var currentEpoch = Math.round(new Date().getTime());
  var currentDate = new Date().toUTCString();
  res.json({'unix': currentEpoch, 'utc': currentDate});
});


app.get('/api/timestamp/:data_string', (req, res)=>{
  let stringDate = Number(req.params.data_string);
  console.log(stringDate);

  if(!isNaN(stringDate)){
    let isoDate = moment.unix(stringDate).format("ddd, MMMM Do YYYY, h:mm:ss a");
    console.log(isoDate);
    res.json({'unix': stringDate, 'utc': isoDate });
  } else if(moment(req.params.data_string)){
    res.json({'unix': moment(req.params.data_string).unix(), 'utc':moment(req.params.data_string).format("ddd, MMMM Do YYYY, h:mm:ss a")})
  } else{
    res.json({"unix": null, "utc" : "Invalid Date" });
  }

  });


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});;