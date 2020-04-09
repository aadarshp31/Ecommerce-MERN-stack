const express  = require("express");
const app = express();

const port = 8000;

app.get('/', (req, res) => {
    return res.send("You're at Home");
})

app.get('/login', (req, res) => {
    return res.send("You're at Login page");
})

app.get('/signup', (req, res) => {
    return res.send("You're at signup page");
})

app.get('/signout', (req, res) => {
    return res.send("You're at signout page");
})

app.get('/adarsh', (req, res) => {
    return res.send("You're my creator!");
})

app.listen(port, () => {
    console.log('Server is up and running...');
})