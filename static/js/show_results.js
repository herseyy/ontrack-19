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
    return age;
}

// FETCH FILTER

function fetch_filter() {
  // close advanced search
  showFilters = false;
  document.getElementById("FiltersBox").style.display = "none";


  // event.preventDefault();

  let barangay = document.getElementById('myInput').value;
  let date_positive = document.getElementById('date_positive').value;
  let sex = document.getElementById('sex').value;
  let age_range = document.getElementById('age').value;
  let asymptomatic = document.getElementById('asymptomatic').value;
  let status = document.getElementById('status').value;

  var split = age_range.split(',')
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
  if (barangay != "") {
    inp_obj = Object.assign({"barangay": capitalizeFirstLetter(barangay)}, inp_obj)
  }

  // console.log(inp_obj)


  let query = Object.keys(inp_obj)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(inp_obj[k]))
             .join('&');

  // console.log(query)


  const filter_url = "http://127.0.0.1:8000/filter?" + query

  console.log(filter_url)
  
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

        

        age = getAge(patient.birthday)

        if (patient.asymptomatic == true) {
          asymptomatic = "Asymptomatic";
        }
        else {
          asymptomatic = "Symptomatic";
        }

        total.push(patient.id)

        let tr = document.createElement('tr')
        let th_id = document.createElement('th')
        let th_date = document.createElement('th')
        let th_brgy = document.createElement('th')
        let th_sex = document.createElement('th')
        let th_age = document.createElement('th')
        let th_symptomatic = document.createElement('th')
        let th_status = document.createElement('th')

        tr.id = "row";
        th_id.innerHTML = patient.id;
        th_date.innerHTML = patient.date_positive;
        th_brgy.innerHTML = capitalizeFirstLetter(patient.barangay);
        th_sex.innerHTML = capitalizeFirstLetter(patient.sex);
        th_age.innerHTML = age;
        th_symptomatic.innerHTML = asymptomatic;
        th_status.innerHTML = capitalizeFirstLetter(patient.status);

        tr.append(th_id);
        tr.append(th_date);
        tr.append(th_brgy);
        tr.append(th_sex);
        tr.append(th_age);
        tr.append(th_symptomatic);
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
    document.getElementById('sex').value = 
    document.getElementById('age').value = 
    document.getElementById('asymptomatic').value = 
    document.getElementById('status').value = ""
}

fetch_filter()
