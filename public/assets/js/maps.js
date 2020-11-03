let map;
const allCircles = [];
const allInfoWindows = [];

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
  // Handle Functionality For When Users Submit a Query Request
  $(".btn-submit").on("click", function (event) {
    event.preventDefault();
    const status = $("#status").val().trim();

    let url = `/api/people/${status}`;

    const condition = $("#condition").val();
    const conditionValue = $("#condition-value").val();

    if (condition && !conditionValue) { 
      // TODO add modal so users must select condition value
      return;
    }

    if (condition && conditionValue) { 
      url += `/${condition}/${conditionValue}`;
    }

    $.get(url)
      .then(function (data) {
        clearCircles();

        data.forEach((cityInfo) => {
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

  // Handle Functionality For When User Select a Filter
  $("#condition").on("change", function (event) {
    const selectedFilter = $(this).val();

    switch (selectedFilter) {
      case "age":
        fillConditions(["3 - 18", "19 - 30", "30 - 55", "55+"]);
        break;

      case "gender":
        fillConditions(["Male", "Female", "Non-binary"]);
        break;

      case "bloodType":
        fillConditions(["A-", "A+", "B-", "B+", "O-", "O+", "AB-", "AB+"]);
        break;

      default:
        $("#condition-value").empty();
        $("#condition-value").attr("readonly", "");
        break;
    }

    function fillConditions(options) {
      let conditionValues = $("#condition-value");

      $(conditionValues).attr("readonly", null);
      $(conditionValues).empty();
      $(conditionValues).prepend(
        $(`<option value="">Select a Filter Value</option>`)
      );

      options.forEach((element) => {
        $(conditionValues).append($(`<option>${element}</option>`));
      });
    }
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
    content: `<h3>${cityInfo.city}</h3>
    <p> ${scheme.status} People:${statusCount}</p>`,
  });


  cityCircle.addListener("click", () => {
    infowindow.setPosition(cityLocation);
    infowindow.open(map);
  });

  allInfoWindows.push(infowindow);
  allCircles.push(cityCircle);
}

function clearCircles() {
  allCircles.forEach(circle => circle.setMap(null));
  allInfoWindows.forEach(infoWindow => infoWindow.setMap(null));
}
