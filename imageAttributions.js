// imageAttributions.js

// Array to store image attributions
const imageAttributions = [
  {
    "name": "<a href='https://www.geograph.org.uk/photo/4083893'>Woodlands Hall</a>",
    "author": "Mike Kirby",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/810322'>Aislaby War Memorial</a>",
    "author": "Stephen McCulloch",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/6867116'>Aislaby Quarry</a>",
    "author": "Mick Garratt",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/1920780'>St Margaret’s Church, Aislaby</a>",
    "author": "Martin Dawes",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Ash_Tree_Cottage.jpg'>Ash Tree Cottage</a>",
    "author": "XTOV",
    "license": "CC BY-SA 3.0"
  },
  {
    "name": "<a href='https://commons.wikimedia.org/wiki/File:Goathland_(Incline_Top)_station_site_today.jpg'>Beckhole Incline</a>",
    "author": "XTOV",
    "license": "CC BY-SA 3.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/129941'>RAF Danby Beacon</a>",
    "author": "colin grice",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/1704939'>Lilla Cross</a>",
    "author": "Phil Catterall",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/3259150'>Beckhole Railway Station</a>",
    "author": "Ben Brooksbank",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/316723'>Malo Cross</a>",
    "author": "Mick Garratt",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/1866362'>Hunters Sty Bridge</a>",
    "author": "Tom Richardson",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/676492'>Westerdale Hall</a>",
    "author": "colin grice",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://en.wikipedia.org/wiki/File:Ruswarp_Hydro_plant.jpg'>Ruswarp Hydro</a>",
    "author": "The joy of all things",
    "license": "CC BY-SA 4.0"
  },
  {
    "name": "<a href='https://en.wikipedia.org/wiki/File:Larpool_Viaduct,_Whitby.jpg'>Larpool Viaduct</a>",
    "author": "Acasson",
    "license": "CC BY-SA 4.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/6028480'>Ruswarp Hall</a>",
    "author": "Stephen Craven",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/4127287'>Wreck of The Laura</a>",
    "author": "JThomas",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/5970766'>Wreck of The Diamond</a>",
    "author": "Mat Fascione",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/3597525'>Speeton Sands Pillbox and Defences</a>",
    "author": "Pauline E ",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/451486'>Hawsker Railway Station</a>",
    "author": "Stephen McCulloch",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/2817923'>All Saints Church, Hawsker</a>",
    "author": "Mike Kirby",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/218402'>Old St Margaret’s Church</a>",
    "author": "Oliver Dixon",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://historicengland.org.uk/listing/the-list/list-entry/1436162'>Sheperds’ Memorial</a>",
    "author": "War Memorials Online",
    "license": " "
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/1757509'>Dibble’s Bridge</a>",
    "author": "Karl and Ali",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/5138721'>Egton Railway Station</a>",
    "author": "Peter Moore",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/5764892'>St Hedda’s Catholic Primary School</a>",
    "author": "op47",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/595835'>St Hedda’s Church, Egton Bridge</a>",
    "author": "Trish Steel",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/448737'>Horseshoe Hotel</a>",
    "author": " 	Stephen McKay",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://en.wikipedia.org/wiki/File:Glaisdale_railway_station_MMB_06.jpg'>Glaisdale Railway Station</a>",
    "author": "mattbuck",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/4568221'>Beggar’s Bridge</a>",
    "author": "David Smith",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/5996763'>Stump Cross</a>",
    "author": "Mick Garratt",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/5747080'>Glaisdale Head Methodist Church</a>",
    "author": "op47",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/1997478'>St Thomas’ Church, Glaisdale</a>",
    "author": "Bill Boaden",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://en.wikipedia.org/wiki/File:Lealholm_village.jpg'>Lealholm Mills</a>",
    "author": "Mat Overton",
    "license": "CC BY-SA 3.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/2835480'>Lealholm Methodist Chapel</a>",
    "author": "Mike Kirby",
    "license": "CC BY-SA 2.0"
  },
  {
    "name": "<a href='https://www.geograph.org.uk/photo/1598568'>Lealholm War Memorial</a>",
    "author": "Philip Barker",
    "license": "CC BY-SA 2.0"
  },  
  {
  "name": "<a href='https://commons.wikimedia.org/wiki/File:ENG_Woodstock_Blenheim_Palace_034.jpg'>Blenheim Palace, Woodstock</a>",
  "author": "-wuppertaler",
  "license": "CC BY-SA 4.0"
},
{
  "name": "<a href='https://www.geograph.org.uk/photo/5954542'>The Column of Victory</a>",
  "author": "Steve Daniels",
  "license": "CC BY-SA 2.0"
},
{
  "name": "<a href='https://www.geograph.org.uk/photo/3705246'>A field near Blenheim Palace</a>",
  "author": "Peter Sebbage",
  "license": "CC BY-SA 2.0"
},
{
  "name": "<a href='https://commons.wikimedia.org/wiki/File:Snape-tree-Blenheim_Palace_IMG_3687.jpg'>Blenheim Palace</a>",
  "author": "Snape507",
  "license": "CC BY-SA 4.0"
},
{
  "name": "<a href='https://commons.wikimedia.org/wiki/File:Woodstock_Gate,_Blenheim_Palace.jpg'>Woodstock Gate, Blenheim Palace</a>",
  "author": "Newton2",
  "license": "CC BY-SA 3.0"
},
{
  "name": "<a href='https://www.geograph.org.uk/photo/2334864'>Vanbrugh's 'Grand Bridge'</a>",
  "author": "Les Chatfield",
  "license": "CC BY-SA 2.0"
},
{
  "name": "<a href='https://en.wikipedia.org/wiki/File:Blenheim_Palace_Chapel.jpg'>Blenheim Palace Chapel</a>",
  "author": "Dudlajzu",
  "license": "CC BY-SA 4.0"
},
  {
      "name": "<a href='https://www.geograph.org.uk/photo/126358'>Oliver's Mount</a>",
      "author": "colin grice",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://www.geograph.org.uk/photo/1741549'>GCHQ Scarborough</a>",
      "author": "JThomas",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Peasholm_Park_(Naval_battle0.jpg'>Peasholm Park Lake</a>",
      "author": "DS Pugh",
      "license": "CC BY-SA 3.0"
    },
{
      "name": "<a href='https://commons.wikimedia.org/wiki/File:20190219130240_IMG_5600-02.jpg'>North Bay Railway</a>",
      "author": "Kaly99",
      "license": "CC BY-SA 4.0"
    },
{
      "name": "<a href='https://www.geograph.org.uk/photo/4106498'>Open Air Theatre</a>",
      "author": "Gordon Hatton",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Scarborough_Castle_3.jpg'>Scarborough Castle 3</a>",
      "author": "Nilfanion",
      "license": "CC BY-SA 4.0"
    },
{
      "name": "<a href='https://www.geograph.org.uk/photo/5691799'>Scarborough Town Hall</a>",
      "author": "David Dixon",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Rotunda_Museum_Scarborough_060615.JPG'>Rotunda Museum</a>",
      "author": "Mtaylor848",
      "license": "CC BY-SA 4.0"
    },
  {
      "name": "<a href='https://www.geograph.org.uk/photo/1778540'>Scarborough Spa</a>",
      "author": "Michael Steele",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://www.geograph.org.uk/photo/1398434'>The Grand Hotel</a>",
      "author": "JThomas",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://www.geograph.org.uk/photo/774043'>Cliff Bridge, Scarborough</a>",
      "author": "Peter Church",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://commons.wikimedia.org/wiki/File:ScarboroughRailwayStation.jpg'>Scarborough Railway Station</a>",
      "author": "Clem Rutter, Rochester, Kent.",
      "license": "CC BY-SA 3.0"
    },
{
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Central_Tramway_Company,_Scarborough.jpg'>Central Tramway Company, Scarborough</a>",
      "author": "Amy Bartle",
      "license": "CC BY-SA 4.0"
    },
{
      "name": "<a href='https://www.geograph.org.uk/photo/1903682'>Scarborough Lighthouse</a>",
      "author": "David Wright",
      "license": "CC BY-SA 2.0"
    },
{
      "name": "<a href='https://commons.wikimedia.org/wiki/File:The_Stephen_Joseph_Theatre_in_Scarborough.jpg'>The Stephen Joseph Theatre in Scarborough</a>",
      "author": "Rept0n1x",
      "license": "CC BY-SA 4.0"
    },

                            {
      "name": "<a href='https://www.teamwass.com/sports-talent/cricket/roster/liam-livingstone/'>Liam Livingstone</a>",
      "author": "Wasserman",
      "license": ""
    },
                           {
      "name": "<a href='https://www.telegraph.co.uk/content/dam/obituaries/2024/12/06/TELEMMGLPICT000404331284_17334948564340_trans_NvBQzQNjv4BqVBOOXptsRGI8lw8GFenBES3eGJIAKn2ESThh_No3YbY.jpeg?imwidth=960'>Eddie Stobart</a>",
      "author": "Christopher Furlong/Getty Images",
      "license": ""
    },
                         {
      "name": "<a href='https://www.theguardian.com/books/2018/sep/28/john-cunliffe-obituary#img-1'>John Cunliffe</a>",
      "author": "Yorkshire Post/SWNS",
      "license": ""
    },
                       {
      "name": "<a href='https://www.sciencehistory.org/'>Jim Ratcliffe</a>",
      "author": "Science History Institute",
      "license": "CC BY-SA 3.0"
    },
                       {
      "name": "<a href='https://www.thomascook.com/'>Thomas Cook</a>",
      "author": "Courtesy of Thomas Cook Group",
    },
                     {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Daniel_Craig-62900.jpg#Summary'>Daniel Craig</a>",
      "author": "Harald Krichel",
      "license": "CC BY-SA 4.0"
    },
                     {
      "name": "<a href='https://www.flickr.com/photos/69880995@N04/48531949182/'>Chris Martin</a>",
      "author": "Raph_PH",
      "license": "CC BY-SA 2.0"
    },
                     {
      "name": "<a href='https://www.flickr.com/photos/nickwebb/2947251757/'>Chris Hoy</a>",
      "author": "Nick J Webb",
      "license": "CC BY-SA 2.0"
    },
                     {
      "name": "<a href='https://www.flickr.com/photos/governosp/52498120773/'>Lewis Hamilton</a>",
      "author": "Governo do Estado de Sau Paulo",
      "license": "CC BY-SA 2.0"
    },
                     {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:2015_Australian_Open_-_Andy_Murray_12.jpg'>Andy Murray</a>",
      "author": "Brendan Dennis",
      "license": "CC BY-SA 4.0"
    },
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
       {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Queen_And_Adam_Lambert_-_The_O2_-_Tuesday_12th_December_2017_QueenO2121217-47_(39066610085).jpg'>Roger Taylor</a>",
      "author": "Raph_PH",
      "license": "CC BY-SA 2.0"
    },
       {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Gordon_Ramsay_colour_Allan_Warren.jpg'>Gordon Ramsay</a>",
      "author": "Allan warren",
      "license": "CC BY-SA 2.0"
    },
       {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Ben_Ainslie_(GBR)_2021.jpg'>Ben Aislie</a>",
      "author": "Danwilkinson1414",
      "license": "CC BY-SA 4.0"
    },
       {
      "name": "<a href='https://commons.wikimedia.org/wiki/File:Shield_of_Arms_of_the_Lord_Arundell_of_Wardour.svg'>Humphrey Arundell</a>",
      "author": "Erpecom",
      "license": "CC BY-SA 3.0"
    },
       {
      "name": "<a href='http://www.gahetna.nl/over-ons/open-data'>William Golding</a>",
      "author": "Thomaswwp",
      "license": "CC BY-SA 3.0"
    },
       {
      "name": "<a href='https://www.flickr.com/photos/27811717@N00/414780367/'>Aphex Twin</a>",
      "author": "clattimo",
      "license": "CC BY-SA 2.0"
    },

       {
      "name": "<a href='https://www.gov.uk/government/people/david-cameron'>David Cameron</a>",
      "author": "Lauren Hurley",
      "license": "Contains public sector information licensed under the Open Government Licence v3.0."
    },
       {
      "name": "<a href='https://www.geograph.org.uk/photo/848496'>Penlee Lifeboat crew</a>",
      "author": "Tony Atkin",
      "license": "CC BY-SA 4.0"
    },
     {
      "name": "<a href='https://www.flickr.com/photos/raph_ph/31359883398/'>Mick Fleetwood</a>",
      "author": "Raphael Pour-Hashemi",
      "license": "CC BY-SA 2.0"
    },
       {
      "name": "<a href='https://wellcomeimages.org/indexplus/result.html?_IXMAXHITS_=1&_IXACTION_=query&_IXFIRST_=2&_IXSR_=X4mph8opvQF&_IXSS_=_IXMAXHITS_%3d250%26_IXFPFX_%3dtemplates%252ft%26_IXFIRST_%3d1%26c%3d%2522historical%2bimages%2522%2bOR%2b%2522contemporary%2bimages%2522%2bOR%2b%2522corporate%2bimages%2522%2bOR%2b%2522contemporary%2bclinical%2bimages%2522%26%252asform%3dwellcome%252dimages%26%2524%253dsi%3dtext%26_IXACTION_%3dquery%26i_pre%3d%26IXTO%3d%26t%3d%26_IXINITSR_%3dy%26i_num%3d%26%2524%253dsort%3dsort%2bsortexpr%2bimage_sort%26w%3d%26%2524%253ds%3drutherford%2bmorison%26IXFROM%3d%26_IXshc%3dy%26%2524%2b%2528%2528with%2bwi_sfgu%2bis%2bY%2529%2band%2bnot%2b%2528%2522contemporary%2bclinical%2bimages%2522%2bindex%2bwi_collection%2bor%2b%2522corporate%2bimages%2522%2bindex%2bwi_collection%2529%2529%2band%2bnot%2bwith%2bsys_deleted%3d%252e%26_IXrescount%3d3&_IXSPFX_=templates%2ft&_IXFPFX_=templates%2ft'>Richard Lander</a>",
      "author": "Mezzotint by C. Turner, 1835, after W. Brockedon 1835",
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
