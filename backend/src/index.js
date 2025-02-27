import dotenv from 'dotenv';

import mongoose from 'mongoose';
import { app } from './app.js';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env'
})

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Sevrevr is running at Port: ${process.env.PORT}`);
    })
})
.catch( (err) => {
    console.log("MONGODB connection failed!!!", err);
})