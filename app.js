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
    padding: 15px !important;
    font-family: 'Poppins', sans-serif !important; /* Apply Poppins font */
    background: #E6F2E9;
    border: 2px solid #f0f0f0 !important;
    line-height: 1.05;
  }

  .mapboxgl-popup-content img {
    border: 2px solid #f0f0f0 !important;
    border-radius: 8px;
  }

  .mapboxgl-popup-close-button:focus {
    outline: none !important;
  }

  /* Style for the description text */
  .mapboxgl-popup-content p {
    font-weight: normal !important; /* Ensure the description text is not bold */
    text-align: center; /* Align text centrally */
    font-size: 16px !important; /* Ensure the size matches the text size used for the cards */
    margin-bottom: 20px !important; /* Add bottom margin */
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

  .timeline-card span {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  .popup-description-divider {
    margin: 10px 0;
    border: none;
    height: 1px;
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
  }

  /* Remove the title (span) from the tldr card */
  .tldr-card span {
    display: none !important; /* Completely hide the title */
  }

  .tldr-card p {
    margin-bottom: 0;
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


// Full array of locations with names, occupations, descriptions, images, and events
const locations = [
  { 
    coords: [ -1.076124, 53.9639651 ], 
    name: "George Hudson", 
    occupation: "The Railway King", 
    description: "George Hudson lived here",
    image: "images/georgehudson.png",
    tldr: "Born on a farm. Both his parents dead by 8 years old. Inherits money but is business smart. Becomes richest man in England and aristorcratic party host. Loses everything and flees to France.",
    events: [
      { date: "1800", description: "George was born in Howsam to farmer John Hudson and his wife Elizabeth." },
      { date: "1806", description: "Elizabeth dies when George is six years old. John dies two years later, when George is eight." },
      { date: "1821", description: "George completes a drapers apprenticeship at Bell & Nicholson on Goodramgate, gaining shares in the company. George marries Nicholsons daughter of whoch they have four successful children." },
      { date: "1827", description: "George's great-uncle, Matthew Botterill, passes away. George inherits £5000 in legacy and substantially more in land value, making him one of the richest men in York. He moved into Matthew's Georgian townhouse here at 44 Monkgate." },
      { date: "1833", description: "George played a leading part in the establishment of the York Union Banking Company, in which he was the largest shareholder. This bank was aquired by Barclay & Co in 1902 " },
      { date: "1833", description: "George joined a scheme to prepare plans for a York to Leeds railway, in the process learning much about the railway business." },
      { date: "1800", description: "George Hudson became Lord Mayor of York" },
      { date: "1837", description: "This was the beginning of the reign of Queen Victoria and, to celebrate her birthday, George held a grand parade and dinner for 14,000 York people. His generous hosting of balls and dances continued over several years and the Hudsons entertained many members of the aristocracy at their Knightsbridge home in London in the 1840s." },
      { date: "1800", description: "George was born in Howsam to farmer John Hudson and his wife Elizabeth." },
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
    coords: [-1.0843668, 53.9600807], 
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
    "coords": [-1.0928107, 53.9671791], 
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
    "coords": [-1.0919582, 53.9635731], 
    "name": "Dr William Arthur Evelyn", 
    "occupation": "[Your choice]", 
    "description": "lived out the end of his life here",
    "image": "images/williamarthurevelyn.png",
    "events": []
},

{ 
    "coords": [-1.0830932, 53.961744], 
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
    "coords": [-1.0778231, 53.9484063], 
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
    "coords": [-1.0843004, 53.9593267], 
    "name": "Yves Mahé", 
    "occupation": "[Your choice]", 
    "description": "[Your choice]",
    "image": "images/yvesmahe.png",
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
    "coords": [-1.0726007, 53.9504313], 
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
    "coords": [-1.0829369, 53.9611485], 
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
    coords: [-1.1107642, 53.953332], 
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
    coords: [-1.0720158, 53.9361983], 
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
    coords: [-1.0976615, 53.9520295], 
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
    coords: [-1.0879721, 53.9612032], 
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
           <p style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">${location.description}</p>
                <div style="border-top: 2px solid #ccc; margin-bottom: 10px;"></div> <!-- Grey divider -->
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${location.image}" alt="${location.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;" />
                    <div>
                        <div style="font-size: 16px; font-weight: bold;">${location.name}</div>
                        <div style="font-size: 14px; color: #666;">${location.occupation}</div>
                    </div>
                </div>
                <div style="background: #e8f5e9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <span style="font-weight: bold; display: block; margin-bottom: 5px;">TL;DR</span>
                    <p>${location.tldr}</p>
                </div>
                ${location.events.length ? `
                    <div style="margin-top: 10px;">
                        ${location.events.map(event => `
                            <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                <strong style="color: #9b4dca;">${event.date}</strong>: ${event.description}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            `)
        )
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
