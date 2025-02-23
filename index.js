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

  .collapsible-content {
    display: none; /* Initially hide the content */
    overflow: hidden;
    transition: height 0.3s ease; /* Add a smooth transition for the expanding/collapsing effect */
  }

  .collapsible-header {
    cursor: pointer;
    padding: 2px;
    text-align: center;
    background-color: #f0f0f0;
    border-radius: 50%;
    margin: 2px auto;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 10px;
  }

  .collapsible-header:hover {
    background-color: #e0e0e0;
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
  markerDiv.style.width = '3em';
  markerDiv.style.height = '3em';
  markerDiv.style.position = 'absolute';
  markerDiv.style.borderRadius = '50%';
  markerDiv.style.border = `0.25em solid ${color}`;
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

function createPopupHTML(location) {
  return `
    <p style="font-size: 6px; font-weight: bold; margin-bottom: 10px;">${location.description}</p>
    <div class="collapsible-header"><span>&#9660;</span></div>
    <div class="collapsible-content">
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
    </div>
  `;
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
  }).setHTML(createPopupHTML(location));

  marker.setPopup(popup);

  marker.getElement().addEventListener('click', () => {
    map.getCanvas().style.cursor = 'pointer';
    popup.addTo(map);

    // Add event listener to toggle collapsible content
    const header = popup._content.querySelector('.collapsible-header');
    const content = popup._content.querySelector('.collapsible-content');
    const headerSpan = header.querySelector('span');

    header.addEventListener('click', () => {
      if (content.style.display === 'none') {
        content.style.display = 'block';
        headerSpan.innerHTML = '&#9650;';  // Up-facing triangle
      } else {
        content.style.display = 'none';
        headerSpan.innerHTML = '&#9660;';  // Down-facing triangle
      }
    });
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
    }).setHTML(createPopupHTML(building));

    marker.setPopup(popup);

    marker.getElement().addEventListener('click', () => {
      map.getCanvas().style.cursor = 'pointer';
      popup.addTo(map);

      // Add event listener to toggle collapsible content
      const header = popup._content.querySelector('.collapsible-header');
      const content = popup._content.querySelector('.collapsible-content');
      const headerSpan = header.querySelector('span');

      header.addEventListener('click', () => {
        if (content.style.display === 'none') {
          content.style.display = 'block';
          headerSpan.innerHTML = '&#9650;';  // Up-facing triangle
        } else {
          content.style.display = 'none';
          headerSpan.innerHTML = '&#9660;';  // Down-facing triangle
        }
      });
    });
  });
}
