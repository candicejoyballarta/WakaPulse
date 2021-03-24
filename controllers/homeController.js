const express = require('express');
const fetch = require('node-fetch');
const Goal = require('../models/Goal');
const moment = require('moment');

module.exports.loginPage = (req, res) => {
    res.render('login', {
		layout: 'login',
	});
}

module.exports.mainDashboard = async (req, res) => {
    try {
		const user = req.user.userName;

		res.render('dashboard', {
			name: user,
            layout: 'dashboard'
		});
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
}

module.exports.getStats = async (req, res) => {
    // User variable
    const user = req.user.userName;

    // Fetching data from WakaTime
	const fetch_res = await fetch(
		`https://wakatime.com/api/v1/users/${user}/stats/last_7_days`
	);
	const json = await fetch_res.json();

    // Fetching data from WhatPulse
	const pulse_res = await fetch(
		`http://api.whatpulse.org/user.php?user=${user}&format=json`
	).catch(function () {
		console.log('error on whatPulse');
	});
	const pulse_json = await pulse_res.json();

	const data = {
		languages: json.data.languages,
		operating_systems: json.data.operating_systems,
		editors: json.data.editors,
		daily: json.data.human_readable_daily_average,
		total: json.data.human_readable_total_including_other_language,
		mouse_clicks: pulse_json.Clicks,
		keys_typed: pulse_json.Keys,
	};

	//console.log(json);
	res.json(data);
}

module.exports.detailGoal = async (req, res) => {
	const user = req.user.userName;
	let goal = await Goal.findById(req.params.id).lean();

	let goal_date = goal.createdAt;
	let sdate = moment(goal_date).format('YYYY-MM-DD');
	let date = new Date();
	let ftoday = moment(date).format('YYYY-MM-DD');

	const summary = await fetch(
		`https://wakatime.com/api/v1/users/${user}/durations?date=${ftoday}`
	);

	const sum_json = await summary.json();
	console.log(sum_json);

	if (!goal) {
		return res.render('error/404');
	}

	if (goal.user != req.user._id) {
		res.redirect('/goals');
	} else {
		res.json(summary);

	}
};