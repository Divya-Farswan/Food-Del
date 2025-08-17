import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'

// function to create  token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)    
}

// Route for user login
const   loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({success:false, message:"User doesn't exits"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token })
        } else {
            res.json({success:false, message:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        
        // checking is user alredy exit
        const exits = await userModel.findOne({ email })
        if (exits) {
            return res.json({success:false, message:"User already exits"})
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter valid email"})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password:hashedPassword
        })

        // save user in db
        const user = await newUser.save()

        // create one token
        const token = createToken(user._id)
        console.log("user token"+ token)
        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

 // Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET)
            console.log("Admin Login - JWT_SECRET:", process.env.JWT_SECRET);
            console.log("admin token"+ token)
            res.json({success: true, token})
        } else {
            res.json({success: false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
    
export { loginUser, registerUser, adminLogin };





