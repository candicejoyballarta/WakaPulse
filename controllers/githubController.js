const { json } = require('express');
const express = require('express');
const fetch = require('node-fetch');

module.exports.jobsView = (req, res) => {
    res.render('github/view')
}

mobile.exports.getGitHub = async (req, res) => {
    const user = req.user.userName;

    const fetch_res = await fetch(
        `https://api.github.com/users/${user}`
    );

    const json = await fetch_res.json;

    console.log(fetch_res);

}

mobile.exports.getOrgs = async (req, res) => {
    const orgs_res = await fetch(
        `https://api.github.com/orgs/TUPfightON`
    );

    const orgs_json = await orgs_res.json();

    const data = {
        login: json.login
    }
}

mobile.exports.getRepos = async (req, res) => {
    const repos_res = await fetch(
        `https://api.github.com/repos/TUPfightON/iBayanihan`
    );

    const repos_json = await repos_res.json();

    const data = {
        name: json.name,
        full_name: json.full_name,
        created_at: json.created_at,
        updated_at: json.updated_at,
        language: json.language
    }

    console.log(json);


}