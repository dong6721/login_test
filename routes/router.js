const ctrl = require('./ctrl');
const express = require('express');
const router = express.Router();

//main page
router.get('/',ctrl.login_page);
//login success action
router.get('/success',ctrl.login_success_page);
//login action
router.post('/login',ctrl.login_post_login);
//create action
router.post('/register',ctrl.login_post_create);

module.exports = router;
