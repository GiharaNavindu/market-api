import cors from "cors";
import "dotnev/config";
import express from "express";
import morgan from "morgan";

import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";


const app = express();


app.use(express.json()); //can process json data
app.use(cors()); //cross origin resource sharing
app.use(morgan("dev")); //shows the request in the console



app.get("api",(req,res)=>{
    res.send("The current time is ${new Date().toLcaleTimeString()}"); //send the current time
});


app.listen(8000),()=>{
    console.log("Server is running on port 8000");
}
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("Database is connected");
})
.catch((err)=>{
    console.log("Database connection failed",err);
})