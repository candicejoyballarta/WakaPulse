const Strategy = require('passport-oauth2')
const mongoose = require('mongoose');
const User = require('../models/User');
const https = require('https');
const { InternalOAuthError } = require('passport-oauth2');

module.exports = function(passport) {

    Strategy.prototype.userProfile = function (accessToken, done) {
        this._oauth2.get(`https://wakatime.com/api/v1/users/current`, accessToken, function (err, body, res) {
            if (err) {
				return done(
					new InternalOAuthError('Failed to fetch user profile', err)
				);
			}

            try {
                let json = JSON.parse(body);
                let profile = {
                    "provider": "wakatime",
                    "id": json.data.id,
                    "userName": json.data.username,
                    "displayName": json.data.display_name,
                    "location": json.data.location,
                    "photo": json.data.photo,
                    "createdAt": json.data.created_at
                }

                done(null, profile);
            } catch (e) {
                done(e)
            }
        })
    }

    passport.use(
		new Strategy({
			authorizationURL: 'https://wakatime.com/oauth/authorize',
            tokenURL: 'https://wakatime.com/oauth/token',
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/auth/wakatime/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                wakatimeId: profile.id,
                userName: profile.userName,
                displayName: profile.displayName,
                location: profile.location,
                photo: profile.photo,
                createdAt: profile.createdAt
            }

            try {
                let user = await User.findOne({ wakatimeId: profile.id })

                if(user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch(err){
                console.error(err);
            }
		}
	));

    passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});
}