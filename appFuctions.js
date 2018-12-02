

var mysql = require('mysql');


//-------ตรวจสอบการ Login----------
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
    if (err) throw err;
        if(result!="")
        {
            var users_id = result[0].users_id;

            sql = `SELECT * FROM users where users_id = ?`;
            con.query(sql, [users_id], function (err, result){
            if (err) throw err;
                
                var list = result
                if(result[0].users_img !="" && result[0].users_img != undefined && result[0].users_img != null){
                    var dataImg = result[0].users_img ? result[0].users_img.toString() : null;
                    list[0]["users_img"] = dataImg; 
                    list[0]["statusLogin"] = 1;
                    res.send(list);
                    console.log(list);
                    con.end();
                }
                else{
                    list[0]["users_img"] = `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`; 
                    list[0]["statusLogin"] = 1;
                    res.send(list);
                    con.end();
                }
            
            });
              
        }
        else{
            res.send([{statusLogin:0}]);
            con.end();
        }
                                
    });
}

//--------
exports.getShipping = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
    
    // var shipping_date = new Date();
    var shipping_date = req.body.date;
    
    sql = `SELECT * FROM shipping JOIN store ON store_id = shipping_store_id WHERE shipping_date = ? `;
        con.query(sql, [shipping_date], function (err, result){if (err) throw err;
            console.log(result);
            res.send(result);
            con.end();                             
    });
     
}

//------- registemember ----------
// สมัครสมาชิกทั่วไป
exports.registermember = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
    

    let users_username = req.body.username
    let users_pass = req.body.password
    let users_fname = req.body.firstname
    let users_lname = req.body.lastname
    let users_address = req.body.address
    let users_subarea = req.body.district
    let users_area = req.body.city
    let users_provice = req.body.province
    let users_phone = req.body.phone
    let users_gender = req.body.sex
    let users_status = 2

        sql = "SELECT * FROM users where users_username = ? ";
        con.query(sql, [users_username], function (err, result){if (err) throw err;
            if(result!="")
            {
                //have this username
                res.send([{Alert:0}]); 
                con.end();   
            }
            else{

                sql = `INSERT INTO users(users_username,users_pass,users_fname,users_lname,users_address,users_subarea,users_area,users_provice,users_phone,users_gender,users_status) 
                VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )`;
                con.query(sql, [users_username,users_pass,users_fname,users_lname,users_address,users_subarea,users_area,users_provice,users_phone,users_gender,users_status], function (err, result){
                    if (err) throw err;
                    res.send([{Alert:1}]);   
                    con.end();                           
                }); 

            } 
                                 
        });

            
                   
}

//------- registerstore ----------
// เพิ่มร้านค้า
exports.registerstore = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
    

    let store_name = req.body.storename
    let store_owner = req.body.owner
    let store_address = req.body.address
    let store_subarea = req.body.district
    let store_area = req.body.city
    let store_provice = req.body.province
    let store_postcode = req.body.province_id
    let store_phone = req.body.phone
    let store_img = req.body.store_picture
    


    sql = `INSERT INTO store(store_name,store_owner,store_adress,store_subarea,store_area,store_provice,store_postcode,store_phone,store_img) 
        VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? )`;
        con.query(sql, [store_name,store_owner,store_address,store_subarea,store_area,store_provice,store_postcode,store_phone,store_img], function (err, result){
            if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        });  
   
                           
}

//-------Get data from Type Table ----------
exports.getType = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    sql = "SELECT * FROM type";
    con.query(sql, [], function (err, result){
    if (err) throw err;
        res.send(result);
        console.log(result);
        con.end();                       
    });

}

//-------Add product ----------
exports.addproduct = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    let list_type  = req.body.product_type
    let list_name = req.body.Product_Name
    let list_price = req.body.price
    let list_unit = req.body.unit
    


    sql = `INSERT INTO list(list_name,list_price,list_unit,list_type) 
        VALUES( ? , ? , ? , ? )`;
        con.query(sql, [list_name,list_price,list_unit,list_type], function (err, result){
            if (err) throw err;
            res.send([{Alert:1}]);   
            con.end();                           
        }); 

}

