$(function () {
  $(".btn-submit").on("click", function (event) {
    let person = {
      status: $("#status").val().trim(),
      bloodType: $("#blood-type").val().trim(),
      gender: $("#gender").val().trim(),
      age: $("#age").val().trim(),
      country: $("#countryId").val().trim(),
      state: $("#stateId").val().trim(),
      city: $("#cityId").val().trim()
    };

    $.ajax("/api/people", {
      type: "POST",
      data: person,
    }).then(function () {
      location.reload();
    });
  });
});
