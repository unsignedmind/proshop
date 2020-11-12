import { Document, Model, model, Types, Schema, Query } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	updatedAt?: Date;
	createdAt?: Date;
}

export interface IUserModel extends Model<IUser> {
	matchPasswords(password: string, userPassword: string): any;
}

userSchema.statics = {
	async matchPasswords(password: string, userPassword: string) {
		return await bcrypt.compare(password, userPassword);
	},
};

const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
