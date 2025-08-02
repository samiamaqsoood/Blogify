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
const blogRouter = require("./routes/blog");

const Blog = require("./models/blog");


app.use(express.urlencoded({extended:false}))
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))); //tells express to serve public as static but not as route



app.use("/user", userRouter);
app.use("/blog", blogRouter);


app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render("home", {
        user : req.user,
        blogs : allBlogs,

    });
})
app.listen(PORT, ()=>{
    console.log(`Server is listening to port ${PORT}!`)
})