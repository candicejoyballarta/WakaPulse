try {
    const api_url = `/pixela/graph`;
    fetch(api_url)
        .then((response) => response.json())
		.then((data) => {
            console.log(data.pix.graphs);
            data.pix.graphs.forEach((element) => {
				const template = `<div class="col s6 m5">
                <div class="card-panel red">
                    <span class="white-text">
                        ID: ${element.id}<br>
                        Name: ${element.name}<br>
                        Unit: ${element.unit}<br>
                    </span>
                    <a href="https://pixe.la/v1/users/candicejoyballarta/graphs/${element.id}.html?mode=simple" target="_blank" class="waves-effect waves-light btn">Details</a>
                </div>
            </div>`;

				$('#graphs').append(template);
			});
        })

} catch (error) {
	console.error(error);
}
