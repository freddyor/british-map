// setCoordinates.js

// Function to get the query parameter value
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Define coordinates for different subpages
const coordinates = {
    'page1': { lat: 51.505, lng: -0.09, zoom: 13 }, // Example coordinates for page1
    'page2': { lat: 52.505, lng: -1.09, zoom: 15 }, // Example coordinates for page2
    'page3': { lat: 53.505, lng: -2.09, zoom: 17 }  // Example coordinates for page3
};

// Get the current subpage from the URL
const subpage = window.location.pathname.substring(1); // Get the subpage from the URL path

// Default coordinates if no subpage is specified
let initialLatLng = { lat: 51.505, lng: -0.09 };
let initialZoom = 13;

// Check if the subpage has specific coordinates
if (subpage && coordinates[subpage]) {
    initialLatLng = coordinates[subpage];
    initialZoom = coordinates[subpage].zoom;
}

// Export the initial coordinates and zoom level
export const initialCoordinates = { lat: initialLatLng.lat, lng: initialLatLng.lng, zoom: initialZoom };
