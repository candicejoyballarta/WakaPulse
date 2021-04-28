const express = require('express');
const fetch = require('node-fetch');

module.exports.indexPixela = async (req, res) => {
    const user = req.user.userName;

    res.render('pixela/view', {
        layout: 'pixela',
		user: user
    })
}

module.exports.createPixelaUser = async (req, res) => {

    try {
        const user = req.user.userName;

		const data = {
			token: 'wakapulse',
			username: user.toLowerCase(),
			agreeTermsOfService: 'yes',
			notMinor: 'yes',
			thanksCode: 'ThisIsThanksCode',
		};

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		};

		const pixUser = await fetch('https://pixe.la/v1/users', options)
			.then((res) => res.json())
			.then((json) => {
                
                console.log(json);
				res.render('pixela/view', {
					layout: 'pixela',
					json,
					user: user,
				});
            }
			);

		
	} catch (err) {
        console.error(err);
        res.render('error/500');
    }
}

module.exports.createGraphView = async (req, res) => {
	const user = req.user.userName;

	res.render('pixela/create', {
		layout: 'pixela',
		user: user,
	})
}

module.exports.createGraph = async (req, res) => {
    try {
		const name = req.user.userName;
		const user = name.toLowerCase();
		const data = req.body

		console.log(data);

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
				res.render('pixela/view', {
					layout: 'pixela',
					user: user,
					json,
				});
			});

		
	} catch (err) {
		console.error(error);
		res.render('error/500');
	}
}

module.exports.getGraph = async (req, res) => {
	try {
		const name = req.user.userName;
		const user = name.toLowerCase();

		const options = {
			method: 'GET',
			headers: {
				'X-USER-TOKEN': 'wakapulse',
				'Content-Type': 'application/json',
			}
		};

		await fetch(`https://pixe.la/v1/users/${user}/graphs`, options)
			.then((res) => res.json())
			.then((pix) => {

				const json = {
					user,
					pix
				}

				console.log(json);
				res.json(json)
			});


	} catch (err) {
		console.log(err);
	}
}

module.exports.getGraphSVG = async (req, res) => {
	try {
		const name = req.user.userName;
		const user = name.toLowerCase();
		const graphID = req.body.id;

		await fetch(
			`https://pixe.la/v1/users/${user}/graphs/${graphID}.html?mode=line`,
			options
		).then((result) => {
			console.log(result);
			res.render('pixela/view', {
				layout: 'pixela',
				user: user,
				result,
			});
		});

	} catch (err) {
		console.log(err);
	}
}

module.exports.createPixel = async (req, res) => {
	try {
		const name = req.user.userName;
		const user = name.toLowerCase();
		const gID = req.body.graphID;
		const data = {
			date: req.body.date,
			quantity: req.body.quantity
		}

		console.log(data);

		const options = {
			method: 'POST',
			headers: {
				'X-USER-TOKEN': 'wakapulse',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		};

		await fetch(`https://pixe.la/v1/users/${user}/graphs/${gID}`, options)
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				res.render('pixela/view', {
					layout: 'pixela',
					user: user,
					json,
				});
			});
	} catch (err) {
		console.error(error);
		res.render('error/500');
	}
}