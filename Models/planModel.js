const mongoose = require('mongoose');
//const number = require('mongoose/lib/cast/number');
let db_link= 'mongodb+srv://admin:sa9m1SD8BZzCPKd1@cluster0.8tsgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link).then(function(db){
   // console.log(db);
    console.log('Plans DB Connected');
}).catch(function(err){
    console.log(err);
});

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20, 'plan name should not be greter than 20 characters']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true, 'please enter price']
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100;
        }, 'discount should not exceed price']
    }
});

const planModel=mongoose.model('planModel', planSchema);

// (async function creatPlan(){
//     let plan={
//         name:'SuperPlan',
//         duration:30,
//         price:1000,
//         ratingsAverage:5,
//         discount:20
//     }
//     let doc=new planModel(plan);
//     await doc.save();
// })();
module.exports=planModel;