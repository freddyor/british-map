// Import statements
import { buildings } from './buildings.js';
import { locations } from './locations.js';

// Dynamically load Mapbox GL JS CSS
const mapboxCSS = document.createElement('link');
mapboxCSS.href = "./assets/mapbox-gl/mapbox-gl.css";
mapboxCSS.rel = "stylesheet";
document.head.appendChild(mapboxCSS);

// Dynamically load Mapbox GL JS JavaScript
const mapboxScript = document.createElement('script');
mapboxScript.src = "./assets/mapbox-gl/mapbox-gl.js";
mapboxScript.defer = true;
mapboxScript.onload = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';
    initializeMap();
};
document.body.appendChild(mapboxScript);

// Function to parse URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const defaultCenter = [-1.0835104081554843, 53.95838745239521]; // Default York coordinates
const lat = getUrlParameter('lat');
const lng = getUrlParameter('lng');
const zoom = getUrlParameter('zoom');
const initialCenter = lat && lng ? [parseFloat(lng), parseFloat(lat)] : defaultCenter;
const initialZoom = zoom ? parseFloat(zoom) : 15;

// Create a bottom sheet container
const bottomSheet = document.createElement('div');
bottomSheet.id = 'bottom-sheet';
Object.assign(bottomSheet.style, {
    position: 'fixed',
    bottom: '-100%',
    left: '50%',
    transform: 'translate(-50%)',
    width: '96%',
    height: '40%',
    backgroundColor: '#E9E8E0',
    borderTop: '2px solid #ccc',
    boxShadow: '0 -6px 15px rgba(0, 0, 0, 0.3)',
    zIndex: '10000',
    transition: 'bottom 0.3s ease',
    borderRadius: '12px 12px 0 0',
    border: '2px solid #f0f0f0',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
    lineHeight: '1.05',
    padding: '5px',
    overflowY: 'auto'
});
document.body.appendChild(bottomSheet);

// Container for both buttons
const buttonGroup = document.createElement('div');
buttonGroup.id = 'button-group';
Object.assign(buttonGroup.style, {
    position: 'fixed',
    left: '50%',
    top: '50px',
    transform: 'translateX(-50%)',
    zIndex: '1000',
    display: 'flex',
    gap: '10px'
});
document.body.appendChild(buttonGroup);

// Google Fonts for Poppins
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Custom styles
const stylePopup = document.createElement('style');
stylePopup.innerHTML = `
  .mapboxgl-popup-content {
    border-radius: 12px !important;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3) !important;
    padding: 10px !important;
    font-family: 'Poppins', sans-serif !important;
    background: #E9E8E0;
    border: 2px solid #f0f0f0 !important;
    line-height: 1.05;
    margin-left: 3px;
    margin-right: 5px;
    margin-bottom: 10px;
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
  .mapboxgl-popup-close-button { display: none !important; }
  .user-location-marker {
    width: 20px; height: 20px; background-color: white;
    border: 3px solid #87CEFA; border-radius: 100%; position: relative;
  }
  .location-marker { z-index: 1; }
  .building-marker { z-index: 2; }
  .mapboxgl-popup { z-index: 9999 !important; }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .custom-button {
    background-color: #e9e8e0; color: black; border: 2px solid #f0f0f0;
    padding: 3px 8px; font-size: 12px; font-weight: bold; border-radius: 8px;
    cursor: pointer; text-decoration: none; display: inline-block;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); white-space: nowrap; text-align: center;
  }
  #button-group { position: fixed; top: 50px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 10px; z-index: 1000; }
  #bottom-sheet img { max-width: 100%; border-radius: 8px; margin-bottom: 10px; }
  #bottom-sheet p { margin-bottom: 10px; }
`;
document.head.appendChild(stylePopup);

// --- Marker and Popup Utilities ---
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

// --- Popup Content Generator ---
function createPopupContent(data) {
    let html = `<h3>${data.name || ''}</h3>`;
    if (data.image) html += `<img src="${data.image}" alt="${data.name || ''}" />`;
    if (data.tldr) html += `<p>${data.tldr}</p>`;
    if (data.videoUrl) html += `<p><a href="${data.videoUrl}" target="_blank">Watch Video</a></p>`;
    return html;
}


