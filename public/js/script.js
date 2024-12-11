const socket = io();
const map = L.map("map");

// Add user's own location marker
let userMarker = null;

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Emit the user's location to the server
      socket.emit("send-location", { latitude, longitude });

      // Update or create the marker for the user's own location
      if (userMarker) {
        userMarker.setLatLng([latitude, longitude]);
      } else {
        userMarker = L.marker([latitude, longitude]).addTo(map);
      }

      // Set the map's view to the user's location
      map.setView([latitude, longitude], 16);
    },
    (error) => {
      console.error(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0,
    }
  );
}

// Initialize map view
map.setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Shivam Gopal",
}).addTo(map);

const markers = {};

// Listen for other users' location updates
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  // Set the map view to the location of the updated user
  map.setView([latitude, longitude]);

  // If the marker for this user exists, update it; otherwise, create a new marker
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

// Listen for user disconnections and remove their markers
socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    markers[id].remove(); // Removes the marker from the map
    delete markers[id]; // Removes the marker from the `markers` object
  }
});
