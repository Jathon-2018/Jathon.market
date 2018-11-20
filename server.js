var app = require('express')();
var bodyParser = require('body-parser');
require('dotenv').config();
var mysql = require('mysql');
var appFuctions = require('./appFuctions.js');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

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

//parse---------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

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

  //---- Register store --------------------
  app.post('/registerstore',function(req,res){
    console.log(req.body.storename)
    console.log(req.body.address)
    appFuctions.registerstore(req,res);
  });

  //---- Get Data from store current date --------------------
  app.post('/getShipping',function(req,res){
    console.log(req.body.date)
    appFuctions.getShipping(req,res);
   
  });

  //---- Get Type --------------------
  app.get('/getType',function(req,res){
    appFuctions.getType(req,res);
  });
  
  //---- Get store --------------------
  app.get('/getstore',function(req,res){
    appFuctions.getstore(req,res);
  });

  //---- Add product --------------------
  app.post('/addproduct',function(req,res){
    appFuctions.addproduct(req,res);
  });

  //---- Get data of store insied --------------------
  app.post('/getstoredatail',function(req,res){
    appFuctions.getstoredatail(req,res);
  });
  
   //---- delete data of store insied --------------------
   app.post('/deletestore',function(req,res){
    appFuctions.deletestore(req,res);
  });

  //---- Search store From area --------------------
  app.post('/searchstorefromarea',function(req,res){
    appFuctions.searchstorefromarea(req,res);
  });

  //---- Get list --------------------
  app.get('/getlist',function(req,res){
    appFuctions.getlist(req,res);
  });

  //---- updateToken --------------------
  app.post('/updateToken',function(req,res){
    appFuctions.updateToken(req,res);
  });

  
 //---- Search store From listtype --------------------
 app.post('/searchstorefromlisttype',function(req,res){
  appFuctions.searchstorefromlisttype(req,res);
  });

  
  app.post('/shipping',function(req,res){
    appFuctions.shipping(req,res);
  });

  //---- Get shippingtoadmin --------------------
  app.get('/getshippingtoadmin',function(req,res){
    appFuctions.getshippingtoadmin(req,res);
  });



// ------------------------------------ connect port ---------------------------------
// port connect server 
    app.listen(port,"0.0.0.0",function () {
      console.log("Listening on Port "+port);
    })
  
  // app.listen(4000, function () {
  //   console.log('Runing 4000!')
  // })