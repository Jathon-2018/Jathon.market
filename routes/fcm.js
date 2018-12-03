var express = require('express');
var router = express.Router();

var gcm = require('node-gcm');


//========== FCM =============

router.post('/sendMessage', function (req, res) {
  let store_name = req.messageData.store_name;
  let statusSend = req.messageData.statusSend;
  let datatoken = req.messageData.datatoken;

  console.log(store_name, statusSend,datatoken);
  
      let tokens = [];
      for(var i = 0; i < datatoken.length; i++){
        tokens.push(rows[i].datatoken);
      }
      console.log('dataToken',tokens);
      let message = new gcm.Message();
      message.addData('title', 'ร้าน', store_name);
      message.addData('message', statusSend);
      message.addData('content-available', true);
    //   message.addData('data', { "username": "Satit", "message": "Hello world" });
      message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

      let sender = new gcm.Sender('AAAA4gLgBcE:APA91bGWvIzWvKWgpW86YcG4UK7BNGO-qk-33Zi2VZcNlK9H1hrjY5YUTkVbKQEKTPfzz6lBJ_u3pt1UAJmCzhWUjfj6qo8JSl8XRKHn4C_pimUyZ1oxbsIiJMSyfJjWvZcVhS_cqsD6');

      sender.send(message, { registrationTokens: tokens }, (err, response) => {
        if (err) {
          console.log(err);
          res.send({ ok: false, error: err });
        } else {
          console.log(response);
          res.send({ ok: true });
        }
      });

    
});

module.exports = router;