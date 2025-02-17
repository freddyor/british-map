mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/freddomate/cm785h0qv00cf01r0e8xxaxbc', 
    center: [-1.0820, 53.9623], 
    zoom: 15,
    pitch: 45,
    bearing: -17.6
});

// Apply custom pop-up styling
const stylePopup = document.createElement('style');
stylePopup.innerHTML = `
  .mapboxgl-popup-content {
    border-radius: 12px !important; /* Slightly less rounded */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3) !important; /* Stronger shadow */
    padding: 15px !important;
    font-family: Satoshi, sans-serif !important;
    border: 2px solid #8A2BE2 !important; /* Thin border matching marker outline */
  }
  .mapboxgl-popup-tip {
    display: none; /* Hide the default pop-up pointer */
  }
`;
document.head.appendChild(stylePopup);

// Full array of locations with names, occupations, descriptions, and images
const locations = [
  { coords: [ -1.076124, 53.9639651 ], name: "George Hudson", occupation: "Railway Pioneer", description: "George Hudson lived here", image: "images/georgehudson.png" },
  { coords: [ -1.0861561, 53.9587634 ], name: "John Snow", occupation: "Physician", description: "John Snow was born here and is memorialized here.", image: "images/johnsnow.png" },
  { coords: [ -1.0911787, 53.9555643 ], name: "John Doe", occupation: "Writer", description: "Lived here with his family for a few years", image: "images/georgehudson.png" },
  { coords: [ -1.0812717, 53.9628137 ], name: "Jane Smith", occupation: "Astronomer", description: "Lived and had an observatory here", image: "images/georgehudson.png" },
  { coords: [ -1.0978319, 53.9526401 ], name: "Anna Taylor", occupation: "Actress", description: "The Mount School or Theatre", image: "images/georgehudson.png" },
  { coords: [ -1.0878828, 53.9642257 ], name: "Samuel Brown", occupation: "Politician", description: "Born here", image: "images/georgehudson.png" },
  { coords: [ -1.0900558, 53.9488163 ], name: "Emma White", occupation: "Cyclist", description: "Cycled 4 miles to go to school here", image: "images/georgehudson.png" },
  { coords: [ -1.0761981, 53.9747056 ], name: "Liam Green", occupation: "Performer", description: "Performed on stage in youth productions", image: "images/georgehudson.png" },
  { coords: [ -1.1035692, 53.9693209 ], name: "Olivia Johnson", occupation: "Philanthropist", description: "Lived here at Homestead House", image: "images/georgehudson.png" },
  { coords: [ -1.0797156, 53.9586856 ], name: "James Harris", occupation: "Musician", description: "Born here", image: "images/georgehudson.png" },
  { coords: [ -1.0793124, 53.9592983 ], name: "Sophia King", occupation: "Poet", description: "bb", image: "images/georgehudson.png" },
  { coords: [ -1.0791789, 53.9589197 ], name: "Charlotte Lewis", occupation: "Artist", description: "b", image: "images/georgehudson.png" },
  { coords: [ -1.0814422, 53.9576632 ], name: "Jack Walker", occupation: "Engineer", description: "Born and grew up here", image: "images/georgehudson.png" },
  { coords: [ -1.0810119, 53.962882 ], name: "Emily Scott", occupation: "Journalist", description: "Born and raised here", image: "images/georgehudson.png" },
  { coords: [ -1.0978319, 53.9526401 ], name: "Ethan Clarke", occupation: "Educator", description: "The Mount School", image: "images/georgehudson.png" }
];

// Loop through locations and add markers with pop-ups
locations.forEach(location => {
  const marker = new mapboxgl.Marker({
    element: createCustomMarker(location.image)
  })
    .setLngLat(location.coords)
    .setPopup(new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
      .setHTML(`
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${location.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: bold; font-size: 16px;">${location.name}</span>
            <span style="font-size: 14px; color: #666;">${location.occupation}</span>
          </div>
        </div>
        <div style="margin-top: 8px; font-size: 14px; line-height: 1.4;">${location.description}</div>
      `))
    .addTo(map);
});

// Function to create a custom marker with an image inside a circle
function createCustomMarker(imageUrl) {
  const markerDiv = document.createElement('div');
  markerDiv.className = 'custom-marker';

  // Set the marker size
  markerDiv.style.width = '3em';
  markerDiv.style.height = '3em';
  markerDiv.style.position = 'absolute';
  markerDiv.style.borderRadius = '50%';

  // Create the image element
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.style.width = '100%';
  imageElement.style.height = '100%';
  imageElement.style.objectFit = 'cover';
  imageElement.style.borderRadius = '50%';

  // Add the image element to the marker div
  markerDiv.appendChild(imageElement);

  // Create a border around the marker (thinner than before)
  markerDiv.style.border = '0.25em solid #8A2BE2'; // Reduced thickness
  markerDiv.style.boxSizing = 'border-box';

  return markerDiv;
}

// Apply global font styling
document.body.style.fontFamily = 'Satoshi, sans-serif';
