// Import statements
import { buildings } from './buildings.js';
import { locations } from './locations.js';


// Dynamically load Mapbox GL JS CSS
const mapboxCSS = document.createElement('link');
mapboxCSS.href = "https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.css";
mapboxCSS.rel = "stylesheet";
document.head.appendChild(mapboxCSS);

// Dynamically load Mapbox GL JS JavaScript
const mapboxScript = document.createElement('script');
mapboxScript.src = "https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.js";
mapboxScript.defer = true;
mapboxScript.onload = () => {
    // Initialize Mapbox after the script is loaded
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';
    initializeMap(); // Call function to set up your map
};
document.body.appendChild(mapboxScript);

const yorkBounds = [
  [-1.170, 53.930], // Southwest corner (lng, lat)
  [-1.010, 54.010]  // Northeast corner (lng, lat)
];


// Function to initialize the map
function initializeMap() {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/freddomate/cm8q8wtwx00a801qzdayccnvz?optimize=true',
        center: [-1.0835, 53.9584],
        zoom: 15,
        pitch: 45,
        bearing: -17.6,
        maxBounds: yorkBounds,
        minZoom: 11,
        maxZoom: 19,
    });

    // Add other Mapbox-related code here (e.g., markers, controls)

 map.on('load', () => {
    // Remove the loading screen
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        loadingScreen.style.display = "none";
    }

    // Trigger geolocation and continue with existing logic
    geolocate.trigger();

    map.addSource('Ward_boundaries-8vvo78', {
        type: 'vector',
        url: 'mapbox://freddomate.345l7u6c' // Replace with your actual tileset ID
    });

    // Add other Mapbox-related code here (e.g., markers, controls)
    addBuildingMarkers();
    addLocationMarkers();
});

    map.on('click', (e) => {
    const currentLat = e.lngLat.lat;
    const currentLng = e.lngLat.lng;
    const currentZoom = map.getZoom();

    const mapLink = generateMapLink(currentLat, currentLng, currentZoom);
    console.log('Map Link:', mapLink);
    // You can display this link in a popup or share it with others
});

    // Add a zoom event listener to the map
map.on('zoom', () => {
    scaleMarkersBasedOnZoom();
});

    // Geolocation control
const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true,
  showAccuracyCircle: false,
  fitBoundsOptions: {
    maxZoom: 15
  },
  showUserLocation: false
});

map.addControl(geolocate);

// Create a single marker for user location
const userLocationEl = document.createElement('div');
userLocationEl.className = 'user-location-marker';

const textEl = document.createElement('div');
textEl.style.position = 'absolute';
textEl.style.top = '50%';
textEl.style.left = '50%';
textEl.style.transform = 'translate(-50%, -50%)';
textEl.style.fontFamily = 'Poppins, sans-serif';
textEl.style.fontWeight = 'bold';
textEl.style.fontSize = '10px';
textEl.style.color = '#87CEFA';
textEl.textContent = 'me';

userLocationEl.appendChild(textEl);

const userLocationMarker = new mapboxgl.Marker({element: userLocationEl})
  .setLngLat([0, 0])
  .addTo(map);

geolocate.on('error', (e) => {
  if (e.code === 1) {
    console.log('Location access denied by user');
  }
});

geolocate.on('geolocate', (e) => {
  const lon = e.coords.longitude;
  const lat = e.coords.latitude;
  const position = [lon, lat];
  console.log(position);

  userLocationMarker.setLngLat(position);
});

    function addLocationMarkers() {
locations.forEach(location => {
    const { element: markerElement } = createCustomMarker(location.image, '#FFFFFF', true);
    markerElement.className += ' location-marker';
    const marker = new mapboxgl.Marker({
        element: markerElement
    })
    .setLngLat(location.coords)
    .addTo(map);

    marker.getElement().addEventListener('click', () => {
        map.getCanvas().style.cursor = 'pointer';
        const contentHTML = createPopupContent(location); // Use the existing function to create the content
        toggleBottomSheet(contentHTML);
    });
});
     }

