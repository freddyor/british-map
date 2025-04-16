import { buildings } from './buildings.js';
import { locations } from './locations.js';
import { imageAttributions } from './imageAttributions.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';

// Function to parse URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Get parameters from URL
const lat = getUrlParameter('lat');
const lng = getUrlParameter('lng');
const zoom = getUrlParameter('zoom');

// Default York coordinates and zoom
const defaultCenter = [-1.0835104081554843, 53.95838745239521];
const defaultZoom = 15;

// Use URL parameters if available, otherwise use default values
const initialCenter = lat && lng ? [parseFloat(lng), parseFloat(lat)] : defaultCenter;
const initialZoom = zoom ? parseFloat(zoom) : defaultZoom;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/freddomate/cm8q8wtwx00a801qzdayccnvz',
    center: initialCenter,
    zoom: initialZoom,
    pitch: 45,
    bearing: -17.6
});

// Create a bottom sheet container
const bottomSheet = document.createElement('div');
bottomSheet.id = 'bottom-sheet';
bottomSheet.style.position = 'fixed';
bottomSheet.style.bottom = '-100%'; // Initially hidden
bottomSheet.style.left = '50%'; // Align to the left
bottomSheet.style.transform = 'translate(-50%)'; // Adjust position to align center both ways
bottomSheet.style.right = '50%';
bottomSheet.style.width = '75%';
bottomSheet.style.height = '80%'; // Adjust height as needed
bottomSheet.style.backgroundColor = '#fff';
bottomSheet.style.borderTop = '2px solid #ccc';
bottomSheet.style.boxShadow = '0 -6px 15px rgba(0, 0, 0, 0.3)';
bottomSheet.style.zIndex = '10000';
bottomSheet.style.transition = 'bottom 0.3s ease';
bottomSheet.style.borderRadius = '12px'; // Matches the popup's border-radius
bottomSheet.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)'; // Matches the popup's shadow
bottomSheet.style.backgroundColor = '#E9E8E0'; // Matches popup background color
bottomSheet.style.border = '2px solid #f0f0f0'; // Matches popup border
bottomSheet.style.fontFamily = "'Poppins', sans-serif"; // Matches popup font-family
bottomSheet.style.fontSize = '14px'; // Matches popup font size
bottomSheet.style.lineHeight = '1.05'; // Matches popup line height
bottomSheet.style.padding = '1px'; // Matches popup padding
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
map.on('click', (e) => {
    const currentLat = e.lngLat.lat;
    const currentLng = e.lngLat.lng;
    const currentZoom = map.getZoom();

    const mapLink = generateMapLink(currentLat, currentLng, currentZoom);
    console.log('Map Link:', mapLink);
    // You can display this link in a popup or share it with others
});

map.on('load', () => {
    addBuildingMarkers();
    addLocationsList();
    loadMarkersFromFirebase();
    geolocate.trigger();
});

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

