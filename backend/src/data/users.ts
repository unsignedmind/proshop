import bcrypt from 'bcryptjs';

const users: Array<any> = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Unsignedmind',
		email: 'unsignedmind@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Dummy',
		email: 'dummy@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
