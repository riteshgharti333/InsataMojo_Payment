const express = require('express');
const buyRouter = require('./routes/buy');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', buyRouter);
const port = 5000;


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}

app.listen(port , () => {
    connect();
    console.log(`Backend server is running on ${port}`)
})