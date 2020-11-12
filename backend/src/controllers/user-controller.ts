import asyncHandler from 'express-async-handler';
import { isNil } from 'lodash';
import User, { IUser, IUserModel } from '../models/user';

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user: IUser | null = await User.findOne({ email });
	let isValid = false;

	if (!isNil(user)) {
		isValid = await User.matchPasswords(password, user.password);
	}

	return res.json(isValid);
});
