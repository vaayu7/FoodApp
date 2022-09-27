const express = require('express');
const reviewRoute=express.Router();
const {protectRoute}=require('../Controllers/authController.js');
const {getAllReviews, getPlanReviews, top3reviews, createReview, updateReview, deleteReview}=require('../Controllers/reviewController.js');

reviewRoute
.route('/all')
.get(getAllReviews);


reviewRoute
.route('/top3')
.get(top3reviews);


reviewRoute
.route('/:id')
.get(getPlanReviews);


reviewRoute.use(protectRoute);
reviewRoute
.route('/crud/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview);


module.exports=reviewRoute;