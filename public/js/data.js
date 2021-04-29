try {
	const api_url = `/stats`;
	fetch(api_url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			const colors = [
				'#f1e05a',
				'#e44b23',
				'#16ce40',
				'#563d7c',
				'#1f9aef',
				'#dc9658',
				'#E95FC6',
			];

			//Languages
			const names = data.languages.map(function (e) {
				return e.name;
			});

			const percent = data.languages.map(function (e) {
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
							backgroundColor: colors,
						},
					],
				},
				options: {
					legend: {
						position: 'left',
						labels: {
							boxWidth: 3,
						},
						fullWidth: true,
					},
				},
			});

			// Editors

			const color = ['#1f9aef', '#dc9658', '#E95FC6'];

			const ide = data.editors.map(function (e) {
				return e.name;
			});

			const rate = data.editors.map(function (e) {
				return e.percent;
			});

			let chartEditor = document
				.getElementById('chartEditors')
				.getContext('2d');

			let editor = new Chart(chartEditor, {
				type: 'horizontalBar',
				data: {
					labels: ide,
					datasets: [
						{
							data: rate,
							backgroundColor: color,
						},
					],
				},
				options: {
					legend: {
						display: false,
					},
				},
			});

			// OS

			const OS = data.operating_systems.map(function (e) {
				return e.name;
			});

			const OSrate = data.operating_systems.map(function (e) {
				return e.percent;
			});

			let operating_systems = new Chart(chartOS, {
				type: 'bar',
				data: {
					labels: OS,
					datasets: [
						{
							data: OSrate,
							backgroundColor: ['#16ce40', '#563d7c', '#E95FC6'],
						},
					],
				},
				options: {
					legend: {
						display: false,
					},
				},
			});

			// Pulse

			const total = data.total;
			const daily = data.daily;
			const mouse = data.mouse_clicks;
			const keyboard = data.keys_typed;

			let template = `
		<ul class="collection with-header">
			<li class="collection-header"><h4>Pulse</h4></li>
			<li class="collection-item"><i class="tiny material-icons">access_time</i> Hours coded(last week): ${total}</li>
			<li class="collection-item"><i class="tiny material-icons">av_timer</i> Daily coding time average: ${daily}</li>
			<li class="collection-item"><i class="tiny material-icons">keyboard</i> Keys Typed: ${keyboard}</li>
			<li class="collection-item"><i class="tiny material-icons">mouse</i> Mouse Clicks: ${mouse}</li>
		</ul>
	`;
			$('#pulse').html(template);
		});
} catch (error) {
	console.error(error);
}
