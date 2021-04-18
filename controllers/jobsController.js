const express = require('express');
const fetch = require('node-fetch');

module.exports.jobsView = (req, res) => {
    res.render('jobs/view')
}

module.exports.getJobs = async (req, res) => {
    const desc = req.body.description;
    const loc = req.body.location;

    const fetch_res = await fetch(
        `https://jobs.github.com/positions.json?description=${desc}&location=${loc}`
    );
    const json = await fetch_res.json();

    

    const data = {
        title: json.title,
        location: json.location,
        description: json.description
    }

    console.log(json);

    
}



