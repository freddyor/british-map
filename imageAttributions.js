// imageAttributions.js

// Array to store image attributions
const imageAttributions = [
     {
      "name": "<a href='https://www.flickr.com/photos/websummit/54135747450/'>Tim Berners Lee</a>",
      "author": "Web Summit",
      "license": "CC BY-SA 2.0"
    },
 {
      "name": "<a href='https://www.geograph.org.uk/photo/7249897'>Whitby Abbey</a>",
      "author": "Jeff Buck",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Gisborough_priory_snow_portrait.jpg'>Gisborough Priory</a>",
      "author": "Prioryman",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Barton-le-Street_Church_(97).JPG'>St Michael's Church, Barton-le-Street</a>",
      "author": "Storye book",
      "license": "CC BY 4.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/7362785'>St Helen's Church, Bilton-in-Ainsty</a>",
      "author": "Alan Murray-Rust",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/2767847'>Ferry Bridge, Brotherton</a>",
      "author": "derek dye",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Croft_North_Yorks_A167_The_Tees.jpg'>Croft Bridge</a>",
      "author": "Dr Ivan Hall",
      "license": "CC BY-SA 3.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Castle_Howard_Station_Lineside_Elevation.jpg'>Castle Howard railway station</a>",
      "author": "Steve Serowka",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1322426'>Church of St Andrew, Kildwick</a>",
      "author": "Gordon Hatton",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Stanwick_Camp_NW_entrance.jpg'>Stanwick Iron Age Fortifications</a>",
      "author": "Lizzyp",
      "license": "Public domain"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:St_Wilfrid%27s_church%2C_Harrogate_-_geograph.org.uk_-_3221047.jpg'>St Wilfrid's Church, Harrogate</a>",
      "author": "Dave Kelly",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1612360'>Church of St Edmund King and Martyr, Kellington</a>",
      "author": "Richard Croft",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1633547'>St Mary's, Studley Royal</a>",
      "author": "Mark Anderson",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Church_of_Christ_the_Consoler%2C_Skelton-on-Ure%2C_North_Yorkshire%2C_UK.jpg'>Church of Christ the Consoler</a>",
      "author": "KJP1",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:150629_Wayne_exterior_web.jpg'>Green Howards Regimental Museum</a>",
      "author": "GHMuseum",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Georgian_Theatre_Royal%2C_Richmond_6.jpg'>Georgian Theatre Royal</a>",
      "author": "Nick Moyes",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/3185658'>Chapel of St Mary Magdalen, Ripon</a>",
      "author": "Peter Goodman",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Ripon_Cathedral_Exterior%2C_Nth_Yorkshire%2C_UK_-_Diliff.jpg'>Ripon Cathedral</a>",
      "author": "Diliff",
      "license": "CC BY-SA 3.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1836338'>St Martin-on-the-Hill, Scarborough</a>",
      "author": "Graham Burnett",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1328284'>St Mary's Church, Scarborough</a>",
      "author": "Keith Evans",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Stockeld_Park_House.jpg'>Stockeld Park</a>",
      "author": "GPBG1204",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Captain_Cooks_House_2013-09-05_10-02-00.jpg'>Captain Cook Memorial Museum</a>",
      "author": "aude",
      "license": "CC BY-SA 3.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1093039'>St Mary's Church, Whitby</a>",
      "author": "Tom Richardson",
      "license": "CC BY-SA 2.0"
    },
     {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Whitby_199_Steps.jpg'>Whitby 199 steps</a>",
      "author": "RevDave",
      "license": "CC BY-SA 3.0"
    },
   {
      "name": "<a href='https://www.geograph.org.uk/photo/2391507'>St Andrew's Church, Aldborough</a>",
      "author": "Paul Buckingham",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/7529932'>Priest's House, Barden</a>",
      "author": "Kevin Waterhouse",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/13487'>Beamsley Hospital</a>",
      "author": "John Tomlinson",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Church_of_St_Gregory,_Bedale.jpg'>Church of St Gregory, Bedale</a>",
      "author": "The joy of all things",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/390100'>Monument to the 7th Earl of Carlisle</a>",
      "author": "Stephen Horncastle",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/23564'>Church of St Anne, Catterick</a>",
      "author": "Alison Stamp",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Church_of_St_Lambert_Burneston_from_the_south_west.jpg'>Church of St Lambert, Burneston</a>",
      "author": "The joy of all things",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/126751'>Coverham Abbey</a>",
      "author": "Chris Heaton",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/231035'>Church of St Peter, Croft-on-Tees</a>",
      "author": "Bill Henderson",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:EasbyAbbey_Refectory.jpg'>Easby Abbey</a>",
      "author": "JohnArmagh",
      "license": "CC BY-SA 4.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:VA23Oct10_101-crop-horz.jpg'>Easby Cross</a>",
      "author": "Johnbod",
      "license": "CC BY-SA 3.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Filey,_St_Oswald%27s_church_(33968797576).jpg'>Church of St Oswald, Filey</a>",
      "author": "Jules & Jenny from Lincoln, UK",
      "license": "CC BY 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1370218'>Church of St Alkelda, Giggleswick</a>",
      "author": "Andy Jamieson",
      "license": "CC BY-SA 2.0"
    },
  {
      "name": "<a href='https://www.geograph.org.uk/photo/1801357'>Mulgrave Castle</a>",
      "author": "Peter Church",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "Gatherley Castle",
      "author": "The Northern Echo",
      "license": "Copyrighted"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1948449'>Northallerton Castle</a>",
      "author": "Bob Embleton",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Kilton_Castle.jpg'>Kilton Castle</a>",
      "author": "Mick Garratt",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.flickr.com/photos/22767350@N08/5591956631'>Hornby Castle</a>",
      "author": "Stephen George-Powell",
      "license": "CC BY 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/1318287'>Richmond Castle</a>",
      "author": "Dylan Moore",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://www.geograph.org.uk/photo/2697723'>Thirsk Castle</a>",
      "author": "Bill Boaden",
      "license": "CC BY-SA 2.0"
    },
    {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Scarborough_Castle_3.jpg'>Scarborough Castle</a>",
      "author": "Humphrey Bolton",
      "license": "CC BY-SA 2.0"
    },
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
