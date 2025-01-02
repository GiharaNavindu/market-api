import express as "express";
import cors as "cors";
import morgan as "morgan";

const app = express();


app.use(express.json()); //can process json data
app.use(cors()); //cross origin resource sharing
app.use(morgan("dev")); //shows the request in the console