function addLocationsList() {
    const list = document.createElement('ul');
    list.style.listStyleType = 'none';
    list.style.padding = '0';
    list.style.margin = '0';
    list.style.fontSize = '12px';
    list.style.lineHeight = '0.25';

    const sortedLocations = [...locations].sort((a, b) => a.name.localeCompare(b.name));

    sortedLocations.forEach(location => {
        const listItem = document.createElement('li');
        listItem.textContent = location.name;
        listItem.style.cursor = 'pointer';
        listItem.style.padding = '5px';

        listItem.addEventListener('click', () => {
            map.flyTo({
                center: location.coords,
                zoom: 20
            });
             openableContainer.style.display = 'none';
        });
        list.appendChild(listItem);
    });
    
    openableContainer.innerHTML = '';
    openableContainer.style.maxHeight = '150px';
    openableContainer.style.overflowY = 'scroll';
    openableContainer.style.scrollbarWidth = 'none';
    openableContainer.style.msOverflowStyle = 'none';
    openableContainer.appendChild(list);

    openableContainer.classList.add('hide-scrollbar');
}

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
    z-index: 2;
  }

  .building-marker {
    z-index: 1;
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
`;

// Append the style to the document
document.head.appendChild(stylePopup);

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

function createCustomMarker(imageUrl, color = '#9b4dca', isLocation = false) {
  const markerDiv = document.createElement('div');
  markerDiv.className = 'custom-marker';
  markerDiv.style.width = '3em';
  markerDiv.style.height = '3em';
  markerDiv.style.position = 'absolute';
  markerDiv.style.borderRadius = '50%';
  markerDiv.style.border = `0.25em solid ${color}`;
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
            toggleBottomSheet(); // Close when the button is clicked
        });
    }
    isBottomSheetOpen = !isBottomSheetOpen;
}

function createPopupContent(location, isFirebase = false) {
    const data = isFirebase ? location : location;
    const eventsData = isFirebase ? data.events : data.events;

    // Check if videoUrl property exists and is not empty
    const videoUrl = data.videoUrl ? data.videoUrl : null;

    // Exclude the "tldr" if the videoUrl is present
    const tldrContent = !videoUrl
        ? `<p style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 15px;">${data.tldr}</p>`
        : '';

    return `
        <div style="padding: 0; margin: 0;">
            <p style="font-size: 15px; font-weight: bold; margin-bottom: 10px;">${data.description}</p>
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${data.image || data.imageUrl}" alt="${data.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />
                <div>
                    <div style="font-size: 15px; font-weight: bold; margin-top: 0;">${data.name}</div>
                    <div style="font-size: 15px; color: #666;">${data.occupation || data.dates}</div>
                </div>
            </div>
            ${tldrContent}
            ${eventsData && eventsData.length ? `
                <div style="margin-top: 10px;">
                    ${eventsData.map(event => `
                        <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <strong style="color: #9b4dca; font-size: 15px;">${event.date || event.label}</strong>: <span style="font-size: 15px;">${event.description}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        ${videoUrl ? `
<div style="margin-top: 10px; margin-bottom: 10px; text-align: center;">
<video 
    width="262" 
    height="464" 
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
locations.forEach(location => {
    const { element: markerElement } = createCustomMarker(location.image, '#9B4DCA', true);
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

function addBuildingMarkers() {
    buildings.forEach(building => {
        const { element: markerElement } = createCustomMarker(building.image, '#C72481', false);
        markerElement.className += ' building-marker';
        const marker = new mapboxgl.Marker({
            element: markerElement
        })
        .setLngLat(building.coords)
        .addTo(map);

        marker.getElement().addEventListener('click', () => {
            map.getCanvas().style.cursor = 'pointer';
            const contentHTML = createPopupContent(building);
            toggleBottomSheet(contentHTML);
        });
    });
}
// New code for the "Image Attributions" button
const imageAttributionsButton = document.createElement('button');
imageAttributionsButton.id = 'image-attributions-button';
imageAttributionsButton.className = 'custom-button';
imageAttributionsButton.textContent = 'Image Attributions';

// Position the new button at the bottom of the page
imageAttributionsButton.style.position = 'fixed';
imageAttributionsButton.style.bottom = '10px'; // Adjust the bottom position as needed
imageAttributionsButton.style.left = '50%';
imageAttributionsButton.style.transform = 'translateX(-50%)';

// Add the new button to the document body
document.body.appendChild(imageAttributionsButton);

// Function to display or hide image attributions
function toggleImageAttributions() {
  let attributionsContainer = document.getElementById('attributions-container');

  if (attributionsContainer) {
    // If the container exists, toggle its visibility
    if (attributionsContainer.style.display === 'none' || attributionsContainer.style.display === '') {
      attributionsContainer.style.display = 'block';
    } else {
      attributionsContainer.style.display = 'none';
    }
  } else {
    // If the container does not exist, create it
    attributionsContainer = document.createElement('div');
    attributionsContainer.id = 'attributions-container';
    attributionsContainer.style.position = 'fixed';
    attributionsContainer.style.bottom = '70px';
    attributionsContainer.style.left = '50%';
    attributionsContainer.style.transform = 'translateX(-50%)';
    attributionsContainer.style.backgroundColor = 'white';
    attributionsContainer.style.padding = '10px';
    attributionsContainer.style.border = '1px solid #ccc';
    attributionsContainer.style.borderRadius = '8px';
    attributionsContainer.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
    attributionsContainer.style.fontSize = '12px';
    attributionsContainer.style.lineHeight = '1.05';
    attributionsContainer.style.zIndex = '10000'; // Ensure it goes above everything else
    attributionsContainer.style.maxHeight = '200px'; // Set a max height
    attributionsContainer.style.overflowY = 'scroll'; // Make it scrollable

    imageAttributions.forEach(image => {
      const imageElement = document.createElement('p');
      imageElement.innerHTML = `<strong>${image.name}</strong> by ${image.author} - ${image.license}`;
      attributionsContainer.appendChild(imageElement);
    });

    document.body.appendChild(attributionsContainer);
  }
}

// Event listener for the new button
document.getElementById('image-attributions-button').addEventListener('click', toggleImageAttributions);

function loadMarkersFromFirebase() {
  getDocs(collection(db, 'markers')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Fetched marker data:', data); // Add this line
      const { element: markerElement } = createCustomMarker(data.imageUrl, '#E9E8E0', false);
      const marker = new mapboxgl.Marker({
        element: markerElement
      })
        .setLngLat([data.longitude, data.latitude])
        .addTo(map);

      const popupHTML = `
        <div style="padding-top: 10px; padding-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${data.imageUrl}" alt="${data.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />
            <div>
              <div style="font-size: 15px; font-weight: bold;">${data.name}</div>
              <div style="font-size: 15px; color: #666;">${data.dates}</div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 5px; cursor: pointer;" id="expand-text">â–¼ Discover â–¼</div>
          <div id="additional-content" style="display: none;">
            <p style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 15px; font-weight: bold;">${data.tldr}</p>
            ${data.events.map(event => `
              <div style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 15px;">
                <strong style="color: #9b4dca; font-size: 15px; display: block; margin-bottom: 2px;">${event.label}</strong>
                ${event.description}
              </div>
            `).join('')}
            <div style="text-align: center; cursor: pointer; margin-top: 10px;" id="collapse-text">â–² Hide â–²</div>
          </div>
        </div>
      `;
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
        className: 'custom-popup'
      }).setHTML(popupHTML);

      marker.setPopup(popup);

      marker.getElement().addEventListener('click', () => {
        map.getCanvas().style.cursor = 'pointer';
        popup.addTo(map);

        popup.on('open', () => {
          const expandText = popup.getElement().querySelector('#expand-text');
          const additionalContent = popup.getElement().querySelector('#additional-content');
          const collapseText = popup.getElement().querySelector('#collapse-text');

          expandText.addEventListener('click', () => {
            additionalContent.style.display = 'block';
            expandText.style.display = 'none';
          });

          collapseText.addEventListener('click', () => {
            additionalContent.style.display = 'none';
            expandText.style.display = 'block';
          });
        });
      });
    });
  }).catch(error => {
    console.error('Error loading markers: ', error);
  });
}
