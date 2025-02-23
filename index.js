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
    border-radius: 18px 18px 0 0 !important;
    box-shadow: 0 9px 22px rgba(0, 0, 0, 0.3) !important;
    padding: 15px !important;
    font-family: 'Poppins', sans-serif !important;
    background: #E9E8E0;
    border: 3px solid #f0f0f0 !important;
    border-bottom: none !important;
    line-height: 1.05;
    padding-top: 15px !important;
    padding-bottom: 0 !important;
    margin-left: 4.5px;
    margin-right: 7.5px;
    display: flex;
    flex-direction: column;
  }

  .mapboxgl-popup-content img {
    border: 3px solid #f0f0f0 !important;
    border-radius: 12px;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 60px;
  }

  .mapboxgl-popup-content p {
    font-weight: bold !important;
    text-align: center;
    letter-spacing: -0.75px;
    font-size: 19.5px !important;
    margin-bottom: 15px !important;
  }

  .mapboxgl-popup-close-button {
    display: none !important;
  }

  .user-location-marker {
    width: 30px;
    height: 30px;
    background-color: white;
    border: 4.5px solid #87CEFA;
    border-radius: 100%;
    position: relative;
  }

  .location-marker {
    z-index: 2;
    width: 37.5px;
    height: 37.5px;
  }

  .building-marker {
    z-index: 1;
    width: 37.5px;
    height: 37.5px;
  }

  .mapboxgl-popup {
    z-index: 9999 !important;
  }
  
  .collapsible-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
   }
  
   .collapsible-content.show {
     max-height: none;
     transition: max-height 0.3s ease-in;
   }
  
   .toggle-button {
     background-color: #f0f0f0;
     border: none;
     padding: 5px 15px;
     cursor: pointer;
     font-family: 'Poppins', sans-serif;
     font-size: 18px;
     width: calc(100% + 30px);
     display: flex;
     align-items: center;
     justify-content: center;
     margin-left: -15px;
     margin-right: -15px;
     border-top-left-radius: 0;
     border-top-right-radius: 0;
     border-bottom-left-radius: 18px;
     border-bottom-right-radius: 18px;
   }
  
   .arrow {
     border: solid black;
     border-width: 0 3px 3px 0;
     display: inline-block;
     padding: 4.5px;
   }
  
   .down {
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
   }
  
   .up {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
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
  markerDiv.style.width = '37.5px';
  markerDiv.style.height = '37.5px';
  markerDiv.style.position = 'absolute';
  markerDiv.style.borderRadius = '50%';
  markerDiv.style.border = `0.375em solid ${color}`;
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

function createPopupContent(data) {
  return `
    <div style="flex-grow: 1;">
      <p style="font-size: 9px; font-weight: bold; margin-bottom: 15px;">${data.description}</p>
      <div class="collapsible-content">
        <div style="display: flex; align-items: center; gap: 15px;">
          <img src="${data.image}" alt="${data.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 50%;" />
          <div>
            <div style="font-size: 24px; font-weight: bold;">${data.name}</div>
            <div style="font-size: 21px; color: #666;">${data.occupation}</div>
          </div>
        </div>
        <p style="background: #f9f9f9; padding: 15px; margin-top: 15px; border-radius: 12px; box-shadow: 0 3px 6px rgba(0,0,0,0.1); font-size: 18px;">${data.tldr}</p>
        ${data.events.length ? `
          <div style="margin-top: 15px;">
            ${data.events.map(event => `
              <div style="background: #f9f9f9; border: 1.5px solid #ddd; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">
                <strong style="color: #9b4dca; font-size: 21px;">${event.date}</strong>: <span style="font-size: 18px;">${event.description}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
    <button class="toggle-button"><i class="arrow down"></i></button>
  `;
}

function setupToggleButton(popup) {
  const toggleButton = popup._content.querySelector('.toggle-button');
  const collapsibleContent = popup._content.querySelector('.collapsible-content');

  toggleButton.addEventListener('click', () => {
    collapsibleContent.classList.toggle('show');
    const arrow = toggleButton.querySelector('.arrow');
    arrow.classList.toggle('down');
    arrow.classList.toggle('up');
  });
}

locations.forEach(location => {
  const { element: markerElement, id } = createCustomMarker(location.image, '#9B4DCA', true);
  markerElement.className += ' location-marker';

  const popupContent = createPopupContent(location);

  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true,
    className: 'custom-popup'
  }).setHTML(popupContent);

  const marker = new mapboxgl.Marker({
    element: markerElement
  })
    .setLngLat(location.coords)
    .setPopup(popup)
    .addTo(map);

  marker.getElement().addEventListener('click', () => {
    map.getCanvas().style.cursor = 'pointer';
    popup.addTo(map);
    setupToggleButton(popup);
  });
});

function addBuildingMarkers() {
  buildings.forEach(building => {
    const { element: markerElement, id } = createCustomMarker(building.image, '#E9E8E0', false);
    markerElement.className += ' building-marker';

    const popupContent = createPopupContent(building);

    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
      className: 'custom-popup'
    }).setHTML(popupContent);

    const marker = new mapboxgl.Marker({
      element: markerElement
    })
      .setLngLat(building.coords)
      .setPopup(popup)
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      map.getCanvas().style.cursor = 'pointer';
      popup.addTo(map);
      setupToggleButton(popup);
    });
  });
}
