const mongoose = require('mongoose');
let db_link= 'mongodb+srv://admin:sa9m1SD8BZzCPKd1@cluster0.8tsgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link).then(function(db){
   // console.log(db);
    console.log('Review DB Connected');
}).catch(function(err){
    console.log(err);
});

const reviewSchema=new mongoose.Schema({
    Reviews:{
        type:String,
        required:[true, 'Review is required'],
    },
    rating:{
        type:Number,
        required:[true, 'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true, 'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true, 'review must belong to a plan']
    }
});

//find, findbyid, findone
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select:'name profileImage'
    }).populate("plan");
    next();
});

const reviewModel=mongoose.model('reviewModel', reviewSchema);

module.exports=reviewModel;