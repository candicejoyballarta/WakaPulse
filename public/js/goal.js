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
	})
	.catch((err) => {
		console.error(err);
	});

