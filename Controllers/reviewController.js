const planModel = require("../Models/planModel");
const reviewModel = require("../Models/reviewModel");

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            return res.json({
                message: "Reviews has been retrieved",
                data: reviews
            });
        }
        else {
            return res.json({
                message: "reviews no found"
            });
        }

    }
    catch (err) {
        res.json({
            message: err.message
        });
    }

}

module.exports.top3reviews = async function top3reviews(req, res) {
    try {
        const reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        if (reviews) {
            return res.json({
                message: "Top 3 Reviews has been retrieved",
                data: reviews
            });
        }
        else {
            return res.json({
                message: "reviews no found"
            });
        }

    }
    catch (err) {
        res.json({
            message: err.message
        });
    }

}

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        let pid = req.params.id;
        let reviews = await reviewModel.find();
        reviews = reviews.filter(review => review.plan._id == pid);
        if (reviews) {
            return res.json({
                message: "Review has been retrieved",
                data: reviews
            });
        }
        else {
            return res.json({
                message: "review not found"
            });
        }

    }
    catch (err) {
        res.json({
            message: err.message
        });
    }

}

module.exports.createReview = async function createReview(req, res) {
    try {
        let id = req.params.plan;
        let plan = await planModel.findById(id);
        let review = await reviewModel.create(req.body);
        plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;
        await plan.save();
        res.json({
            message: "review created sucessfully",
            data: review
        });
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
}

module.exports.updateReview = async function updateReview(req, res) {
    try {
        let planid = req.params.plan;
        let id = req.body.id;
        let reviewtobeupdated = req.body;
        let keys = [];
        let review = await reviewModel.findById(id);

        if (review) {
            for (let key in reviewtobeupdated) {
                if (key == id) continue;
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                review[keys[i]] = reviewtobeupdated[keys[i]];
            }
            await review.save();
            res.json({
                message: 'Review updated sucessfully',
                data: review
            });
        }
        else {
            res.json({
                message: 'review not exist'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let planid = req.params.id;
        let id=req.body.id;
        let deletedreview = await reviewModel.findByIdAndDelete(id);

        return res.json({
            message: 'Review deleted successfully',
            data: deletedreview
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}