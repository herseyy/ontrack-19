var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function convertDate(date_str) {
  temp_date = date_str.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
}


// CAPITALIZE FIRST LETTER
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// SHOW FILTER
let showFilters = false;
if (showFilters) {
  document.getElementById("FiltersBox").style.display = "grid";
} else {
  document.getElementById("FiltersBox").style.display = "none";
}

function toggleFilters() {
  showFilters = !showFilters;

  if (showFilters) {
    document.getElementById("FiltersBox").style.display = "grid";
  } else {
    document.getElementById("FiltersBox").style.display = "none";
  }
}


// BIRTHDAY TO AGE
function getDays(dateString) {
    var today = new Date();
    var positive_date = new Date(dateString);
    var age = today.getFullYear() - positive_date.getFullYear();
    var m = today.getMonth() - positive_date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < positive_date.getDate())) {
        age--;
    }

    if (age == 0) {
      const diffTime = Math.abs(today - positive_date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays == 1) {
        // console.log(diffDays + " day")
        return (diffDays + " day")
      } else {
        // console.log(diffDays + " days")
        return (diffDays + " days")
      }
    }

    return age
}

// getAge("2022-05-30")


// FETCH FILTER

function fetch_filter() {
  // close advanced search
  showFilters = false;
  document.getElementById("FiltersBox").style.display = "none";


  // event.preventDefault();

  let barangay = document.getElementById('myInput').value;
  let date_positive = document.getElementById('date_positive').value;
  let days = document.getElementById('days').value;
  let status = document.getElementById('status').value;


  var split_day = days.split(',')
  // console.log(split_day)

  var inp_obj = {}

  if (status != "") {
    inp_obj = Object.assign({"status": status}, inp_obj)
  }  
  if (days != "") {
    inp_obj = Object.assign({"upperDay": split_day[1]}, inp_obj)
  }  
  if (days != "") {
    inp_obj = Object.assign({"lowerDay": split_day[0]}, inp_obj)
  }
  if (date_positive != "") {
    inp_obj = Object.assign({"date_positive": date_positive}, inp_obj)
  }
  if (barangay != "") {
    inp_obj = Object.assign({"barangay": capitalizeFirstLetter(barangay)}, inp_obj)
  }

  // console.log(inp_obj)


  let query = Object.keys(inp_obj)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(inp_obj[k]))
             .join('&');

  // console.log(query)


  const results_update_url = "/filter_update?" + query

  console.log(results_update_url)
  
  // // total_results = ''

  fetch(results_update_url)
    .then(res => {
      return res.json()
    })
    .then(data => {
      let results = document.getElementById("patients");
      let total_results = document.getElementById("total_results");

      results.innerHTML = '';
      let total = [];
      total_results.innerHTML = '';

      data.map(patient => {

        // console.log(getAge(patient.date_positive))


        total.push(patient.id)

        let tr = document.createElement('tr')
        let th_id = document.createElement('th')
        let th_date = document.createElement('th')
        let th_days = document.createElement('th')
        let th_brgy = document.createElement('th')
        let th_number = document.createElement('th')
        let th_status = document.createElement('th')
        let status_btn = document.createElement('button')
        tr.id = "row";

        patients_id_skip = patient.id + 2499 // start patient 2500
        // console.log(status_btn)

        date_format = ''
        day_quarantine = ''
        if (patient.date_positive == null) {
          date_format = "No Data"
          day_quarantine = "No Data"
        } else {
          patient_date = convertDate(patient.date_positive)
          let date_split = patient_date.split(" ")
          date_format = date_split[1] + " " + date_split[0] + ", " + date_split[2]
          day_quarantine = getDays(patient.date_positive)
        }

        days = ""
        if (patient.status != "infected") {
          days = "N/A"
        } else {
          days = day_quarantine;
        }


        // th_days.innerHTML = day_quarantine;
        brgy = ''

        if (patient.barangay == null || patient.barangay == "") {
          brgy = "No Data"
        } else {
          brgy = capitalizeFirstLetter(patient.barangay)
        }


        if (patient.status == "infected") {
          status_btn.innerHTML = capitalizeFirstLetter(patient.status);
          status_btn.className = "infected status align-middle my-auto mx-auto"
        } else if (patient.status == "died") {
          status_btn.innerHTML = ("Deceased");
          status_btn.className = "died status align-middle my-auto mx-auto"
        } else if (patient.status == "no_update") {
          status_btn.innerHTML = "No Update";
          status_btn.className = "no_update status align-middle my-auto mx-auto"
        } else {
          status_btn.innerHTML = capitalizeFirstLetter(patient.status);
          status_btn.className = "recovered status align-middle my-auto mx-auto"
        }

        status_btn.id = patient.id;
        status_btn.setAttribute('onclick','onClick('+  patient.id  +');');

        numberr = ""
        if (patient.contact_number == null) {
          numberr = "No Data"
        } else {
          numberr = patient.contact_number
        }

        th_id.innerHTML = patients_id_skip;
        th_date.innerHTML = date_format;
        th_days.innerHTML = days;
        th_brgy.innerHTML = brgy;
        th_number.innerHTML = numberr;


        th_id.className = 'th border-left align-middle text-center justify-content-center';
        th_date.className = "th border-left align-middle text-center justify-content-center";
        th_days.className = "th border-left align-middle text-center justify-content-center";
        th_brgy.className = "th border-left align-middle text-center justify-content-center";
        th_number.className = "th border-left align-middle text-center justify-content-center";
        th_status.className = 'th border-left align-middle text-center justify-content-center';
        // th_contacted.className = 'asd align-middle text-center justify-content-center';


        // tr.append(th_id);
        // tr.append(th_brgy);
        // tr.append(th_date);
        // tr.append(th_days);
        // tr.append(th_number);

        // console.log(status_btn.innerHTML)


        tr.append(th_id);
        tr.append(th_date);
        tr.append(th_days);
        tr.append(th_brgy);
        tr.append(th_number);
        th_status.append(status_btn)
        tr.append(th_status);


        // th_status.append(status_btn)
        // tr.append(th_status);
        // tr.append(th_contacted);

        results.append(tr)


      })
      let span = document.createElement('span');

      span.innerHTML = "Total: " + total.length;
      total_results.append(span);
      // // console.log(total.length)
    })
    .catch(error => console.log("ERROR"))
  
  // clear form

  document.getElementById('myInput').value = 
    document.getElementById('date_positive').value = 
    document.getElementById('days').value = 
    document.getElementById('status').value = ""
}

