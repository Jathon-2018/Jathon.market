var app = require('express')();
var bodyParser = require('body-parser');
require('dotenv').config();
var mysql = require('mysql');
var appFuctions = require('./appFuctions.js');
var express = require('express');
// var express = require('express');

var index = require('./routes/index');
var fcm = require('./routes/fcm');


var appcall = express();


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

appcall.use('/', index);
appcall.use('/fcm', fcm);

app.get('/', function (req, res) {
  res.send('!!!!!!!!!')
  console.log("homeStart")
})

// app.post('/sendMessage', function (req, res) {
//   var gcm = require('node-gcm');

//   let store_name = req.messageData.store_name;
//   let statusSend = req.messageData.statusSend;
//   let datatoken = req.messageData.datatoken;

//   console.log(store_name, statusSend,datatoken);
  
//       let tokens = [];
//       for(var i = 0; i < datatoken.length; i++){
//         tokens.push(rows[i].datatoken);
//       }
//       console.log('dataToken',tokens);
//       let message = new gcm.Message();
//       message.addData('title', 'ร้าน', store_name);
//       message.addData('message', statusSend);
//       message.addData('content-available', true);
//     //   message.addData('data', { "username": "Satit", "message": "Hello world" });
//       message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

//       let sender = new gcm.Sender('AAAA4gLgBcE:APA91bGWvIzWvKWgpW86YcG4UK7BNGO-qk-33Zi2VZcNlK9H1hrjY5YUTkVbKQEKTPfzz6lBJ_u3pt1UAJmCzhWUjfj6qo8JSl8XRKHn4C_pimUyZ1oxbsIiJMSyfJjWvZcVhS_cqsD6');

//       var regTokens = ["dafjtZM4udM:APA91bFKhvc17Fvyc0bXpGd9eBjTZ6AErPnA5z1NtHvWFWOVO0-UhEC__fd_xoe9nidCXZvigbA8gUYaY6wVSo6M_F_vAeHheHwz5peDhLm3SlgbU_F9fyaEDU4hAQEak8wiqDOoqZLQ"];
//       sender.send(message, { registrationTokens: tokens }, (err, response) => {
//         if (err) {
//           console.log(err);
//           res.send({ ok: false, error: err });
//         } else {
//           console.log(response);
//           res.send({ ok: true });
//         }
//       });



//   res.send('Token True')
// })



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

  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
