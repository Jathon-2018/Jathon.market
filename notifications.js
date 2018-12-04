var mysql = require('mysql');
var gcm = require('node-gcm');



exports.sendMessage = function(store_name,statusSend,tokenDevice){

	var con = mysql.createConnection({
  		host: process.env.DB_HOST,
  		user: process.env.DB_USER,
  		password: process.env.DB_PASSWORD,
  		database : process.env.DB_NAME
	});

    var message = new gcm.Message();
    message.addData('title','Test'); 
    message.addData('message','Only files notifications'); 
    message.addData('content-available',true); 
    message.addData('image', 'https://sv1.picz.in.th/images/2018/12/04/3JBs1e.png');
			
			var sender = new gcm.Sender('AAAA4gLgBcE:APA91bGWvIzWvKWgpW86YcG4UK7BNGO-qk-33Zi2VZcNlK9H1hrjY5YUTkVbKQEKTPfzz6lBJ_u3pt1UAJmCzhWUjfj6qo8JSl8XRKHn4C_pimUyZ1oxbsIiJMSyfJjWvZcVhS_cqsD6');
            // let store_name = req.body.store_name;
            // let statusSend = req.body.statusSend;

            // console.log(store_name, statusSend);


            let tokens = [];
            var tokenRow = tokenDevice;
            for(var i = 0 ; i <= tokenRow.length ; i++){
                tokens.push(tokenRow[i]);
            }
			// regTokens.push(result[0].token);
			console.log(tokens);

			sender.send(message, { registrationTokens: tokens }, function (err, response) {
    		if(err) console.error(err);
    		else 	console.log(response); 
            console.log("sandmassage complete");

			});
		
	
}