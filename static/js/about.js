





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
today_date = m + "/" + d + "/" + y;
date_today = y + "-" + m + "-" + d;
document.getElementById("date").innerHTML = "COVID-19 cases as of " + convertDate(date_today);


// ----------- NUMBER OF CASES
const events_url = "http://127.0.0.1:8000/events"

console.log(events_url)

// total_results = ''


fetch(events_url)
.then(res => {
  return res.json()
})
.then(data => {

  event_list = []

  let ul_p = document.getElementById('parent_ul');
  let ul_p1 = document.getElementById('parent_ul1');
  let ul_p2 = document.getElementById('parent_ul2');
  let arrow = document.getElementById('arrow');


  data.map(event => {
    // console.log(event.date)
    // console.log(date_today)

    if (event.date >= date_today) {
      console.log(event.date)
      event_list.push(event.id)
      let lst = document.createElement("li");
      let dv1 = document.createElement('div');
      let dv2 = document.createElement('div');
      let p1 = document.createElement('p');
      let spn1 = document.createElement('span');
      let dv3 = document.createElement('div');
      let h3 = document.createElement('h3');
      let spn2 = document.createElement('span');
      let p2 = document.createElement('p');
      let ul = document.createElement('ul');
      let lst_menu1 = document.createElement("li");
      let stng1 = document.createElement("strong");
      let lst_menu2 = document.createElement("li");
      let stng2 = document.createElement("strong");
      let lst_menu3 = document.createElement("li");
      let stng3 = document.createElement("strong");
      let lst_menu4 = document.createElement("li");
      let stng4 = document.createElement("strong");
      let lst_menu5 = document.createElement("li");
      let stng5 = document.createElement("strong");
      let lst_menu6 = document.createElement("li");
      let stng6 = document.createElement("strong");
      let lst_menu7 = document.createElement("li");
      let stng7 = document.createElement("strong");

      // let btn_left = document.createElement('button');
      // let i_left = document.createElement('i');
      // let i_right = document.createElement('i');
      // let btn_right = document.createElement('button');

      // btn_left.className = 'prev-arrow-events slick-arrow';
      // btn_left.type = 'button';
      // i_left.className = 'fa fa-chevron-left'
      // btn_left.append(i_left);

      // btn_right.className = 'next-arrow-events slick-arrow';
      // btn_right.type = 'button';
      // i_right.className = 'fa fa-chevron-right';
      // btn_right.append(i_right);
      // lst_menu1.className = 'row'
      // lst_menu2.className = 'row'
      // lst_menu3.className = 'row'
      // lst_menu4.className = 'row'
      // lst_menu5.className = 'row'
      // lst_menu6.className = 'row'
      // lst_menu7.className = 'row'

      lst.className = "border-top d-flex align-items-center";
      dv2.className = 'events-date text-uppercase text-center';
      p1.className = 'text-white';
      dv3.className = 'd-inline-block pl-3 event-li';
      h3.className = 'font-weight-bold mt-0';
      spn2.className = 'event_title';
      p2.className = "show_c";
      p2.id = 'show' + event.id;
      p2.setAttribute('onclick','doSomething('+  event.id  +');'); // for IE
      p2.className = 'more_info pt-1';
      ul.className = "menu" + event.id + " menuu list-unstyled pb-2 col-12";
      ul.style = "display: none;";


      let date = convertDate(event.date).split(' ');
      let time = event.time.split(':');

      p1.innerHTML = date[1];
      spn1.innerHTML = date[0];
      p1.append(spn1);
      dv2.append(p1);
      spn2.innerHTML = 'Vaccination';
      h3.append(spn2);
      p2.innerHTML = 'More Info'
      dv3.append(h3);
      dv3.append(p2);
      // dv1.append(dv2);
      // dv1.append(dv3);


      stng1.innerHTML = event.dose;
      lst_menu1.append(stng1);
      stng2.innerHTML = 'Type of vaccine: ';
      lst_menu2.append(stng2);
      lst_menu2.append(event.vaccine_type);
      stng3.innerHTML = 'Date: ';
      lst_menu3.append(stng3);
      lst_menu3.append(date[1] + " " + date[0] + ", " + date[2]);
      stng4.innerHTML = 'Time: ';
      lst_menu4.append(stng4);

      if (time[0] > 12) {
        let pm = time[0] - 12
        lst_menu4.append(pm + " pm")
      } else {
        lst_menu4.append(time[0] + " am")
      }

      stng5.innerHTML = 'Location: ';
      lst_menu5.append(stng5);
      lst_menu5.append(event.location);
      stng6.innerHTML = 'Slots: ';
      lst_menu6.append(stng6);
      lst_menu6.append(event.slots);
      stng7.innerHTML = 'Age: ';
      lst_menu7.append(stng7);
      lst_menu7.append(event.age);

      ul.append(lst_menu1);
      ul.append(lst_menu2);
      ul.append(lst_menu3);
      ul.append(lst_menu4);
      ul.append(lst_menu5);
      ul.append(lst_menu6);
      ul.append(lst_menu7);

      lst.append(dv2)
      lst.append(dv3)
      // lst.append(ul)

      if (event_list.length > 8) {
        ul_p2.append(lst)
        ul_p2.append(ul)

        arrow.style.display = "block";
        // console.log('asd ')

      }

      if (event_list.length > 4) {
        let parent_dv2 = document.createElement('div')
        ul_p1.append(lst)
        ul_p1.append(ul)

        arrow.style.display = "block";
        // console.log('asd ')

      } else{
        ul_p.append(lst)
        ul_p.append(ul)

        arrow.style.display = "none";
        parent_dv1.style.display = "none";
      }

    }
  })


})
.catch(error => console.log("ERROR"))


