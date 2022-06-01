// $(function() {
//   $('.pop-up').hide();
//   $('.pop-up').fadeIn(1000);
  
//       $('.close-button').click(function (e) { 

//       $('.pop-up').fadeOut(700);
//       $('#overlay').removeClass('blur-in');
//       $('#overlay').addClass('blur-out');
//       e.stopPropagation();
        
//     });
//  });



// const symptom_url = "http://127.0.0.1:8000/symptoms"
const symptom_url = "https://ontrac-19.herokuapp.com/symptoms"

function getSymptoms() {
	fetch(symptom_url).then(response => {
		if (!response.ok) {
			throw Error("ERROR");
		}
		return response .json()
	}).then(data => {
		parent_div = document.getElementById("parent_div");

		data.map(symptom => {
			let child_div = document.createElement("div");
			let grandchild_inp = document.createElement("input");
			let grandchild_lbl = document.createElement("label");

			child_div.className = "checkbox_element form-check my-1";
			grandchild_inp.className = "form-check-input form-data checkbox";
			grandchild_inp.type = "checkbox";
			grandchild_inp.id = "checkbox_" + symptom.id;
			grandchild_inp.name = "symptoms";
			grandchild_inp.value = symptom.id;

			grandchild_lbl.id = "symptom";
			grandchild_lbl.htmlFor = "checkbox_" + symptom.id;
			grandchild_lbl.className = "form-check-label";
			grandchild_lbl.innerHTML = symptom.description;

			child_div.append(grandchild_inp);
			child_div.append(grandchild_lbl);

			parent_div.append(child_div);
			

		});
	}).catch((error) => {
		throw Error("ERROR")
	});

}

getSymptoms()
