const patients_url = "http://127.0.0.1:8000/patients"


function getPatients() {
	fetch(patients_url).then(response => {
    	if (!response.ok) {
      		throw Error("ERROR");
    	}
    	return response.json()
  	}).then(data => {
    	let results = document.getElementById("patients");

    	data.map(patient => {
			// console.log(patient.id)

			let tr = document.createElement('tr')
			let th_id = document.createElement('th')
			let th_date = document.createElement('th')
			let th_brgy = document.createElement('th')
			let th_sex = document.createElement('th')
			let th_age = document.createElement('th')
			let th_symptomatic = document.createElement('th')
			let th_status = document.createElement('th')


			th_id.innerHTML = patient.id;
			th_date.innerHTML = patient.date_positive;
			th_brgy.innerHTML = patient.barangay
			th_sex.innerHTML = patient.sex;
			th_age.innerHTML = patient.birthday;
			th_symptomatic.innerHTML = patient.asymptomatic
			th_status.innerHTML = patient.status;

			tr.append(th_id);
			tr.append(th_date);
			tr.append(th_brgy);
			tr.append(th_sex);
			tr.append(th_age);
			tr.append(th_symptomatic);
			tr.append(th_status);

			results.append(tr)
		});
	}).catch((error) => {
		throw Error("ERROR")
	});
}

getPatients()
