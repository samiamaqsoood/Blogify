const {Router} = require("express")
const router = Router();
const multer = require("multer");
const path = require("path")
const Blog = require("../models/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

router.post("/",upload.single('coverImage'), async (req,res)=>{
    console.log(req.body);
    console.log(req.file);

    const {title, content} = req.body;

    const blog = await Blog.create({
        title,
        content,
        coverImageURL : `/uploads/${req.file.filename}`,
        createdBy : req.user._id,

    })

    return res.redirect("/");
})
router.get("/add-new", (req,res)=>[
    res.render("addBlog", {
        user : req.user,
    })
])
module.exports = router;