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

// Create a <style> element to add the CSS
const stylePopup = document.createElement('style');

// Add the link to Google Fonts for Poppins
const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Style for the popup
stylePopup.innerHTML = `
  .mapboxgl-popup-content {
    border-radius: 12px !important;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3) !important;
    padding: 10px !important;
    font-family: 'Poppins', sans-serif !important; /* Apply Poppins font */
    background: #E9E8E0 ;
    border: 2px solid #f0f0f0 !important;
    line-height: 1.05;
  }

  .mapboxgl-popup-content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-left: 3;
    margin-right: 5;
  }

  .mapboxgl-popup-content img {
    border: 2px solid #f0f0f0 !important;
    border-radius: 8px;
  }

  /* Style for the description text */
  .mapboxgl-popup-content p {
    font-weight: bold !important; /* Ensure the description text is not bold */
    text-align: center; /* Align text centrally */
    letter-spacing: -0.5x;
    font-size: 13px !important; /* Ensure the size matches the text size used for the cards */
    margin-bottom: 10px !important; /* Add bottom margin */
  }

   .mapboxgl-popup-close-button {
    display: none !important;
  }

  .timeline-card {
    background: #f8f9fa;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
  }

  .timeline-card .date, .timeline-card span, .timeline-card p {
  display: none !important;
  }

  .popup-description-divider {
    margin: 10px 0;
    border: 0;
    height: 0.2px;
    background-color: #808080;
  }

  /* Updated styles for the TLDR card */
  .tldr-card {
    background: white !important; /* Set background to white */
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Remove the title (span) from the tldr card */
  .tldr-card span {
    display: none !important; /* Completely hide the title */
  }

.tldr-card p {
    font-size: 10px !important; /* Set desired font size */
    line-height: 1.4; /* Optional: set line height for readability */
    margin-bottom: 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

  .tldr-card-divider {
    margin: 5px 0;
    border: none;
    height: 1px;
    background-color: #4caf50;
  }
`;

// Append the style to the document
document.head.appendChild(stylePopup);

// New geolocation code
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userCoords = [position.coords.longitude, position.coords.latitude];

            // Center the map on the user's location
            map.setCenter(userCoords);
            map.setZoom(15); // Zoom in closer

            // Add a marker for the user's location
            new mapboxgl.Marker({color: '#FF0000'}) // Red marker
                .setLngLat(userCoords)
                .addTo(map);
        },
        (error) => {
            console.error("Error getting location: ", error);
            alert("Unable to retrieve your location. Please ensure location services are enabled.");
        }
    );
} else {
    alert("Geolocation is not supported by your browser.");
}

locations.forEach(location => {
  const marker = new mapboxgl.Marker({
    element: createCustomMarker(location.image)
  })
    .setLngLat(location.coords)
    .setPopup(new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
      .setHTML(`
           <p style="font-size: 6px; font-weight: bold; margin-bottom: 10px;">${location.description}</p>
                <div style="border-top: 1px solid #ccc; margin-bottom: 10px;"></div> <!-- Grey divider -->
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
            `)
        )
        .addTo(map);
});

// Func
