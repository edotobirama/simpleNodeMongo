import express from 'express';
const app = express();
import UserRouter from './router/userRouter.js';
import ProductRouter from './router/productRouter.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const { DB_USER, DB_PASSWORD, PORT } = process.env;
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p0hmk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURL).then(function (connection) {
    console.log(connection);
}).catch((err) => {
    console.log(err);
});
/**********APIs*********/
app.use(express.json());
app.use('/api/user', UserRouter);
app.use('/api/product', ProductRouter);
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
