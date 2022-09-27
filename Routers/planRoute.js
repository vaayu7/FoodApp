const express=require('express');
const planRoute=express.Router();
const {protectRoute, isAuthorised}=require('../Controllers/authController.js');
const {getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3Plans } = require('../Controllers/planController.js');


//all plans leke ayga
planRoute
.route('/allPlans')
.get(getAllPlans);

planRoute
.route('/top')
.get(top3Plans);

//own plan leke ayga ye...--> loged in necessary
planRoute.use(protectRoute);
planRoute
.route('/:id')
.get(getPlan);


//if user loged in and roles are admin or restaurent owner then only perform these operation
planRoute.use(isAuthorised(['admin', 'restaurantowner']));
planRoute
.route('/crud')
.post(createPlan);


planRoute.route('/crud/:id')
.patch(updatePlan)
.delete(deletePlan);



module.exports=planRoute;
