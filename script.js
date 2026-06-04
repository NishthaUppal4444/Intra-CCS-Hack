var contacts = [];

function triggerSOS() {
  var statusBox = document.getElementById("sos-status");
  var sosBtn = document.getElementById("sos-btn");

  statusBox.classList.remove("hidden");

  sosBtn.style.backgroundColor = "#ff0000";
  sosBtn.textContent = "🚨 ALERT SENT";
  sosBtn.disabled = true;
}

function getLocation() {
  var statusBox = document.getElementById("location-status");
  var locationBtn = document.getElementById("location-btn");

  locationBtn.textContent = "Fetching...";
  locationBtn.disabled = true;

  statusBox.classList.remove("hidden");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      document.getElementById("location-coords").textContent =
        "📍 Latitude: " + lat + " | Longitude: " + lng;

      document.getElementById("location-address").textContent =
        "✅ Location captured successfully!";

      locationBtn.textContent = "📍 Location Found";
    }
  );
}