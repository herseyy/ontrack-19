var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function convertDate(date_str) {
  temp_date = date_str.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
}

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


  // const user_url = "http://127.0.0.1:8000/user_numbers?" + query
  const user_url = "https://ontrac-19.herokuapp.com/user_numbers?" + query

  console.log(user_url)
  
  // total_results = ''

  fetch(user_url)
    .then(res => {
      return res.json()
    })
    .then(data => {

      let results = document.getElementById("patients");
      let total_results = document.getElementById("total_results");

      // results.innerHTML = '';
      let total = [];
      total_results.innerHTML = '';
      results.innerHTML = '';

      data.map(patient => {

        let datee = patient.created_at

        var date = new Date(datee);
        var day = date.getDate(); //Date of the month: 2 in our example
        var month = date.getMonth(); //Month of the Year: 0-based index, so 1 in our example
        month_1 = month + 1
        var year = date.getFullYear() //Year: 2013

        date_patient = year + "-" + month_1 + "-" + day;
        converted_date = convertDate(date_patient);
        split_date = converted_date.split(" ")
        final_date = split_date[1] + " " + split_date[0] + ", " + split_date[2];
        
        console.log(final_date)



        total.push(patient.id)

        let tr = document.createElement('tr')
        let th_id = document.createElement('th')
        let th_date = document.createElement('th')
        let th_contact_number = document.createElement('th')
        let th_contacted = document.createElement('th')
        let contacted_btn = document.createElement('button')


        th_id.className = 'align-middle text-center justify-content-center'
        th_date.className = 'align-middle text-center justify-content-center'
        th_contact_number.className = 'align-middle text-center justify-content-center'
        th_contacted.className = 'align-middle text-center justify-content-center'


        tr.id = "row";
        th_id.innerHTML = patient.id;
        th_date.innerHTML = final_date;
        th_contact_number.innerHTML = patient.subscriber_number;

        if (patient.already_contacted == false) {
          contacted_btn.innerHTML = "Not Yet"
          contacted_btn.className = "not_contacted btn_contacted align-middle my-auto mx-auto";

        } else {
          contacted_btn.innerHTML = "Done"
          contacted_btn.className = "done btn_contacted align-middle my-auto mx-auto";
        }
        // contacted_btn.innerHTML = patient.already_contacted;



        // contacted_btn.className = "button_contacted";
        contacted_btn.id = patient.id;
        contacted_btn.setAttribute('onclick','onClick('+  contacted_btn.id  +');');


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


// const btn = document.getElementById('1');
let index = 0;

const colors = ['#4CAF50', '#f44336'];

function onClick(id) {

  clicked_btn = document.getElementById(id)

  clicked_btn.style.backgroundColor = colors[index];
  clicked_btn.style.color = 'white';

  index = index >= colors.length - 1 ? 0 : index + 1;
  let bool = ''

// Already Contacted
  if (clicked_btn.style.backgroundColor == "rgb(76, 175, 80)") {
    clicked_btn.innerHTML = 'Done';
    bool = true;
    console.log('green-light');
  } 
// Not yet
  else {
    clicked_btn.innerHTML = 'Not Yet';
    console.log('red-light');
    bool = false;
  }

  let query = id;

  // console.log(query)
  // const contact_update_url = "http://127.0.0.1:8000/contacted/" + query + '?' + "contacted=" + bool
  const contact_update_url = "https://ontrac-19.herokuapp.com/contacted/" + query + '?' + "contacted=" + bool
  console.log(contact_update_url)

  let user_id = id;
  let contacted = bool

  var inp_obj = {
    "contacted" : bool
  }

  fetch(contact_update_url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(inp_obj)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.already_contacted)
  })
  .catch(error => console.log("ERROR")) 

}
