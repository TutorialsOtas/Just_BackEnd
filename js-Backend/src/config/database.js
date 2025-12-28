import mongoose from 'mongoose';

const connectDatabase = async() => {

try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(`\n Database connected successfully to ${connectionInstance.connection.host}`);
    
}
catch (error) {
   console.log('Database connection error:', error);
   process.exit(1);
}
};

export default connectDatabase;