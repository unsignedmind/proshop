import bcrypt from 'bcryptjs';

const users: Array<any> = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Niklas Schmidt',
		email: 'niklas@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Anestis Tsolakidis',
		email: 'anestis@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
