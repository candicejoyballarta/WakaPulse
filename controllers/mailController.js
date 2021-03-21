const nodemailer = require('nodemailer');
const express = require('express');
const fetch = require('node-fetch');

module.exports.sendStats = async (req, res) => {
	try {
        const user = req.user.userName;
		const email = req.body.email;

		console.log(email);
		const fetch_res = await fetch(
			`https://wakatime.com/api/v1/users/${user}/stats/last_7_days`
		);
		const json = await fetch_res.json();

		const pulse_res = await fetch(
			`http://api.whatpulse.org/user.php?user=${user}&format=json`
		).catch(function () {
			console.log('error');
		});
		const pulse_json = await pulse_res.json();

		const data = {
			daily: json.data.human_readable_daily_average,
			total: json.data.human_readable_total_including_other_language,
			mouse_clicks: pulse_json.Clicks,
			keys_typed: pulse_json.Keys,
		};

		const mail = `
        <h3>WakaPulse Stats</h3>
        <p>Hello, ${req.user.userName}</p>
        <h4>Here is your coding stats</h4>
        <ul>
            <li>Daily: ${data.daily}</li>
            <li>Total: ${data.total}</li>
            <li>Keys: ${data.keys_typed}</li>
            <li>Mouse Clicks: ${data.mouse_clicks}</li>
        </ul>
        `;

		// create reusable transporter object using the mailtrap.io SMTP transport
		let transport = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			auth: {
				type: 'OAuth2',
				user: 'candicejoy.ballarta@tup.edu.ph',
				clientId: process.env.GMAIL_CLIENTID,
				clientSecret: process.env.GMAIL_SECRET,
				refreshToken: process.env.GMAIL_REFRESH,
			},
		});

		// setup e-mail data with unicode symbols
		let mailOptions = {
			from: '"WakaPulse Stats Mailer" <WakaPulse@inbox.gmail.com>',
			to: email,
			subject: 'Your WakaPulse Statistics',
			text: 'Working!',
			html: mail,
		};

		// send mail with defined transport object
		await transport.sendMail(mailOptions, function (error, info) {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
		});
    } catch (err) {
        console.error(err);
    }

    
}

module.exports.viewMailStats = async (req, res) => {
	res.render('mails/share', {
		layout: 'mail'
	}) 
}

