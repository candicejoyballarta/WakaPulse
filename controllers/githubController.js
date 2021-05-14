const { json } = require('express');
const express = require('express');
const fetch = require('node-fetch');

module.exports.jobsView = (req, res) => {
    res.render('github/view')
}

module.exports.githubView = async (req, res) => {
	const user = req.user.userName;

    const options = {
		method: 'GET',
		headers: {
			Accept: 'application/vnd.github.inertia-preview+json',
		},
	};

	const fetch_res = await fetch(
		`https://api.github.com/users/${user}/repos`,
		options
	)
		.then((res) => res.json())
		.then((json) => {
			res.render('github/view', {
				name: req.user.userName,
                json
			});
		});
};

module.exports.getOrgs = async (req, res) => {
	const orgs_res = await fetch(`https://api.github.com/orgs/TUPfightON`);

	const orgs_json = await orgs_res.json();

	const data = {
		login: json.login,
	};
};

module.exports.getRepos = async (req, res) => {
	const repos_res = await fetch(
		`https://api.github.com/repos/TUPfightON/iBayanihan`
	);

	const repos_json = await repos_res.json();

	const data = {
		name: json.name,
		full_name: json.full_name,
		created_at: json.created_at,
		updated_at: json.updated_at,
		language: json.language,
	};

	console.log(json);
};