import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(express.json()); //can process json data
app.use(cors()); //cross origin resource sharing
app.use(morgan("dev")); //shows the request in the console



app.get("api",(req,res)=>{
    res.send("The current time is ${new Date().toLcaleTimeString()}"); //send the current time
});







//connecting to the database
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("Database is connected");

    //Define the routes if the database is connected
    app.use("/api",authRoutes);
    // app.use("/api",adRoutes);

    //if the database is connected,start the server
    app.listen(8000),()=>{
        console.log("Server is running on port 8000");
    }
})
.catch((err)=>{
    console.log("Database connection failed",err);
})