import { Document, Model, model, Schema } from 'mongoose';
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
		token: {
			type: String,
			default: null,
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
	token?: string;
	updatedAt?: Date;
	createdAt?: Date;
}

export interface IUserModel extends Model<IUser> {
	matchPasswords(password: string): any;
}

userSchema.statics = {
	async matchPasswords(password: string) {
		return await bcrypt.compare(password, this.password);
	},
};

// @todo add this to blog post. function keyword must be used in order for this to be defined
userSchema.pre<IUser>('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	} else {
		next();
	}
});
const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
