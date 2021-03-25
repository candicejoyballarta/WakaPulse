let date = new Date();
let ftoday = moment(date).format('YYYY-MM-DD');
let url = document.URL.split('/');

let goal_id = url[url.length - 1];
let date1;

console.log(goal_id);

let url_goal = `/goals/detail/${goal_id}`;

fetch(url_goal)
	.then((result) => result.json())
	.then((data) => {
		let start = data.createdAt;
		date1 = moment(start).format('YYYY-MM-DD');
        console.log(data);

		// Duration
		const lblDates = data.data.map(function (e) {
			return e.range.date
		})

		const lblDuration = data.data.map(function (e) {
			return e.grand_total.text;
		});

		const time = data.data.map(function (e) {
			return e.grand_total.total_seconds;
		});

		let color = []
		let randomColors = function () {
			var r = Math.floor(Math.random() * 255);
			var g = Math.floor(Math.random() * 255);
			var b = Math.floor(Math.random() * 255);
			return 'rgb(' + r + ',' + g + ',' + b + ')';
		};

		for (let i = 0; i < lblDuration.length; i++) {
			color.push(randomColors())
		}

		let chartLang = document
			.getElementById('chartSummary')
			.getContext('2d');

		let summary = new Chart(chartLang, {
			type: 'bar',
			data: {
				labels: lblDates,
				datasets: [
					{
						label: 'Coding Time (seconds)',
						data: time,
						backgroundColor: color,
					},
				],
			},
			options: {
				legend: {
					position: 'top',
					labels: {
						boxWidth: 3,
					},
					fullWidth: true,
				},
			},
		});

        console.log(time);

	})
	.catch((err) => {
		console.error(err);
	});

