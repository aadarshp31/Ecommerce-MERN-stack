require('dotenv').config()

const mongoose = require("mongoose")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//Auth Routes
const authRoutes = require("./routes/auth")

//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("!!--------DB CONNECTED!--------!!");    
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);

//PORT
const port = process.env.PORT;

//Creating a server
app.listen(port, (req,res) => {
    console.log(`>> App is running at ${port}`);    
});