function addBuildingMarkers() {
    buildings.forEach(building => {
        const outlineColor = building.colour === "yes" ? '#FF69B4' : '#FFFFFF'; // Pink if "colour" is "yes", otherwise white
        const { element: markerElement } = createCustomMarker(building.image, outlineColor, false);
        markerElement.className += ' building-marker';

        // Set z-index for markers with colour: "yes"
        if (building.colour === "yes") {
            markerElement.style.zIndex = '3';
        }

        const marker = new mapboxgl.Marker({
            element: markerElement
        })
        .setLngLat(building.coords)
        .addTo(map);

        marker.getElement().addEventListener('click', () => {
            map.getCanvas().style.cursor = 'pointer';

             // Add spinning animation
  const markerElement = marker.getElement();
    markerElement.classList.add('spinning-outline');

            // Check for video URL
            const videoUrl = building.videoUrl; // Assuming videoUrl is part of the building data
            if (videoUrl) {
                // Create a video element
                const videoElement = document.createElement('video');
                videoElement.src = videoUrl;
                videoElement.style.display = 'none'; // Hide the video element
                videoElement.controls = true;
                videoElement.preload = 'auto';
                videoElement.autoplay = true;

                // Append video to the body
                document.body.appendChild(videoElement);

                  // Remove spinning class when video starts playing
              videoElement.addEventListener('play', () => {
            markerElement.classList.remove('spinning-outline');
        });

                // Play the video and request fullscreen
                videoElement.play();
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if (videoElement.webkitRequestFullscreen) { // Safari
                    videoElement.webkitRequestFullscreen();
                } else if (videoElement.mozRequestFullScreen) { // Firefox
                    videoElement.mozRequestFullScreen();
                } else if (videoElement.msRequestFullscreen) { // IE/Edge
                    videoElement.msRequestFullscreen();
                }

                // Remove the video element once playback ends
        // Remove the video element once playback ends
        videoElement.addEventListener('ended', () => {
            document.body.removeChild(videoElement);
        });
    } else {
        console.error('Video URL not available for this building.');
        markerElement.classList.remove('spinning-outline');
    }
        });
    });
}
    function scaleMarkersBasedOnZoom() {
    const zoomLevel = map.getZoom(); // Get the current zoom level
    const markerSize = (zoomLevel - 13) + 'em'; // Linear scaling formula

    // Update the size of location markers
    document.querySelectorAll('.location-marker').forEach(marker => {
        marker.style.width = markerSize;
        marker.style.height = markerSize;
    });

    // Update the size of building markers
    document.querySelectorAll('.building-marker').forEach(marker => {
        marker.style.width = markerSize;
        marker.style.height = markerSize;
    });
}

// Call the function initially to set marker sizes based on the initial zoom level
scaleMarkersBasedOnZoom();
    
}



// Function to parse URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const defaultCenter = [-1.0835104081554843, 53.95838745239521]; // Default York coordinates

const lat = getUrlParameter('lat');
const lng = getUrlParameter('lng');
const zoom = getUrlParameter('zoom');

const initialCenter = lat && lng ? [parseFloat(lng), parseFloat(lat)] : defaultCenter;
const initialZoom = zoom ? parseFloat(zoom) : 15; // Adjust defaultZoom as necessary

