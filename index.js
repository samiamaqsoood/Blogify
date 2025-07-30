const express = require("express")
const app = express()
const path = require("path")
const PORT = 8001;

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

app.use("/user", userRouter);

app.get("/",(req,res)=>{
    return res.render("home");
})
app.listen(PORT, ()=>{
    console.log(`Server is listening to port ${PORT}!`)
})