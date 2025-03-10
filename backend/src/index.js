import express from 'express'
import dotenv from 'dotenv';
import authRouter from "./routes/auth.routes.js"
import msgRouter from "./routes/msg.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from './lib/db.js';

dotenv.config()

const app = express();
app.use(cookieParser());        // cookie parser
app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE"],  //  Correctly formatted HTTP methods
}));

app.use(express.json());        // body parser

app.use("/api/auth", authRouter);
app.use("/api/message", msgRouter);

const PORT = process.env.PORT;
app.listen(4000,() =>{
    console.log("server is up and running at ",PORT);
    connectDb()
} )