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

  /* Remove blue border from close button */
  .mapboxgl-popup-close-button {
    border: none !important; /* No border */
    outline: none !important; /* Remove outline */
  }

  /* Remove focus outline on pop-up */
  .mapboxgl-popup-close-button:focus {
    outline: none !important; /* Prevent focus outline */
  }

  /* Card styling */
  .timeline-card {
    background: #f8f9fa;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
  }

  .timeline-card span {
    font-weight: bold;
    display: block; /* Ensures title is on its own line */
    margin-bottom: 5px; /* Space between title and description */
  }

  /* Timeline line behind cards */
  .timeline-wrapper {
    position: relative;
    padding-left: 20px;
    margin-top: 10px;
  }

  .timeline-wrapper::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #666; /* Changed to the same color as Occupation title */
    z-index: 0;
  }

  /* Align all cards properly */
  .timeline-card {
    z-index: 1;
  }

  /* Horizontal line connecting the vertical timeline to each card */
  .timeline-card::before {
    content: '';
    position: absolute;
    left: -10px; /* Position the horizontal line to the left of the card */
    top: 50%;
    width: 15px; /* Length of the horizontal line */
    height: 2px;
    background-color: #666; /* Changed to the same color as Occupation title */
    z-index: 0;
  }

  /* Divider style */
  .popup-description-divider {
    margin: 10px 0;
    border: none;
    height: 1px;
    background-color: #808080; /* Grey divider */
  }
