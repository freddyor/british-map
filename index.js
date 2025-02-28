import { buildings } from './buildings.js';
import { locations } from './locations.js';

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
  geolocate.trigger(); // Trigger geolocation on map load
});

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
    line-height: 1.05;
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
  }

  #add-marker-modal .coordinates-container {
    display: flex;
    justify-content: space-between;
  }

  #add-marker-modal .coordinates-container .input-row {
    width: 48%;
  }
  /* Add styling for the rounded box */
  .rounded-box {
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Style for the image and name/date */
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

const userLocationMarker = new mapboxgl.Marker({element: userLocationEl})
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
modal.style.backgroundColor = 'white';
modal.style.padding = '20px';
modal.style.border = '1px solid #ccc';
modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
modal.style.zIndex = '1001'; // Ensure it's on top
document.body.appendChild(modal);

// Editable Popup Structure
const popupContainer = document.createElement('div');
popupContainer.className = 'popup-container';
popupContainer.innerHTML = `
  <div class="rounded-box">
    <label for="popup-image">Image:</label>
    <input type="file" id="popup-image" accept="image/*">
    <img id="image-preview" src="" alt="Image preview" style="max-width: 100%; display: none; border-radius: 8px; margin-top: 5px;">
  </div>

  <div class="rounded-box">
    <div class="image-name-container">
      <img src="" alt="Profile" id="profile-image">
      <div>
        <div><input type="text" id="popup-name" placeholder="Name" value="Elizabeth Montagu"></div>
        <div><input type="text" id="popup-dates" placeholder="Dates" value="1718-1800"></div>
      </div>
    </div>
  </div>

  <div class="rounded-box">
    <label for="popup-description">Description:</label>
    <textarea id="popup-description" placeholder="Description" style="width: 100%; box-sizing: border-box; font-size: 13px;">Elizabeth Montagu was raised here in Treasurer's House</textarea>
  </div>

  <div class="rounded-box">
    <label style="color: #9b4dca;" for="popup-wealth">WEALTH:</label>
    <textarea id="popup-wealth" placeholder="Wealth" style="width: 100%; box-sizing: border-box; font-size: 12px;">Elizabeth married into the extremely wealthy Montagu family. She inherited substantial amounts upon her husband's death</textarea>
  </div>

  <div class="rounded-box">
    <label style="color: #9b4dca;" for="popup-legacy">LEGACY:</label>
    <textarea id="popup-legacy" placeholder="Legacy" style="width: 100%; box-sizing: border-box; font-size: 12px;">Elizabeth and the Bluestockings were mentioned in the works of most future women's rights activists.</textarea>
  </div>

  <div class="coordinates-container">
    <div class="input-row">
      <label for="popup-longitude">Longitude:</label>
      <input type="number" id="popup-longitude" placeholder="Longitude" step="any">
    </div>

    <div class="input-row">
      <label for="popup-latitude">Latitude:</label>
      <input type="number" id="popup-latitude" placeholder="Latitude" step="any">
    </div>
  </div>

  <button id="add-popup-marker">Add Marker</button>
  <button id="cancel-popup-marker">Cancel</button>
`;

modal.appendChild(popupContainer);

// Add event listener to the "Add Marker" button
addMarkerButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Handle image upload preview for main image
const popupImage = document.getElementById('popup-image');
const imagePreview = document.getElementById('image-preview');

popupImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            // Also update the profile image
            document.getElementById('profile-image').src = e.target.result;
        }

        reader.readAsDataURL(file);
    }
});

// Event listener for the "Add Marker" button in the modal
document.getElementById('add-popup-marker').addEventListener('click', () => {
  // Get the popup data
  const name = document.getElementById('popup-name').value;
  const dates = document.getElementById('popup-dates').value;
  const description = document.getElementById('popup-description').value;
  const wealth = document.getElementById('popup-wealth').value;
  const legacy = document.getElementById('popup-legacy').value;
  const longitude = parseFloat(document.getElementById('popup-longitude').value);
  const latitude = parseFloat(document.getElementById('popup-latitude').value);
  const imageFile = document.getElementById('popup-image').files[0];

  // Validate the inputs
  if (!name || !dates || !description || !wealth || !legacy || !longitude || !latitude || !imageFile) {
    alert('Please fill in all fields with valid data.');
    return;
  }

  // Read the image file as a data URL
  const reader = new FileReader();
  reader.onloadend = function () {
    const imageUrl = reader.result;

    // Create the marker
    const { element: markerElement } = createCustomMarker(imageUrl, '#9b4dca', false);
    const marker = new mapboxgl.Marker({
      element: markerElement
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Create the popup HTML content
    const popupHTML = `
      <div style="font-size: 6px; font-weight: bold; margin-bottom: 10px;">${description}</div>
      <div style="border-top: 1px solid #ccc; margin-bottom: 10px;"></div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${imageUrl}" alt="${name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />
        <div>
          <div style="font-size: 16px; font-weight: bold;">${name}</div>
          <div style="font-size: 14px; color: #666;">${dates}</div>
        </div>
      </div>
      <div style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;">
        <strong style="color: #9b4dca; font-size: 14px;">WEALTH:</strong> ${wealth}
      </div>
      <div style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;">
        <strong style="color: #9b4dca; font-size: 14px;">LEGACY:</strong> ${legacy}
      </div>
    `;

    // Create the popup
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
      className: 'custom-popup'
    }).setHTML(popupHTML);

    marker.setPopup(popup);

    // Close the modal
    modal.style.display = 'none';

    // Reset the form fields
    document.getElementById('popup-name').value = "Elizabeth Montagu";
    document.getElementById('popup-dates').value = "1718-1800";
    document.getElementById('popup-description').value = "Elizabeth Montagu was raised here in Treasurer's House";
    document.getElementById('popup-wealth').value = "Elizabeth married into the extremely wealthy Montagu family. She inherited substantial amounts upon her husband's death";
    document.getElementById('popup-legacy').value = "Elizabeth and the Bluestockings were mentioned in the works of most future women's rights activists.";
    document.getElementById('popup-longitude').value = "";
    document.getElementById('popup-latitude').value = "";
    document.getElementById('popup-image').value = "";
    document.getElementById('image-preview').src = "";
    document.getElementById('image-preview').style.display = "none";
  }
  reader.readAsDataURL(imageFile);
});

// Event listener for the "Cancel" button in the modal
document.getElementById('cancel-popup-marker').addEventListener('click', () => {
  modal.style.display = 'none';

  // Reset the form fields
  document.getElementById('popup-name').value = "Elizabeth Montagu";
  document.getElementById('popup-dates').value = "1718-1800";
  document.getElementById('popup-description').value = "Elizabeth Montagu was raised here in Treasurer's House";
  document.getElementById('popup-wealth').value = "Elizabeth married into the extremely wealthy Montagu family. She inherited substantial amounts upon her husband's death";
  document.getElementById('popup-legacy').value = "Elizabeth and the Bluestockings were mentioned in the works of most future women's rights activists.";
  document.getElementById('popup-longitude').value = "";
  document.getElementById('popup-latitude').value = "";
  document.getElementById('popup-image').value = "";
  document.getElementById('image-preview').src = "";
  document.getElementById('image-preview').style.display = "none";
});
