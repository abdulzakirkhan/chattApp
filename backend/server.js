import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'


const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
})

app.use(express.json())
app.use(cookieParser())



app.get('/', (req, res) => {
    res.send(`<h1>Hi How are you doing</h1>`);
});

import authRoutes from './routes/auth.routes.js';

app.use('/api/auth',authRoutes)



app.listen(3000)



