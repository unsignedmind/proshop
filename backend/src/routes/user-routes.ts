import express from 'express';
import { authUser, getUserProfile, registerUser } from '../controllers/user-controller';
import { protect } from '../middleware/auth-middelware';

export const userRoutes = express.Router();

userRoutes.route('/').post(registerUser);
userRoutes.post('/login', authUser);
userRoutes.route('/profile').get(protect, getUserProfile);
