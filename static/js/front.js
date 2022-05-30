// ------------- TODAY 
// n =  new Date();
// y = n.getFullYear();
// m = String(n.getMonth() + 1).padStart(2, '0');
// d = String(n.getDate()).padStart(2, '0');
// today_date = m + "/" + d + "/" + y;
// date_today = y + "-" + m + "-" + d;
// document.getElementById("date").innerHTML = "Covid 19 cases as of " + today_date;


//  ------------- SMOOTH SCROLL
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});



// ----------- NUMBER OF CASES
// const patients_url = "http://127.0.0.1:8000/patients"

// console.log(patients_url)

// // total_results = ''

// fetch(patients_url)
// .then(res => {
//   return res.json()
// })
// .then(data => {
// 	let total_active = document.getElementById("total_active");
// 	let total_recoveries = document.getElementById("total_recoveries");
// 	let total_deaths = document.getElementById("total_deaths");

// 	let daily_active = document.getElementById("daily_active");
// 	let daily_recoveries = document.getElementById("daily_recoveries");
// 	let daily_deaths = document.getElementById("daily_deaths");

// 	let total_recoveries_list = [];
// 	let total_active_list = [];
// 	let total_death_list = [];

// 	let daily_recoveries_list = [];
// 	let daily_active_list = [];
// 	let daily_death_list = [];

//   data.map(patient => {

//   	if (patient.date_positive == date_today) {
//     	if (patient.status == "infected") {
//     		daily_active_list.push(patient.status)
// 	    }
// 	    if (patient.status == "recovered") {
// 	    	daily_recoveries_list.push(patient.status)
// 	    }
// 	    if (patient.status == "died") {
// 	    	daily_death_list.push(patient.status)
// 	    }
//     }

//     if (patient.status == "infected") {
//     	total_active_list.push(patient.status)
//     }
//     if (patient.status == "recovered") {
//     	total_recoveries_list.push(patient.status)
//     }
//     if (patient.status == "died") {
//     	total_death_list.push(patient.status)
//     }
//   })

//   total_active.innerHTML = total_active_list.length;
//   total_recoveries.innerHTML = total_recoveries_list.length;
//   total_deaths.innerHTML = total_death_list.length;

//   daily_active.innerHTML = daily_active_list.length;
//   daily_recoveries.innerHTML = daily_recoveries_list.length;
//   daily_deaths.innerHTML = daily_death_list.length;

// })
// .catch(error => console.log("ERROR"))






// //  --------------- SLIDESHOW
// document.addEventListener("DOMContentLoaded", function () {
//     var parent = document.querySelector(".myBtnContainer");
//     parent.addEventListener("click", function (event) {
//         // Change active button class
//         // Array.from(parent.children).forEach(function (currentValue) {
//         //     currentValue.classList.remove("text-white");
//         // });
//         document
//             .getElementsByClassName("filterButton text-white")[0]
//             .classList.remove("text-white");

//         event.target.classList.add("text-white");

//         // Set slide filter by class name
//         Array.from(document.querySelectorAll(".swiper-slide")).forEach(
//             function (currentValue) {
//                 if (
//                     (event.target.innerText.toLowerCase() ||
//                         event.target.textContent.toLowerCase()) == "all"
//                 ) {
//                     currentValue.classList.remove("hidden");
//                 } else {
//                     if (
//                         !currentValue.classList.contains(
//                             event.target.innerText.toLowerCase() ||
//                                 event.target.textContent.toLowerCase()
//                         )
//                     ) {
//                         currentValue.classList.add("hidden");
//                         // console.log(allSlides)
//                     } else {
//                         currentValue.classList.remove("hidden");
//                     }
//                 }
//                 mySwiper.update();
//                 mySwiper.updateSize();
//                 mySwiper.updateSlides();
//                 mySwiper.updateSlidesClasses();
//                 mySwiper.slideTo(0);
//             }
//         );
//     });
// });

// var mySwiper = new Swiper(".swiper-container", {
//     // loop: true,
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev"
//     },
//     breakpoints: {
//         640: {
//             slidesPerView: 1,
//             spaceBetween: 0
//         },
//         768: {
//             slidesPerView: 2,
//             spaceBetween: 10
//         },
//         1024: {
//             slidesPerView: 3,
//             spaceBetween: 20
//         }
//         // 1280: {
//         //     slidesPerView: 4,
//         //     spaceBetween: 20
//         // }
//     }
// });


