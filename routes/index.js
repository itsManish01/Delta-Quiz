const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/',homeController.h);
router.get('/login' ,homeController.login );
router.get('/signin' ,homeController.signup );
router.post('/signin' ,homeController.createUser );
router.post('/login' ,homeController.loginUser);
router.get('/logout' , homeController.logoutUser);

router.get('/home' , homeController.homePage);
module.exports = router;