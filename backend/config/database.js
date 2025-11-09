import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-codehub', {
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('🔧 Troubleshooting tips:');
    console.error('1. Check your MongoDB Atlas connection string in .env');
    console.error('2. Verify database name is included (ai-codehub)');
    console.error('3. Check IP whitelist in MongoDB Atlas console');
    console.error('4. Verify username and password are URL-encoded if needed');
    console.error('5. Ensure cluster is running and accepting connections');
    process.exit(1);
  }
};

export default connectDB;
