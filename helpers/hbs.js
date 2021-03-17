const moment = require('moment');

module.exports = {
	formatDate: function (date, format) {
		return moment(date).format(format);
	},

	formatDay: function (date, format) {
		return moment(date).calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'DD/MM/YYYY',
		});
	},

	editIcon: function (goalId, floating = true) {
		if (floating) {
			return `<a href="/goals/edit/${goalId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
		} else {
			return `<a href="/goals/edit/${goalId}"><i class="fas fa-edit fa-small"></i></a>`;
		}
	},
	select: function (selected, options) {
		return options
			.fn(this)
			.replace(
				new RegExp(' value="' + selected + '"'),
				'$& selected="selected"'
			)
			.replace(
				new RegExp('>' + selected + '</option>'),
				' selected="selected"$&'
			);
	},

	ifEquals: function (arg1, arg2, options) {
		return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
	},

	doneToday: function (date, options) {
		let today = new Date();
		let varDate = new Date(date);
		let date1 = varDate.getDate()
		let date2 = today.getDate()

		return (date2 > date1) ? options.fn(this) : options.inverse(this);
	}, 

	incVal: function (value) {
		return parseInt(value) + 1;
	}
};

