import mongoose from 'mongoose';
import {DB_NAME} from "../constants.js";


// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(`${process.env.MONGODB_URI}}`)
        
//         console.log(`\nMongodb connected !! DB Host: ${connection.connection.host} ${DB_NAME}`)
//     } catch (error) {
//         console.log("MONGODB connection error", error);
//         process.exit(1);
//     }
// }

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  };

export default connectDB;