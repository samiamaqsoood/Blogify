const {Schema, model} = require("mongoose")
const {createHmac,randomBytes} = require('crypto')
const userSchema = new Schema({
    fullname: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    salt:{
       type: String,
    },
    password:{
        type: String,
        require: true,
    },
    profileImageURL: {
  type: String,
       default: "/images/pngegg.png",
    },
    role:{
        type : String,
        enum : ["USER","ADMIN"],
        default :"USER",
    }
},
{timestamps:true})

userSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

const User = model('user',userSchema)

module.exports = User;