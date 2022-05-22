const mongoose = require("mongoose")
const validator =require("validator")
const User = mongoose.model("Uesr",{
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))throw new Error("invalid email")
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(value.includes('password'))throw new Error("week pass")
        }
    },
    gender:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        enum:['male','female']
    },
    age:{
        type:Number,
        min:21,
        max:60
    },
    status:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
})
module.exports = User 