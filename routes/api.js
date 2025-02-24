var express = require('express');
var router = express.Router();
const  { register,login } = require("../controllers/AuthController.js");
const { dashboard }= require('../controllers/DashboardController.js');
const { handleToken } =require('../middlewares/verifyToken.js');

router.post('/register', register);
router.post('/login', login);
router.post('/dashboard',handleToken,dashboard);



module.exports = router;


