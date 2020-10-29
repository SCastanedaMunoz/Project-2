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

  // let infoWindow = new google.maps.InfoWindow();
}

console.log(map);
