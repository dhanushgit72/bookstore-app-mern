import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookrouter from "./routes/booksRoute.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
//app.use(cors({
  //  origin: "http://localhost:3000",
    //methods: ["GET", "POST", "PUT", "DELETE"],
    //allowedHeaders: ['Content-Type']
//}))


app.get('/', (req, res) => {
    res.send("Welcome")
})
app.use("/books", bookrouter);

app.listen(PORT, () => {
    console.log(`App is listening on port :  ${PORT}`)
})

mongoose.connect(mongoDBURL).
    then(() => {
        console.log("App connected to database")
    }).
    catch((error) => {
        console.log(error.message);
    })