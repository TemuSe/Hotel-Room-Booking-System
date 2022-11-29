var mysql = require('mysql');

// show create account page
exports.getCreateAccount = (req, res) => {
    res.render('register.ejs', {user:"", msg: [], err: [] })
 }
 
 //get data from user for create account
   exports.postCreateAccount = (req, res, next) => {
 
    var connectDB = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
       database: "ethiohotel"
    });
 
    var p1 = req.body.password;
    var p2 = req.body.confirm_password;
 
    if (p1 != p2) { // if password doesn't match 
       return res.render("register.ejs", {user:"", msg: [], err: ["Password Doesn't Match"] })
    }
 
    var data = "INSERT INTO user " +
       " VALUES ( '" + req.body.name + "' ,'" + req.body.email + "','" + p1 + "')";
 
    connectDB.query(data, (err, result) => {
       if (err) throw err;// if db has error, show that 
       else {
          res.render('login.ejs', {user: "", msg: ["Account Create Successfuly"], err: [] }); //show login page
       }
    })
 }

//login page
 exports.getLogin = (req, res, next) => {
    res.render('login.ejs', { user: "", msg: [], err: [] });
 }

 //post page of login
exports.postLogin = (req, res, next) => {

    var connectDB = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
       database: "ethiohotel"
    });
 
    data = "SELECT * " +
       "FROM  user " +
       "WHERE email = " + mysql.escape(req.body.email) +
       " AND password = " + mysql.escape(req.body.password);
 
 
    connectDB.query(data, (err, result) => {
       if (err) throw err; // show if any error have
       else {
          if (result.length) {
             req.session.email = result[0].email;
             res.render('category.ejs', {user: result[0].email});
          }
          else {
             res.render('login.ejs', { user: "", msg: [], err: ["Please Check Your information again"] });
          }
 
       }
    })
 
 }


 //post request of category
exports.postCategory = (req, res, next) => {
   var connectDB = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ethiohotel"
   });
   var date1 = req.body.date1;
   var date2 = req.body.date2;
   data = "INSERT INTO bookingstatus " +
      " VALUES ('" + req.session.email + "','" + date1 + "','" + date2 + "','" + req.body.guest + "','" + req.body.type + "')"

   connectDB.query(data, (err, result) => {
      if (err) throw err;
      else {
         res.render('room.ejs'); 
      }
   })

 }

 exports.postStatus = (req, res, next) => {

   //console.log(req.body);
   var connectDB = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "ethiohotel"
   });
   
   data1 = "SELECT * " +
      " FROM  bookingstatus " +
      " WHERE email = " + mysql.escape(req.session.email);
      
   connectDB.query(data, (err, reslt) => {
      if (err) throw err;
      else {
         connectDB.query(data1, (err1, result) => {
           
            res.render('status.ejs', {mail: req.session.email});
         })
      }
   })
} 

// get home page
exports.getHome = (req, res) =>{
   res.render("home.ejs");
} 

// service
exports.getService = (req, res) =>{
   res.render("service.ejs");
} 

//news
exports.getNews = (req, res) =>{
   res.render("news.ejs");
} 

//logout
exports.logout = (req, res, next) => {
   req.session.destroy();
   res.render('home.ejs');
}
 
 