// Create a bottom sheet container
const bottomSheet = document.createElement('div');
bottomSheet.id = 'bottom-sheet';
bottomSheet.style.position = 'fixed';
bottomSheet.style.bottom = '-100%'; // Initially hidden
bottomSheet.style.left = '50%'; // Align to the left
bottomSheet.style.transform = 'translate(-50%)'; // Adjust position to align center both ways
bottomSheet.style.right = '50%';
bottomSheet.style.width = '96%';
bottomSheet.style.height = '40%'; // Adjust height as needed
bottomSheet.style.backgroundColor = '#fff';
bottomSheet.style.borderTop = '2px solid #ccc';
bottomSheet.style.boxShadow = '0 -6px 15px rgba(0, 0, 0, 0.3)';
bottomSheet.style.zIndex = '10000';
bottomSheet.style.transition = 'bottom 0.3s ease';
bottomSheet.style.borderRadius = '12px 12px 0 0'; // Matches the popup's border-radius
bottomSheet.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)'; // Matches the popup's shadow
bottomSheet.style.backgroundColor = '#E9E8E0'; // Matches popup background color
bottomSheet.style.border = '2px solid #f0f0f0'; // Matches popup border
bottomSheet.style.fontFamily = "'Poppins', sans-serif"; // Matches popup font-family
bottomSheet.style.fontSize = '14px'; // Matches popup font size
bottomSheet.style.lineHeight = '1.05'; // Matches popup line height
bottomSheet.style.padding = '5px'; // Matches popup padding
bottomSheet.style.overflowY = 'auto'; // Make it scrollable
document.body.appendChild(bottomSheet);

// Function to generate a URL with given coordinates and zoom
function generateMapLink(latitude, longitude, zoomLevel) {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = `?lat=${latitude}&lng=${longitude}&zoom=${zoomLevel}`;
    return baseUrl + params;
}

// Example usage:
// You can call this function when a user clicks on a marker or interacts with the map
// to generate a link for the current view.
// For example:


// Container for both buttons
const buttonGroup = document.createElement('div');
buttonGroup.id = 'button-group';
buttonGroup.style.position = 'fixed';
buttonGroup.style.left = '50%';
buttonGroup.style.top = '50px';
buttonGroup.style.transform = 'translateX(-50%)';
buttonGroup.style.zIndex = '1000';
buttonGroup.style.display = 'flex';
buttonGroup.style.gap = '10px';
document.body.appendChild(buttonGroup);


// Create a <style> element to add the CSS
const stylePopup = document.createElement('style');

// Add the link to Google Fonts for Poppins
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Style for the popup and markers
// Style for the popup and markers
stylePopup.innerHTML = `
  .mapboxgl-popup-content {
    border-radius: 12px !important;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3) !important;
    padding: 10px !important;
    font-family: 'Poppins', sans-serif !important;
    background: #E9E8E0;
    border: 2px solid #f0f0f0 !important;
    line-height: 1.05;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-left: 3px;
    margin-right: 5px;
    margin-bottom: 10px; /* Add this line */
  }

  .mapboxgl-popup-content img {
    border: 2px solid #f0f0f0 !important;
    border-radius: 8px;
  }

  .mapboxgl-popup-content p {
    font-weight: bold !important;
    text-align: center;
    letter-spacing: -0.5px;
    font-size: 13px !important;
    margin-bottom: 10px !important;
  }

  .mapboxgl-popup-close-button {
    display: none !important;
  }

  .user-location-marker {
    width: 20px;
    height: 20px;
    background-color: white;
    border: 3px solid #87CEFA;
    border-radius: 100%;
    position: relative;
  }

  .location-marker {
    z-index: 1;
  }

  .building-marker {
    z-index: 2;
  }

  .mapboxgl-popup {
    z-index: 9999 !important;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .custom-button {
    background-color: #e9e8e0;
    color: black;
    border: 2px solid #f0f0f0;
    padding: 3px 8px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
    text-align: center;
  }

  #button-group {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 1000;
  }
    .dropdown-content {
    line-height: 1.05; /* Added line-height */
    font-size: 12px; /* Added font-size */
  }

// Add styles for the bottom sheet
  #bottom-sheet {
    font-family: 'Poppins', sans-serif !important;
    padding: 5px;
    font-size: 14px;
    line-height: 1.05;
  }

  #bottom-sheet img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  #bottom-sheet p {
    margin-bottom: 10px;
  }

.spinning-outline {
    position: relative; /* Ensure the pseudo-element is positioned relative to the marker */
}

.spinning-outline::before {
    content: ''; /* Required for the pseudo-element to appear */
    position: absolute;
    top: -4px; /* Adjust based on the spacing desired */
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 4px dashed #FF69B4; /* Dashed border with your chosen color */
    border-radius: 50%; /* Ensures it's a circle */
    animation: spinOutline 1s linear infinite; /* Adds the spinning animation */
    z-index: -1; /* Ensures the spinning border is behind the marker content */
}

/* Keyframe animation for spinning */
@keyframes spinOutline {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`;

