

var mysql = require('mysql');


//ตรวจสอบการ Login 
exports.Login = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    let users_username = req.body.username;
    let users_password = req.body.password;
    
    //ตรวจสอบ username และ password 
    sql = "SELECT * FROM users where users_username = ? and users_pass = ?";
    con.query(sql, [users_username,users_password], function (err, result){
    
            res.send(result);
            con.end();
        
                               
    });
}
