const Goal = require('../models/Goal');
const express = require('express');
const moment = require('moment');
const fetch = require('node-fetch');

// List all Goals
module.exports.indexGoal = async (req, res) => {

    try {
        const goals = await Goal.find({ user: req.user._id }).lean()
        res.render('goals/view', {
            layout: 'goals',
            name: req.user.userName,
            goals
        })
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}

// Create View Goal
module.exports.createGoal = async (req, res) => {
    try {
        res.render('goals/add', {
		});
    } catch (err) {
        console.error(error);
		res.render('error/404');
    }
}


//Create Goal
module.exports.addGoal = async (req, res) => {

    try {

        req.body.user = req.user._id

        let days = {
			one: 'none',
			two: 'none',
			three: 'none',
			four: 'none',
			five: 'none',
			six: 'none',
			seven: 'none',
		};

        await Goal.create({
            user: req.body.user,
            title: req.body.title,
            goalType: req.body.goalType,
            frequency: req.body.frequency,
            days: days,
            
        })

        res.redirect('/goals')

    } catch (err) {
        console.error(err);
        res.render('error/500')
    }

}

// Delete goal
module.exports.deleteGoal = async (req, res) => {
    try {
        await Goal.remove({ _id: req.params.id })
        res.redirect('/goals')
    } catch (err) {
        console.error(err);
        return res.render('error/500')
    }
}

// Edit goal
module.exports.editGoal = async (req, res) => {
    const goal = await Goal.findOne({
        _id: req.params.id
    }).lean()

    if (!goal) {
        return res.render('error/404')
    }

    if (goal.user != req.user._id) {
        res.redirect('/goals')
    } else {
        res.render('goals/edit', {
            goal
        })
    }
}

//Update
module.exports.updateGoal = async (req, res) => {
    let goal = await Goal.findById(req.params.id).lean()

    if (!goal) {
		return res.render('error/404');
	}

	if (goal.user != req.user._id) {
		res.redirect('/goals');
	} else {
		goal = await Goal.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        })

        res.redirect('/goals')
	}
}

module.exports.detailGoalView = async (req, res) => {
    let goal = await Goal.findById(req.params.id).lean()

    if (!goal) {
        return res.render('error/404');
    }

    if (goal.user != req.user._id) {
		res.redirect('/goals');
	} else {
		res.render('goals/details', {
            layout: 'details',
			goal,
		});
	}

}

module.exports.detailGoal = async (req, res) => {
    const user = req.user.userName;
	let goal = await Goal.findById(req.params.id).lean();

    let goal_date = goal.createdAt
    let sdate = moment(goal_date).format('YYYY-MM-DD')
    let date = new Date();
	let ftoday = moment(date).format('YYYY-MM-DD');

    fetch(
		`https://wakatime.com/api/v1/users/${user}/summaries?start=${sdate}&end=${ftoday}`
	)
		.then((result) => result.json())
		.then((data) => {
			console.log(data);
		}).catch((err) => {
            console.log(err);
        });

	if (!goal) {
		return res.render('error/404');
	}

	if (goal.user != req.user._id) {
		res.redirect('/goals');
	} else {
		res.json(goal)
	}
};
