const express = require('express');
const router = express.Router();
const userControler = require('../controllers/user');

router.route('/register') 
       .get(userControler.getCreateAccount)    //get request for create account   
       .post(userControler.postCreateAccount); //post request for create account   

router.route('/login')
    .get(userControler.getLogin) // get request for login
    .post(userControler.postLogin)// post request for login

router.route('/category')
    .post(userControler.postCategory) //post booking data 

router.route('/room')
    .post(userControler.postStatus); 


router.route('/')
    .get(userControler.getHome) //get home page 
    
router.route('/service') // get service page
    .get(userControler.getService)

router.route('/news') // get news page
    .get(userControler.getNews)  
    
router.get('/logout',userControler.logout); //logout       
    
module.exports = router;
