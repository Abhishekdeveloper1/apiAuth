const User = require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const verifyToken=(token)=>{
    try{
        return jwt.verify(token,secretKey);

    }
    catch(error){
return null;
    }
}
const dashboard_old= async(req,res)=>{
    // res.json('jsjsjs');
    res.json(req.header['Authorization']);
  /*const response=  verifyToken(req.body.token)
  if(!response)
  {
    res.status(202).json({'message':'token is not correct'});
  }
  const alluserData=await User.findAll({attributes:['id','email'],group:['email','id']});
res.json(alluserData);*/
}

const dashboard__ = async (req, res) => {
    try {
        // ✅ Get token from request headers
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Access Denied! No token provided' });
        }

        // ✅ Remove 'Bearer ' prefix
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        // res.json({token});
        // ✅ Verify token
        const userData = verifyToken(token);
        if (!userData) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // ✅ Fetch all user data with distinct emails
        const alluserData = await User.findAll({
            attributes: ['id', 'email'],
            group: ['id', 'email']
        });

                res.json({ message: 'Dashboard Access Granted!', user: userData, users: alluserData });
            } catch (error) {
                console.error('Error in dashboard:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };

        const dashboard=async (req,res)=>{
            try{
            const alluserData=await User.findAll();
            res.status(200).json({alluserData});
            }
            catch(error)
            {
                res.status(500).json({error});
            }
        }
        module.exports={
        dashboard
        }