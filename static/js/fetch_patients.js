const patients_url = "http://127.0.0.1:8000/patients"


function getPatients() {
	fetch(patients_url).then(response => {
    	if (!response.ok) {
      		throw Error("ERROR");
    	}
    	return response .json()
  	}).then(data => {
    	results = document.getElementById("patient");

    	data.map(patient => {
			// console.log(patient.id)

			let dv1 = document.createElement("div");
			let dv2 = document.createElement("div");

			let dv3 = document.createElement("div");
			let h5 = document.createElement("h5");
			let dv4 = document.createElement("div");
			let p1 = document.createElement("p");
			let p2 = document.createElement("p");
			let p3 = document.createElement("p");
			let p4 = document.createElement("p");
			let p5 = document.createElement("p");
			let p6 = document.createElement("p");



			dv1.className = "col-12 col-lg-4 patient-container";
			dv2.className = "patient py-4";
			dv3.className = "result-user";
			h5.className = "patient_id text-center";
			h5.innerHTML = "Patient " + patient.id;
			dv4.className = "result-text";
			p1.innerHTML = "Date Positive: " + patient.date_positive;
			p2.innerHTML = "Age: " + patient.birthday;
			p3.innerHTML = "Sex: " + patient.sex;
			p4.innerHTML = "Barangay: " + patient.barangay
			p5.innerHTML = patient.asymptomatic;
			p6.innerHTML = "Health Status: " + patient.status;


			dv4.append(p1);
			dv4.append(p2);
			dv4.append(p3);
			dv4.append(p4);
			dv4.append(p5);
			dv4.append(p6);

			dv3.append(h5);

			dv2.append(dv3);
			dv2.append(dv4);

			dv1.append(dv2);

			results.append(dv1);
			// results.append(dv2);

			console.log(results);
		});
	}).catch((error) => {
		throw Error("ERROR")
	});
}

getPatients()