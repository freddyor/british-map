// imageAttributions.js

// Array to store image attributions
const imageAttributions = [
  {
    name: "Image Title 1",
    author: "Author Name 1",
    license: "License Type 1",
    link: "https://example.com/image1"
  },
{
    "name": "Swansea City Centre",
    "coords": [-3.9436, 51.6210],
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/27/P.3._Swansea_City_Centre_2012.jpg",
    "description": "AI-generated",
    "occupation": "busy",
    "tldr": "Bustling city center in Swansea, Wales, known for its shops, attractions, and waterfront.",
    "events": [
      {
        "date": "Various",
        "description": "A hub of activity, hosting events, markets, and cultural activities 🎭"
      },
      {
        "date": "Modern",
        "description": "Features modern architecture and a mix of historic and contemporary landmarks 🧱"
      },
      {
        "date": "Present",
        "description": "Remains a vibrant center for commerce, culture, and community in Swansea 📜"
      }
    ]
}


  // Add more attributions as needed
];

// Function to display image attributions
function displayImageAttributions() {
  const attributionsContainer = document.createElement('div');
  attributionsContainer.style.position = 'fixed';
  attributionsContainer.style.bottom = '70px';
  attributionsContainer.style.left = '50%';
  attributionsContainer.style.transform = 'translateX(-50%)';
  attributionsContainer.style.backgroundColor = 'white';
  attributionsContainer.style.padding = '10px';
  attributionsContainer.style.border = '1px solid #ccc';
  attributionsContainer.style.borderRadius = '8px';
  attributionsContainer.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
  attributionsContainer.style.fontSize = '12px';
  attributionsContainer.style.lineHeight = '1.05';

  imageAttributions.forEach(image => {
    const imageElement = document.createElement('p');
    imageElement.innerHTML = `<strong>${image.name}</strong> by ${image.author} - ${image.license} - <a href="${image.link}" target="_blank">Source</a>`;
    attributionsContainer.appendChild(imageElement);
  });

  document.body.appendChild(attributionsContainer);
}

// Export the necessary variables and functions
export { imageAttributions, displayImageAttributions };
