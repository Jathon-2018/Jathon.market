var app = require('express')();
var bodyParser = require('body-parser');
require('dotenv').config();
var mysql = require('mysql');
var appFuctions = require('./appFuctions.js');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var port = process.env.PORT || 4000;
//parse-------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//parse---------------------
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// extended: true
// }));

app.get('/', function (req, res) {
  res.send('!!!!!!!!!')
  console.log("homeStart")
})

// ------------------------------------ Req appFuctions-------------------------------

  //---- เข้าสู่ระบบ --------------------
  app.post('/Login',function(req,res){
    console.log(req.body.username)
    appFuctions.Login(req,res);
   
  });

  //---- Register member --------------------
  app.post('/registermember',function(req,res){
    console.log(req.body.username)
    console.log(req.body.password)
    appFuctions.registermember(req,res);
   
  });

  //---- Get Data from store current date --------------------
  app.post('/getShipping',function(req,res){
    console.log(req.body.date)
    appFuctions.getShipping(req,res);
   
  });





// ------------------------------------ connect port ---------------------------------
// port connect server 
    app.listen(port,"0.0.0.0",function () {
      console.log("Listening on Port "+port);
    })
  
  // app.listen(4000, function () {
  //   console.log('Runing 4000!')
  // })