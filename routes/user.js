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
router.post("/signin",async (req,res)=>{
    const {email, password} = req.body;
    console.log(email,password);
    const user = await User.matchPassword(email, password);
    console.log("user :", user);
 
    return res.redirect("/")
})

module.exports = router;