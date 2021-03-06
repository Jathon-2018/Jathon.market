var app = require('express')();
var bodyParser = require('body-parser');
require('dotenv').config();
var mysql = require('mysql');
var appFuctions = require('./appFuctions.js');
var express = require('express');
// var express = require('express');

// var index = require('./routes/index');
// var fcm = require('./routes/fcm');

var notifications = require('./notifications.js');



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

// app.use('/', index);
// app.use('/fcm', fcm);

app.get('/', function (req, res) {
  res.send('!!!!!!!!!')
  console.log("homeStart")
});

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



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
//---- แจ้งเตือน --------------------
  app.post('/sendMessage',function(req,res){
    notifications.sendMessage(req,res);
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

//---- Update List --------------------
app.post('/postUpdateList',function(req,res){
  appFuctions.postUpdateList(req,res);
});

//---- Send message --------------------
// app.post('/sendMessage',function(req,res){
//   appFuctions.sendMessage(req,res);
// });

// ------------------------------------ connect port ---------------------------------
// port connect server 
    app.listen(port,"0.0.0.0",function () {
      console.log("Listening on Port "+port);
    })
  
  // app.listen(4000, function () {
  //   console.log('Runing 4000!')
  // })

  // // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });


