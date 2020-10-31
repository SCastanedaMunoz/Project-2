let map;
const allCircles = [];
let service;

const colorSchemes = {
  infected: {
    strokeColor: "#FF0000",
    fillColor: "#FF0000",
  },
  not_infected: {
    strokeColor: "#00FF00",
    fillColor: "#00FF00",
  },
  prev_infected: {
    strokeColor: "#FF8000",
    fillColor: "#FF8000",
  },
}

// eslint-disable-next-line no-unused-vars
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 30.266748,
      lng: -97.74176,
    },
    zoom: 10,
  });
}

$(function () {
  $(".btn-submit").on("click", function (event) {
    event.preventDefault();
    const status = $("#status").val().trim();

    $.ajax({
      type: "GET",
      url: "/api/people/" + status,
    })
      .then(function (data) {
        data.forEach((location) => {
          clearCircles();

          const request = {
            query: `${location.country}, ${location.city}, ${location.state}`,
            fields: ["name", "geometry"],
          };

          const scheme = status == "Infected" ? colorSchemes.infected : status == "Not Infected" ? colorSchemes.not_infected : colorSchemes.prev_infected;

          service = new google.maps.places.PlacesService(map);
          service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (let i = 0; i < results.length; i++) {
                let placeLocation = results[i].geometry.location;

                // TODO: Different Colors based on Status or Query
                const cityCircle = new google.maps.Circle({
                  strokeColor: scheme.strokeColor,
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: scheme.fillColor,
                  fillOpacity: 0.35,
                  map,
                  center: placeLocation,
                  radius: Math.sqrt(location.count) * 100,
                });

                // TODO: Polish COntent Inside Info Window
                const infowindow = new google.maps.InfoWindow({
                  content: `${location.city}
                    Infected People:${location.count}`,
                });

                cityCircle.addListener("click", () => {
                  infowindow.setPosition(placeLocation);
                  infowindow.open(map);
                });

                allCircles.push(cityCircle);
              }
            }
          });
        });
      })
      .catch(function (err) {
        // TODO Add Modal / Alert When Request Fails
        console.log(err);
      });
  });

  // google.maps.event.addListener(map, "zoom_changed", function () {
  //   var zoomLevel = map.getZoom();
  //   updateRadius(zoomLevel);
  // });
});

function clearCircles() {
  allCircles.forEach((circle) => circle.setMap(null));
}

// function updateRadius(zoom) {
//   allCircles.forEach((circle) => {
//     const prevRadius = circle.radius;
//     circle.setRadius(prevRadius / Math.pow(2.0, zoom));
//   });
// }
