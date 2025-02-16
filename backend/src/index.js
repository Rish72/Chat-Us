import express from 'express'
import dotenv from 'dotenv';
import router from "./routes/auth.routes.js"
import { connectDb } from './lib/db.js';

dotenv.config()
const app = express();

app.use("/api/auth", router);
app.use(express.json());        // body parser

const PORT = process.env.PORT;
app.listen(4000,() =>{
    console.log("server is up and running");
    connectDb()
} )