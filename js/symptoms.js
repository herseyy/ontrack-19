const symptom_url = 'http://127.0.0.1:8000/symptoms'

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
		// console.log(data);
		const html = data.map(symptom => {
			return `${symptom.description}<br>`
		});

		for (let i = 0; i < html.length; i++) {
			var modulo = html.length
			console.log(
				)

			if (i < modulo / 3) {
				$('#property').append('\
				<div class="form-check my-1">\
					<input \
						type="checkbox" \
						name="symptoms" \
						id="symptom_' + i +'" \
						class="form-check-input form_data checkbox"\
						>\
					<label id="symptom" for="symptom_' + i +'" class="form-check-label"></label>\
				</div>')
			} else if (i > modulo / 3 && i < 2*modulo/3) {
				$('#property1').append('\
				<div class="form-check my-1">\
					<input \
						type="checkbox" \
						name="symptoms" \
						id="symptom_' + i +'" \
						class="form-check-input form_data checkbox"\
						>\
					<label id="symptom" for="symptom_' + i +'" class="form-check-label"></label>\
				</div>')
			} else {
				$('#property2').append('\
				<div class="form-check my-1">\
					<input \
						type="checkbox" \
						name="symptoms" \
						id="symptom_' + i +'" \
						class="form-check-input form_data checkbox"\
						>\
					<label id="symptom" for="symptom_' + i +'" class="form-check-label"></label>\
				</div>')
			}

  			var input = document.querySelectorAll('input[name="symptoms"]')[i]
  			input.value = i
  			console.log(input.value)

  			var label = document.querySelectorAll("#symptom")[i]
  			label.innerHTML = `${html[i]}`
		}
	})
	.catch(error => {
		console.log(error)
	});
}

getSymptoms()



