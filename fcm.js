var gcm = require('node-gcm');
 
// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender('AAAA4gLgBcE:APA91bGWvIzWvKWgpW86YcG4UK7BNGO-qk-33Zi2VZcNlK9H1hrjY5YUTkVbKQEKTPfzz6lBJ_u3pt1UAJmCzhWUjfj6qo8JSl8XRKHn4C_pimUyZ1oxbsIiJMSyfJjWvZcVhS_cqsD6');
var message = new gcm.Message();
message.addData('title','Test'); 
message.addData('message','Only files notifications'); 
message.addData('content-available',true); 
// Prepare a message to be sent

 
// Specify which registration IDs to deliver the message to
  var regTokens = ["dafjtZM4udM:APA91bFKhvc17Fvyc0bXpGd9eBjTZ6AErPnA5z1NtHvWFWOVO0-UhEC__fd_xoe9nidCXZvigbA8gUYaY6wVSo6M_F_vAeHheHwz5peDhLm3SlgbU_F9fyaEDU4hAQEak8wiqDOoqZLQ"];

  sender.send(message, {registrationTokens : regTokens}, function (err, response ){
    if(err) console.error(err);
    else console.log(response);
  });
