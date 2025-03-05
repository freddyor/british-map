// imageAttributions.js

// Array to store image attributions
const imageAttributions = [
  {
    name: "<a href='https://commons.wikimedia.org/wiki/File:Castle_Bolton_and_its_maze_-_geograph.org.uk_-_7335033.jpg'>Bolton Castle</a>",
    author: "Chris Heaton",
    license: "CC BY-SA 2.0",
  },
  {
    name: "<a href='https://commons.wikimedia.org/wiki/File:Cawood_Castle.jpg'>Cawood Castle</a>",
    author: "Mtaylor848",
    license: "CC BY-SA 3.0",
  },
  {
    name: "<a href='https://commons.wikimedia.org/wiki/File:Burton_in_Lonsdale_-_geograph.org.uk_-_127350.jpg'>Burton in Lonsdale Castle</a>",
    author: "Gordon Hatton",
    license: "CC BY-SA 2.0",
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