fetch_filter()


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
  "No Data",
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

 // const btn = document.getElementById('1');
let index = 0;

const colors = ['#4CAF50', '#f44336', "#008CBA", "#6c757d"];

function onClick(id) {
  clicked_btn = document.getElementById(id)
  clicked_btn.style.backgroundColor = colors[index];
  clicked_btn.style.color = 'white';
  index = index >= colors.length - 1 ? 0 : index + 1;
  let status = ''

// Recovered
  if (clicked_btn.style.backgroundColor == "rgb(76, 175, 80)") {
    clicked_btn.innerHTML = 'Recovered';
    status = "recovered";
    // console.log('green-light');
  } 
// Active 
  else if (clicked_btn.style.backgroundColor == "rgb(244, 67, 54)") {
    clicked_btn.innerHTML = 'Infected';
    // console.log('red-light');
    status = "infected";
  } else if (clicked_btn.style.backgroundColor == "rgb(108, 117, 125)") {
    clicked_btn.innerHTML = 'No Update';
    status = "no_update";
  } else {
      clicked_btn.innerHTML = 'Deceased';
      // console.log('blue-light');
      status = "died";
  }

  // console.log(status)

  let query = id;

  // console.log(query)
  const results_update_url = "/update/" + query
  console.log(results_update_url)

  let user_id = id;

  var inp_obj = {
    "status" : status
  }

  fetch(results_update_url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(inp_obj)
  })
  .then(res => res.json())
  .then(data => {
    // console.log(data)
  })
  .catch(error => console.log("ERROR")) 

}