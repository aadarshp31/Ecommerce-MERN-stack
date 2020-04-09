const mongoose = require("mongoose")
const express = require("express")

const app = express();
const port = 8000;

mongoose.connect("mongodb://localhost:27017/tshirt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("!!--------DB CONNECTED!--------!!");    
})

app.listen(port, (req,res) => {
    console.log(`>> App is running at ${port}`);    
});