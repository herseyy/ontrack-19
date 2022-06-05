// var form = document.getElementById("contactform");

// async function handleSubmit(event) {
//   event.preventDefault();
//   var status = document.getElementById("my-form-status");
//   var data = new FormData(event.target);
//   fetch(event.target.action, {
//     method: form.method,
//     body: data,
//     headers: {
//         'Accept': 'application/json'
//     }
//   }).then(response => {
//     if (response.ok) {
//       status.innerHTML = "Thanks for your submission!";
//       status.style.display = "block"
//       form.reset()
//     } else {
//       response.json().then(data => {
//         if (Object.hasOwn(data, 'errors')) {
//           status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
//         } else {
//           status.innerHTML = "Oops! There was a problem submitting your form"
//         }
//       })
//     }
//   }).catch(error => {
//     status.innerHTML = "Oops! There was a problem submitting your form"
//   });
// }
// form.addEventListener("submit", handleSubmit)


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

