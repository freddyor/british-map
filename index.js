import { buildings } from './buildings.js';
import { locations } from './locations.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjv5uUNOx86FvYsXdKSMkl8vui2Jynt7M",
    authDomain: "britmap-64cb3.firebaseapp.com",
    projectId: "britmap-64cb3",
    storageBucket: "britmap-64cb3.firebasestorage.app",
    messagingSenderId: "821384262397",
    appId: "1:821384262397:web:ca81d64ab6a8dea562c494",
    measurementId: "G-03E2BB7BQH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/freddomate/cm785h0qv00cf01r0e8xxaxbc',
    center: [-1.0820, 53.9623],
    zoom: 15,
    pitch: 45,
    bearing: -17.6
});

map.on('load', () => {
    addBuildingMarkers();
    addLocationsList(); // Add this line to create the list when the map loads
    loadMarkersFromFirebase(); // Load markers from Firebase on map load
    geolocate.trigger(); // Trigger geolocation on map load
});

// Load markers from Firebase
function loadMarkersFromFirebase() {
    database.ref('markers').on('value', (snapshot) => {
        const markers = snapshot.val();
        if (markers) {
            // Clear existing markers
            Object.keys(markers).forEach(key => {
                if (map.getLayer(key)) {
                    map.removeLayer(key);
                    map.removeSource(key);
                }
            });

            Object.entries(markers).forEach(([key, markerData]) => {
                addMarkerToMap(markerData.title, markerData.lat, markerData.lng, key);
            });
        }
    });
}

// Function to add a marker to the map
function addMarkerToMap(title, lat, lng, markerId) {
    const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${title}</h3>`))
        .addTo(map);
}

// Container for both buttons
const buttonGroup = document.createElement('div');
buttonGroup.id = 'button-group';
buttonGroup.style.position = 'fixed';
buttonGroup.style.left = '50%';
buttonGroup.style.top = '50px';
buttonGroup.style.transform = 'translateX(-50%)';
buttonGroup.style.zIndex = '1000';
buttonGroup.style.display = 'flex'; // Use flex to arrange buttons horizontally
buttonGroup.style.gap = '10px'; // Space between the buttons
document.body.appendChild(buttonGroup);

// Find People button
const toggleContainerButton = document.createElement('button');
toggleContainerButton.id = 'toggle-container-button';
toggleContainerButton.textContent = 'Find people 🔍';
toggleContainerButton.className = 'custom-button';
buttonGroup.appendChild(toggleContainerButton); // Add to buttonGroup

// Add data button
const addDataButton = document.createElement('button');
addDataButton.id = 'add-data-button';
addDataButton.textContent = 'Add data ➕';
addDataButton.className = 'custom-button';
buttonGroup.appendChild(addDataButton); // Add to buttonGroup

const openableContainer = document.createElement('div');
openableContainer.id = 'openable-container';
openableContainer.style.display = 'none';
openableContainer.style.position = 'fixed';
openableContainer.style.left = '50%';
openableContainer.style.top = '80px';
openableContainer.style.transform = 'translateX(-50%)';
openableContainer.style.zIndex = '999';
openableContainer.style.backgroundColor = '#fff';
openableContainer.style.border = '2px solid #f0f0f0';
openableContainer.style.borderRadius = '8px';
openableContainer.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
openableContainer.style.padding = '10px';
openableContainer.style.width = '200px';
openableContainer.style.textAlign = 'center';
//openableContainer.textContent = 'This is an openable container!';  Remove this line
document.body.appendChild(openableContainer);

toggleContainerButton.addEventListener('click', () => {
    if (openableContainer.style.display === 'none' || openableContainer.style.display === '') {
        openableContainer.style.display = 'block';
        toggleContainerButton.textContent = 'Find people 🔍';
    } else {
        openableContainer.style.display = 'none';
        toggleContainerButton.textContent = 'Find people 🔍';
    }
});

addDataButton.addEventListener('click', () => {
    window.open('https://forms.gle/1gS4BZhRk3fRjhjMA', '_blank');
});

// Function to add the list of locations to the openable container
function addLocationsList() {
    const list = document.createElement('ul');
    list.style.listStyleType = 'none';
    list.style.padding = '0';
    list.style.margin = '0';
    list.style.fontSize = '12px';
    list.style.lineHeight = '0.25';

    // Sort locations alphabetically by name
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
    openableContainer.style.scrollbarWidth = 'none'; // Hide scrollbar for Firefox
    openableContainer.style.msOverflowStyle = 'none';  // Hide scrollbar for IE and Edge
    openableContainer.appendChild(list);

    // Hide scrollbar for Chrome, Safari and Opera
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
        maxZoom: 5
    },
    showUserLocation: false // Disable the default blue dot
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

const userLocationMarker = new mapboxgl.Marker({ element: userLocationEl })
    .setLngLat([0, 0]) // Set initial coordinates, will be updated later
    .addTo(map);

geolocate.on('error', (e) => {
    if (e.code === 1) {
        console.log('Location access denied by user');
        // You can update UI or take other actions here
    }// Prevent the default error pop-up
});

geolocate.on('geolocate', (e) => {
    const lon = e.coords.longitude;
    const lat = e.coords.latitude;
    const position = [lon, lat];
    console.log(position);

    // Update the user location marker position
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

locations.forEach(location => {
    const { element: markerElement, id } = createCustomMarker(location.image, '#9B4DCA', true);
    markerElement.className += ' location-marker';
    const marker = new mapboxgl.Marker({
        element: markerElement
    })
        .setLngLat(location.coords)
        .addTo(map);

    const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
        className: 'custom-popup'
    }).setHTML(`
    <p style="font-size: 6px; font-weight: bold; margin-bottom: 10px;">${location.description}</p>
    <div style="border-top: 1px solid #ccc; margin-bottom: 10px;"></div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <img src="${location.image}" alt="${location.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />
      <div>
        <div style="font-size: 16px; font-weight: bold;">${location.name}</div>
        <div style="font-size: 14px; color: #666;">${location.occupation}</div>
      </div>
    </div>
    <p style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;">${location.tldr}</p>
    ${location.events.length ? `
      <div style="margin-top: 10px;">
        ${location.events.map(event => `
          <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #9b4dca; font-size: 14px;">${event.date}</strong>: <span style="font-size: 12px;">${event.description}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `);

    marker.setPopup(popup);

    marker.getElement().addEventListener('click', () => {
        map.getCanvas().style.cursor = 'pointer';
        popup.addTo(map);
    });
});

