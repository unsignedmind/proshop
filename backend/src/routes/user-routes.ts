import express from 'express';
import { authUser } from '../controllers/user-controller';

export const userRoutes = express.Router();

userRoutes.post('/login', authUser);
