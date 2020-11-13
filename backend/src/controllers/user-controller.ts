import asyncHandler from 'express-async-handler';
import { isNil } from 'lodash';
import User, { IUser } from '../models/user';
import { generateToken } from '../utils/generate-token';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user: IUser | null = await User.findOne({ email });

	if (!isNil(user && User.matchPasswords(password))) {
		let token = !isNil(user?.id) ? generateToken(user?._id) : null;

		const resUser = {
			_id: user?._id,
			name: user?.name,
			email: user?.email,
			isAdmin: user?.isAdmin,
			token: token,
		};
		res.json(resUser);
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, isAdmin } = req.body;

	const userExists: IUser | null = await User.findOne({ email });

	if (!isNil(userExists)) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({ name, email, password, isAdmin: isAdmin ?? false });

	if (!isNil(user)) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('invalid user data');
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body.authedUser._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
