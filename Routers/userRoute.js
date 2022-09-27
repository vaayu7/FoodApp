const express = require('express');
const { use } = require('express/lib/router');
const userRoute=express.Router();
const {getUser, getAllUser, updateUser, deleteUser}=require('../Controllers/userController.js');
const { append } = require('express/lib/response');
const {signup, login, isAuthorised, protectRoute, resetpassword, forgetpassword, logout}=require('../Controllers/authController.js');
const app= express();

// users ke opetion h ye sb--------------------
userRoute
.route('/:id')
.patch(updateUser)
.delete(deleteUser);

//route for signup user-------------------------
userRoute
.route('/signup')
.post(signup);


//route for login user------------------------------
userRoute
.route('/login')
.post(login);

userRoute
.route('/logout')
.get(logout);

//route to forget password-----------------------------
userRoute
.route('/forgetpassword')
.post(forgetpassword);

//route to reset password-----------------------------
userRoute
.route('/resetpassword/:token')
.post(resetpassword);

//profile page--------------------------------------
userRoute.use(protectRoute);
userRoute
.route('/userProfile')
.get(getUser)


//admin specifc only--------------------------------
userRoute.use(isAuthorised(['admin']));
userRoute
.route('/')
.get(getAllUser)



// userRoute
// .route('/')
// .get(protectRoute, getUsers)
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser);

module.exports=userRoute;