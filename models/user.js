const {Schema, model} = require("mongoose")
const {createTokenForUser} = require("../services/authentication")
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

userSchema.static("matchPasswordAndGenrateToken",async function(email, password){
    const user = await this.findOne({email});
    
    if(!user) throw new Error('User not found!');
    
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256",salt).update(password).digest("hex");

    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password!')
    
    const token = createTokenForUser(user);
    return token;
    
})

const User = model('user',userSchema)

module.exports = User;