const User = require('../models/userModel'); // Assuming you have this model
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');


const generateToken = (userData) => {
    if (!userData) {
        throw new Error("User data is required for token generation");
    }
     console.log('pintu',process.env.JWT_SECRET);
 const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error("JWT secret key is missing in .env file");
    }
    // Generate JWT token
    return jwt.sign({id:userData.id,id:userData.email,username:userData.username}, secretKey, { expiresIn: '1h' });
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(202).json({ message: 'User already exists' });
        }

      var hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user without manually setting created_at or updated_at
        const newUser = await User.create({ username, email, password :hashedPassword});

        const token = generateToken(newUser);
        res.status(200).json({
            message: 'User registered successfully!',
            token: generateToken(newUser),
        });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const login=async (req,res)=>{
const {email,password}=req.body;

    // res.json(password);
   try {
    if(!email || !password)
        {
        res.status(400).json({message:'fields is not correct'});
        }
    const userIsAvailable=await User.findOne({where:{email},order:[['created_at','desc']]});
    if(!userIsAvailable)
    {
        res.status(202).json({message:'this email is not registered with us.'})
    }
    // res.json(userIsAvailable);
     
        checkpassword=await bcrypt.compare(password,userIsAvailable.password);
        if(checkpassword===false)
        {
            res.status(202).json({message:'password is not correct.'})
        }
        const token=generateToken(userIsAvailable);

        res.status(200).json({message:'Login successfully',token:token});


        
   } catch (error) {
    console.error(error);
    res.status(500).json({message:'Internl server error'});
   }


}


module.exports = { register,login};
