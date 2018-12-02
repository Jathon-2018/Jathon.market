var app = require('express')();
var bodyParser = require('body-parser');
require('dotenv').config();
var mysql = require('mysql');
var appFuctions = require('./appFuctions.js');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
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
     console.log(req.body.store_id)
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

  
  //---- Get getshippinganddetail --------------------
  app.post('/getshippinganddetail',function(req,res){
    appFuctions.getshippinganddetail(req,res);
  });

  //---- Get dateshippingtoadmin --------------------
  app.get('/getdateshippingtoadmin',function(req,res){
    appFuctions.getdateshippingtoadmin(req,res);
  });

  //---- Get date shipping for Admin --------------------
  app.post('/getdateshippingforadmin',function(req,res){
    appFuctions.getdateshippingforadmin(req,res);
  });

//---- Search store From area --------------------
app.post('/searchstorearea',function(req,res){
  appFuctions.searchstorearea(req,res);
});

//---- Get users Admin --------------------
app.get('/getAdmin',function(req,res){
  appFuctions.getAdmin(req,res);
});

//---- Send message --------------------
app.post('/sendMessage',function(req,res){
  // appFuctions.sendMessage(req,res);
  var gcm = require('node-gcm');

    var store_name = req.body.store_name
 
    // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
    var sender = new gcm.Sender('AAAA4gLgBcE:APA91bGWvIzWvKWgpW86YcG4UK7BNGO-qk-33Zi2VZcNlK9H1hrjY5YUTkVbKQEKTPfzz6lBJ_u3pt1UAJmCzhWUjfj6qo8JSl8XRKHn4C_pimUyZ1oxbsIiJMSyfJjWvZcVhS_cqsD6');
    var message = new gcm.Message();
    message.addData('title','เทพขลุ่ย'); 
    message.addData('message','ทดสอบส่งแจ้งเตือน'); 
    message.addData('content-available',true); 
    // Prepare a message to be sent
    
     
    // Specify which registration IDs to deliver the message to
      var regTokens = ["eJ1nw8RsTz8:APA91bF6o2lg6Svtf6ai8nZs5bz3zQX9bDuCZi93MVYlP4AyWyC_TZjSp_2T8eJN_L1v7fj0UPkR1KaU82SwkTrbZBg25r2JB3pdM1NIXaTRZAAfT4vr6ZbInNlphbACmpGep_sa5oaY"];
    
    let tokens = []
    tokens.push(regTokens)
      
      sender.send(message, {registrationTokens : tokens}, function (err, response ){
        if(err) console.error(err);
        else console.log(response);
      });
});

// ------------------------------------ connect port ---------------------------------
// port connect server 
    app.listen(port,"0.0.0.0",function () {
      console.log("Listening on Port "+port);
    })
  
  // app.listen(4000, function () {
  //   console.log('Runing 4000!')
  // })