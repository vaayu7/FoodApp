
const express = require('express');
const userModel = require('../Models/userModel');
const cookieparser = require('cookie-parser');
const {sendMail}=require('../utility/nodeMailer.js');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secretkeys.js');
const app = express();
app.use(cookieparser());
//user sign up logic--------------------------------
module.exports.signup = async function signup(req, res) {
    try {
        let dataob = req.body;
        let user = await userModel.create(dataob);
        sendMail('signup', user);
        // console.log('backend', obj);
        if (user) {
            return res.json({
                message: "user signup successfully",
                data: user
            });
        } else {
            return res.json({
                message: 'Error while signing up'
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
}

//user login logic--------------------------------------
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY)
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'user Logged In',
                        userDetails: data
                    });

                } else {
                    return res.json({
                        message: 'password incorrect'
                    });
                }

            } else {
                return res.json({
                    message: 'User not Found please enter vaid emailID'
                });
            }
        } else {
            return res.json({
                message: 'enter EMail ID & password'
            });
        }
    }
    catch (err) {
        return res.json({
            message: err.message
        });
    }
}

//isAuthorised-->  to check user's role [user, admin, restaurentowner,,,]
module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            console.log("Callingnext function");
            next();
        } else {
            res.status(401).json({
                message: 'Operation not allowed'
            });
        }
    };
}

//Protectroute--> To check to user login or not usng cookie or JWT
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        // console.log(req.cookies.login);
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                console.log('payload', payload);
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                // console.log(req.id);
                next();
            }

            else {
                res.json({
                    message: 'user not verified please Login Again'
                });
            }
        }
        else {
            const client = req.get('User-Agent');
            if (client.includes('MoZilla') == true) {
                return res.redirect('/login');
            }
            res.json({
                message: 'User Not LogdIn'
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
}

//forgetpassword--> to generate reset link ans send over mail to reset password.
module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            const resetToken = user.createResetToken();
            //http://abc.com/resetpassword/resetToken
            let resetpasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            let obj={
                resetpasswordLink:resetpasswordLink,
                email:email
            }
            sendMail('resetpassword',obj);
            //send mail--
            //using nodemailer.

        }
        else {
            return res.json({
                message: 'please signup'
            });
        }

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// resetpassword--> to set passworrd in db after reset
module.exports.resetpassword = async function resetpassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmpassword } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            //resetpasswordhandler will save user password in db
            user.resetpasswordhandler(password, confirmpassword);
            await user.save();
            res.json({
                message: 'password has been reset please login again'
            });
        }
        else {
            res.json({
                message: 'user not found'
            });
        }

    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
}

module.exports.logout = function logout(req, res) {
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        message: 'user loged out suzuussfully'
    });
}

