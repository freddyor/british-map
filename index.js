import { buildings } from './buildings.js';
import { locations } from './locations.js';

let allBuildingMarkers = [];
let currentMode = 'normal';
let currentCategory = 'All';

// =================== MAP INIT (unchanged) ===================
const yorkBounds = [
  [-1.170, 53.930],
  [-1.010, 54.010]
];

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/freddomate/cm8q8wtwx00a801qzdayccnvz',
  center: [-1.0812025894431188, 53.958916884514004],
  zoom: 15,
  pitch: 45,
  bearing: -17.6,
  maxBounds: yorkBounds,
  minZoom: 11,
  maxZoom: 19,
});

const categories = Array.from(new Set(buildings.map(b => b.category))).sort();
categories.unshift('All');

// =================== MARKER LOGIC (unchanged) ===================
function addBuildingMarkers(buildingsToShow) {
  allBuildingMarkers.forEach(obj => obj.marker.remove());
  allBuildingMarkers = [];
  buildingsToShow.forEach(building => {
    const outlineColor = building.colour === "yes" ? '#FF69B4' : '#FFFFFF';
    const { element: markerElement } = createCustomMarker(building.image, outlineColor, false);
    markerElement.className += ' building-marker';
    if (building.colour === "yes") markerElement.style.zIndex = '3';
    const marker = new mapboxgl.Marker({ element: markerElement })
      .setLngLat(building.coords)
      .addTo(map);
    allBuildingMarkers.push({ marker, category: building.category });
  });
}

// Filter by mode and category
function filterBuildingMarkersByModeAndCategory(mode, category) {
  let filtered = buildings.filter(b => b.mode === mode);
  if (category !== 'All') filtered = filtered.filter(b => b.category === category);
  addBuildingMarkers(filtered);
}

function filterBuildingMarkers(category) {
  currentCategory = category;
  filterBuildingMarkersByModeAndCategory(currentMode, currentCategory);
}

