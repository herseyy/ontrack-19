function fetch_post() {

  // event.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  
  var inp_obj = {
    "username" : username,
    "password" : password
  }

  console.log(inp_obj)

  const token_url = "/token"

  fetch(token_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inp_obj)
  })
  .then(res => res.json())
  .then(data => {
    console.log('Success:', data);

  }).catch((error) => {
      console.error('Error:', error);
  });


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