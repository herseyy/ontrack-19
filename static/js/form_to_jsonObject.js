function checkbox() {
	var checkboxes = document.getElementsByName("symptoms");
	// console.log(checkboxes)
	let checked_symptoms = [];
	for (var checkbox of checkboxes) {
		if (checkbox.checked) {
			checked_symptoms.push(checkbox.value);
			checked_symptoms.sort();
			// console.log(checked_symptoms)
		}
	}
	return checked_symptoms
}


function fetch_post() {

	// event.preventDefault();

	let name = document.getElementById('patient_name').value;
	let input_date_positive = document.getElementById('date_positive').value;
	let input_birthday = document.getElementById('patient_birthday').value;
	let input_sex = document.getElementById('patient_sex').value;
	let input_barangay = document.getElementById('myInput').value;
	let input_contact_number = document.getElementById('patient_contact_number').value;
	let input_asymptomatic = document.getElementById('patient_asymptomatic').value;
	let input_symptoms = checkbox();
	let input_status = document.getElementById('patient_status').value;;

	if (input_asymptomatic == "asymptomatic") {
		// console.log(true)
		var bool_asymptomatic = true
	} else {
		var bool_asymptomatic = false
		// console.log(false)
	}

	var inp_obj = {
		"name" : name,
		"date_positive" : input_date_positive,
		"birthday" : input_birthday,
		"sex" : input_sex,
		"barangay" : input_barangay,
		"contact_number" : input_contact_number,
		"asymptomatic" : bool_asymptomatic,
		"symptoms" : input_symptoms,
		"status" : input_status
	}

	// console.log(inp_obj)

	fetch('http://127.0.0.1:8000/submit_form', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(inp_obj)
	})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(error => console.log("ERROR"))

}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', fetch_post);
    document.getElementById('btn').addEventListener('click', checkbox);
    // document.getElementById('btn').addEventListener('click', ageCalculator);
});