// =========== UI CONTROLS ==============
document.addEventListener('DOMContentLoaded', () => {
  // Container for mode toggle + control button
  const controlsRow = document.createElement('div');
  controlsRow.style.position = 'fixed';
  controlsRow.style.top = '5px';
  controlsRow.style.left = '50%';
  controlsRow.style.transform = 'translateX(-50%)';
  controlsRow.style.zIndex = '1000';
  controlsRow.style.display = 'flex';
  controlsRow.style.gap = '9px';
  controlsRow.style.alignItems = 'center';

  // MODE TOGGLE
  const modeToggleContainer = document.createElement('div');
  modeToggleContainer.style.display = 'flex';
  modeToggleContainer.style.alignItems = 'center';
  modeToggleContainer.style.justifyContent = 'center';
  modeToggleContainer.style.background = '#e9e8e0';
  modeToggleContainer.style.border = '1.5px solid #f0f0f0';
  modeToggleContainer.style.borderRadius = '9px';
  modeToggleContainer.style.boxShadow = '0 6px 15px rgba(0,0,0,0.16)';
  modeToggleContainer.style.fontFamily = "'Poppins', sans-serif";
  modeToggleContainer.style.userSelect = 'none';
  modeToggleContainer.style.gap = '6px';
  modeToggleContainer.style.height = '28.5px';
  modeToggleContainer.style.minWidth = '128px';
  modeToggleContainer.style.padding = '0 12px';

  const normalLabel = document.createElement('span');
  normalLabel.textContent = 'Normal';
  normalLabel.style.fontSize = '11.25px';
  normalLabel.style.fontWeight = 'bold';
  normalLabel.style.transition = 'color 0.2s';
  normalLabel.style.cursor = 'pointer';
  normalLabel.style.color = '#000';

  const toggleSwitch = document.createElement('div');
  toggleSwitch.style.width = '36px';
  toggleSwitch.style.height = '18px';
  toggleSwitch.style.background = '#ccc';
  toggleSwitch.style.borderRadius = '10.5px';
  toggleSwitch.style.position = 'relative';
  toggleSwitch.style.display = 'flex';
  toggleSwitch.style.alignItems = 'center';
  toggleSwitch.style.cursor = 'pointer';
  toggleSwitch.style.transition = 'background 0.2s';

  const toggleCircle = document.createElement('div');
  toggleCircle.style.position = 'absolute';
  toggleCircle.style.top = '1.5px';
  toggleCircle.style.left = '1.5px';
  toggleCircle.style.width = '15px';
  toggleCircle.style.height = '15px';
  toggleCircle.style.background = '#fff';
  toggleCircle.style.borderRadius = '50%';
  toggleCircle.style.boxShadow = '0 1px 4px rgba(0,0,0,0.13)';
  toggleCircle.style.transition = 'left 0.2s, background 0.2s';

  toggleSwitch.appendChild(toggleCircle);

  const historyLabel = document.createElement('span');
  historyLabel.textContent = 'History';
  historyLabel.style.fontSize = '11.25px';
  historyLabel.style.fontWeight = 'normal';
  historyLabel.style.transition = 'color 0.2s';
  historyLabel.style.cursor = 'pointer';
  historyLabel.style.color = '#888';

  let modeChecked = false;
  function updateToggleVisual() {
    if (modeChecked) {
      toggleCircle.style.left = '19.5px';
      toggleSwitch.style.background = '#9b4dca';
      normalLabel.style.color = '#888';
      normalLabel.style.fontWeight = 'normal';
      historyLabel.style.color = '#000';
      historyLabel.style.fontWeight = 'bold';
    } else {
      toggleCircle.style.left = '1.5px';
      toggleSwitch.style.background = '#ccc';
      normalLabel.style.color = '#000';
      normalLabel.style.fontWeight = 'bold';
      historyLabel.style.color = '#888';
      historyLabel.style.fontWeight = 'normal';
    }
  }
  updateToggleVisual();

  // --- DYNAMIC CONTROL AREA ---
  const dynamicControlContainer = document.createElement('div');
  dynamicControlContainer.style.display = 'flex';
  dynamicControlContainer.style.alignItems = 'center';
  dynamicControlContainer.style.height = '28.5px';
  dynamicControlContainer.style.minWidth = '128px';

  // --- Filter button/dropdown ---
  function createFilterButton() {
    const buttonGroup = document.createElement('div');
    buttonGroup.style.position = 'relative';
    buttonGroup.style.display = 'flex';
    buttonGroup.style.alignItems = 'center';

    const filterButton = document.createElement('button');
    filterButton.textContent = 'Find your taste 🔍';
    filterButton.className = 'custom-button';
    filterButton.style.position = 'relative';
    filterButton.style.height = '28.5px';
    filterButton.style.minWidth = '128px';
    filterButton.style.fontSize = '12px';
    filterButton.style.padding = '3px 12px';
    filterButton.style.display = 'flex';
    filterButton.style.alignItems = 'center';

    const dropdown = document.createElement('div');
    dropdown.style.display = 'none';
    dropdown.style.position = 'absolute';
    dropdown.style.left = '0';
    dropdown.style.top = '100%';
    dropdown.style.background = '#fff';
    dropdown.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.16)';
    dropdown.style.border = '1.5px solid #f0f0f0';
    dropdown.style.borderRadius = '9px';
    dropdown.style.padding = '4.5px 0';
    dropdown.style.zIndex = '10000';
    dropdown.style.fontFamily = "'Poppins', sans-serif";
    dropdown.style.minWidth = '90px';

    categories.forEach(cat => {
      const catBtn = document.createElement('button');
      catBtn.textContent = cat;
      catBtn.className = 'custom-button';
      catBtn.style.width = '100%';
      catBtn.style.textAlign = 'left';
      catBtn.style.margin = '0';
      catBtn.style.borderRadius = '0';
      catBtn.style.boxShadow = 'none';
      catBtn.style.fontSize = '12px';
      catBtn.style.display = 'block';
      catBtn.onclick = () => {
        filterBuildingMarkers(cat);
        dropdown.style.display = 'none';
      };
      dropdown.appendChild(catBtn);
    });

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.appendChild(filterButton);
    wrapper.appendChild(dropdown);
    buttonGroup.appendChild(wrapper);

    filterButton.addEventListener('click', () => {
      dropdown.style.minWidth = filterButton.offsetWidth + 'px';
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('mousedown', (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    return buttonGroup;
  }

  // --- Support button/dropdown (for history mode) ---
  function createSupportButton() {
    const button = document.createElement('button');
    button.id = 'custom-bmc-button';
    button.className = 'custom-button';
    button.textContent = '❤️ Support this project ❤️';
    button.style.height = '28.5px';
    button.style.minWidth = '128px';
    button.style.fontSize = '12px';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';

    const dropdownContent = document.createElement('div');
    dropdownContent.style.display = 'none';
    dropdownContent.style.position = 'fixed';
    dropdownContent.style.top = '50px';
    dropdownContent.style.left = '50%';
    dropdownContent.style.transform = 'translateX(-50%)';
    dropdownContent.style.backgroundColor = '#f9f9f9';
    dropdownContent.style.padding = '20px';
    dropdownContent.style.border = '1px solid #ccc';
    dropdownContent.style.borderRadius = '8px';
    dropdownContent.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
    dropdownContent.style.fontSize = '14px';
    dropdownContent.style.lineHeight = '1.25';
    dropdownContent.style.zIndex = '10000';
    dropdownContent.style.maxWidth = '300px';
    dropdownContent.style.textAlign = 'center';
    dropdownContent.style.maxHeight = 'calc(100vh - 200px)';
    dropdownContent.style.overflowY = 'auto';

    dropdownContent.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="https://freddyor.github.io/british-map/videos/IMG_7251.jpeg" 
         alt="Profile Photo" 
         style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;"/>
  </div>
        <div class="project-info" style="margin-bottom: 15px;">
            <b>This page needs donors.</b>
        </div>
           <div class="project-info" style="margin-bottom: 15px;">
            My name is Freddy, I’m a 22 year old local to the city. I am building this project completely independently. Feel free to email me on freddy@britmap.com 📧
        </div>
        <div class="project-info" style="margin-bottom: 15px;">
            In full transparency, here is why I will need donors:
        </div>
            <ul style="margin-bottom: 15px; text-align: left;">
      <li>the map server in the background costs me money based on usage</li>
      <li>I want to add old pictures of York locations to make the map even better for users - but York Archives charges a significant amount to use them commercially</li>
      <li>lots of people actually asked to me to put a donation link. Considering this project has consumed A LOT of my time - it is nice to receive some love back ❤️</li>
    </ul>
        <button 
            class="support-button" 
            style="
                background-color: #9b4dca; 
                color: white; 
                padding: 10px 20px; 
                font-size: 16px; 
                font-weight: bold; 
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                text-align: center;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
                margin-bottom: 15px;
            "
            onclick="window.open('https://www.buymeacoffee.com/britmap', '_blank')"
        >
            Support
        </button>
 <div style="display: flex; align-items: center; justify-content: center; margin-top: 15px; font-size: 16px; font-weight: bold;">
    <hr style="flex: 1; border: 1px solid #ccc; margin: 0 10px;">
    Our Donors ❤️
    <hr style="flex: 1; border: 1px solid #ccc; margin: 0 10px;">
</div>
<div id="donor-list" style="margin-top: 10px;"></div>
    `;

    const dropdownContainer = document.createElement('div');
    dropdownContainer.style.position = 'relative';
    dropdownContainer.style.display = 'flex';
    dropdownContainer.style.alignItems = 'center';
    dropdownContainer.appendChild(button);
    dropdownContainer.appendChild(dropdownContent);

    function addDonor(name, amount, subtext) {
      const donorList = dropdownContent.querySelector('#donor-list');
      const donorDiv = document.createElement('div');
      donorDiv.className = 'donor';
      donorDiv.innerHTML = `
            <span class="donor-name" style="font-weight: bold;">${name}</span>
            <span class="donor-amount" style="color: #9b4dca; margin-left: 10px; font-weight: bold;">£${amount}</span>
            <div class="donor-subtext" style="font-size: 12px; color: #666; margin-top: 1px;">${subtext}</div>
        `;
      donorDiv.style.marginBottom = '12px';
      donorList.appendChild(donorDiv);
    }
    addDonor('Anonymous', '15', ' ');
    addDonor('Chip Pedro', '5', 'Will be very useful on our upcoming trip - really nice work!');
    addDonor('buffsteve24', '5', 'Amazing work!');
    addDonor('marksaw20', '5', 'Lovely map. Really interesting.');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
      if (!dropdownContainer.contains(event.target)) {
        dropdownContent.style.display = 'none';
      }
    });

    return dropdownContainer;
  }

  // --- Helper to swap controls based on mode
  function renderDynamicControl() {
    dynamicControlContainer.innerHTML = '';
    if (modeChecked) {
      dynamicControlContainer.appendChild(createSupportButton());
    } else {
      dynamicControlContainer.appendChild(createFilterButton());
    }
  }

  // --- Toggle logic ---
  function setMode(isHistory) {
    modeChecked = isHistory;
    updateToggleVisual();
    currentMode = isHistory ? 'history' : 'normal';
    currentCategory = 'All'; // Reset filter!
    renderDynamicControl();
    filterBuildingMarkersByModeAndCategory(currentMode, currentCategory);
  }
  normalLabel.onclick = () => setMode(false);
  historyLabel.onclick = () => setMode(true);
  toggleSwitch.onclick = () => setMode(!modeChecked);

  modeToggleContainer.appendChild(normalLabel);
  modeToggleContainer.appendChild(toggleSwitch);
  modeToggleContainer.appendChild(historyLabel);

  controlsRow.appendChild(modeToggleContainer);
  controlsRow.appendChild(dynamicControlContainer);

  document.body.appendChild(controlsRow);

  renderDynamicControl();
  filterBuildingMarkersByModeAndCategory(currentMode, currentCategory);
});

// =========== Add your createCustomMarker and any other map logic below as before ===========
