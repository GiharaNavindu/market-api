import express as "express";
import cors as "cors";
import morgan as "morgan";

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