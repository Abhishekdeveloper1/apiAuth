const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const { token } = require('morgan');
const secretKey = process.env.JWT_SECRET;

const handleToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader)
    {
        return res.status(401).json({ message: 'Access Denied! No token provided' });
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;


    const userData = verifyToken(token);
    if (!userData) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

req.user=userData;
    next();
}

const verifyToken=(token)=>{
    try{
        return jwt.verify(token,secretKey);

    }
    catch(error){
return null;
    }
}
module.exports={handleToken}