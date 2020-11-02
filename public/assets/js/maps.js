let map;
const allCircles = [];

const colorSchemes = {
  infected: {
    status: "Infected",
    strokeColor: "#FF0000",
    fillColor: "#FF0000",
  },
  not_infected: {
    status: "Not Infected",
    strokeColor: "#00FF00",
    fillColor: "#00FF00",
  },
  prev_infected: {
    status: "Previously Infected",
    strokeColor: "#FF8000",
    fillColor: "#FF8000",
  },
};

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

    $.get(`/api/people/${status}`)
      .then(function (data) {
        data.forEach((cityInfo) => {
          console.log(cityInfo);
          clearCircles();

          const scheme =
            status == "Infected"
              ? colorSchemes.infected
              : status == "Not Infected"
              ? colorSchemes.not_infected
              : colorSchemes.prev_infected;

          createCircle(scheme, cityInfo);
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});

function createCircle(scheme, cityInfo) {
  const cityLocation = { lat: cityInfo.lat, lng: cityInfo.lng };
  const statusCount = cityInfo.count;

  // TODO: Different Colors based on Status or Query
  const cityCircle = new google.maps.Circle({
    strokeColor: scheme.strokeColor,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: scheme.fillColor,
    fillOpacity: 0.35,
    map,
    center: cityLocation,
    radius: Math.sqrt(statusCount) * 1000,
  });

  // // TODO: Polish COntent Inside Info Window
  const infowindow = new google.maps.InfoWindow({
    content: 
    `<h3>${cityInfo.city}</h3>
    <p> ${scheme.status} People:${statusCount}</p>`,
  });

  cityCircle.addListener("click", () => {
    infowindow.setPosition(cityLocation);
    infowindow.open(map);
  });

  allCircles.push(cityCircle);
}

function clearCircles() {
  allCircles.forEach((circle) => circle.setMap(null));
}
