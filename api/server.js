import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

dotenv.config();
mongoose.set('strictQuery', true);

const connect = async () => {

    try {

        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongodb.");
    } catch (err) {
        console.log(err);
    }
}

app.use((err, req, res, next) => {

    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
})

app.listen(8800, () => {

    connect();
    console.log("Backend server is running.");
})