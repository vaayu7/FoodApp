const mongoose = require('mongoose');
const validator= require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');

let db_link= 'mongodb+srv://admin:sa9m1SD8BZzCPKd1@cluster0.8tsgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link).then(function(db){
   // console.log(db);
    console.log('DB Connected');
}).catch(function(err){
    console.log(err);
});
const userSchemas=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        validate:function(){
            return validator.validate(this.email);
        }
    },
    password:{
        type:String, 
        required:true,
        minLenght:8
    },
    confirmpassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmpassword==this.password;
        }       
    },
    role:{
        type:String,
        enum:['admin', 'user', 'restaurentowner'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/user/default.jpg'
    },
    resetToken:String
});
userSchemas.pre("save", function(){
    this.confirmpassword=undefined;
});
// userSchemas.pre('save', async function(){
//     let salt=await bcrypt.genSalt();
//     let hashestring=await bcrypt.hash(this.password, salt);
//     this.password=hashestring;
// });

userSchemas.methods.createResetToken=function(){
    const resettoken=crypto.randomBytes(32).toString('hex');
    this.resetToken=resettoken;
    return resettoken;
}

userSchemas.methods.resetpasswordhandler=function(password, confirmpassword){
    this.password=password;
    this.confirmpassword=confirmpassword;
    this.resetToken=undefined;
}
const userModel=mongoose.model('userModel', userSchemas);
module.exports=userModel; 