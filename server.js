import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan"
import UserRouter from "./routes/user_routes.js"
import authRouter from "./routes/auth_routes.js";
import connectDB from "./config/Config.js";
dotenv.config()
let app =express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", authRouter);


// Test route to check server functionality
app.post("/data/api", (req, res) => {
    res.send("Welcome to the server!");     
});

    // db function to connect to the database
connectDB();
// server port
let port =process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


