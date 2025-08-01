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
   try{
     const token = await User.matchPasswordAndGenrateToken(email, password);
    console.log("jwt token  :", token);
 
    return res.cookie("token",token).redirect("/")

   } catch(error){
    return res.render("signin",{
        error : "Incorrect Email or Password!"
    })
   }
})

module.exports = router;