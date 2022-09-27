const planModel = require('../Models/planModel.js');


//its shows all plans details ----------------
module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            return res.json({
                message: 'all Plans retrived successfully',
                data: plans
            });
        }
        else {
            return res.json({
                message: 'No plains exist'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

//its shows own plan details only-------------
module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if (plan) {
            return res.json({
                message: 'Plan retrived successfully',
                data: plan
            });
        }
        else {
            return res.json({
                message: 'No plan exist'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

//its add plan to database--------------------
module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body;
        let createdplan = await planModel.create(planData);
        return res.json({
            message: 'plan Created successfully',
            data: createdplan
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

//its delete the plan form database-----------
module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedplan = await planModel.findByIdAndDelete(id);

        return res.json({
            message: 'Plan deleted successfully',
            data: deletedplan
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

//its update the plan in database--------------
module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let plantobeupdated = req.body;
        let keys = [];
        let plan = await planModel.findById(id);

        if (plan) {
            for (let key in plantobeupdated) {
                keys.push(key);
            }

            for (let i=0;i<keys.length;i++) {
                plan[keys[i]] = plantobeupdated[keys[i]];
            }
            await plan.save();
            res.json({
                message: 'Plan updated sucessfully',
                data: plan
            });
        }
        else {
            res.json({
                message: 'Plan not exist'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.top3Plans = async function top3Plans(req, res) {
    try {
        const plans = await planModel.find().sort({
            ratingsAverage:-1
        }).limit(3);
        return res.json({
            message: 'top 3 Plans',
            data: plans
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}