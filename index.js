const express = require("express")
const app = express()
const path = require("path")
const PORT = 8001;

const cookieParser = require("cookie-parser")
const {checkForAuthenticationCookie} = require("./middlewares/authentication");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>{
    console.log("MongoDB connectes successfully!");
})
.catch((error)=>{
    console.log("can't connect to MongoDB" ,error);
})
const userRouter = require("./routes/user");

app.use(express.urlencoded({extended:false}))
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));



app.use("/user", userRouter);

app.get("/",(req,res)=>{
    return res.render("home",{
        user : req.user,
    });
})
app.listen(PORT, ()=>{
    console.log(`Server is listening to port ${PORT}!`)
})