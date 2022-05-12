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
	let input_status = document.getElementById('patient_status').value;

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
		.then(data => {
			console.log('Success:', data);
			// console.log(data.id)

			// if()

			let patient_info = document.getElementById("inner_div");

			let popup_id = document.createElement("h2");
			// let popup_name = document.createElement("p");
			let popup_date = document.createElement("p");
			let popup_birthday = document.createElement("p");
			let popup_sex = document.createElement("p");
			let popup_brgy = document.createElement("p");
			let popup_contact = document.createElement("p");
			let popup_asymptomatic = document.createElement("p");
			let popup_symptoms = document.createElement("p");
			let popup_status = document.createElement("p");

			popup_id.innerHTML = "Patient's ID: " + data.id;
			// popup_name.innerHTML = "Patient Name: " + data.name;
			popup_date.innerHTML = "Date Positive: " + data.date_positive;
			popup_birthday.innerHTML = "Birthday: " + data.birthday;
			popup_sex.innerHTML = "Sex: " + data.sex;
			popup_brgy.innerHTML = "Barangay: " + data.barangay;
			popup_contact.innerHTML = "Contact Number: " + data.contact_number;
			popup_asymptomatic.innerHTML = "Patient is " + data.asymptomatic;
			popup_id.symptoms = "Symptoms: " + data.symptoms;
			popup_id.status = "Status: " + data.status;

			patient_info.append(popup_id);
			patient_info.append(popup_date);
			patient_info.append(popup_birthday);
			patient_info.append(popup_sex);
			patient_info.append(popup_brgy);
			patient_info.append(popup_contact);
			patient_info.append(popup_asymptomatic);
			patient_info.append(popup_id.symptoms);
			patient_info.append(popup_id.status);

		}).catch((error) => {
			console.error('Error:', error);
		});
}


var containerElement = document.getElementById('app');
function popupOpenClose(popup) {
	
	/* Open popup */
	$(popup).show();

	/* Close popup and remove errors if user clicks on cancel or close buttons */
	$(popup).find("button[name=close]").on("click", function() {
		if ($(".formElementError").is(':visible')) {
			$(".formElementError").remove();
		}
		containerElement.setAttribute('class', 'wrapper');
		$(popup).hide();
		location.href = "http://127.0.0.1:8000/form";
	});
}

$(document).ready(function () {
	$("[data-js=open]").on("click", function() {
		$('.wrapper').blur();
		containerElement.setAttribute('class', 'wrapper blur');
		popupOpenClose($(".popup"));
		checkbox();
		fetch_post();
	});
});

document.getElementById("btn").onclick = function () {
    location.href = "http://127.0.0.1:8000/results";
};