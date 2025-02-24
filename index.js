import mapboxgl from 'mapbox-gl';
import { buildings } from './buildings.js';
import { locations } from './locations.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/freddomate/cm785h0qv00cf01r0e8xxaxbc',
    center: [-1.0803, 53.9583],
    zoom: 15,
    pitch: 45,
    bearing: -17.6,
    antialias: true
});

map.on('load', () => {
    // Existing map load code...
});

// Custom popup styling
const customPopup = document.createElement('div');
customPopup.className = 'custom-popup';

// Custom marker styling
const customMarker = document.createElement('div');
customMarker.className = 'custom-marker';

// Geolocation
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
}));

// Add markers for locations
locations.forEach(location => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${location.icon})`;
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.backgroundSize = '100%';

    el.addEventListener('click', () => {
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setLngLat(location.coordinates)
            .setHTML(`<h3>${location.name}</h3><p>${location.description}</p>`)
            .addTo(map);
    });

    new mapboxgl.Marker(el)
        .setLngLat(location.coordinates)
        .addTo(map);
});

// Add markers for buildings
buildings.forEach(building => {
    const el = document.createElement('div');
    el.className = 'marker building-marker';
    el.style.backgroundImage = 'url(path/to/building-icon.png)';
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.backgroundSize = '100%';

    el.addEventListener('click', () => {
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setLngLat(building.coordinates)
            .setHTML(`
                <h3>${building.name}</h3>
                <p>${building.description}</p>
                <p>Built: ${building.yearBuilt}</p>
                <p>Architect: ${building.architect}</p>
                <p>Style: ${building.architecturalStyle}</p>
            `)
            .addTo(map);
    });

    new mapboxgl.Marker(el)
        .setLngLat(building.coordinates)
        .addTo(map);
});

// Get a reference to the locations list button
const locationsListButton = document.getElementById('locations-list-button');

// Function to generate the HTML for the locations list
function generateLocationsListHTML() {
    let html = '<div style="max-height: 300px; overflow-y: auto; padding: 10px; font-family: Poppins, sans-serif;">';
    html += '<h3 style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">Locations</h3>';
    locations.forEach(location => {
        html += `<div style="display: flex; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                   <img src="${location.icon}" alt="${location.name}" style="width: 32px; height: 32px; margin-right: 10px;">
                   <div>
                     <strong style="font-size: 14px;">${location.name}</strong>
                   </div>
                 </div>`;
    });
    html += '</div>';
    return html;
}

// Add a click event listener to the button
locationsListButton.addEventListener('click', () => {
    const popupContent = generateLocationsListHTML();
    
    new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
        className: 'locations-list-popup'
    })
    .setLngLat(map.getCenter())
    .setHTML(popupContent)
    .addTo(map);
});
