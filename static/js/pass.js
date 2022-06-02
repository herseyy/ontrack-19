function fetch_post() {

  // event.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  
  var inp_obj = {
    "username" : username,
    "password" : password
  }

  console.log(inp_obj)
}


$(document).ready(function () {
  $("[data-js=open]").on("click", function() {

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;


    var username_error = document.getElementById('username_error');
    var password_error = document.getElementById('password_error');


    if (username == "") {
      username_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      username_error.innerHTML = "";
    }

    if (password == "") {
      password_error.innerHTML = "This field cannot be empty";
      document.getElementById('app').scrollIntoView({
        behavior: 'smooth'
      });
      return false;
    } else {
      password_error.innerHTML = "";
    }

    fetch_post();
  });
});