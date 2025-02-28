import { buildings } from './buildings.js';
import { locations } from './locations.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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
  addLocationsList();
  geolocate.trigger();
  loadMarkersFromFirebase(); // Load markers from Firebase
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

// Find People button
const toggleContainerButton = document.createElement('button');
toggleContainerButton.id = 'toggle-container-button';
toggleContainerButton.textContent = 'Find people 🔍';
toggleContainerButton.className = 'custom-button';
buttonGroup.appendChild(toggleContainerButton);

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

#add-marker-modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  #add-marker-modal .popup-container {
    font-family: 'Poppins', sans-serif;
    background: #E9E8E0;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    line-height: 1.05; /* ADDED: Match popup line height */
    width: 300px;
  }

  #add-marker-modal label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  #add-marker-modal input[type=text],
  #add-marker-modal textarea {
    width: 100%;
    padding: 6px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    line-height: 1.05; /* ADDED: Match popup line height */
  }

  #add-marker-modal button {
    background-color: #9b4dca;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    margin-top: 5px;
    margin-right: 5px;
  }

  #add-marker-modal button:hover {
    background-color: #7c3ba5;
  }

  #add-marker-modal .input-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  #add-marker-modal .input-row label {
    margin-bottom: 5px;
  }

  #add-marker-modal .input-row input,
  #add-marker-modal .input-row textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    line-height: 1.05; /* ADDED: Match popup line height */
  }

  #add-marker-modal .coordinates-container {
    display: flex;
    justify-content: space-between;
  }

  #add-marker-modal .coordinates-container .input-row {
    width: 48%;
  }

  .rounded-box {
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .image-name-container {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
  }

  .image-name-container img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
  }

  .image-name-container div {
      display: flex;
      flex-direction: column;
  }

  .image-name-container div div:first-child {
      font-size: 16px;
      font-weight: bold;
  }

  .image-name-container div div:last-child {
      font-size: 14px;
      color: #666;
  }

  #add-marker-modal .rounded-box textarea,
  #add-marker-modal .rounded-box input[type="text"] {
    border: none;
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    resize: none;
  }

  #image-upload-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  #image-upload-circle span {
    font-size: 24px;
    color: #666;
  }

  #add-marker-modal input[type="text"] {
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
  }

  #add-marker-modal input[type="text"]:focus {
    outline: none;
  }

    .event-card {
    position: relative;
    margin-bottom: 5px; /* Reduced margin to half */
  }
  .event-card input[type="text"] {
    font-size: 12px;
    margin-bottom: 2px;
  }
  .event-card textarea {
    margin-top: 0;
  }
  .remove-event {
    position: absolute;
    top: 2px; 
    right: 2px; 
    font-size: 10px;
    padding: 1px 3px; 
    color: #007bff; /* Default link color */
    text-decoration: underline; /* Optional: Underline for clarity */
    cursor: pointer; /* Show pointer cursor on hover */
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

locations.forEach(location => {
  const { element: markerElement } = createCustomMarker(location.image, '#9B4DCA', true);
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
    const { element: markerElement } = createCustomMarker(building.image, '#E9E8E0', false);
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

// Add Marker button
const addMarkerButton = document.createElement('button');
addMarkerButton.id = 'add-marker-button';
addMarkerButton.textContent = '+ Add marker';
addMarkerButton.className = 'custom-button';
buttonGroup.appendChild(addMarkerButton);

// Modal container
const modal = document.createElement('div');
modal.id = 'add-marker-modal';
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.top = '50%';
modal.style.left = '50%';
modal.style.transform = 'translate(-50%, -50%)';
modal.style.zIndex = '1001';
document.body.appendChild(modal);

// Modal content container
const popupContainer = document.createElement('div');
popupContainer.className = 'popup-container';
modal.appendChild(popupContainer);

// Close button
const closeModalButton = document.createElement('button');
closeModalButton.id = 'close-modal';
closeModalButton.textContent = 'Close';
popupContainer.appendChild(closeModalButton);

// Title input
const titleLabel = document.createElement('label');
titleLabel.textContent = 'Title:';
popupContainer.appendChild(titleLabel);
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.id = 'title';
popupContainer.appendChild(titleInput);

// Description input
const descriptionLabel = document.createElement('label');
descriptionLabel.textContent = 'Description:';
popupContainer.appendChild(descriptionLabel);
const descriptionInput = document.createElement('textarea');
descriptionInput.id = 'description';
popupContainer.appendChild(descriptionInput);

// Coordinates container
const coordinatesContainer = document.createElement('div');
coordinatesContainer.className = 'coordinates-container';
popupContainer.appendChild(coordinatesContainer);

// Latitude input
const latitudeRow = document.createElement('div');
latitudeRow.className = 'input-row';
coordinatesContainer.appendChild(latitudeRow);
const latitudeLabel = document.createElement('label');
latitudeLabel.textContent = 'Latitude:';
latitudeRow.appendChild(latitudeLabel);
const latitudeInput = document.createElement('input');
latitudeInput.type = 'text';
latitudeInput.id = 'latitude';
latitudeRow.appendChild(latitudeInput);

// Longitude input
const longitudeRow = document.createElement('div');
longitudeRow.className = 'input-row';
coordinatesContainer.appendChild(longitudeRow);
const longitudeLabel = document.createElement('label');
longitudeLabel.textContent = 'Longitude:';
longitudeRow.appendChild(longitudeLabel);
const longitudeInput = document.createElement('input');
longitudeInput.type = 'text';
longitudeInput.id = 'longitude';
longitudeRow.appendChild(longitudeInput);

// Events container
const eventsLabel = document.createElement('label');
eventsLabel.textContent = 'Events:';
popupContainer.appendChild(eventsLabel);

const eventsContainer = document.createElement('div');
eventsContainer.id = 'events-container';
popupContainer.appendChild(eventsContainer);

// Add event button
const addEventButton = document.createElement('button');
addEventButton.id = 'add-event';
addEventButton.textContent = 'Add Event';
popupContainer.appendChild(addEventButton);

// Submit button
const submitMarkerButton = document.createElement('button');
submitMarkerButton.id = 'submit-marker';
submitMarkerButton.textContent = 'Submit';
popupContainer.appendChild(submitMarkerButton);

let markers = [];
let currentPopup = null;
let eventCounter = 0;

function addEventCard() {
  eventCounter++;
  const eventCard = document.createElement('div');
  eventCard.className = 'event-card';
  eventCard.id = `event${eventCounter}-card`;
  eventCard.innerHTML = `
    <input type="text" id="event${eventCounter}-title" placeholder="Event Title">
    <textarea id="event${eventCounter}-description" placeholder="Event Description"></textarea>
    <a href="#" class="remove-event" data-event="${eventCounter}">Remove</a>
  `;
  eventsContainer.appendChild(eventCard);

  // Add event listener to the new remove button
  const removeButton = eventCard.querySelector('.remove-event');
  removeButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    const eventNumber = e.target.getAttribute('data-event');
    const eventCard = document.getElementById(`event${eventNumber}-card`);
    eventCard.style.display = 'none';
  });
}

addEventButton.addEventListener('click', addEventCard);

addMarkerButton.addEventListener('click', () => {
  // Set default coordinates based on map center
  const center = map.getCenter();
  latitudeInput.value = center.lat.toFixed(6);
  longitudeInput.value = center.lng.toFixed(6);
  modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Function to add a marker to Firebase
function addMarkerToFirebase(lat, lng, title, description, events) {
    const markersRef = ref(database, 'markers');
    const newMarkerRef = push(markersRef);
    set(newMarkerRef, {
        lat: lat,
        lng: lng,
        title: title,
        description: description,
        events: events
    });
}

submitMarkerButton.addEventListener('click', () => {
    const lat = parseFloat(latitudeInput.value);
    const lng = parseFloat(longitudeInput.value);
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (isNaN(lat) || isNaN(lng) || !title || !description) {
        alert('Please fill in all fields with valid data.');
        return;
    }

    // Collect event data
    const events = [];
    for (let i = 1; i <= eventCounter; i++) {
        const eventTitleInput = document.getElementById(`event${i}-title`);
        const eventDescriptionInput = document.getElementById(`event${i}-description`);
        if (eventTitleInput && eventDescriptionInput) {
            const eventTitle = eventTitleInput.value;
            const eventDescription = eventDescriptionInput.value;
            if (eventTitle && eventDescription) {
                events.push({ title: eventTitle, description: eventDescription });
            }
        }
    }

    // Add marker to Firebase
    addMarkerToFirebase(lat, lng, title, description, events);

    // Clear form and hide modal
    titleInput.value = '';
    descriptionInput.value = '';
    eventsContainer.innerHTML = '';
    eventCounter = 0;
    modal.style.display = 'none';
});

map.on('click', (e) => {
  latitudeInput.value = e.lngLat.lat.toFixed(6);
  longitudeInput.value = e.lngLat.lng.toFixed(6);
  modal.style.display = 'block';
});

document.querySelectorAll('.remove-event').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    const eventNumber = e.target.getAttribute('data-event');
    const eventCard = document.getElementById(`event${eventNumber}-card`);
    eventCard.style.display = 'none';
  });
});

// Function to load markers from Firebase
function loadMarkersFromFirebase() {
    const markersRef = ref(database, 'markers');

    onValue(markersRef, (snapshot) => {
        // Clear existing markers
        markers.forEach(marker => marker.remove());
        markers = [];

        snapshot.forEach((childSnapshot) => {
            const markerData = childSnapshot.val();
            const marker = new mapboxgl.Marker()
                .setLngLat([markerData.lng, markerData.lat])
                .setPopup(new mapboxgl.Popup().setHTML(`
                    <h3>${markerData.title}</h3>
                    <p>${markerData.description}</p>
                    ${markerData.events.map(event => `<p><strong>${event.title}:</strong> ${event.description}</p>`).join('')}
                `))
                .addTo(map);
            markers.push(marker);
        });
    });
}
