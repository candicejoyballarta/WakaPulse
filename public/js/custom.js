const { json } = require('express');

$(document).ready(function () {
    $.ajax({
		type: 'GET',
		url:
			'https://wakatime.com/share/@dxnger_/2ba286ba-bc04-420a-abd0-d717a7007160.json',
		dataType: 'jsonp',
		success: function (response) {

            var names = response.data.map(function (e) {
				return e.name;
			});

            var color = response.data.map(function (e) {
				return e.color;
			});

			var percent = response.data.map(function (e) {
				return e.percent;
			});

			let chartLang = document.getElementById('myChart').getContext('2d');

			let langu = new Chart(chartLang, {
				type: 'doughnut',
				data: {
					labels: names,
					datasets: [
						{
							data: percent,
							backgroundColor: color,
						},
					],
				},
				options: {
					legend: {
                        position: 'left',
                        labels: {
                            boxWidth: 3,

                        },
                        fullWidth: true
                    }
				},
			});

		},
	});

    $.ajax({
		type: 'GET',
		url:
			'https://wakatime.com/share/@dxnger_/e0880349-33d8-4683-981b-1ca28c40e0e0.json',
		dataType: 'jsonp',
		success: function (response) {
            const totalTime = []
			const dateLabel = []

			var date = response.data.map(function (e) {
				return e.range.date;
			});

			var totalSeconds = response.data.map(function (e) {
				return e.grand_total.total_seconds;
			});

            for (let i = 0; i < totalSeconds.length; i++) {
                const element = totalSeconds[i];
                const hours = moment.utc(element * 1000).format('HH:mm:ss');
                totalTime.push(hours)
            }

			

            console.log(totalTime);

			var day = response.data.map(function (e) {
				return e.range.text;
			});

			let chartTime = document.getElementById('chartTime').getContext('2d');

			let time = new Chart(chartTime, {
				type: 'line',
				data: {
					labels: day,
					datasets: [
						{
							label: 'Coding Activity for 7 days',
							data: totalSeconds,
							borderColor: 'rgba(220,20,20,1)',
							backgroundColor: 'rgba(220,20,20,0.5)',
						},
					],
				},
				options: {
					scales: {
						x: {
							type: 'timeseries',
						},
					},
				},
			});
		},
	});

	$.ajax({
		url: 'http://api.whatpulse.org/user.php?user='. $username,
		dataType: 'jsonp',
		success: function (response) {
			
		}
	});
})