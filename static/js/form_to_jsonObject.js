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

var statuss = document.querySelectorAll(".status");
var patient_status = ""

for (var i of statuss) {
	i.addEventListener("click", function(){
		if(this.checked == true) {
			patient_status = this.value
		} else {
			console.log('asdasd')
		}
	})
}

const addInfo = (ev) => {
	let infos = [];
	event.preventDefault(); //to stop the form submitting

	var userinput = document.getElementById("patient_birthday").value;  
    var dob = new Date(userinput);  
    
    //calculate month difference from current date in time  
    var month_diff = Date.now() - dob.getTime();  
      
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);   
      
    //extract year from date      
    var year = age_dt.getUTCFullYear();  
    
    //now calculate the age of the user  
    var age = year - 1970;  
    if (age < 0) {
    	console.log("you aint born yet!!!")
    }
    //display the calculated age 
    else {
    	// console.log(age)
    } 
    var input_name = document.getElementById('patient_name').value;
    var input_date_positive = document.getElementById('date_positive').value;
	var input_birthday = document.getElementById('patient_birthday').value;
	var input_sex = document.getElementById('patient_sex').value;
	var input_barangay = document.getElementById('patient_brgy').value;
	var input_contact_number = document.getElementById('patient_contact_number').value;
	var input_asymptomatic = document.getElementById('patient_asymptomatic').value;
	var input_symptoms = checkbox();
	var input_status = patient_status;

	if (input_name == null || input_name == "" || input_date_positive == null || input_date_positive == "" ||
		input_birthday == null || input_birthday == "" || input_sex == null ||  input_sex == "" || input_barangay == null ||
		input_barangay == "" || input_contact_number == null || input_contact_number == "" ||
		input_asymptomatic == null || input_asymptomatic == "" || input_symptoms == null || input_symptoms == "" ||
		input_status == null || input_status == "") {
		console.log('input something')
	} else {

		let info = {
			name: input_name,
			date_positive: input_date_positive,
			birthday: input_birthday,
			sex: input_sex,
			barangay: input_barangay,
			contact_number: input_contact_number,
			asymptomatic: input_asymptomatic,
			symptoms: input_symptoms,
			status: input_status
		}
		// let info = {
		// 	name: document.getElementById('patient_name').value,
		// 	date_positive: document.getElementById('date_positive').value,
		// 	birthday: document.getElementById('patient_birthday').value,
		// 	sex: document.getElementById('patient_sex').value,
		// 	barangay: document.getElementById('patient_brgy').value,
		// 	contact_number: document.getElementById('patient_contact_number').value,
		// 	asymptomatic: document.getElementById('patient_asymptomatic').value,
		// 	symptoms: checkbox(),
		// 	status: patient_status
		// }

		infos.push(info);
		document.forms[0].reset(); // to clear the form for the next entries
		//document.querySelector('form').reset();

		//for display purposes only
	    console.warn('added' , {infos} );
	    let pre = document.querySelector('#msg pre');
	    pre.textContent = '\n' + JSON.stringify(infos, '\t', 2);

	    patient_status = "";
	    // console.log(ageCalculator())

	    //saving to localStorage
	    // localStorage.setItem('MyMovieList', JSON.stringify(movies) );
	    // return infos
	}
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', addInfo);
    document.getElementById('btn').addEventListener('click', checkbox);
    // document.getElementById('btn').addEventListener('click', ageCalculator);
});