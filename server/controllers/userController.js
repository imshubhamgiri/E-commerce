import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import pgPool from '../config/pgdb.js';

export async function register(req , res){
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
         // create token and return user + token so frontend can auto-login
         const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully',
              token,
            user: { id: newUser._id.toString(), name: newUser.name, email: newUser.email }
         });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export async function RegisterPg(req , res){
    const { name, email, password } = req.body;

    try {
         const queryp =  `INSERT INTO USERS (name , email , password)
                        VALUES($1 , $2 , $3)
                        RETURNING id, name, email, created_at;`

        const hashedPass = await bcrypt.hash(password , 10);
        
        const values = [name , email,hashedPass];

        const result = await pgPool.query(queryp , values);
        const id = result.rows[0].id;
      // create token and return user + token so frontend can auto-login
             const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully',
              token,
                 user: result.rows[0]
         });
    } catch (error) {
        if(error.code === '23505') { // Unique violation error code
            return res.status(400).json({ message: 'User already exists' });
        }
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: { id: user._id.toString(), name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function pgLogin(req , res){
    const {email , password} = req.body
    try {
        const lquery = `SELECT * FROM users WHERE email = $1;`

        const result =await pgPool.query(lquery, [email]);
        if(result.rows.length===0) return res.status(401).json({
            message:'invalid credentials'
        })
        const orgpass = result.rows[0].password
        const isMatch = await bcrypt.compare(password , orgpass);

        if(!isMatch) return res.status(403).json({
            sucess:false,
            message: 'invalid credentials'
        })

        const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            sucess:true,
            message: 'Login successful',
            token,
            user: { id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email }
        })
    } catch (error) {
        console.log(error)
       return res.status(500).json({
        sucess:false,
        message:'Internal Server Error'
       })
    }
}
