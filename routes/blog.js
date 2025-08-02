const {Router} = require("express")
const router = Router();
const multer = require("multer");
const path = require("path")
const Blog = require("../models/blog");
const Comment = require("../models/comments");

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

router.get("/:id", async(req, res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
  console.log("blog",blog);
  console.log("comments", comments);
  return res.render("blog",{
    user : req.user,
    blog,
    comments,
  })
})
 router.post("/comments/:blogid", async(req,res)=>{
  const comment = await Comment.create({
    commentContent : req.body.commentContent,
    createdBy : req.user._id,
    blogId : req.params.blogid,

  })
  return res.redirect(`/blog/${req.params.blogid}`)
 })

module.exports = router;