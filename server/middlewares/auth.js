import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import pgPool from '../config/pgdb.js';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorization or token missing'
        });

    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // req.user = { id: decoded.id };
        // next();
        // const user = await User.findById(decoded.userId).select('-password');
        const user = await pgPool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        if (!user) {
            return res.status(401).json({
                success: false,
                email:decoded.email,
                message: 'User not found for ' + [decoded]
            });
        }
        const decodedUser = user.rows[0];
        req.user = decodedUser;
        console.log('Authenticated user:', decodedUser.id);
        next();
    } catch (e) {
        console.error('JWT VERFICATION FAILED', e);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}