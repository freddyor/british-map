// imageAttributions.js

// Array to store image attributions
const imageAttributions = [
                   {
      "name": "<a href='https://www.flickr.com/photos/goatee/161551696/'>Richard Hammond</a>",
      "author": "Ed Perchick",
      "license": "CC BY-SA 2.0"
    },
                   {
      "name": "<a href='https://www.flickr.com/photos/mpetrucho/8207855885/'>Jeremy Clarkson</a>",
      "author": "Petr Magera, image cropped",
      "license": "CC BY-SA 2.0"
    },
          {
      "name": "<a href='https://commons.wikimedia.org/wiki/User:Royal_Society_uploader'>James Dyson</a>",
      "author": "The Royal Society",
      "license": "CC BY-SA 3.0"
    },
          {
      "name": "<a href='https://www.flickr.com/photos/kingkongphoto/5113074392/'>Princess Diana</a>",
      "author": "John Matthew Smith & www.celebrity-photos.com",
      "license": "CC BY-SA 2.0"
    },
          {
      "name": "<a href='https://digital.library.ucla.edu/catalog/ark:/21198/zz0002pv3r'>John Lennon</a>",
      "author": "Tony Barnard, Los Angeles Times",
      "license": "CC BY-SA 4.0"
    },
          {
      "name": "<a href='https://www.nli.org.il/he/images/NNL_ARCHIVE_AL990040462240205171/NLI'>Margaret Thatcher</a>",
      "author": "Israel Press and Photo Agency",
      "license": "CC BY-SA 4.0"
    },
          {
      "name": "<a href='https://www.flickr.com/photos/evarinaldiphotography/6983823195/'>Michael Crawford</a>",
      "author": "Eva Rinaldi",
      "license": "CC BY-SA 2.0"
    },
          {
      "name": "<a href='https://www.flickr.com/photos/27077452@N04/4513125422'>J.K. Rowling</a>",
      "author": "Daniel Ogren",
      "license": "CC BY-SA 2.0"
    },
               {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Weston_Library_Opening_by_John_Cairns_20.3.15-139_David_Attenborough.jpg'>David Attenborough</a>",
      "author": "John Cairns",
      "license": "CC BY-SA 4.0"
    },
     {
      "name": "<a href='https://www.flickr.com/photos/websummit/54135747450/'>Tim Berners Lee</a>",
      "author": "Web Summit",
      "license": "CC BY-SA 2.0"
    },



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
