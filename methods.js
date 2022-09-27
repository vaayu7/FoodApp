const express = require('express');
const app = express();
const cookieparser=require('cookie-parser');
//const { use } = require('express/lib/application');
//const { sendfile } = require('express/lib/response');
app.use(express.json());
app.listen(3000);
const userRoute=require('./Routers/userRoute.js');
const planRoute=require('./Routers/planRoute.js');
const reviewRoute=require('./Routers/reviewRoute.js');
const { template } = require('lodash');
//const planModel=require('./Models/planModel.js');
//const authRoute=require('./Routers/authRoute.js');
app.use(cookieparser());

app.use("/user",userRoute);
app.use("/plan",planRoute);
app.use("/review", reviewRoute);


//app.use("/auth", authRoute);  