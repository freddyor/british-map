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
    padding: 5px 10px 0 10px !important;
    font-family: 'Poppins', sans-serif !important;
    background: #E9E8E0;
    border: 2px solid #f0f0f0 !important;
    line-height: 1.05;
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
    margin-bottom: 5px !important;
  }

  .mapboxgl-popup-close-button {
    display: none !important;
  }

  .mapboxgl-popup-tip {
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
    display: none;
    overflow: hidden;
    transition: height 0.3s ease;
  }

  .collapsible-header {
    cursor: pointer;
    padding: 5px;
    text-align: center; 
    background-color: #f0f0f0;
    border-radius: 0 0 10px 10px;
    margin-top: 0px;
    width: calc(100% + 20px);
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: -2px;
   }

   .collapsible-header:hover {
     background-color: #e0e0e0;
   }

   .toggle-symbol {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        transition: transform 0.2s ease-in-out;
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
    const arrowSvg = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;
   return `
     <p style="font-size: 6px; font-weight: bold; margin-bottom: 5px;">${location.description}</p>
     <div class="collapsible-header"><span class="toggle-symbol">${arrowSvg}</span></div>
     <div class="collapsible-content">
       <div style="display:flex; align-items:center; gap:.5em;">
         <img src="${location.image}" alt="${location.name}" style="width:40px; height:auto; object-fit-cover; border-radius:.5em;" />
         <div>
           <div style="font-size:.9em; font-weight:bold;">${location.name}</div>
           <div style="font-size:.8em; color:#666;">${location.occupation}</div>
         </div>
       </div>
       <p style="background:#f9f9f9; padding:.5em; margin-top:.5em; border-radius:.5em; box-shadow:.1em .1em .2em rgba(0,0,0,.1); font-size:.8em;">${location.tldr}</p>
       ${location.events.length ? `
         <div style="margin-top:.5em;">
           ${location.events.map(event => `
             <div style="background:#f9f9f9; border:.1em solid #ddd; border-radius:.5em; padding:.5em; margin-bottom:.5em;">
               <strong style="color:#9b4dca;">${event.date}</strong>: <span>${event.description}</span>
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
     const headerSpan = header.querySelector('.toggle-symbol');

     header.addEventListener('click', () => {
       if (content.style.display === 'none') {
         content.style.display = 'block';
         headerSpan.style.transform = 'rotate(180deg)';
       } else {
         content.style.display = 'none';
         headerSpan.style.transform = 'rotate(0deg)';
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
      const headerSpan = header.querySelector('.toggle-symbol');

      header.addEventListener('click', () => {
        if (content.style.display === 'none') {
          content.style.display = 'block';
          headerSpan.style.transform = 'rotate(180deg)';
        } else {
          content.style.display = 'none';
          headerSpan.style.transform = 'rotate(0deg)';
        }
      });
    });
  });
}
