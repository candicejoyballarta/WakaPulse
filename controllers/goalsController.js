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
        const name = req.user.userName;
		const user = name.toLowerCase();
        req.body.user = req.user._id

        const data = {
			id: req.body.id,
			name: req.body.name,
			unit: req.body.unit,
			type: req.body.type,
			color: req.body.color,
			selfSufficient: req.body.selfSufficient,
            isSecret: req.body.isSecret
		};

        const options = {
			method: 'POST',
			headers: {
				'X-USER-TOKEN': 'wakapulse',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		await fetch(`https://pixe.la/v1/users/${user}/graphs`, options)
			.then((res) => res.json())
			.then((json) => {
                console.log(json);
				Goal.create({
					user: req.body.user,
					title: req.body.name,
					goalType: req.body.goalType,
					unit: req.body.unit,
					graphId: req.body.id,
				});

                res.redirect('/goals');
			});

    } catch (err) {
        console.error(err);
        res.render('error/500')
    }

}

// Delete goal
module.exports.deleteGoal = async (req, res) => {
    try {
        await Goal.deleteOne({ _id: req.params.id });
        const name = req.user.userName;
		const user = name.toLowerCase();
        let gID = req.params.graphId;

        const options = {
			method: 'DELETE',
			headers: {
				'X-USER-TOKEN': 'wakapulse',
				'Content-Type': 'application/json',
			}
		};

        
        console.log(req.params.graphId);

        fetch(`https://pixe.la/v1/users/${user}/graphs/${gID}`, options)
			.then((res) => res.json())
			.then((json) => {

				
                res.redirect('/goals');
			});

        
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
			name: req.user.userName,
			goal,
		});
	}

}

module.exports.detailGoal = async (req, res) => {
	const api = process.env.SECRET_API;
	const user = req.user.userName;
	let goal = await Goal.findById(req.params.id).lean();

	let goal_date = goal.createdAt;
	let sdate = moment(goal_date).format('YYYY-MM-DD');
	let date = new Date();
	let ftoday = moment(date).format('YYYY-MM-DD');

	const fetch_res = await fetch(
		`https://wakatime.com/api/v1/users/${user}/summaries?start=${sdate}&end=${ftoday}&api_key=${api}`
	);
	const json = await fetch_res.json();

	if (!goal) {
		return res.render('error/404');
	}

	if (goal.user != req.user._id) {
		res.redirect('/goals');
	} else {
		res.json(json);
	}

};
