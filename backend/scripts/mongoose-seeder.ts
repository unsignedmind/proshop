import dotenv from 'dotenv';
import users from '../src/data/users';
import products from '../src/data/products';
import User from '../src/models/user';
import Product from '../src/models/product';
import Order from '../src/models/order';
import { connectDB } from '../config/db';

dotenv.config();

connectDB();

export const importData = async () => {
	try {
		await Order.deleteMany({});
		await Product.deleteMany({});
		await User.deleteMany({});

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);
		console.info('Data imported');
		process.exit(0);
	} catch (e) {
		console.error('Import of data failed', e);
		process.exit(1);
	}
};

export const destroyData = async () => {
	try {
		await Order.deleteMany({});
		await Product.deleteMany({});
		await User.deleteMany({});

		console.info('Data wiped');
		process.exit(0);
	} catch (e) {
		console.error('Wipe of data failed', e);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
