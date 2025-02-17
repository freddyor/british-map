mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/freddomate/cm785h0qv00cf01r0e8xxaxbc', 
    center: [-1.0820, 53.9623], 
    zoom: 15,
    pitch: 45,
    bearing: -17.6
});

// Array of coordinates, descriptions, image paths, and names for each location (with local images)
const locations = [
  { coords: [ -1.076124, 53.9639651 ], description: "George Hudson lived here", image: "images/georgehudson.png", name: "George Hudson" },
  { coords: [ -1.0861561, 53.9587634 ], description: "John Snow was born here and is memorialized here.", image: "images/johnsnow.png", name: "John Snow" },
  { coords: [ -1.0911787, 53.9555643 ], description: "Lived here with his family for a few years", image: "images/georgehudson.png", name: "John Doe" },
  { coords: [ -1.0812717, 53.9628137 ], description: "Lived and observatory there", image: "images/georgehudson.png", name: "Jane Smith" },
  { coords: [ -1.0978319, 53.9526401 ], description: "The Mount School or Theatre", image: "images/georgehudson.png", name: "Anna Taylor" },
  { coords: [ -1.0878828, 53.9642257 ], description: "Born here", image: "images/georgehudson.png", name: "Samuel Brown" },
  { coords: [ -1.0900558, 53.9488163 ], description: "Cycled 4 miles to go school there", image: "images/georgehudson.png", name: "Emma White" },
  { coords: [ -1.0761981, 53.9747056 ], description: "He first performed on stage in musical productions, as a member of a youth club and with the Rowntree Youth Theatre", image: "images/georgehudson.png", name: "Liam Green" },
  { coords: [ -1.1035692, 53.9693209 ], description: "Lived here at Homestead House", image: "images/georgehudson.png", name: "Olivia Johnson" },
  { coords: [ -1.0797156, 53.9586856 ], description: "Born here", image: "images/georgehudson.png", name: "James Harris" },
  { coords: [ -1.0793124, 53.9592983 ], description: "bb", image: "images/georgehudson.png", name: "Sophia King" },
  { coords: [ -1.0791789, 53.9589197 ], description: "b", image: "images/georgehudson.png", name: "Charlotte Lewis" },
  { coords: [ -1.0814422, 53.9576632 ], description: "Born and grew up here", image: "images/georgehudson.png", name: "Jack Walker" },
  { coords: [ -1.0810119, 53.962882 ], description: "Born and raised here", image: "images/georgehudson.png", name: "Emily Scott" },
  { coords: [ -1.0978319, 53.9526401 ], description: "The Mount School", image: "images/georgehudson.png", name: "Ethan Clarke" }
];

// Loop through the locations and add markers with custom images
locations.forEach(location => {
  const marker = new mapboxgl.Marker({
    element: createCustomMarker(location.image) // Pass the specific image for this marker
  })
    .setLngLat(location.coords)
    .setPopup(new mapboxgl.Popup({ closeButton: false, closeOnClick: false }) // Disable closing when clicking outside
      .setHTML(`
        <div style="display: flex; flex-direction: column; gap: 10px; position: relative;">
          
          <!-- Image and Name Section (aligned horizontally) -->
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${location.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
            <span style="font-weight: bold; font-size: 16px;">${location.name}</span>
          </div>

          <!-- Description Section (below the name) -->
          <span style="line-height: 1.4;">${location.description}</span>
          
        </div>
      `)) // Set the popup with custom HTML
    .addTo(map);
});

// Function to create a custom marker with an image inside a circle
function createCustomMarker(imageUrl) {
  const markerDiv = document.createElement('div');
  markerDiv.className = 'custom-marker';

  // Set the marker size
  markerDiv.style.width = '3em';  // Marker size
  markerDiv.style.height = '3em';  // Marker size
  markerDiv.style.position = 'absolute'; // Ensure it stays fixed
  markerDiv.style.borderRadius = '50%';  // Ensure the border is circular

  // Create the image element
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.style.width = '100%';  // Make the image fill the circle
  imageElement.style.height = '100%'; // Make the image fill the circle
  imageElement.style.objectFit = 'cover';  // Ensure the image maintains aspect ratio and fills the area
  imageElement.style.borderRadius = '50%';  // Round the image to match the circle

  // Add the image element to the marker div
  markerDiv.appendChild(imageElement);

  // Create a border around the marker
  markerDiv.style.border = '0.5em solid #8A2BE2';  // A thicker purple border (electric purple)
  markerDiv.style.boxSizing = 'border-box';  // Ensure the border size is included

  return markerDiv;
}

// Apply the font globally to the page and map popups
document.body.style.fontFamily = 'Satoshi, sans-serif'; // Apply to body
