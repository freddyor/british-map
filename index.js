import { buildings } from './buildings.js';
import { locations } from './locations.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpdG1hcCIsImEiOiJjbG5xZTlkbGgwMnJuMmtxdnlwbXFkbTlqIn0.Hhm0qcgfRmxHQZNnPxbFxQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/britmap/clnqebbhx003601qy6yzl8zs1',
    center: [-1.0803, 53.9583],
    zoom: 14,
    pitch: 45,
    bearing: -17.6,
});

map.on('load', () => {
    addBuildingMarkers();
    geolocate.trigger();
});

// Openable Container
const toggleContainerButton = document.getElementById('toggle-container-button');
const openableContainer = document.getElementById('openable-container');

toggleContainerButton.addEventListener('click', () => {
    if (openableContainer.style.display === 'none' || openableContainer.style.display === '') {
        openableContainer.style.display = 'block';
    } else {
        openableContainer.style.display = 'none';
    }
});

// Styling
const style = document.createElement('style');
style.textContent = `
    .mapboxgl-popup-content {
        background-color: #e9e8e0;
        color: #333;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        padding: 20px;
        font-family: 'Poppins', sans-serif;
    }
    .mapboxgl-popup-close-button {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        right: 10px;
        top: 10px;
    }
    .mapboxgl-popup-tip {
        border-top-color: #e9e8e0;
    }
    .custom-marker {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        background-size: cover;
        background-position: center;
    }
    .location-marker {
        border: 2px solid #9B4DCA;
    }
    .building-marker {
        border: 2px solid #E9E8E0;
    }
`;
document.head.appendChild(style);

// Add Google Fonts link
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Geolocation
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
});

map.addControl(geolocate);

let userLocationMarker;

geolocate.on('geolocate', (e) => {
    const lon = e.coords.longitude;
    const lat = e.coords.latitude;

    if (userLocationMarker) {
        userLocationMarker.remove();
    }

    userLocationMarker = new mapboxgl.Marker({
        color: '#007bff',
        scale: 0.8
    })
        .setLngLat([lon, lat])
        .addTo(map);
});

geolocate.on('error', (e) => {
    if (e.code === 1) {
        console.log('Location access denied. Please enable location services.');
    }
});

function createCustomMarker(imageSrc, borderColor, isLocation) {
    const element = document.createElement('div');
    element.className = 'custom-marker';
    element.style.backgroundImage = `url(${imageSrc})`;
    element.style.borderColor = borderColor;
    
    const id = `marker-${Math.random().toString(36).substr(2, 9)}`;
    element.id = id;
    
    return { element, id };
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
