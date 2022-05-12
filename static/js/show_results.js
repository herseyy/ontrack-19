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


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


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

      age = getAge(patient.birthday)

      if (patient.asymptomatic == true) {
        asymptomatic = "Asymptomatic";
      }
      else {
        asymptomatic = "Symptomatic";
      }

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
    });
  }).catch((error) => {
    throw Error("ERROR")
  });
}

getPatients()