`;
document.head.appendChild(stylePopup);

// Full array of locations with names, occupations, descriptions, images, and events
const locations = [
  { 
    coords: [ -1.076124, 53.9639651 ], 
    name: "George Hudson", 
    occupation: "Railway Pioneer", 
    description: "George Hudson lived here",
    image: "images/georgehudson.png",
    events: [
      { date: "1800", description: "Event 1" },
      { date: "1820", description: "Event 2" },
      { date: "1840", description: "Event 3" },
      { date: "1860", description: "Event 4" },
      { date: "1880", description: "Event 5" }
    ]
  },
  { 
    coords: [ -1.0861561, 53.9587634 ], 
    name: "John Snow", 
    occupation: "Physician", 
    description: "John Snow was born here and is memorialized here.",
    image: "images/johnsnow.png",
    events: [
      { date: "1810", description: "Event 1" },
      { date: "1830", description: "Event 2" },
      { date: "1850", description: "Event 3" },
      { date: "1870", description: "Event 4" },
      { date: "1890", description: "Event 5" }
    ]
  },
  { 
    coords: [ -1.0911787, 53.9555643 ], 
    name: "George Leeman", 
    occupation: "Historian", 
    description: "George Leeman was a notable figure in the history of railways.",
    image: "images/georgeleeman.png",
    events: []
  },
  { 
    coords: [ -1.0812717, 53.9628137 ], 
    name: "John Goodricke", 
    occupation: "Astronomer", 
    description: "John Goodricke was a famous astronomer known for his work on variable stars.",
    image: "images/johngoodricke.png",
    events: []
  },
  { 
    coords: [ -1.0978319, 53.9526401 ], 
    name: "Judi Dench", 
    occupation: "Actress", 
    description: "Judi Dench is a celebrated British actress known for her stage and film performances.",
    image: "images/judidench.png",
    events: []
  },
  { 
    coords: [ -1.0878828, 53.9642257 ], 
    name: "W.H. Auden", 
    occupation: "Poet", 
    description: "W.H. Auden was a renowned poet who was influential in 20th-century English literature.",
    image: "images/whauden.png",
    events: []
  },
  { 
    coords: [ -1.0900558, 53.9488163 ], 
    name: "Steve McLaren", 
    occupation: "Football Manager", 
    description: "Steve McLaren is a former football manager and player.",
    image: "images/stevemclaren.png",
    events: []
  },
  { 
    coords: [ -1.0761981, 53.9747056 ], 
    name: "David Bradley", 
    occupation: "Actor", 
    description: "David Bradley is an actor, known for roles in popular films and TV shows.",
    image: "images/davidbradley.png",
    events: []
  },
  { 
    coords: [ -1.1035692, 53.9693209 ], 
    name: "Benjamin Seebohm Rowntree", 
    occupation: "Social Reformer", 
    description: "Benjamin Seebohm Rowntree was a social reformer and philanthropist.",
    image: "images/seebohmrowntree.png",
    events: []
  },
  { 
    coords: [ -1.0797156, 53.9586856 ], 
    name: "Sir Robert Herbert", 
    occupation: "Politician", 
    description: "Sir Robert Herbert was a prominent politician in 19th-century Britain.",
    image: "images/robertherbert.png",
    events: []
  },
  { 
    coords: [ -1.0793124, 53.9592983 ], 
    name: "Benedict of York", 
    occupation: "Religious Figure", 
    description: "Benedict of York was an important religious figure during medieval times.",
    image: "images/benedictofyork.png",
    events: []
  },
  { 
    coords: [ -1.0791789, 53.9589197 ], 
    name: "Josce of York", 
    occupation: "Religious Figure", 
    description: "Josce of York was a key religious leader during the early medieval period.",
    image: "images/josceofyork.png",
    events: []
  },
  { 
    coords: [ -1.0814422, 53.9576632 ], 
    name: "Christopher Levett", 
    occupation: "Explorer", 
    description: "Christopher Levett was an English explorer and adventurer in the 17th century.",
    image: "images/christopherlevett.png",
    events: []
  },
  { 
    coords: [ -1.0810119, 53.962882 ], 
    name: "Elizabeth Montagu", 
    occupation: "Philanthropist", 
    description: "Elizabeth Montagu was a prominent philanthropist and writer.",
    image: "images/elizabethmontagu.png",
    events: []
  },
  { 
    coords: [ -1.0978319, 53.9526401 ], 
    name: "Tessa Rowntree", 
    occupation: "Philanthropist", 
    description: "Tessa Rowntree was known for her charitable work and influence.",
    image: "images/tessarowntree.png",
    events: []
  },
  { 
    coords: [ -1.0989721, 53.9498429 ], 
    name: "Lt Col Best-Dunkley", 
    occupation: "Military Officer", 
    description: "Lt Col Best-Dunkley served in the military and contributed to various strategic efforts.",
    image: "images/bestdunkley.png",
    events: []
  },
  { 
    coords: [-1.0867494, 53.9600884], 
    name: "Frederick Belmont", 
    occupation: "Confectioner & Entrepreneur", 
    description: "Frederick Belmont founded Bettys Tea Rooms, a beloved Yorkshire institution.",
    image: "images/frederickbelmont.png",
    events: [
      { date: "1885", description: "Born in Switzerland." },
      { date: "1919", description: "Founded Bettys Tea Rooms in Harrogate." },
      { date: "1952", description: "Passed away, leaving behind a legacy in Yorkshire hospitality." }
    ]
},

{ 
    "coords": [-1.0947093, 53.9671262], 
    "name": "Edna Annie Crichton", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/ednaanniechrichton.png",
    "events": []
},

{ 
    "coords": [-1.0824348, 53.9589197], 
    "name": "William Etty", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/williametty.png",
    "events": []
},

{ 
    "coords": [-1.0890382, 53.9635818], 
    "name": "Dr William Arthur Evelyn", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/williamarthurevelyn.png",
    "events": []
},

{ 
    "coords": [-1.086027, 53.9609399], 
    "name": "Guy Fawkes", 
    "occupation": "Revolutionary", 
    "description": "Known for his failed attempt to blow up the Houses of Parliament.",
    "image": "images/guyfawkes.png",
    "events": [
        { "date": "1570", "description": "Born in York." },
        { "date": "1605", "description": "Failed Gunpowder Plot." },
        { "date": "1606", "description": "Executed for his role in the plot." }
    ]
},

{ 
    "coords": [-1.0802024, 53.9603617], 
    "name": "Lady Sarah Hewley", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/ladysarahhewley.png",
    "events": []
},

{ 
    "coords": [-1.0804871, 53.9484147], 
    "name": "Frankie Howerd", 
    "occupation": "Comedian", 
    "description": "Known for his television and stage performances, particularly in British comedy.",
    "image": "images/frankiehowerd.png",
    "events": []
},

{ 
    "coords": [-1.0781188, 53.9568987], 
    "name": "Irish community", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/irish.png",
    "events": []
},

{ 
    "coords": [-1.0858436, 53.956914], 
    "name": "Anne Lister", 
    "occupation": "Writer & Diarist", 
    "description": "Known for her detailed diaries documenting her life, including her same-sex relationships.",
    "image": "images/annelister.png",
    "events": []
},

{ 
    "coords": [-1.0892216, 53.9593817], 
    "name": "Yves Mahé", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/yvesmahe.png",
    "events": []
},

{ 
    "coords": [53.9625563, -1.0853565], 
    "name": "George Walker Milburn", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/georgewalkermilburn.png",
    "events": []
},

{ 
    "coords": [-1.091256, 53.9693543], 
    "name": "John Bowes Morrell", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/johnbowesmorell.png",
    "events": []
},

{ 
    "coords": [-1.0895612, 53.9622175], 
    "name": "John Philips", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/johnphilips.png",
    "events": []
},

{ 
    "coords": [-1.0734887, 53.9501603], 
    "name": "James Pigott Pritchett", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/jamespigottpritchett.png",
    "events": []
},

{ 
    "coords": [-1.1002575, 53.9719364], 
    "name": "Joseph Rowntree", 
    "occupation": "Philanthropist & Social Reformist", 
    "description": "Known for his work in social reform and his company Rowntree's chocolate.",
    "image": "images/josephrowntree.png",
    "events": []
},

{ 
    "coords": [-1.085456, 53.9611167], 
    "name": "Laurence Stern", 
    "occupation": "Author", 
    "description": "Known for his work 'The Life and Opinions of Tristram Shandy, Gentleman.'",
    "image": "images/laurencestern.png",
    "events": []
},

{ 
    "coords": [-1.0684547, 53.9545201], 
    "name": "Samuel Tuke", 
    "occupation": "Philanthropist", 
    "description": "Known for his work with the York Retreat for mental health patients.",
    "image": "images/samueltuke.png",
    "events": []
},

{ 
    "coords": [-1.0550529, 53.9668541], 
    "name": "Mary Ward", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/maryward.png",
    "events": []
},

{ 
    "coords": [-1.0904384, 53.9625133], 
    "name": "John Woolman", 
    "occupation": "Preacher & Writer", 
    "description": "Known for his writings and activism for abolition and the treatment of Native Americans.",
    "image": "images/johnwoolman.png",
    "events": []
},

{ 
    coords: [-1.1034446, 53.9450711], 
    name: "Joseph Terry", 
    occupation: "Confectioner", 
    description: "Joseph Terry founded Terry’s Chocolate Company, known for its Chocolate Orange.",
    image: "images/josephterry.png",
    events: [
      { date: "1828", description: "Born in York." },
      { date: "1867", description: "Established Terry’s Chocolate Company." },
      { date: "1898", description: "Died in York." }
    ]
},

{ 
    coords: [-1.1134441, 53.9533872], 
    name: "James Backhouse", 
    occupation: "Botanist & Quaker Missionary", 
    description: "James Backhouse was a botanist and philanthropist known for his work in York.",
    image: "images/jamesbackhouse.png",
    events: [
      { date: "1794", description: "Born in Darlington." },
      { date: "1831", description: "Began missionary work and botanical research." },
      { date: "1869", description: "Established Backhouse Nurseries in York." }
    ]
},

{ 
    coords: [-1.0872622, 53.961437], 
    name: "Henry Baines", 
    occupation: "Botanist", 
    description: "Henry Baines was a 19th-century botanist who studied Yorkshire’s plant life.",
    image: "images/henrybaines.png",
    events: [
      { date: "1793", description: "Born in York." },
      { date: "1840", description: "Published 'Flora of Yorkshire'." },
      { date: "1878", description: "Passed away in York." }
    ]
},

{ 
    coords: [-1.0492763, 53.9539612], 
    name: "John Barry", 
    occupation: "Composer", 
    description: "John Barry was a film composer famous for his work on James Bond scores.",
    image: "images/johnbarry.png",
    events: [
      { date: "1933", description: "Born in York." },
      { date: "1962", description: "Scored his first James Bond film." },
      { date: "1999", description: "Won five Academy Awards for his film music." },
      { date: "2011", description: "Passed away." }
    ]
},

{ 
    coords: [-1.0846533, 53.9614767], 
    name: "Mary Ellen Best", 
    occupation: "Artist", 
    description: "Mary Ellen Best was a watercolor artist known for documenting 19th-century life.",
    image: "images/maryellenbest.png",
    events: [
      { date: "1809", description: "Born in York." },
      { date: "1830s", description: "Produced extensive watercolor works." },
      { date: "1891", description: "Passed away." }
    ]
},

{ 
    coords: [-1.0975646, 53.9520016], 
    name: "George Butterworth", 
    occupation: "Composer", 
    description: "George Butterworth was a composer known for his English folk music influences.",
    image: "images/georgebutterworth.png",
    events: [
      { date: "1885", description: "Born in York." },
      { date: "1911", description: "Composed 'The Banks of Green Willow'." },
      { date: "1916", description: "Killed in action during World War I." }
    ]
},

{ 
    coords: [-1.0837224, 53.9553593], 
    name: "Hans Hess", 
    occupation: "Art Historian", 
    description: "Hans Hess was a German art historian who contributed to British modern art.",
    image: "images/hanshess.png",
    events: [
      { date: "1908", description: "Born in Germany." },
      { date: "1930s", description: "Fled Nazi Germany and settled in Britain." },
      { date: "1960s", description: "Worked as curator in York." },
      { date: "1975", description: "Passed away." }
    ]
},

{ 
    coords: [-1.0843169, 53.9618406], 
    name: "Constantine", 
    occupation: "Roman Emperor", 
    description: "Constantine the Great was proclaimed Roman Emperor in York.",
    image: "images/constantine.png",
    events: [
      { date: "272", description: "Born in Naissus (modern-day Serbia)." },
      { date: "306", description: "Proclaimed Emperor in York after the death of his father." },
      { date: "313", description: "Issued the Edict of Milan, legalizing Christianity." },
      { date: "337", description: "Died in Nicomedia." }
    ]
},

{ 
    coords: [-1.0905875, 53.9612411], 
    name: "Thomas Cooke", 
    occupation: "Optician & Instrument Maker", 
    description: "Thomas Cooke was an optical designer and maker of telescopes.",
    image: "images/thomascooke.png",
    events: [
      { date: "1807", description: "Born in York." },
      { date: "1857", description: "Designed and built large refracting telescopes." },
      { date: "1868", description: "Died in York." }
    ]
},

{ 
    coords: [-1.0906194, 53.9647176], 
    name: "Stephen (Pit) Corder", 
    occupation: "Linguist", 
    description: "Stephen Corder was a scholar known for his work in applied linguistics.",
    image: "images/stephencorder.png",
    events: [
      { date: "1910", description: "Born in York." },
      { date: "1960s", description: "Developed influential linguistic theories." },
      { date: "1990s", description: "His research influenced modern second-language acquisition." }
    ]
},

{ 
    coords: [-1.0715834, 53.9658982], 
    name: "Mary Ann Craven", 
    occupation: "Confectioner", 
    description: "Mary Ann Craven was a successful businesswoman in the confectionery industry.",
    image: "images/maryanncraven.png",
    events: [
      { date: "1800s", description: "Founded Craven’s, a famous confectionery company in York." },
      { date: "1880s", description: "Expanded business operations across England." }
    ]
},

{ 
    coords: [-1.0798248, 53.9588623], 
    name: "Mary Ann Craven", 
    occupation: "Confectioner", 
    description: "Mary Ann Craven’s business played a key role in York’s sweet-making industry.",
    image: "images/maryanncraven.png",
    events: [
      { date: "1850", description: "Opened a shop producing boiled sweets." },
      { date: "1890", description: "Craven’s sweets gained national recognition." }
    ]
}

];

// Loop through locations and add markers with pop-ups
locations.forEach(location => {
  const marker = new mapboxgl.Marker({
    element: createCustomMarker(location.image)
  })
    .setLngLat(location.coords)
    .setPopup(new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
      .setHTML(`
        <!-- Bold Description at the top -->
        <div style="font-size: 14px; margin-bottom: 10px; font-weight: bold;">${location.description}</div>

        <!-- Divider below the description -->
        <hr class="popup-description-divider">

        <!-- Name and occupation below -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${location.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: bold; font-size: 16px;">${location.name}</span>
            <span style="font-size: 14px; color: #666;">${location.occupation}</span>
          </div>
        </div>

        <!-- Timeline Cards with vertical line and horizontal lines -->
        <div class="timeline-wrapper">
          ${location.events.map(event => `
            <div class="timeline-card">
              <span>${event.date}</span> ${event.description}
            </div>
          `).join('')}
        </div>
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
