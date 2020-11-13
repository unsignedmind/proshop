import mongoose from 'mongoose';
import { ENV_KEYS } from '../src/local-env';
import { env } from '../server';

export const connectDB = async () => {
	try {
		const uri = env.get(ENV_KEYS.MONGO_URI);
		const conn = await mongoose.connect(uri, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};
