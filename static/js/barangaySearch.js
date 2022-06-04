// BIRTHDAY TO AGE
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function convertDate(date_str) {
  temp_date = date_str.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
}


// ------------- TODAY 
n =  new Date();
y = n.getFullYear();
m = String(n.getMonth() + 1).padStart(2, '0');
d = String(n.getDate()).padStart(2, '0');
date_today = y + "-" + m + "-" + d;
today_date = convertDate(date_today);

// console.log(today_date);
let today_split = today_date.split(" ")
today_format = today_split[1] + " " + today_split[0] + ", " + today_split[2]




// CAPITALIZE FIRST LETTER
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


"use strict";


// BARANGAY SEARCH
let autocomplete = (inp, arr) => {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    let a, //OUTER html: variable for listed content with html-content
      b, // INNER html: filled with array-Data and html
      i, //Counter
      val = this.value;

    /*close any already open lists of autocompleted values*/
    closeAllLists();

    if (!val) {
      return false;
    }

    currentFocus = -1;

    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    var parent_div = document.getElementById('brgylist') 

    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items list-group text-left");
    
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);

    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.setAttribute("class","list-group-item list-group-item-action");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  
  let addActive = (x) => {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("active");
  }
  
  let removeActive = (x) => {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("active");
    }
  }
  
  let closeAllLists = (elmnt) => {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
  
};

/*An array containing all the country names in the world:*/
let barangayList = [
  "Alitao",
  "Alsam Ibaba",
  "Alsam Ilaya",
  "Alupay",
  "Angeles Zone 1",
  "Angeles Zone 2",
  "Angeles Zone 3",
  "Angeles Zone 4",
  "Angustias Zone 1",
  "Angustias Zone 2",
  "Angustias Zone 3",
  "Angustias Zone 4",
  "Anos",
  "Ayaas",
  "Baguio",
  "Banilad",
  "Bukal Ibaba",
  "Bukal Ilaya",
  "Calantas",
  "Calumpang",
  "Camaysa",
  "Dapdap",
  "Domoit Kanluran",
  "Domoit Silangan",
  "Gibanga",
  "Ibas",
  "Ilasan Ibaba",
  "Ilasan Ilaya",
  "Ipilan",
  "Isabang",
  "Katigan Kanluran",
  "Katigan Silangan",
  "Lakawan",
  "Lalo",
  "Lawigue",
  "Lita",
  "Malaoa",
  "Masin",
  "Mate",
  "Mateuna",
  "Mayowe",
  "Nangka Ibaba",
  "Nangka Ilaya",
  "Opias",
  "Palale Ibaba",
  "Palale Ilaya",
  "Palale Kanluran",
  "Palale Silangan",
  "Pandakaki",
  "Pook",
  "Potol",
  "San Diego Zone 1",
  "San Diego Zone 2",
  "San Diego Zone 3",
  "San Diego Zone 4",
  "San Isidro Zone 1",
  "San Isidro Zone 2",
  "San Isidro Zone 3",
  "San Isidro Zone 4",
  "San Roque Zone 1",
  "San Roque Zone 2",
  "Talolong",
  "Tamlong",
  "Tongko",
  "Valencia",
  "Wakas"
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), barangayList);
/**
 * CREATES OUTPUT LIKE THIS:
 *
 * <div id="myInputautocomplete-list" class="autocomplete-items">
 *    <div>
 *       <strong>A</strong>fghanistan<input value="Afghanistan" type="hidden">
 *    </div>
 *    <div><strong>A</strong>lbania<input value="Albania" type="hidden"></div>
 *    <div><strong>A</strong>zerbaijan<input value="Azerbaijan" type="hidden"></div>
 *    ...
 *    ...
 *    ...
 * </div>
 */


// SYMPTOMATIC ASYMPTOMATIC
function showDiv(patient_asymptomatic, option)
{
    document.getElementById(patient_asymptomatic).style.display = option.value == "symptomatic" ? 'block' : 'none';
}


