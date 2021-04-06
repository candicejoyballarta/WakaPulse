const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo').default
const moment = require('moment');
const nodemailer = require('nodemailer');
const connectDB = require('./config/db');

// Load config
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

//Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Method Override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		let method = req.body._method;
		delete req.body._method;
		return method;
	}
}))

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebar Helpers
const { formatDate, editIcon, select, formatDay, ifEquals, doneToday, incVal } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs({ helpers: { formatDate, editIcon, select, formatDay, ifEquals, doneToday, incVal }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
const mongoStore = MongoStore.create({
	mongoUrl: process.env.MONGO_URI,
	collectionName: 'sessions',
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore
}))


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder
app.use(express.static(path.join(__dirname, 'public'))); 

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/goals', require('./routes/goals'))
app.use('/jobs', require('./routes/jobs'))



const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))