$(document).ready(function(){
    $("#showv").click(function() {
      $(".menuu").toggle("slide");
    });
});


function doSomething(id) {
  let show = ".show" + id;
  let menu = ".menu" + id;
  $(menu).toggle("slide");
  // console.log(show)
  // console.log(menu)
}




// ----------- NUMBER OF CASES
const patients_url = "http://127.0.0.1:8000/patients"

console.log(patients_url)

// total_results = ''

fetch(patients_url)
.then(res => {
  return res.json()
})
.then(data => {
 let total_active = document.getElementById("total_active");
 let total_recoveries = document.getElementById("total_recoveries");
 let total_deaths = document.getElementById("total_deaths");

 let daily_active = document.getElementById("daily_active");
 let daily_recoveries = document.getElementById("daily_recoveries");
 let daily_deaths = document.getElementById("daily_deaths");

 let total_recoveries_list = [];
 let total_active_list = [];
 let total_death_list = [];

 let daily_recoveries_list = [];
 let daily_active_list = [];
 let daily_death_list = [];

  data.map(patient => {

     if (patient.date_positive == date_today) {
     if (patient.status == "infected") {
         daily_active_list.push(patient.status)
     }
     if (patient.status == "recovered") {
         daily_recoveries_list.push(patient.status)
     }
     if (patient.status == "died") {
         daily_death_list.push(patient.status)
     }
    }

    if (patient.status == "infected") {
     total_active_list.push(patient.status)
    }
    if (patient.status == "recovered") {
     total_recoveries_list.push(patient.status)
    }
    if (patient.status == "died") {
     total_death_list.push(patient.status)
    }
  })

  total_active.innerHTML = total_active_list.length;
  total_recoveries.innerHTML = total_recoveries_list.length;
  total_deaths.innerHTML = total_death_list.length;

  daily_active.innerHTML = daily_active_list.length;
  daily_recoveries.innerHTML = daily_recoveries_list.length;
  daily_deaths.innerHTML = daily_death_list.length;

})
.catch(error => console.log("ERROR"))



$('.events').slick({
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  prevArrow: $('.prev-arrow-events'),
  nextArrow: $('.next-arrow-events')
});
