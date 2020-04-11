const express = require("express")
const router = express.Router()
const { signout } = require("../controllers/auth")

//Signout Route
router.get("/signout", signout)

module.exports = router;