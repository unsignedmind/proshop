import jwt from 'jsonwebtoken';
import { env } from '../../server';
import { ENV_KEYS } from '../local-env';

export const generateToken = (id: string) => {
	return jwt.sign({ id }, env.get(ENV_KEYS.JWT_SECRET), { expiresIn: '1d' });
};
