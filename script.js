const map = L.map("map").setView([17.385, 78.4867], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

function loadSpots() {
  fetch("http://localhost:5000/spots")
    .then(res => res.json())
    .then(data => {
      data.forEach(spot => {
        L.marker([spot.lat, spot.lng])
          .addTo(map)
          .bindPopup(`
            <b>${spot.name}</b><br>
            Price: ₹${spot.price}/hr<br>
            Available: ${spot.available}<br><br>
            <button onclick="bookSpot('${spot._id}')">
              Book
            </button>
          `);
      });
    });
}

function bookSpot(id) {
  const userName = document.getElementById("name").value;

  fetch("http://localhost:5000/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      spotId: id,
      userName
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    location.reload();
  });
}

function addSpot() {
  const name = document.getElementById("spotName").value;
  const lat = parseFloat(document.getElementById("lat").value);
  const lng = parseFloat(document.getElementById("lng").value);
  const price = parseInt(document.getElementById("price").value);

  fetch("http://localhost:5000/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      lat,
      lng,
      price
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Spot Added");
    location.reload();
  });
}

loadSpots();