const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();


router.post("/register", async function (req, res) {
    try {
        const newitem = new UserModel(req.body);
        await newitem.save();
        res.send("User added successfully");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async function (req, res) {
    try {
        //Find one on the basis of the email and passowrd
        const result = await UserModel.findOne({ email: req.body.email, password: req.body.password });
        //password is deleted from the result as we dont need to send the password in the result.
        delete result.password
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router