// FETCH POST
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
  // let input_birthday = document.getElementById('patient_birthday').value;
  let input_age = document.getElementById('age').value;
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


  // if (name == "") {
  //   var name_error = document.getElementById('name_error');
  //   name_error.innerHTML = "Enter Your Name";
  //   return false;
  // }
  
  var inp_obj = {
    "name" : name,
    "date_positive" : input_date_positive,
    "age": input_age,
    // "birthday" : input_birthday,
    "sex" : input_sex,
    "barangay" : input_barangay,
    "contact_number" : input_contact_number,
    "asymptomatic" : bool_asymptomatic,
    "symptoms" : input_symptoms,
    "status" : input_status
  }

  // console.log(inp_obj)
  const submit_form_url = "/submit_form"

  fetch(submit_form_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inp_obj)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Success:', data);
      let patient_symptoms = [];
      for (var i of data.symptoms) {
        console.log(i.description)
        patient_symptoms.push(" " + i.description)
      };


      if (data.asymptomatic == true) {
        // console.log(true)
        var bool_asymptomatic = "Asymptomatic"
      } else {
        var bool_asymptomatic = "Symptomatic"
        // console.log(false)
      }

      let patient_info = document.getElementById("inner_div");

      let popup_id = document.createElement("h2");
      let popup_date = document.createElement("p");
      // let popup_birthday = document.createElement("p");
      let popup_age = document.createElement("p");
      let popup_sex = document.createElement("p");
      let popup_brgy = document.createElement("p");
      let popup_contact = document.createElement("p");
      let popup_asymptomatic = document.createElement("p");
      let popup_symptoms = document.createElement("p");
      let popup_status = document.createElement("p");

      popup_id.innerHTML = "Patient's ID: " + data.id;
      popup_date.innerHTML = "Date Positive: " + data.date_positive;
      // popup_age.innerHTML = "Age: " + data.birthday + " (Age: " + getAge(data.birthday) + ")";
      popup_age.innerHTML = "Age: " + data.age + " years old";
      popup_sex.innerHTML = "Sex: " + capitalizeFirstLetter(data.sex);
      popup_brgy.innerHTML = "Barangay: " + data.barangay;
      popup_contact.innerHTML = "Contact Number: " + data.contact_number;
      popup_asymptomatic.innerHTML = "Patient is " + bool_asymptomatic;
      popup_symptoms.innerHTML = "Symptoms: " + patient_symptoms;
      popup_status.innerHTML = "Status: " + capitalizeFirstLetter(data.status);

      patient_info.append(popup_id);
      patient_info.append(popup_date);
      // patient_info.append(popup_birthday);
      patient_info.append(popup_age);
      patient_info.append(popup_sex);
      patient_info.append(popup_brgy);
      patient_info.append(popup_contact);
      patient_info.append(popup_asymptomatic);
      patient_info.append(popup_symptoms);
      patient_info.append(popup_status);

    }).catch((error) => {
      console.error('Error:', error);
    });


}

// POPUP
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
    location.href = "/form";
  });
}

$(document).ready(function () {
  $("[data-js=open]").on("click", function() {

    let name = document.getElementById('patient_name').value;
    let input_date_positive = document.getElementById('date_positive').value;
    // let input_birthday = document.getElementById('patient_birthday').value;
    let input_age = document.getElementById('age').value;
    let input_sex = document.getElementById('patient_sex').value;
    let input_barangay = document.getElementById('myInput').value;
    let input_contact_number = document.getElementById('patient_contact_number').value;
    let input_asymptomatic = document.getElementById('patient_asymptomatic').value;
    let input_symptoms = checkbox();
    let input_status = document.getElementById('patient_status').value;

    var name_error = document.getElementById('name_error');
    var date_error = document.getElementById('date_error');
    // var bday_error = document.getElementById('bday_error');
    var age_error = document.getElementById('age_error');
    var sex_error = document.getElementById('sex_error');
    var brgy_error = document.getElementById('brgy_error');
    var number_error = document.getElementById('number_error');
    var symptomatic_error = document.getElementById('symptomatic_error');
    var empty_list = []
    var symptoms_error = document.getElementById('symptoms_error');
    var status_error = document.getElementById('status_error');


    if (name == "") {
      name_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      name_error.innerHTML = "";
    }

    // console.log(date_today)
    // console.log(input_date_positive)


    if (input_date_positive == "") {
      date_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else if (input_date_positive > date_today) {
      date_error.innerHTML = "You cannot enter a date in the future.";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      date_error.innerHTML = "";
    }

    // if (input_birthday == "") {
    //   bday_error.innerHTML = "This field cannot be empty";
    //   document.getElementById('app').scrollIntoView({
    //     behavior: 'smooth'
    //   });
    //   return false;
    // } else if (input_birthday > date_today) {
    //   bday_error.innerHTML = "You cannot enter a date in the future.";
    //   document.getElementById('app').scrollIntoView({
    //     behavior: 'smooth'
    //   });
    //   return false;
    // }
    // else {
    //   bday_error.innerHTML = "";
    // }

    if (input_age == "") {
      age_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      sex_error.innerHTML = "";
    }


    if (input_sex == "") {
      sex_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      sex_error.innerHTML = "";
    }

    if (input_barangay == "") {
      brgy_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      brgy_error.innerHTML = "";
    }

    if (input_contact_number == "") {
      number_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      number_error.innerHTML = "";
    }

    if (input_asymptomatic == "") {
      symptomatic_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      symptomatic_error.innerHTML = "";
    }

    if (input_asymptomatic == "symptomatic") {
      if (input_symptoms.length == 0) {
        symptoms_error.innerHTML = "This field cannot be empty";
        document.getElementById('app').scrollIntoView({
          behavior: 'smooth'
        });
        return false;
      } else {
      symptoms_error.innerHTML = "";
      }
    }

    if (input_status == "") {
      status_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      status_error.innerHTML = "";
    }





    $('.wrapper').blur();
    containerElement.setAttribute('class', 'wrapper blur');
    popupOpenClose($(".popup"));
    checkbox();
    fetch_post();
  });
});

document.getElementById("btn").onclick = function () {
    location.href = "/results";
};