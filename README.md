# Realtime-Tracking-System

This project allows you to track the real-time location of mobile devices using GPS and display the markers on a map. The location data is transmitted using WebSockets and displayed using Leaflet.js. The project works on both mobile and desktop devices, with each device's location displayed as a marker on the map.

![Project Image]([/Realtime-Tracking-System/pictures/image.png](https://github.com/Shivam-Gopal/Realtime-Tracking-System/blob/main/pictures/image.png))

## Features
- Real-time location tracking using GPS.
- Displays the location of the user on a map using Leaflet.js.
- Broadcasts location updates to all connected clients in real-time.
- Markers are updated dynamically as the user moves.

## Technologies Used
- **Express.js** for the server-side framework.
- **Socket.io** for real-time communication between the client and server.
- **Leaflet.js** for displaying the map and markers.
- **HTML/CSS/JavaScript** for frontend development.

## Prerequisites
Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org) (LTS version recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Steps to Install and Run the Project

### 1. Clone the Repository
First, clone the repository to your local machine using the following command:
```bash
git clone https://github.com/Shivam-Gopal/Realtime-Tracking-System.git

