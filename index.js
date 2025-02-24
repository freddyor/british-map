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
  geolocate.trigger(); // Trigger geolocation on map load
});

const openableContainer = document.createElement('div');
openableContainer.id = 'openable-container';
openableContainer.style.display = 'none';
openableContainer.style.position = 'fixed';
openableContainer.style.left = '50%';
openableContainer.style.top = '40px'; // Halved from 80px
openableContainer.style.transform = 'translateX(-50%)';
openableContainer.style.zIndex = '999';
openableContainer.style.backgroundColor = '#fff';
openableContainer.style.border = '1px solid #f0f0f0'; // Halved border
openableContainer.style.borderRadius = '4px'; // Halved border radius
openableContainer.style.boxShadow = '0 3px 7.5px rgba(0, 0, 0, 0.15)'; // Halved shadow values
openableContainer.style.padding = '5px'; // Halved padding
openableContainer.style.width = '100px'; // Halved width
openableContainer.style.textAlign = 'center';
openableContainer.textContent = 'This is an openable container!';
document.body.appendChild(openableContainer);

const toggleContainerButton = document.createElement('button');
toggleContainerButton.textContent = '📦 Open Container';
toggleContainerButton.style.position = 'fixed';
toggleContainerButton.style.left = '50%';
toggleContainerButton.style.bottom = '20px';
toggleContainerButton.style.transform = 'translateX(-50%)';
toggleContainerButton.style.zIndex = '1000';
toggleContainerButton.style.padding = '5px 10px';
toggleContainerButton.style.backgroundColor = '#4CAF50';
toggleContainerButton.style.color = 'white';
toggleContainerButton.style.border = 'none';
toggleContainerButton.style.borderRadius = '4px';
toggleContainerButton.style.cursor = 'pointer';
document.body.appendChild(toggleContainerButton);

toggleContainerButton.addEventListener('click', () => {
    if (openableContainer.style.display === 'none' || openableContainer.style.display === '') {
        openableContainer.style.display = 'block';
        toggleContainerButton.textContent = '📦 Close Container';
    } else {
        openableContainer.style.display = 'none';
        toggleContainerButton.textContent = '📦 Open Container';
    }
});

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
    border-radius: 6px !important; /* Halved */
    box-shadow: 0 3px 7.5px rgba(0, 0, 0, 0.15) !important; /* Halved */
    padding: 5px !important; /* Halved */
    font-family: 'Poppins', sans-serif !important;
    background: #E9E8E0;
    border: 1px solid #f0f0f0 !important; /* Halved */
    line-height: 1.05;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-left: 1.5px; /* Halved */
    margin-right: 2.5px; /* Halved */
  }

  .mapboxgl-popup-content img {
    border: 1px solid #f0f0f0 !important; /* Halved */
    border-radius: 4px; /* Halved */
    width: 20px;
    height: 20px;
  }

  .mapboxgl-popup-content p {
    font-weight: bold !important;
    text-align: center;
    letter-spacing: -0.25px; /* Halved */
    font-size: 6.5px !important; /* Halved */
    margin-bottom: 5px !important; /* Halved */
  }

  .mapboxgl-popup-close-button {
    display: none !important;
  }

  .user-location-marker {
    width: 10px; /* Halved */
    height: 10px; /* Halved */
    background-color: white;
    border: 1.5px solid #87CEFA; /* Halved */
    border-radius: 50%; /* Halved */
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
textEl.style.fontSize = '5px'; /* Halved */
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
  }
  e.preventDefault(); // Prevent the default error pop-up
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
  markerDiv.style.width = '1.5em'; // Halved
  markerDiv.style.height = '1.5em'; // Halved
  markerDiv.style.position = 'absolute';
  markerDiv.style.borderRadius = '50%';
  markerDiv.style.border = `0.125em solid ${color}`; // Halved
  markerDiv.style.boxSizing = 'border-box';

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
    <p style="font-size: 3px; font-weight: bold; margin-bottom: 5px;">${location.description}</p>
    <div style="border-top: 0.5px solid #ccc; margin-bottom: 5px;"></div>
    <div style="display: flex; align-items: center; gap: 5px;">
      <img src="${location.image}" alt="${location.name}" style="width: 20px; height: 20px; object-fit: cover; border-radius: 50%;" />
      <div>
        <div style="font-size: 8px; font-weight: bold;">${location.name}</div>
        <div style="font-size: 7px; color: #666;">${location.occupation}</div>
      </div>
    </div>
    <p style="background: #f9f9f9; padding: 5px; margin-top: 5px; border-radius: 4px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); font-size: 6px;">${location.tldr}</p>
    ${location.events.length ? `
      <div style="margin-top: 5px;">
        ${location.events.map(event => `
          <div style="background: #f9f9f9; border: 0.5px solid #ddd; border-radius: 4px; padding: 5px; margin-bottom: 5px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
            <strong style="color: #9b4dca; font-size: 7px;">${event.date}</strong>: <span style="font-size: 6px;">${event.description}</span>
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
      <p style="font-size: 3px; font-weight: bold; margin-bottom: 5px;">${building.description}</p>
      <div style="border-top: 0.5px solid #ccc; margin-bottom: 5px;"></div>
      <div style="display: flex; align-items: center; gap: 5px;">
        <img src="${building.image}" alt="${building.name}" style="width: 20px; height: 20px; object-fit: cover; border-radius: 50%;" />
        <div>
          <div style="font-size: 8px; font-weight: bold;">${building.name}</div>
          <div style="font-size: 7px; color: #666;">${building.occupation}</div>
        </div>
      </div>
      <p style="background: #f9f9f9; padding: 5px; margin-top: 5px; border-radius: 4px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); font-size: 6px;">${building.tldr}</p>
      ${building.events.length ? `
        <div style="margin-top: 5px;">
          ${building.events.map(event => `
            <div style="background: #f9f9f9; border: 0.5px solid #ddd; border-radius: 4px; padding: 5px; margin-bottom: 5px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);">
              <strong style="color: #9b4dca; font-size: 7px;">${event.date}</strong>: <span style="font-size: 6px;">${event.description}</span>
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
