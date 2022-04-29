let symptom_url = 'http://127.0.0.1:8000/symptoms'

// for (int i = 0, j = 10; i < 10 && j > 0; i++, j--)
//     {
//         std::cout << "i = " << i << " :: " << "j = " << j << std::endl;
//     }
//     return 0;



function getSymptoms() {
	fetch(symptom_url)
	.then(response => {
		if (!response.ok) {
			throw Error('ERROR');
		}
		return response .json();
	})
	.then(data => {
		// console.log(data)
		parent_div = document.getElementById("parent_div");
		data.map(function(one_row) {
			// console.log(one_row)
			let dv = document.createElement("div");
			let inp = document.createElement("input");
			let lbl = document.createElement("label");

			dv.className = "form-check my-1";
			inp.type = "checkbox";
			inp.name = "symptoms";
			inp.id = "symptom_" + one_row.id;
			inp.className = "form-check-input form_data checkbox";
			inp.value = one_row.id;
			lbl.htmlFor = "symptom_" + one_row.id;
			lbl.id = "symptom";
			lbl.className = "form-check-label";
			lbl.innerHTML = one_row.description;

			dv.appendChild(inp);
			dv.appendChild(lbl);

			parent_div.appendChild(dv);

		});
	})
	.catch(error => {
		console.log(error)
	});
}

getSymptoms()


// on_submit()