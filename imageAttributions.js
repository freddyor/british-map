// imageAttributions.js

// Array to store image attributions
const imageAttributions = [
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Crayke_Castle,_Hambledon,_North_Yorkshire.jpg'>Crayke Castle</a>",
    "author": "Paul Buckingham",
    "license": "Creative Commons Attribution Share-alike license 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Danby_Castle_ruins_from_the_north_-_geograph.org.uk_-_2606955.jpg'>Danby Castle</a>",
    "author": "Colin Grice",
    "license": "Creative Commons Attribution-ShareAlike 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Helmsley_Castle_English_Heritage.jpg'>Helmsley Castle</a>",
    "author": "Barkmatter",
    "license": "CC BY-SA 3.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Barden_Tower_-_8279342970.jpg'>Barden Tower</a>",
    "author": "SG2012",
    "license": "CC BY 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:John_O_Gaunt's_Castle_-_geograph.org.uk_-_16486.jpg'>John Gaunt's Castle</a>",
    "author": "Mick Melvin",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Newbygill_-_geograph.org.uk_-_5669905.jpg'>Kirby Knowle Castle</a>",
    "author": "Chris Heaton",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Knaresborough_Castle_ruins.jpg'>Knaresborough Castle</a>",
    "author": "Redvers",
    "license": "CC BY 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:The_Old_Lodge,_Malton_(geograph_3239729).jpg'>Malton Castle</a>",
    "author": "John Sparshatt",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:MiddlehamCJW.jpg'>Middleham Castle</a>",
    "author": "CJW",
    "license": "Attribution"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:PickeringCastle.jpg'>Pickering Castle</a>",
    "author": "MortimerCat",
    "license": "CC BY-SA 3.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Ravensworth_Castle_-_geograph.org.uk_-_2380905.jpg'>Ravensworth Castle</a>",
    "author": "David Martin",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Sheriff_hutton_castle.jpg'>Sheriff Hutton Castle</a>",
    "author": "Shaunconway",
    "license": "CC BY 3.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Skipton_Castle_main_gate,_2007.jpg'>Skipton Castle</a>",
    "author": "Andy Hay from UK",
    "license": "CC BY 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Spofforth_Castle_Undercroft.jpg'>Spofforth Castle</a>",
    "author": "TJBlackwell",
    "license": "CC BY 3.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Topcliffe_Motte,_Maiden_Bower._-_geograph.org.uk_-_316741.jpg'>Topcliffe Castle</a>",
    "author": "Matthew Hatton",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Upsall_Castle.jpg'>Upsall Castle</a>",
    "author": "Frank Glover",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Wilton_Castle,_Teesside_(geograph_2264814).jpg'>Wilton Castle</a>",
    "author": "Paul Buckingham",
    "license": "CC BY-SA 2.0"
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
