

// CAPITALIZE FIRST LETTER
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// FETCH FILTER

function fetch_filter() {

  // event.preventDefault();

  let already_contacted = document.getElementById('already_contacted').value;


  // console.log(split[0])

  var inp_obj = {}

  if (already_contacted != "") {
      inp_obj = Object.assign({"contacted": already_contacted}, inp_obj)
  }
  // console.log(inp_obj)


  let query = Object.keys(inp_obj)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(inp_obj[k]))
             .join('&');

  // console.log(query)


  const user_url = "http://127.0.0.1:8000/user_numbers?" + query

  console.log(user_url)
  
  // total_results = ''

  fetch(user_url)
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

        total.push(patient.id)

        let tr = document.createElement('tr')
        let th_id = document.createElement('th')
        let th_date = document.createElement('th')
        let th_contact_number = document.createElement('th')
        let th_contacted = document.createElement('th')
        let contacted_btn = document.createElement('button')

        tr.id = "row";
        th_id.innerHTML = patient.id;
        th_date.innerHTML = patient.created_at;
        th_contact_number.innerHTML = patient.subscriber_number;
        contacted_btn.innerHTML = patient.already_contacted;
        contacted_btn.className = "asd";

        tr.append(th_id);
        tr.append(th_date);
        tr.append(th_contact_number);
        th_contacted.append(contacted_btn);
        tr.append(th_contacted);

        results.append(tr)

      })
      let span = document.createElement('span');

      span.innerHTML = "Total: " + total.length;
      total_results.append(span);
      // // console.log(total.length)
    })
    .catch(error => console.log("ERROR"))


  document.getElementById('already_contacted').value = ""
}

fetch_filter()