// Append the style to the document
document.head.appendChild(stylePopup);


function createCustomMarker(imageUrl, color = '#9b4dca', isLocation = false) {
  const markerDiv = document.createElement('div');
  markerDiv.className = 'custom-marker';
  markerDiv.style.width = '3em';
  markerDiv.style.height = '3em';
  markerDiv.style.position = 'absolute';
  markerDiv.style.borderRadius = '50%';
  markerDiv.style.border = `0.15em solid ${color}`;
  markerDiv.style.boxSizing = 'border-box';
  markerDiv.style.overflow = 'hidden';

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.style.width = '100%';
  imageElement.style.height = '100%';
  imageElement.style.objectFit = 'cover';
  imageElement.style.borderRadius = '50%';

  markerDiv.appendChild(imageElement);

  return {
    element: markerDiv,
    id: `marker-${Date.now()}-${Math.random()}`
  };
}

// Toggle functionality for the bottom sheet
let isBottomSheetOpen = false;

function toggleBottomSheet(contentHTML) {
    if (isBottomSheetOpen) {
        bottomSheet.style.bottom = '-100%'; // Hide
    } else {
        // Add a close button to the top-right corner of the content
        const closeButtonHTML = `
            <button id="close-bottom-sheet" style="
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 3px 3px;
                background: none;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 10px;
            ">❌</button>
        `;

        bottomSheet.innerHTML = closeButtonHTML + contentHTML; // Add close button + content
        bottomSheet.style.bottom = '0'; // Show

        // Attach event listener to the close button
 document.getElementById('close-bottom-sheet').addEventListener('click', () => {
    // Stop video playback
    const videoElement = document.querySelector('video'); // Adjust selector as needed
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0; // Optional: Reset video to start
    }

    toggleBottomSheet(); // Close the popup
});
    }
    isBottomSheetOpen = !isBottomSheetOpen;
}

