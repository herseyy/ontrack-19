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

function getResults() {
  $.ajax({
    url: "https://reqres.in/api/users",
    type: "GET",
    success: function (response) {
      console.log(response);
    }
  });
}