// --- Map Link Generator ---
function generateMapLink(latitude, longitude, zoomLevel) {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = `?lat=${latitude}&lng=${longitude}&zoom=${zoomLevel}`;
    return baseUrl + params;
}

// --- Map Initialization ---
function initializeMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/freddomate/cm8q8wtwx00a801qzdayccnvz',
        center: initialCenter,
        zoom: initialZoom,
        pitch: 45,
        bearing: -17.6
    });

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: false,
      fitBoundsOptions: { maxZoom: 15 },
      showUserLocation: false
    });
    map.addControl(geolocate);

    // Create a single marker for user location
    const userLocationEl = document.createElement('div');
    userLocationEl.className = 'user-location-marker';
    const textEl = document.createElement('div');
    Object.assign(textEl.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 'bold',
        fontSize: '10px',
        color: '#87CEFA'
    });
    textEl.textContent = 'me';
    userLocationEl.appendChild(textEl);

    const userLocationMarker = new mapboxgl.Marker({ element: userLocationEl })
        .setLngLat([0, 0])
        .addTo(map);

    geolocate.on('geolocate', (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude;
        const position = [lon, lat];
        userLocationMarker.setLngLat(position);
    });

    geolocate.on('error', (e) => {
        if (e.code === 1) {
            console.log('Location access denied by user');
        }
    });

    map.on('load', () => {
        addBuildingMarkers(map);
        addLocationMarkers(map);
        geolocate.trigger();
        scaleMarkersBasedOnZoom(map);
    });

    map.on('zoom', () => {
        scaleMarkersBasedOnZoom(map);
    });

    map.on('click', (e) => {
        const currentLat = e.lngLat.lat;
        const currentLng = e.lngLat.lng;
        const currentZoom = map.getZoom();
        const mapLink = generateMapLink(currentLat, currentLng, currentZoom);
        console.log('Map Link:', mapLink);
    });

    // --- Marker Logic ---
    function addLocationMarkers(map) {
        locations.forEach(location => {
            const { element: markerElement } = createCustomMarker(location.image, '#FFFFFF', true);
            markerElement.className += ' location-marker';
            const marker = new mapboxgl.Marker({ element: markerElement })
                .setLngLat(location.coords)
                .addTo(map);

            marker.getElement().addEventListener('click', () => {
                map.getCanvas().style.cursor = 'pointer';
                const contentHTML = createPopupContent(location);
                toggleBottomSheet(contentHTML);
            });
        });
    }

    function addBuildingMarkers(map) {
        buildings.forEach(building => {
            const outlineColor = building.colour === "yes" ? '#FF69B4' : '#FFFFFF';
            const { element: markerElement } = createCustomMarker(building.image, outlineColor, false);
            markerElement.className += ' building-marker';
            if (building.colour === "yes") markerElement.style.zIndex = '3';

            const marker = new mapboxgl.Marker({ element: markerElement })
                .setLngLat(building.coords)
                .addTo(map);

            marker.getElement().addEventListener('click', () => {
                map.getCanvas().style.cursor = 'pointer';
                const videoUrl = building.videoUrl;
                if (videoUrl) {
                    const videoElement = document.createElement('video');
                    videoElement.src = videoUrl;
                    videoElement.style.display = 'none';
                    videoElement.controls = true;
                    videoElement.autoplay = true;
                    document.body.appendChild(videoElement);
                    videoElement.play();
                    if (videoElement.requestFullscreen) videoElement.requestFullscreen();
                    videoElement.addEventListener('ended', () => {
                        document.body.removeChild(videoElement);
                    });
                } else {
                    const contentHTML = createPopupContent(building);
                    toggleBottomSheet(contentHTML);
                }
            });
        });
    }

    function scaleMarkersBasedOnZoom(map) {
        const zoomLevel = map.getZoom();
        const markerSize = (zoomLevel - 13) + 'em';
        document.querySelectorAll('.location-marker, .building-marker').forEach(marker => {
            marker.style.width = markerSize;
            marker.style.height = markerSize;
        });
    }
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