function addBuildingMarkers() {
    buildings.forEach(building => {
        const { element: markerElement, id } = createCustomMarker(building.image, '#E9E8E0', false);
        markerElement.className += ' building-marker';
        const marker = new mapboxgl.Marker({
            element: markerElement
        })
            .setLngLat(building.coords)
            .addTo(map);

        const popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true,
            className: 'custom-popup'
        }).setHTML(`
      <p style="font-size: 6px; font-weight: bold; margin-bottom: 10px;">${building.description}</p>
      <div style="border-top: 1px solid #ccc; margin-bottom: 10px;"></div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${building.image}" alt="${building.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />
        <div>
          <div style="font-size: 16px; font-weight: bold;">${building.name}</div>
          <div style="font-size: 14px; color: #666;">${building.occupation}</div>
        </div>
      </div>
      <p style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;">${building.tldr}</p>
      ${building.events.length ? `
        <div style="margin-top: 10px;">
          ${building.events.map(event => `
            <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <strong style="color: #9b4dca; font-size: 14px;">${event.date}</strong>: <span style="font-size: 12px;">${event.description}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `);

        marker.setPopup(popup);

        marker.getElement().addEventListener('click', () => {
            map.getCanvas().style.cursor = 'pointer';
            popup.addTo(map);
        });
    });
}

// Add marker function
document.getElementById('addMarkerBtn').addEventListener('click', function (e) {
    e.preventDefault();
    const title = document.getElementById('markerTitle').value;
    const lat = parseFloat(document.getElementById('markerLat').value);
    const lng = parseFloat(document.getElementById('markerLng').value);

    if (title && !isNaN(lat) && !isNaN(lng)) {
        addMarkerToFirebase(title, lat, lng);
        document.getElementById('markerForm').reset();
    }
});

// Function to add a marker to Firebase
function addMarkerToFirebase(title, lat, lng) {
    database.ref('markers').push({
        title: title,
        lat: lat,
        lng: lng
    });
}
