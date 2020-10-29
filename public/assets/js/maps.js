let map;

// eslint-disable-next-line no-unused-vars
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 30.266748,
      lng: -97.74176,
    },
    zoom: 12,
  });

  // let infoWin sedow = new google.maps.InfoWindow();
}

$(function () {
    $(".btn-submit").on("click", function (event) {
        event.preventDefault();
        const status = $("#status").val().trim();
        
        $.ajax( {
            type: "GET",
            url: "/api/people/" + status,
        }).then(function (data) { 
            console.log(data);
            // TODO Fill Out Map Markers / Heat Map
        }).catch(function (err) {
            // TODO Add Modal / Alert When Request Fails
            console.log(err);
        })

    });
});