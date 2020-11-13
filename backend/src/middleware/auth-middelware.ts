import asyncHandler from 'express-async-handler';
import { isNil } from 'lodash';
import jwt from 'jsonwebtoken';
import { ENV_KEYS, getEnvKey } from '../local-env';
import { env } from '../../server';
import User from '../models/user';
import { NextFunction } from 'express';

interface JWTToken {
	id: string;
	iat: number;
	exp: number;
}

export const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (!isNil(req.headers.authorization) && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			// @ts-ignore because return type of verify prevents useful typing
			const decoded: JWTToken = jwt.verify(token, env.get(ENV_KEYS.JWT_SECRET));
			req.body.authedUser = await User.findById(decoded['id']).select('-password');
		} catch (e) {
			console.log(e);
			res.status(404);
		}
	}

	if (isNil(token)) {
		res.send(401);
		throw new Error('Not Authorized. No Token');
	}

	next();
});
