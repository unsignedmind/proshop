import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || ''
    const conn = await mongoose.connect(uri, {
      useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
    })
  }catch(error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