//-------Get data from store Table ----------
exports.getstore = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    sql = "SELECT * FROM store";
    con.query(sql, [], function (err, result){
    if (err) throw err;
    var list = result;
    var database = 'data:image/jpeg;base64,'
    var iarray = 0;
    for (var i = 0; i < result.length; i++){
        if(result[iarray].store_img !="" && result[iarray].store_img != undefined && result[iarray].store_img != null){
            var dataImg = result[iarray].store_img ? result[iarray].store_img.toString() : null; 
            list[iarray]["store_img"] = database + dataImg 
            iarray++;
        }
        else{
            list[iarray]["store_img"] = database + `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`; 
            iarray++;
        } 
    } 
    res.send(list);
    con.end();                                             
    });

}


//-------Get data from store Detail ----------
exports.getstoredatail = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    let store_id = req.body.store_id

    sql = "SELECT * FROM store WHERE store_id = ? ";
    con.query(sql, [store_id], function (err, result){
    if (err) throw err;
    var list = result
    if(result[0].store_img !="" && result[0].store_img != undefined && result[0].store_img != null){
        var dataImg = result[0].store_img ? result[0].store_img.toString() : null;
        list[0]["store_img"] = dataImg; 
        res.send(list);
        console.log(list);
        con.end();
    }
    else{
        list[0]["store_img"] = `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`; 
        res.send(list);
        con.end();
    }                       
    });

}

exports.deletestore = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });


    var store_id = req.body.store_id

        sql = 'DELETE FROM store WHERE store_id = ?';
        con.query(sql, [store_id], function (err, result){if (err) throw err;
            res.send([{Alert:1}]);
            con.end();    
        });

}

exports.searchstorefromarea = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });


    console.log(req.body.area);
    var store_area = req.body.area
    
    sql = `SELECT * FROM store,shipping  WHERE store_area = ?  and shipping_store_id = store_id`;
    con.query(sql, [store_area], function (err, result){if (err) throw err;
        var list = result;
        var database = 'data:image/jpeg;base64,'
        var iarray = 0;
        for (var i = 0; i < result.length; i++){
            if(result[iarray].store_img !="" && result[iarray].store_img != undefined && result[iarray].store_img != null){
                var dataImg = result[iarray].store_img ? result[iarray].store_img.toString() : null; 
                list[iarray]["store_img"] = database + dataImg 
                iarray++;
            }
            else{
                list[iarray]["store_img"] = database + `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`; 
                iarray++;
            } 
        } 
        res.send(list);
        con.end();               
    });

}

//-------Get data from store Table ----------
exports.getlist = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    sql = "SELECT * FROM list";
    con.query(sql, [], function (err, result){
    if (err) throw err;
    res.send(result);
    con.end();                                             
    });

}

//-------Get data from store Table ----------
exports.updateToken = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var users_tokendevice = req.body.token
    var users_id = req.body.users_id

    sql = 'UPDATE users SET users_tokendevice = ? where users_id = ?';
    con.query(sql, [users_tokendevice,users_id], function (err, result){
    if (err) throw err;
    res.send(result);
    con.end();                                             
    });

}

exports.searchstorefromlisttype = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });


    console.log(req.body.area);
    var list_type = req.body.list_type
    sql = `SELECT * FROM list WHERE list_type = ? `;
    con.query(sql, [list_type], function (err, result){if (err) throw err;
        res.send(result);
        con.end();               
    });

}

