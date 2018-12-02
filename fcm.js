var gcm = require('node-gcm');
 
// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender('AAAA4gLgBcE:APA91bGWvIzWvKWgpW86YcG4UK7BNGO-qk-33Zi2VZcNlK9H1hrjY5YUTkVbKQEKTPfzz6lBJ_u3pt1UAJmCzhWUjfj6qo8JSl8XRKHn4C_pimUyZ1oxbsIiJMSyfJjWvZcVhS_cqsD6');
var message = new gcm.Message();
message.addData({
    title: 'Push',
    body: 'This is push notification',
    otherProperty: true,
  }); 
// Prepare a message to be sent

 
// Specify which registration IDs to deliver the message to
var regTokens = ['eJ1nw8RsTz8:APA91bF6o2lg6Svtf6ai8nZs5bz3zQX9bDuCZi93MVYlP4AyWyC_TZjSp_2T8eJN_L1v7fj0UPkR1KaU82SwkTrbZBg25r2JB3pdM1NIXaTRZAAfT4vr6ZbInNlphbACmpGep_sa5oaY'];
 

  
  sender.send(message, {registrationIds: [token]}, (err) => {
    if (err) {
      console.error(err);
    }
    else {
      console.log('Sent');
    }
  });