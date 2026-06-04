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

function startTimer() {
  var input = document.getElementById("timer-input");
  var minutes = input.value;

  if (minutes < 1) {
    alert("Please enter at least 1 minute!");
    return;
  }

  timerSeconds = minutes * 60;

  var timerDisplay = document.getElementById("timer-display");
  var timerStatus = document.getElementById("timer-status");

  timerDisplay.classList.remove("hidden");
  timerStatus.classList.remove("hidden");
  timerStatus.textContent = "⏱️ Timer started! Click I'm Safe before time runs out.";

  timerInterval = setInterval(function() {
    timerSeconds--;

    var mins = Math.floor(timerSeconds / 60);
    var secs = timerSeconds % 60;

    var display = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
    document.getElementById("countdown").textContent = display;

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerStatus.textContent = "⚠️ Time is up! Your contacts have been alerted!";
      document.getElementById("countdown").textContent = "00:00";
    }
  }, 1000);
}

function checkIn() {
  clearInterval(timerInterval);
  var timerStatus = document.getElementById("timer-status");
  timerStatus.classList.remove("hidden");
  timerStatus.textContent = "✅ You're safe! Timer stopped.";
  document.getElementById("countdown").textContent = "00:00";
}

function stopTimer() {
  clearInterval(timerInterval);
  var timerStatus = document.getElementById("timer-status");
  timerStatus.classList.remove("hidden");
  timerStatus.textContent = "🛑 Timer stopped.";
  document.getElementById("countdown").textContent = "00:00";
}

function addContact() {
  var name = document.getElementById("contact-name").value.trim();
  var phone = document.getElementById("contact-phone").value.trim();
  var statusBox = document.getElementById("contacts-status");

  if (name === "" || phone === "") {
    statusBox.classList.remove("hidden");
    statusBox.textContent = "⚠️ Please fill in both fields!";
    return;
  }

  if (contacts.length >= 3) {
    statusBox.classList.remove("hidden");
    statusBox.textContent = "⚠️ Maximum 3 contacts allowed!";
    return;
  }

  contacts.push({ name: name, phone: phone });

  var contactsList = document.getElementById("contacts-list");

  var card = document.createElement("div");
  card.className = "contact-card";

  card.innerHTML =
    "<div class='contact-info'>" +
      "<span>" + name + "</span>" +
      "<small>" + phone + "</small>" +
    "</div>" +
    "<button class='delete-btn' onclick='deleteContact(this)'>Delete</button>";

  contactsList.appendChild(card);

  document.getElementById("contact-name").value = "";
  document.getElementById("contact-phone").value = "";

  statusBox.classList.remove("hidden");
  statusBox.textContent = "✅ Contact added successfully!";
}

function deleteContact(button) {
  var card = button.parentElement;
  card.remove();
  statusBox.classList.remove("hidden");
}

function deleteContact(button) {
  var card = button.parentElement;
  card.remove();

  var statusBox = document.getElementById("contacts-status");
  statusBox.classList.remove("hidden");
  statusBox.textContent = "🗑️ Contact removed.";
}
