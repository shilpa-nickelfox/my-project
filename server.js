var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false });
var app = express();

var db = require('./api/config/db');
dotenv.config();

var cors = require('cors'); 
app.use(cors());

var routes = require('./api/routes/routes');

// app.use(express.static(path.join(__dirname, 'public')));


app.use(urlencodedParser);
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Clock App");
});

app.use('/v1', routes);

var server = app.listen(process.env.PORT || 3003, function(){
    var host = server.address().address;
    var port = server.address().port;
})

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('client/build'));
  
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
//   }
console.log("Server is running");


