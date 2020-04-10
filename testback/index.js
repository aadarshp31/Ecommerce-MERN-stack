const express  = require("express");
const app = express();

const port = 8000;

//admin route method
const adminRoute = (req, res) => {
    return res.send("You're at Admin dashboard")
}

//isAdmin middleware method
const isAdmin = (req, res, next) => {
    console.log("isAdmin Method is running...");
    next();
}

//isLoggedIn middleware method
const isLoggedIn = (req, res, next) => {
    console.log("isLoggedIn Method is running...");
    next();
}

app.get('/', (req, res) => {
    return res.send("You're at Home");
})

app.get("/admin", isLoggedIn, isAdmin, adminRoute)

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