
let symptoms_list = [];

var checkboxes = document.querySelectorAll(".checkbox");
console.log(checkboxes)
for(var checkbox of checkboxes) {
	checkbox.addEventListener("click", function(){
		if(this.checked == true) {
			symptoms_list.push(this.value);
			symptoms_list.sort();
		} else {
			console.log('you unchecked the checkbox')
		}
	})
}


var statuss = document.querySelectorAll(".status");
var patient_status = ""
// console.log(checkboxes)
for(var i of statuss) {
	i.addEventListener("click", function(){
		if(this.checked == true) {
			patient_status = this.value
		} else {
			console.log('you unchecked the radio')
		}
	})
}

let infos = [];
// example {id:1592304983049, title: 'Deadpool', year: 2015}
const addInfo = (ev)=>{
	ev.preventDefault();  //to stop the form submitting
	let info = {
		patient_id: document.getElementById('patient_id').value,
		patient_date: document.getElementById('patient_date').value,
		patient_birthday: document.getElementById('patient_birthday').value,
		patient_sex: document.getElementById('patient_sex').value,
		patient_brgy: document.getElementById('patient_brgy').value,
		patient_contact_number: document.getElementById('patient_contact_number').value,
		patient_asymptomatic: document.getElementById('patient_asymptomatic').value,
		patient_symptoms: symptoms_list,
		patient_status: patient_status
	}
	infos.push(info);
	document.forms[0].reset(); // to clear the form for the next entries
	//document.querySelector('form').reset();

	symptoms_list = []; // to clear the list

	//for display purposes only
	console.warn('added' , {infos} );
	let pre = document.querySelector('#msg pre');
	pre.textContent = '\n' + JSON.stringify(infos, '\t', 2);

	// //saving to localStorage
	// localStorage.setItem('MyMovieList', JSON.stringify(infos) );
}
document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('btn').addEventListener('click', addInfo);
});
