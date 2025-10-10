import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/configs/db.js';
import cors from 'cors';
import urlRoutes from './src/routes/Url.route.js'
import {connectRedis} from './src/configs/redis.js';

const app=express();

dotenv.config();
connectDB();
connectRedis();
app.use(express.json());
app.use(cors({
    origin:'*',
    methods: ['GET','POST','PUT','DELETE'],
}));

app.get('/',(req,res)=>{
    console.log('Hello I\'m listening');
    res.status(200).json({message:"Hey, how are you."})

})
app.use('/api', urlRoutes);

app.listen(4000,()=>{
    console.log("Hello I'm listening");
})