exports.shipping = function (req, res) 
{  
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });
      
    var shipping_status = req.body.receiving
    var shipping_note = req.body.shipping_note
    var shipping_store_id = req.body.store_id
    var shipping_users_id = req.body.users_id
    var shipping_date = req.body.ship_date
    //Select table menu
    var shipping_date_check = new Date();

    var detaillist = req.body.detail
        //บันทึกรายละเอียดอาหารลง table
        
        
    //เพิ่มใบสั่งรายการอาหาร
        sql = `INSERT INTO shipping(shipping_status,shipping_note,shipping_store_id,shipping_users_id,shipping_date,shipping_date_check) 
        VALUES( ? , ? , ? , ? , ? , ?)`;
        con.query(sql, [shipping_status,shipping_note,shipping_store_id,shipping_users_id,shipping_date,shipping_date_check], function (err, result){
            if (err) throw err;
            //เลือก ใบสั่งอาหารจาก user_id & store_id ที่เวลาล่า

            sql = `SELECT * FROM shipping WHERE shipping_date_check = (SELECT MAX(shipping_date_check) FROM shipping WHERE shipping_store_id = ? and shipping_users_id = ?) `;
            con.query(sql, [shipping_store_id,shipping_users_id], function (err, result){
                if (err) throw err;
                var Neworders_id = result[0].shipping_id 
                console.log(Neworders_id)   

                // insert detail and order_id

                if(result[0].shipping_status == '1'){
                    var detail = detaillist
                    var iarray = 0;
                    for (var i = 0; i < detail.length; i++){
                        var amount = parseInt(detail[iarray].amount)
                        var list_id = detail[iarray].list_id
                        console.log(list_id)
                            sql = `INSERT INTO detail(detail_name,detail_amount,detail_price,detail_shipping_id,detail_list_id) 
                            VALUES( ? , ? , ? , ? , ? )`;
                            con.query(sql, [detail[iarray].list_name,amount,detail[iarray].list_price,Neworders_id,list_id], function (err, result){
                                if (err) throw err;
                                console.log('สำเร็จ') 
                            });
                        iarray++;
                    } 
                }
                else{

                }
                    res.send([{Alert:1}]);
                    con.end(); 
            }); 
        });
        
        
        
}

exports.getshippingtoadmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    sql = "SELECT * FROM shipping ,store WHERE shipping_store_id = store_id";
    con.query(sql, [], function (err, result){
    if (err) throw err;
    var list = result;
    var database = 'data:image/jpeg;base64,'
    var iarray = 0;
    for (var i = 0; i < result.length; i++){
        if(result[iarray].store_img !="" && result[iarray].store_img != undefined && result[iarray].store_img != null){
            var dataImg = result[iarray].store_img ? result[iarray].store_img.toString() : null; 
            list[iarray]["store_img"] = database + dataImg 
            iarray++;
        }
        else{
            list[iarray]["store_img"] = database + `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`; 
            iarray++;
        } 
    } 
    res.send(list);
    con.end();                                                                          
    });

}

exports.getshippinganddetail = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var shipping_id = req.body.shipping_id
    console.log(shipping_id)

    sql = "SELECT * FROM detail d JOIN list l ON d.detail_list_id = l.list_id WHERE d.detail_shipping_id = ? ";
    con.query(sql, [shipping_id], function (err, result){
    if (err) throw err;
    res.send(result);
    con.end();                                                                          
    });

}

exports.getdateshippingtoadmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    sql = "SELECT * FROM shipping group by shipping_date ";
    con.query(sql, [], function (err, result){
    if (err) throw err;
    var list = result;
    res.send(list);
    con.end();                                                                          
    });

}

exports.getdateshippingforadmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    var date = req.body.shipping_date

    sql = "SELECT * FROM shipping,store,detail WHERE shipping_store_id = store_id and shipping_id = detail_shipping_id and shipping_date = ? ";
    con.query(sql, [date], function (err, result){
    if (err) throw err;
    var list = result;
    res.send(list);
    con.end();                                                                          
    });

}

exports.searchstorearea = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });


    console.log(req.body.area);
    var store_area = req.body.area
    
    sql = `SELECT * FROM store WHERE store_area = ? `;
    con.query(sql, [store_area], function (err, result){if (err) throw err;
        var list = result;
        var database = 'data:image/jpeg;base64,'
        var iarray = 0;
        for (var i = 0; i < result.length; i++){
            if(result[iarray].store_img !="" && result[iarray].store_img != undefined && result[iarray].store_img != null){
                var dataImg = result[iarray].store_img ? result[iarray].store_img.toString() : null; 
                list[iarray]["store_img"] = database + dataImg 
                iarray++;
            }
            else{
                list[iarray]["store_img"] = database + `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`; 
                iarray++;
            } 
        } 
        res.send(list);
        con.end();               
    });

}

//-------Get Admin ----------
exports.getAdmin = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

    sql = "SELECT * FROM users WHERE users_status = 1";
    con.query(sql, [], function (err, result){
    if (err) throw err;
    res.send(result);
    con.end();                                             
    });

}

exports.sendMessage = function (req, res) 
{  
    
	var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME
    });

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

}