function createPopupContent(location, isFirebase = false) {
    const data = isFirebase ? location : location;
    const eventsData = isFirebase ? data.events : data.events;

    // Check if videoUrl property exists and is not empty
    const videoUrl = data.videoUrl ? data.videoUrl : null;

    // Exclude the "tldr" and image if the videoUrl is present
const tldrContent = !videoUrl
    ? `<p style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 15px; color: #7C6E4D;">${data.tldr}</p>`
    : '';

    const imageContent = !videoUrl
        ? `<img src="${data.image || data.imageUrl}" alt="${data.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;" />`
        : '';

    return `
        <div style="text-align: center; padding: 0; margin: 0;">
            <p style="font-size: 15px; font-weight: bold; margin-bottom: 10px;">${data.description}</p>
            ${imageContent}
            <div style="font-size: 20px; font-weight: bold; margin-top: 0;">${data.name}</div>
            <div style="font-size: 15px; color: #666;">${data.occupation || data.dates}</div>
            ${tldrContent}
            ${eventsData && eventsData.length ? `
                <div style="margin-top: 10px;">
                    ${eventsData.map(event => `
                        <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <strong style="color: #7C6E4D; font-size: 15px;">${event.date || event.label}</strong>: <span style="font-size: 15px;">${event.description}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            ${videoUrl ? `
                <div style="margin-top: 10px; margin-bottom: 10px; text-align: center;">
                    <video 
                        width="300" 
                        height="464" 
                        autoplay 
                        controlsList="nodownload nofullscreen noremoteplayback" 
                        controls 
                        style="display: block; margin: 0 auto;">
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            ` : ''}
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    // Create the button
    const button = document.createElement('button');
    button.id = 'custom-bmc-button';
    button.className = 'custom-button';
    button.textContent = '❤️ Monthly donors will keep this site running ❤️';

    // Create the dropdown content
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
    dropdownContent.style.display = 'none'; // Initially hidden
    dropdownContent.style.position = 'fixed';
    dropdownContent.style.top = '50px'; // At the top of the page
    dropdownContent.style.left = '50%';
    dropdownContent.style.transform = 'translateX(-50%)';
    dropdownContent.style.backgroundColor = 'white';
    dropdownContent.style.padding = '20px';
    dropdownContent.style.border = '1px solid #ccc';
    dropdownContent.style.borderRadius = '8px';
    dropdownContent.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
    dropdownContent.style.fontSize = '14px';
    dropdownContent.style.lineHeight = '1.25'; // Slightly reduce line spacing
    dropdownContent.style.zIndex = '10000'; // Ensure it goes above everything else
    dropdownContent.style.maxWidth = '300px'; // Reduce width
    dropdownContent.style.textAlign = 'center'; // Center align all content
    dropdownContent.style.overflowY = 'auto'; // Make it scrollable

    dropdownContent.innerHTML = `
        <div class="project-info" style="margin-bottom: 15px;">
            Every time the map is loaded, it costs me money. This project has also taken more hours than you could possibly imagine.
        </div>
        <div class="project-info" style="margin-bottom: 15px;">
            I am independent and 22 years old, I want to keep the site free-for-use. Ultimately, the project will rely on generous monthly donors to keep it running for our beloved city ❤️
        </div>
        <div class="project-info" style="margin-bottom: 15px;">
            Make sure to click “Make this monthly” after your name and comment (or don’t, if you’re only wanting to give a one-time donation). Thank you all so much!
        </div>
        <button 
            class="support-button" 
            style="
                background-color: #9b4dca; 
                color: white; 
                padding: 10px 20px; 
                font-size: 16px; 
                font-weight: bold; 
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                text-align: center;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
                margin-bottom: 15px; /* Add spacing below the button */
            "
            onclick="window.open('https://www.buymeacoffee.com/britmap', '_blank')"
        >
            Support
        </button>
 <div style="display: flex; align-items: center; justify-content: center; margin-top: 15px; font-size: 16px; font-weight: bold;">
    <hr style="flex: 1; border: 1px solid #ccc; margin: 0 10px;">
    Our Donors ❤️
    <hr style="flex: 1; border: 1px solid #ccc; margin: 0 10px;">
</div>
<div id="donor-list" style="margin-top: 10px;"></div>

    `;

    // Wrap the button and dropdown in a container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'dropdown';
    dropdownContainer.style.position = 'fixed';
    dropdownContainer.style.left = '50%';
    dropdownContainer.style.top = '10px'; // Position at the top
    dropdownContainer.style.transform = 'translateX(-50%)';
    dropdownContainer.style.zIndex = '1001';
    dropdownContainer.appendChild(button);
    dropdownContainer.appendChild(dropdownContent);

    // Add the dropdown container to the body
    document.body.appendChild(dropdownContainer);

    // Function to add donors
    function addDonor(name, amount, subtext) {
        const donorList = document.getElementById('donor-list');
        const donorDiv = document.createElement('div');
        donorDiv.className = 'donor';
        donorDiv.innerHTML = `
            <span class="donor-name" style="font-weight: bold;">${name}</span>
            <span class="donor-amount" style="color: #9b4dca; margin-left: 10px; font-weight: bold;">£${amount}</span>
            <div class="donor-subtext" style="font-size: 12px; color: #666; margin-top: 1px;">${subtext}</div>
        `;
        donorDiv.style.marginBottom = '12px'; // Maintain gap between donors
        donorList.appendChild(donorDiv);
    }

    // Add example donors
       addDonor('Anonymous', '15', ' ');
    addDonor('Chip Pedro', '5', 'Will be very useful on our upcoming trip - really nice work!');
    addDonor('buffsteve24', '5', 'Amazing work!');
    addDonor('marksaw20', '5', 'Lovely map. Really interesting.');

    // Button click event to toggle dropdown visibility
    button.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdownContainer.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });

    // Set the dropdown width to match the button width
    dropdownContent.style.width = `${Math.max(button.offsetWidth, 300)}px`; // Match width with maxWidth
});
