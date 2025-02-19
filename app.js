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
    padding: 10px !important;
    font-family: 'Poppins', sans-serif !important; /* Apply Poppins font */
    background: #E9E8E0 ;
    border: 2px solid #f0f0f0 !important;
    line-height: 1.05;
  }

  .mapboxgl-popup-content {
    padding-top: 0 !important;  
    padding-bottom: 0 !important;
    margin-left: 3;
    margin-right: 5;
  }

  .mapboxgl-popup-content img {
    border: 2px solid #f0f0f0 !important;
    border-radius: 8px;
  }

  /* Style for the description text */
  .mapboxgl-popup-content p {
    font-weight: normal !important; /* Ensure the description text is not bold */
    text-align: center; /* Align text centrally */
    letter-spacing: -0.5x;
    font-size: 13px !important; /* Ensure the size matches the text size used for the cards */
    margin-bottom: 10px !important; /* Add bottom margin */
  }

   .mapboxgl-popup-close-button {
    display: none !important;
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

  .timeline-card .date, .timeline-card span, .timeline-card p {
  display: none !important;
  }

  .popup-description-divider {
    margin: 10px 0;
    border: 0;
    height: 0.2px;
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
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Remove the title (span) from the tldr card */
  .tldr-card span {
    display: none !important; /* Completely hide the title */
  }

.tldr-card p {
    font-size: 10px !important; /* Set desired font size */
    line-height: 1.4; /* Optional: set line height for readability */
    margin-bottom: 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
{ date: "2003", description: "George was ranked the greatest doctor of all time by a poll of doctors." },
]
  },
  { 
    coords: [ -1.0861561, 53.9587634 ], 
    name: "John Snow", 
    occupation: "1813-1858", 
    description: "John Snow was born into poverty here on 15 March 1813 and is memorialized in the garden opposite.",
    image: "images/johnsnow.png",
    tldr: "Snow is famous for proving choleria was waterborne during a 1854 cholera outbreak. He was also a pioneer in the use of chloroform.",
     events: [
{ date: "Royalty", description: " Snow’s reputation for safety and skill led to his successful administration of chloroform to Queen Victoria during the births of Prince Leopold (1853) and Princess Beatrice (1857)👑"},
{ date: "2001", description: "John Snow College was founded in Durham 👨‍🎓" },
{ date: "2003", description: "Snow was ranked the greatest doctor of all time by a poll of doctors 🥇" },
]
  },
   {
    coords: [ -1.0911787, 53.9555643 ], 
    name: "George Leeman", 
    occupation: "Historian", 
    description: "xxx",
    image: "images/georgeleeman.png",
    tldr: "Key figure in railway history and politics in York.",
    events: [
      { date: "1853", description: "Became Chairman of the North Eastern Railway." },
      { date: "1865", description: "Elected as Member of Parliament for York." },
      { date: "1882", description: "Passed away, leaving a strong legacy in York's railway development." },
    ]
  },
  {
    coords: [ -1.0812717, 53.9628137 ], 
    name: "John Goodricke", 
    occupation: "Astronomer", 
    description: "xxx",
    image: "images/johngoodricke.png",
    tldr: "Pioneering astronomer who studied variable stars.",
    events: [
      { date: "1783", description: "Discovered periodic dimming of Algol, a variable star." },
      { date: "1784", description: "Awarded the Copley Medal by the Royal Society." },
      { date: "1786", description: "Passed away at the age of 21, leaving a major impact on astronomy." },
    ]
  },
  {
    coords: [ -1.0854884, 53.9618703 ], 
    name: "Judi Dench", 
    occupation: "1934-", 
    description: "Judi Dench watched her first plays here as a child",
    image: "images/judidench.png",
    tldr: "Judi Dench needs no introduction, she is one of the greatest actors of all time.",
    events: [
      { date: "1998", description: "Dench won an Academy Award for playing Queen Elizabeth in 'Shakespeare in Love.' She has won over 20 prestigious awards over her seven-decade career, including two Golden Globes." },
      { date: "1995", description: "Dench is the longest-serving cast member of the James Bond franchise, playing M until 2015." },
      { date: "CHARITY", description: "By the late 1990s she was patron of over 180 charities, including York Against Cancer." },
    ]
  },
  {
    coords: [ -1.0878828, 53.9642257 ], 
    name: "W.H. Auden", 
    occupation: "1907-1973", 
    description: "W.H.Auden was born and lived his inital years at this location",
    image: "images/whauden.png",
    tldr: "Wystan Hugh Auden is often classed as Britain's greatest 20th century writer.",
    events: [
      { date: "1948", description: "He won the Pulitzer Prize for 'The Age of Anxiety'." },
      { date: "1967", description: "Auden was considered to be Poet Laureate of the United Kingdom but was rejected due to his American citizenship." },
    ]
  },
  {
    coords: [ -1.0900558, 53.9488163 ], 
    name: "Steve McLaren", 
    occupation: "1961-", 
    description: "Steve McLaren studied here as a child",
    image: "images/stevemclaren.png",
    tldr: "Steve McLaren is oone of England's greatest football managers.",
    events: [
      { date: "1970s", description: "Steve chose to cycle 4 miles a day to Nunthorpe school due to its emphasis on sports 🚴" },
      { date: "2006", description: "Appointed England national team manager." },
      { date: "SUCCESS", description: "He won one champions league and three Premier Leagues as assistant Manchester United manager 🏆" },
    ]
  },
  {
    coords: [ -1.0761981, 53.9747056 ], 
    name: "David Bradley", 
    occupation: "1942-", 
    description: "Award-winning David Bradley performed stage musicals here as a child",
    image: "images/davidbradley.png",
    tldr: "David Bradley is one of the finest actors Britain has produced.",
    events: [
      { date: "FILCH", description: "He played Argus Filch in the 'Harry Potter' series 🪄" },
      { date: "2017", description: "Bradley played 'The First Doctor' in Doctor Who in 2017 and 2023." },
    ]
  },
 { 
    coords: [ -1.1035692, 53.9693209 ], 
    name: "Benjamin Seebohm Rowntree", 
    occupation: "Social Reformer", 
    description: "xxx", 
    tldr: "Benjamin Seebohm Rowntree was a social reformer and philanthropist known for his influential studies on poverty and welfare.", 
    image: "images/seebohmrowntree.png", 
    events: [
        { date: "1901", description: "Rowntree conducted his influential study on poverty in York, highlighting the social and economic disparities among the working class 📊" },
        { date: "1904", description: "He founded the Rowntree Trust to support social reform projects aimed at reducing poverty and improving education 🏫" },
        { date: "1920s", description: "Rowntree’s research significantly influenced British social policy, particularly in welfare and housing reform 🏘️" },
    ]
},

{ 
    coords: [ -1.0797156, 53.9586856 ], 
    name: "Sir Robert Herbert", 
    occupation: "Politician", 
    description: "xxx", 
    tldr: "Sir Robert Herbert was a prominent politician in 19th-century Britain, known for his role in public service and political leadership.", 
    image: "images/robertherbert.png", 
    events: [
        { date: "1830s", description: "Herbert served as a key political figure, contributing to policy decisions and reforms in the British Parliament 🏛️" },
        { date: "1840s", description: "He played a vital role in shaping educational and social reform policies in the British government 🎓" },
        { date: "1850s", description: "Herbert became involved in the promotion of colonial interests, influencing British imperial policy 🌍" },
    ]
},

{ 
    coords: [ -1.0793124, 53.9592983 ], 
    name: "Benedict of York", 
    occupation: "1189", 
    description: "Benedict of York once lived here", 
    tldr: "Benedict of York was a leading York Jew and the second-greatest moneylender behind Josce.", 
    image: "images/benedictofyork.png", 
    events: [
        { date: "WEALTH", description: "William of Newbury described Benedict's house as \"unto a royal palace in size and strength\"." },
        { date: "1189", description: "Benedict attended the coronation of King Richard I where he was forcibly baptised. He was killed shortly after." },
        { date: "1190", description: "His children and widow were burned alive in his house during the Easter York riot." },
    ]
},

{ 
    coords: [ -1.0791789, 53.9589197 ], 
    name: "Josce of York", 
    occupation: "1190", 
    description: "Josce of York once lived here", 
    tldr: "Josce of York was the wealthy leader of the Jewish community in York.", 
    image: "images/josceofyork.png", 
    events: [
        { date: "JEWISH", description: "Josce owned the land of which the Chief Synagogue in London was built." },
        { date: "1190", description: "When an angry mob trapped York's Jewish community in Clifford's Tower, the decision was made to mutually committ suicide rather than face the mob. Josce was the first to act, slaying his wife and children." },
    ]
},

{ 
    coords: [ -1.0814422, 53.9576632 ], 
    name: "Christopher Levett", 
    occupation: "1586-1630", 
    description: "Christopher Levett was born and raised here", 
    tldr: "Christopher Levett was a key figure in the New World discovery.", 
    image: "images/christopherlevett.png", 
    events: [
        { date: "1623", description: "Levett became the first European to settle present-day Maine after securing 6000 acres from the King. He called the settlement York, this was the orginal New York 🌎" },
        { date: "1624", description: "He commanded HMS Susan and Ellen during the attack of the Spanish at Cadiz ⚓" },
        { date: "1624", description: "Fort Levett in Maine is named after Christopher. Also, present-day York County, Maine, derives its name from his ambitions. " },
    ]
},

{ 
    coords: [ -1.0810119, 53.962882 ], 
    name: "Elizabeth Montagu", 
    occupation: "1718-1800", 
    description: "Elizabeth Montagu was raised here in Treasurer's House", 
    tldr: "Elizabeth Montagu was a philanthropist who used her priveledged social position to advance the status od women.", 
    image: "images/elizabethmontagu.png", 
    events: [
        { date: "WEALTH", description: "Elizabeth married into the extrmemely wealth Montagu family. She inherites substantial amounts upon her husbands death 💰" },
        { date: "Late 1800s", description: "Elizabeth used her London mansion to hold Bluestocking meetings, which gave women the chance to join debate. Queen Charlotte and her daughters even visited 👑" },
        { date: "LEGACY", description: "Elizabeth and the Bluestockings were mentioned in the works of most future womens rights activists." },
    ]
},

{ 
    coords: [ -1.0978319, 53.9526401 ], 
    name: "Tessa Rowntree", 
    occupation: "1909-1999", 
    description: "Tessa Rowntree went to school here at The Mount", 
    tldr: "Tessa Rowntree was a charity worker, descendent of Joseph Rowntree.", 
    image: "images/tessarowntree.png", 
    events: [
        { date: "1938", description: "Tessa was in Germany when she saw Hitler. She saw his personal magnetism despite his 'horrid little voice'. She also saw Joseph Goebbels." },
        { date: "1939", description: "She helped evacuate and settle hundreds of refugees from Europe in England. She escorted 66 kindergarten children to England." },
        { date: "1946", description: "Tessa and her partner settled in New Jersey, where she worked as a librarian until death 🇺🇸" },
    ]
},

{ 
    coords: [ -1.0989721, 53.9498429 ], 
    name: "Lt Col Best-Dunkley", 
    occupation: "1890-1917", 
    description: "Brtram Best-Dunkley grew up on this street", 
    tldr: "Lt Col Best-Dunkley was a heroic military captain who died in Belgium..", 
    image: "images/bestdunkley.png", 
    events: [
        { date: "CHINA", description: "Before the war, Best-Dunkley was a teacher at Tienstin Grammar School, China 🇨🇳" },
        { date: "1917", description: "\"Lt.-Col. Best-Dunkley dashed forward, rallied his leading waves, and personally led them to the assault of these positions, which, despite heavy losses, were carried. He continued to lead his battalion until all their objectives had been gained. This gallant officer has since died of wounds\"." },
        { date: "1917", description: "He was awarded the Victoria Cross 0 the highest award in British armed forces 🎖️" },
    ]
},

  { 
    coords: [-1.0843668, 53.9600807], 
    name: "Frederick Belmont", 
    occupation: "-1952", 
    description: "This is where Frederick Belmont opened up the second Bettys",
    image: "images/frederickbelmont.png",
    tldr: "Frederick Belmont was a Swiss orphan who founded Bettys Tea Rooms.",
    events: [
      { date: "YOUTH", description: "He was orphaned at five years and effectively auctioned off to a farmer." },
      { date: "1919", description: "Bettys Tea Rooms in Harrogate was first opened. He described it as \"sink or swim\". He had trained to be a baker in France and crossed the Channel to make a life in England. " },
      { date: "1936", description: "Frederick looked out from the deck onto New York during the Queen Mary maiden voyage. His jounrey was inspirational." },
    ]
},

{
  "coords": [-1.0928107, 53.9671791],
  "name": "Edna Annie Crichton",
  "occupation": "Mayor & Philanthropist",
  "description": "xxx",
  "tldr": "First female Lord Mayor of York, known for her contributions to social welfare.",
  "image": "images/ednaanniechrichton.png",
  "events": [
    { "date": "1941", "description": "Became the first female Lord Mayor of York." },
    { "date": "1950", "description": "Recognized for her contributions to social reform in York." },
  ]
},

{
  "coords": [-1.0824348, 53.9589197],
  "name": "William Etty",
  "occupation": "Painter",
  "description": "xxx",
  "tldr": "Renowned artist known for his large-scale historical and mythological paintings.",
  "image": "images/williametty.png",
  "events": [
    { "date": "1787", "description": "Born in York, England." },
    { "date": "1828", "description": "Elected as a full member of the Royal Academy." },
    { "date": "1849", "description": "Led campaigns to preserve York’s city walls." },
  ]
},

{
  "coords": [-1.0919582, 53.9635731],
  "name": "Dr William Arthur Evelyn",
  "occupation": "Historian & Conservationist",
  "description": "lived out the end of his life here",
  "tldr": "A key figure in preserving York’s historic buildings and heritage.",
  "image": "images/williamarthurevelyn.png",
  "events": [
    { "date": "1902", "description": "Helped found the Yorkshire Architectural and York Archaeological Society." },
    { "date": "1935", "description": "Led efforts to save York’s historic structures from demolition." },
  ]
},

{ 
    coords: [-1.0830932, 53.961744], 
    name: "Guy Fawkes", 
    occupation: "Revolutionary", 
    description: "xxx", 
    tldr: "Known for his failed attempt to blow up the Houses of Parliament, Guy Fawkes became an infamous figure in British history.", 
    image: "images/guyfawkes.png", 
    events: [
        { date: "1605", description: "Fawkes was part of the Gunpowder Plot, a failed attempt to assassinate King James I and blow up the Houses of Parliament 💥" },
        { date: "1606", description: "After the plot failed, Fawkes was arrested and executed, becoming a symbol of rebellion and resistance 🔥" },
        { date: "Modern Day", description: "Guy Fawkes’ legacy lives on every November 5th, celebrated as Guy Fawkes Night (or Bonfire Night) with fireworks and bonfires across the UK 🎆" },
    ]
},

{
  "coords": [-1.0802024, 53.9603617],
  "name": "Lady Sarah Hewley",
  "occupation": "Philanthropist",
  "description": "xxx",
  "tldr": "Noted for her charitable work and establishment of almshouses in York.",
  "image": "images/ladysarahhewley.png",
  "events": [
    { "date": "1705", "description": "Founded almshouses for the elderly and disadvantaged in York." },
    { "date": "1710", "description": "Established a trust to continue charitable work beyond her lifetime." },
  ]
},

{ 
    coords: [-1.0778231, 53.9484063], 
    name: "Frankie Howerd", 
    occupation: "Comedian", 
    description: "xxx", 
    image: "images/frankiehowerd.png", 
    tldr: "Frankie Howerd was a legendary comedian known for his unique style in television and stage performances in British comedy.", 
    events: [
        { date: "1960s", description: "Howerd became famous for his slapstick humor and witty performances on British television, including his sitcoms and stand-up acts 📺" },
        { date: "1970s", description: "He achieved national fame with his appearances on 'Howerd's World' and 'Up Pompeii!' 🎭" },
        { date: "1980s", description: "Howerd continued to perform, becoming a beloved figure in British comedy, earning a lasting legacy with his unique comedic style 🤣" },
    ]
},

{ 
    coords: [-1.0858436, 53.956914], 
    name: "Anne Lister", 
    occupation: "Writer & Diarist", 
    description: "xxx", 
    image: "images/annelister.png", 
    tldr: "Anne Lister was a pioneering diarist and writer known for documenting her life and same-sex relationships in her detailed journals.", 
    events: [
        { date: "Early 1800s", description: "Lister began writing extensive diaries that chronicled her life and relationships, particularly with women 📖" },
        { date: "1830s", description: "Her diaries became an important document of LGBTQ+ history, offering an unflinching insight into her personal life during a repressive era 🏳️‍🌈" },
        { date: "1980s", description: "Anne Lister's diaries were rediscovered and published, bringing her story into the public eye and earning her a place in LGBTQ+ history 🌟" },
    ]
},

{
  "coords": [-1.0843004, 53.9593267],
  "name": "Yves Mahé",
  "occupation": "WWII Pilot",
  "description": "xxx",
  "tldr": "French pilot credited with defending York during the Baedeker Raids in WWII.",
  "image": "images/yvesmahe.png",
  "events": [
    { "date": "1942", "description": "Played a key role in defending York from German air raids." },
    { "date": "1945", "description": "Recognized for his wartime contributions by both Britain and France." },
  ]
},

{
  "coords": [-1.091256, 53.9693543],
  "name": "John Bowes Morrell",
  "occupation": "1873-1963",
  "description": "This was the home of J.B. Morrell",
  "tldr": "J.B. Morrell turned down a seat in parliament and a knighthood, putting every ounce of his life into York.",
  "image": "images/johnbowesmorell.png",
  "events": [
    { "date": "1914", "description": "John was appointed Lord Mayor due to his abilities on the York council. He became Lord Mayor again in 1949, whilst already chairing 6 public committies.." },
    { "date": "1914", "description": "John released a book named The City of our Dreams, which analysed the past and future of York 📖" },
    { "date": "1914", "description": "John created the York Conservation Trust that now manages a large number of historic York buildings. Members of the Morrell family still run it 🏛️" },
    { "date": "1914", "description": "John was the driving force behind the creation of York University and the library was named after him 🏫" },
  ]
},

{
  "coords": [-1.0895612, 53.9622175],
  "name": "John Philips",
  "occupation": "1800-1874",
  "description": "John Philips chose to refurbish and live here in St Mary's Lodge.",
  "tldr": "Orphaned at 7 years old, John Philips become one of England's finest geologists and once debated Charles Darwin.",
  "image": "images/johnphilips.png",
  "events": [
    { "date": "1831", "description": "John founded the British Association for the Advancement of Science in 1831. He was secretary until 1863, then becoming President." },
    { "date": "1856", "description": "He became Professor of Geology at University of Oxford and was elected President to the Geological Society of London 🏫" },
  ]
},

{
  "coords": [-1.0726007, 53.9504313],
  "name": "James Pigott Pritchett",
  "occupation": "1789-1868",
  "description": "James Pigott Pritchett was the architect of this cemetery and was buried here",
  "tldr": "Pritchett was a renowned architect, responsible for much of York's buildings",
  "image": "images/jamespigottpritchett.png",
  "events": [
    { "date": "1845", "description": "Pritchett was the architect of Huddersfield Railway Station, one of the most impressive stations in England 🚂" },
    { "date": "YORK", "description": "He was also the architect the chapel – now Zizzi’s restaurant – on Lendal (1816), the Chapel on Little Stonegate (1851, now The Banyan bar) and York County Savings Bank in St Helen’s Square (1829-30). " },
  ]
},

{ 
    coords: [-1.1002575, 53.9719364], 
    name: "Joseph Rowntree", 
    occupation: "Philanthropist & Social Reformist", 
    description: "xxx", 
    image: "images/josephrowntree.png", 
    tldr: "Joseph Rowntree was a philanthropist and social reformist, known for his impact on social welfare and his association with Rowntree's chocolate.", 
    events: [
        { date: "Late 1800s", description: "Rowntree's established his chocolate company, which became an iconic name in the chocolate industry 🍫" },
        { date: "1904", description: "He pioneered progressive welfare policies, including the creation of the 'Rowntree Report' on poverty, which influenced social policy in the UK 📊" },
        { date: "1917", description: "Rowntree created a company town in York, improving the lives of workers by providing affordable housing and better working conditions 🏘️" },
  ]
},

{ 
    coords: [-1.0829369, 53.9611485], 
    name: "Laurence Stern", 
    occupation: "1713-1768", 
    description: "This is where Tristam Shandy was first published. ", 
    image: "images/laurencestern.png", 
    tldr: "Laurence Stern was the author of The Life and Opinions of Tristram Shandy, Gentleman, a groundbreaking yet divisive work in literature.", 
    events: [
        { date: "1759", description: "First 200 copies of Tristam Shandy were sold in Stonegate. A London bookseller turned him down so he did this at his own expense. 📚" },
        { date: "INFLUENCE", description: "George Washington, Karl Marx and Goethe were all fans of Tristam Shandy. The book is still printed today all over the world. 📝" },
    ]
},

{ 
    coords: [-1.0684547, 53.9545201], 
    name: "Samuel Tuke", 
    occupation: "1784-1857", 
    description: "xxx", 
    image: "images/samueltuke.png", 
    tldr: "Samuel Tuke was a philanthropist who is renowned for his work with the York Retreat, an institution for mental health patients.", 
    events: [
        { date: "1759", description: "Samuel Tuke helped establish the York Retreat, a progressive facility focused on humane treatment for mental health patients 🏥" },
        { date: "1815", description: "He wrote *Description of the Retreat*, which became a foundational text in the treatment of mental health issues at the time 📖" },
        { date: "1829", description: "Tuke’s work contributed to the development of new, compassionate approaches to mental health care across Europe 🌍" },
    ]
},

{
  "coords": [-1.0550529, 53.9668541],
  "name": "Mary Ward",
  "occupation": "1585-1645",
  "description": "Mary Ward died here at Heworth Manor",
  "tldr": "Mary Ward was a Catholic missionary who has one of the greatest religious legacies of all time.",
  "image": "images/maryward.png",
  "events": [
    { "date": "1869", "description": "Two of Mary’s uncles and a brother-in-law were killed after the Gun Powder Plot." },
    { "date": "1869", "description": "Mary founded 7 institutions across Europe, beleiving there should be no differnece between men and women being able to do God's work." },
    { "date": "1869", "description": "She was imprisoned in Munich for heresy." },
    { "date": "1869", "description": "Her institution became the Congregation of Jesus and is now spread all over the world with 200 schools. Pope Benedict XVI granted her the title 'Venerable' for her 'heroic virtue', 364 years after her death ." },
  ]
},
  { 
    coords: [-1.0904384, 53.9625133],
    name: "John Woolman",
    occupation: "1720-1772",
    description: "John Woolman died in this house.",
    image: "images/johnwoolman.png",
    tldr: "John Woolman was an American anti-slavery campaigner, who died in York.",
    events: [
      { date: "1928", description: "He created Joseph Terry & Co in St Helen's Square" },
      { date: "1928", description: "He created Joseph Terry & Co in St Helen's Square" },
      { date: "1928", description: "He created Joseph Terry & Co in St Helen's Square" },
    ]
  },
  { 
    coords: [-1.1034446, 53.9450711],
    name: "Joseph Terry",
    occupation: "1793-1850",
    description: "Joseph Terry lived here on Tadcaster Road",
    image: "images/josephterry2.png",
    tldr: "Joseph Terry is the founder of the company behind Chocolate Orange and many more famous chocolates.",
    events: [
      { date: "CHEMIST", description: "Joseph apprenticed as a chemist, utilising these skills to make cakes, sweets, marmalade, candied peel, mushroom ketchup and lozenges 🍫" },
      { date: "1928", description: "He created Joseph Terry & Co in St Helen's Square" },
      { date: "2025", description: "Multiple takeovers have happened since WW2, but Terry's is now a £60 million/year business 💸" },
    ]
  },
  { 
    coords: [-1.084409, 53.9602144],
    name: "Joseph Terry",
    occupation: "1793-1850",
    description: "This is where Joseph Terry founded the chocolate brand",
    image: "images/josephterry1.png",
    tldr: "Joseph Terry is the founder of the company behind Chocolate Orange and many more famous chocolates.",
    events: [
      { date: "CHEMIST", description: "Joseph apprenticed as a chemist, utilising these skills to make cakes, sweets, marmalade, candied peel, mushroom ketchup and lozenges 🍫" },
      { date: "1928", description: "He created Joseph Terry & Co in St Helen's Square" },
      { date: "2025", description: "Multiple takeovers have happened since WW2, but Terry's is now a £60 million/year business 💸" },
    ]
  },
  { 
    coords: [-1.1107642, 53.953332],
    name: "James Backhouse",
    occupation: "1794-1869",
    description: "James Backhouse ran his botanic nursery here.",
    image: "images/jamesbackhouse.png",
    tldr: "James Backhouse was a botanist, missionary and philanthropist.",
    events: [
      { date: "1815", description: "James bought a York botanic nursery and allowed it to flourish." },
      { date: "TOUR", description: "He visited all the British colonies and campaigned for fairer conditions for prisoners and aboriginals. He also sent plants back to his nursery." },
      { date: "PHILANTHROPY", description: "James generously gave financial aid and gave hundreds of public speeches over his life." },
    ]
  },
  { 
    coords: [-1.0872622, 53.961437],
    name: "Henry Baines",
    occupation: "1793-1878",
    description: "This is where Henry Baines first put a shovel in the ground.",
    image: "images/henrybaines.png",
    tldr: "Henry Baines is the man to whom we owe gratitude for Museum Gardens.",
    events: [
      { date: "1830", description: "The Yorkshire Museum opened and the initial three acres of Museum Gardens were landscaped and planted by Henry 🌷" },
      { date: "1840", description: "At his own expense, Henry Baines published Flora of Yorkshire 📖" },
      { date: "1840", description: "Henry lived on Museum Garden grounds his entire life, so did his daughter." },
    ]
  },
  { 
    coords: [-1.0720158, 53.9361983],
    name: "John Barry OBE",
    occupation: "1933-2011",
    description: "John Barry grew up here.",
    image: "images/johnbarry.png",
    tldr: "John Barry is the man behind the James Bond theme tune.",
    events: [
      { date: "1947", description: "John worked as a projectionist at the York Rialto cinema from the age of 14. He also played in a York jazz band called the Modernaires 📽️" },
      { date: "1950s", description: "He played with and arranged for various army ensembles whilst on service in Cyprus and Egypt." },
      { date: "1962", description: "He was paid £250 to create the soundtrack for the first Bond film, Dr No. This theme tune was used in 11 Bond films." },
      { date: "AWARDS", description: "John won four Grammys, two Academy Awards, a BAFTA and a Golden Globe - but none for any of the Bond scores 🏆" },
    ]
  },
  { 
    coords: [-1.0917633, 53.9663689],
    name: "Mary Ellen Best",
    occupation: "1809-1891",
    description: "Mary Ellen Best lived here in number 14.",
    image: "images/maryellenbest.png",
    tldr: "Mary Ellen Best was a prominent York water-colour artist.",
    events: [
      { date: "1840", description: "Mary went on three continental tours of Europe, painting people and places. She then moved to Germany with her new husband." },
      { date: "1830s", description: "Most of her paintings, estimated to be around 1500, featured scenes around York and in her own home in Clifton 🖼️" },
    ]
  },
  { 
    coords: [-1.0976615, 53.9520295],
    name: "George Butterworth",
    occupation: "1885-1916",
    description: "George Butterworth grew up here on Driffield Terrace.",
    image: "images/georgebutterworth.png",
    tldr: "George Butterworth was a folksinger and composer.",
    events: [
      { date: "EDUCATED", description: "George won a scholarship to Eton College in 1899. Five years later he joined Trinity College, Oxford 🎓" },
      { date: "1913", description: "George performed his hit songs at Leeds Festival 🎼" },
      { date: "1916", description: "Killed in action during WW1, less than a month after receiving the Military Cross. A citation states that he had commanded the Company when the Captain was wounded ‘with great ability and coolness … and total disregard of personal safety’." },
      { date: "ETERNAL", description: "Butterworth trench is officially named after George as he was in charge of a group digging a trench under heavy German fire 🪦" },
    ]
  },
  { 
    coords: [-1.0837224, 53.9553593],
    name: "Hans Hess OBE",
    occupation: "1907–1975",
    description: "Hans Hess lived here in Skeldergate. He once hosted Charlie Chaplin.",
    image: "images/hanshess.png",
    tldr: "German-born Jew Hans Hess was a German museum curator and art historian.",
    events: [
      { date: "UPBRINGING", description: "His wealthy father won the contract to provide boots for the Soviet Red Army 🥾" },
      { date: "1935", description: "Moved to London to escape Nazi Germany." },
      { date: "1948", description: "Hess was appointed Curator at York Art Gallery 🎨" },
    ]
  },
  { 
    coords: [-1.0879721, 53.9612032],
    name: "Thomas Cooke",
    occupation: "1807-1868",
    description: "Thomas Cooke's 1850 telescope is housed here.",
    image: "images/thomascooke.png",
    tldr: "Self-made Thomas Cooke was one of England's leading optical instrument makers.",
    events: [
      { date: "1860", description: "He was invited by Prince Albert to Osborne House where he received an order for a 5¼-inch telescope 👑" },
      { date: "ATHENS", description: "Cooke built the largest telescope in the world at the time, which is now stored in Athens Observatory 🔭" },
    ]
  },
  { 
    coords: [-1.0906194, 53.9647176],
    name: "Stephen Corder",
    occupation: "1918-1990",
    description: "Stephen Corder was born here in Bootham.",
    image: "images/stephencorder.png",
    tldr: "Stephen Corder was one of the founding fathers of applied linguistics and founding chair of the British Association for Applied Linguistics (BAAL).",
    events: [
      { date: "1918", description: "Corder acquired a second language at birth from his Dutch mother 🇳🇱" },
      { date: "1964", description: "Corder became Director of the School of Applied Linguistics at the University of Edinburgh 👨‍🎓" },
      { date: "2022", description: "BAAL community stands at over 1400 members." },
    ]
  },
  { 
    coords: [-1.0715834, 53.9658982],
    name: "Mary Ann Craven",
    occupation: "1826-1900",
    description: "This is where Mary Ann Craven moved her family to after her heroic business success.",
    image: "images/maryanncraven.png",
    tldr: "Mary Ann Craven was known for building one of the largest boiled sweets businesses of her time whilst dealing with personal setbacks remarkably.",
    events: [
      { date: "1860", description: "Her father and husband both died within two years. She faced raising three young children whilst running two businesses." },
      { date: "1890", description: "Due to Mary Ann's legacy, by 1980 the Craven's business was producing 5,000 tons of sweets annually with a workforce of 380 🍬" },
    ]
  },
  { 
    coords: [-1.0807703, 53.957878],
    name: "Mary Ann Craven",
    occupation: "1826-1900",
    description: "This is where Mary Ann Craven built her business and raised her three kids.",
    image: "images/maryanncraven.png",
    tldr: "Mary Ann Craven was known for building one of the largest boiled sweets businesses of her time whilst dealing with personal setbacks remarkably.",
    events: [
      { date: "1860", description: "Her father and husband both died within two years. She faced raising three young children whilst running two businesses." },
      { date: "1890", description: "Due to Mary Ann's legacy, by 1980 the Craven's business was producing 5,000 tons of sweets annually with a workforce of 380 🍬" },
    ]
  }
];


locations.forEach(location => {
  const marker = new mapboxgl.Marker({
    element: createCustomMarker(location.image)
  })
    .setLngLat(location.coords)
    .setPopup(new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
      .setHTML(`
           <p style="font-size: 6px; font-weight: bold; margin-bottom: 10px;">${location.description}</p>
                <div style="border-top: 1px solid #ccc; margin-bottom: 10px;"></div> <!-- Grey divider -->
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${location.image}" alt="${location.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%;" />
                    <div>
                        <div style="font-size: 16px; font-weight: bold;">${location.name}</div>
                        <div style="font-size: 14px; color: #666;">${location.occupation}</div>
                    </div>
                </div>
                <p style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;">${location.tldr}</p>
                ${location.events.length ? `
                    <div style="margin-top: 10px;">
                        ${location.events.map(event => `
                            <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                <strong style="color: #9b4dca; font-size: 14px;">${event.date}</strong>: <span style="font-size: 12px;">${event.description}</span>
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
