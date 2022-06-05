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
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // console.log(age)

    // return age;
    if (age == 0) {
      const diffTime = Math.abs(today - birthDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      // console.log(diffDays + " days")
      if (diffDays == 1) {
        return (diffDays + ' day')
      } else {
        return (diffDays + " days")
      }
    }
    else if (age == 1) {
      return(age + ' year old')
    } else {
      return (age + ' years old')
    }
}

// console.log(getAge("2022-05-12"))

// FETCH FILTER

function fetch_filter() {
  // close advanced search
  showFilters = false;
  document.getElementById("FiltersBox").style.display = "none";

  // event.preventDefault();

  let barangay = document.getElementById('myInput').value;
  let date_positive = document.getElementById('date_positive').value;
  // let days = document.getElementById('days').value;
  let sex = document.getElementById('sex').value;
  let age_range = document.getElementById('age').value;
  let asymptomatic = document.getElementById('asymptomatic').value;
  let status = document.getElementById('status').value;

  var split = age_range.split(',')
  // var split_day = days.split(',')
  // console.log(split_day)
  // console.log(split[0])

  var inp_obj = {}

  if (status != "") {
    inp_obj = Object.assign({"status": status}, inp_obj)
  }  
  if (asymptomatic != "") {
    inp_obj = Object.assign({"asymptomatic": asymptomatic}, inp_obj)
  }

  if (age_range != "") {
    inp_obj = Object.assign({"upperAge": split[1]}, inp_obj)
  }  
  if (age_range != "") {
    inp_obj = Object.assign({"lowerAge": split[0]}, inp_obj)
  }

  if (sex != "") {
    inp_obj = Object.assign({"sex": sex}, inp_obj)
  }
  if (date_positive != "") {
    inp_obj = Object.assign({"date_positive": date_positive}, inp_obj)
  }

  // if (days != "") {
  //   inp_obj = Object.assign({"upperDay": split_day[1]}, inp_obj)
  // }  
  // if (days != "") {
  //   inp_obj = Object.assign({"lowerDay": split_day[0]}, inp_obj)
  // }

  if (barangay != "") {
    inp_obj = Object.assign({"barangay": capitalizeFirstLetter(barangay)}, inp_obj)
  }

  console.log(inp_obj)


  let query = Object.keys(inp_obj)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(inp_obj[k]))
             .join('&');

  // console.log(query)


  const filter_url = "/filter?" + query

  // console.log(filter_url)
  
  // total_results = ''

  fetch(filter_url)
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
        console.log(patient)


        total.push(patient.id)

        let tr = document.createElement('tr')
        let th_id = document.createElement('th')
        let th_date = document.createElement('th')
        // let th_day = document.createElement('th')
        let th_brgy = document.createElement('th')
        let th_sex = document.createElement('th')
        let th_age = document.createElement('th')
        let th_symptomatic = document.createElement('th')
        let th_status = document.createElement('th')
        let p = document.createElement('p')

        date_format = ''
        // day_quarantine = ''
        if (patient.date_positive == null) {
          date_format = "No Data"
          // day_quarantine = "No Data"
        } else {
          patient_date = convertDate(patient.date_positive)
          let date_split = patient_date.split(" ")
          date_format = date_split[1] + " " + date_split[0] + ", " + date_split[2]
          // day_quarantine = getAge(patient.date_positive)
        }

        // console.log(patient.date_positive)
        if (patient.asymptomatic == true) {
          asymptomatic = "Asymptomatic";
        }
        else {
          asymptomatic = "Symptomatic";
        }

        patients_id_skip = patient.id + 2499 // start patient 2500

        tr.id = "row";

        // day = ""
        // if (patient.status != "infected") {
        //   day = "N/A"
        // } else {
        //   day = day_quarantine;
        // }

        final_age = '';

        if (patient.age == null) {
          final_age = "No Data"
        } 
        else if (patient.age == 0) {
          if (patient.months == 0) {
            if (patient.days == 1) {
              final_age = patient.days + " day old"
            } 
            else {
              final_age = patient.days + " days old"
            }
          } 
          else if (patient.months == 1) {
            final_age = patient.months + " month old"
          } 
          else {
            final_age = patient.months + " months old"
          }
        } 
        else if (patient.age == 1) {
          final_age = patient.age + " year old"
        } 
        else {
          final_age = patient.age + " years old"
        }

        // console.log(final_age)

        brgy = ''

        if (patient.barangay == null || patient.barangay == "") {
          brgy = "No Data"
        } else {
          brgy = capitalizeFirstLetter(patient.barangay)
        }

        // console.log(brgy)
        sex = ''

        if (patient.sex == null) {
          sex = "No Data"
        } else {
          sex = capitalizeFirstLetter(patient.sex)
        }

        symp = ""

        if (patient.status == "no_update") {
          symp = "No Update"
        } else if (patient.status != "infected") {
          symp = "N/A";
        } else {
          symp = asymptomatic;
        }

        // console.log(patient.status)

        status = ''
        if (patient.status == "infected") {
          p.className = "infected status align-middle my-auto mx-auto"
          status = "Infected"
        } 
        else if (patient.status == "died") {
          p.className = "died status align-middle my-auto mx-auto"
          status = "Deceased"
          // console.log("died")
        } else if (patient.status == "no_update") {
          p.className = "no_update status align-middle my-auto mx-auto"
          status = "No Update"
        } else {
          // console.log("recovered")
          p.className = "recovered status align-middle my-auto mx-auto"
          status = "Recovered"
        }


        // if (patient.status == null) {
        //   status = "No Data"
        // } else if (patient.status == "no_update") {
        //   status = "No Update"
        // } else {
        //   status = capitalizeFirstLetter(patient.status)
        // }


        th_id.innerHTML = patients_id_skip;
        th_date.innerHTML = date_format;
        // th_day.innerHTML = day;
        th_brgy.innerHTML = brgy;
        th_sex.innerHTML = sex;
        th_age.innerHTML = final_age;
        th_symptomatic.innerHTML = symp;
        p.innerHTML = status;

        // th_symptomatic.innerHTML = asymptomatic;

        th_id.className = 'th border-left align-middle text-center justify-content-center';
        th_date.className = "th border-left align-middle text-center justify-content-center";
        th_day.className = "th border-left align-middle text-center justify-content-center";
        th_brgy.className = "th border-left align-middle text-center justify-content-center";
        th_sex.className = "th border-left align-middle text-center justify-content-center";
        th_age.className = "th border-left align-middle text-center justify-content-center";
        th_symptomatic.className = "th border-left align-middle text-center justify-content-center";
        th_status.className = 'th border-left align-middle text-center justify-content-center';

        tr.append(th_id);
        tr.append(th_date);
        // tr.append(th_day);
        tr.append(th_brgy);
        tr.append(th_sex);
        tr.append(th_age);
        tr.append(th_symptomatic);
        th_status.append(p)
        tr.append(th_status);

        results.append(tr)

      })
      let span = document.createElement('span');

      span.innerHTML = "Total: " + total.length;
      total_results.append(span);
      // // console.log(total.length)
    })
    .catch(error => console.log("ERROR"))
  
  // clear form
  // document.getElementById('myInput').value = ""
  // document.getElementById('date_positive').value = ""
  // document.getElementById('sex').value = ""
  // document.getElementById('age').value = ""
  // document.getElementById('asymptomatic').value = ""
  // document.getElementById('status').value = ""

  document.getElementById('myInput').value = 
    document.getElementById('date_positive').value =
    // document.getElementById('days').value = 
    document.getElementById('sex').value = 
    document.getElementById('age').value = 
    document.getElementById('asymptomatic').value = 
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