const JWT_KEY=require('../secretkeys.js');
const jwt=require('jsonwebtoken');
const { is } = require('express/lib/request');

module.exports=protectRoute;