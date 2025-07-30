const {Router} = require("express");
const router = Router();
const User = require("../models/user")

router.get("/signin", (req,res)=>{
    res.render("signin")
})

router.get("/signup", (req,res)=>{
    res.render("signup");
})

router.post("/signup",async (req,res)=>{
    const {fullname, email, password} = req.body;
    await User.create({
        fullname,
        email,
        password,
    })

    return res.redirect("/")
})
module.exports = router;