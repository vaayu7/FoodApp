const express = require('express');
const cookieparser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const userModel = require('../Models/userModel.js');

module.exports.getUser = async function getUsers(req, res) {
    //  console.log(req.body);
    let id = req.id;
    //console.log(id);
    let user = await userModel.findById(id);
    if (user) {
        return res.json(user);
    } else {
        res.send({
            message: "User Not Found"
        });
    }

}

//update user list.
module.exports.updateUser = async function updateUser(req, res) {
    // console.log('req.data-> ', req.body);
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let datatobeupdate = req.body;
        if (user) {
            const keys = [];
            for (let key in datatobeupdate) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = datatobeupdate[keys[i]];
            }
            //console.log(user);
            let updatedUser = await user.save();
            res.json({
                message: 'data updated successfuly',
                data: user
            });
        }
        else {
            res.json({
                message: 'User Not Found'
                // data:user
            });
        }

    }
    catch (err) {
        res.json({
            message:"update errroe Occures",
            message: err.message
        });
    }
}

//delete user 
module.exports.deleteUser = async function deleteUser(req, res) {
    //users={};
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: "user not found"
            });
        }
        res.json({
            message: "Data deleted successfully",
            data: user
        });
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
}

module.exports.getAllUser = async function getAllUser(req, res) {
    let users = await userModel.find();
    if (users) {
        res.json({
            message: 'User Recieved',
            data: users
        });
    }
    else {
        res.json({
            message: 'user not found'
        });
    }
}



 // post user in list.
//   module.exports.postUser=function postUser(req, res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message: "Data recieved succesfully",
//         users:req.body
//     });
// }