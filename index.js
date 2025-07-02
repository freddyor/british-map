import { buildings } from './buildings.js';
import { locations } from './locations.js';

// Track when the loading screen is first shown
const loadingScreenStart = Date.now();

// --- First Video Popup additions START ---
let firstVideoLoadedThisSession = false;
function showFirstVideoWaitMessage(videoElement) {}

const yorkBounds = [
  [-1.170, 53.930],
  [-1.010, 54.010]
];

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';

var map = new mapboxgl.Map({
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

// Geolocate control and user location marker
const geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true,
  showAccuracyCircle: false,
  fitBoundsOptions: {
    maxZoom: 15
  },
  showUserLocation: false
});
map.addControl(geolocate);

const userLocationEl = document.createElement('div');
userLocationEl.className = 'user-location-marker';
const textEl = document.createElement('div');
textEl.style.position = 'absolute';
textEl.style.top = '50%';
textEl.style.left = '50%';
textEl.style.transform = 'translate(-50%, -50%)';
textEl.style.fontFamily = 'Poppins, sans-serif';
textEl.style.fontWeight = 'bold';
textEl.style.fontSize = '10px';
textEl.style.color = '#87CEFA';
textEl.textContent = 'me';
userLocationEl.appendChild(textEl);

const userLocationMarker = new mapboxgl.Marker({ element: userLocationEl })
  .setLngLat([0, 0])
  .addTo(map);

geolocate.on('error', (e) => {
  if (e.code === 1) console.log('Location access denied by user');
});
geolocate.on('geolocate', (e) => {
  userLocationMarker.setLngLat([e.coords.longitude, e.coords.latitude]);
});

// --- Marker and helper functions ---
locations.forEach(location => {
  const { element: markerElement } = createCustomMarker(location.image, '#FFFFFF', true);
  markerElement.className += ' location-marker';
  const marker = new mapboxgl.Marker({
    element: markerElement
  })
    .setLngLat(location.coords)
    .addTo(map);

  marker.getElement().addEventListener('click', () => {
    map.getCanvas().style.cursor = 'pointer';
    const contentHTML = createPopupContent(location);
    toggleBottomSheet(contentHTML);
  });
});

// =================== BUILDING MARKER FILTER DROPDOWN AND MODE TOGGLE ===================

const categories = Array.from(new Set(buildings.map(b => b.category))).sort();
categories.unshift('All');

let allBuildingMarkers = [];
let currentMode = 'normal';
let currentCategory = 'All';

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

    marker.getElement().addEventListener('click', () => {
      map.getCanvas().style.cursor = 'pointer';
      const videoUrl = building.videoUrl;
      const posterUrl = building.posterUrl;
      if (!videoUrl) {
        console.error('Video URL not available for this building.');
        return;
      }
      document.querySelectorAll('.video-modal-overlay').forEach(el => el.remove());
      const overlay = document.createElement('div');
      overlay.className = 'video-modal-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.background = 'rgba(0,0,0,0.75)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = 100000;
      const posterContainer = document.createElement('div');
      posterContainer.style.position = 'relative';
      posterContainer.style.marginTop = '-60px';
      const posterImg = document.createElement('img');
      posterImg.src = posterUrl || '';
      posterImg.alt = 'Video cover';
      posterImg.style.maxWidth = '88vw';
      posterImg.style.maxHeight = '80vh';
      posterImg.style.borderRadius = '14px';
      posterImg.style.display = 'block';
      posterImg.addEventListener('load', () => {
        posterImg.style.border = '1.5px solid #E9E8E0';
      });
      const playBtn = document.createElement('button');
      playBtn.innerHTML = '▶';
      playBtn.style.position = 'absolute';
      playBtn.style.top = '50%';
      playBtn.style.left = '50%';
      playBtn.style.transform = 'translate(-50%, -50%)';
      playBtn.style.background = 'rgba(0,0,0,0.6)';
      playBtn.style.border = 'none';
      playBtn.style.borderRadius = '50%';
      playBtn.style.width = '48px';
      playBtn.style.height = '48px';
      playBtn.style.color = '#fff';
      playBtn.style.fontSize = '1.7rem';
      playBtn.style.cursor = 'pointer';
      playBtn.style.display = 'flex';
      playBtn.style.alignItems = 'center';
      playBtn.style.justifyContent = 'center';
      playBtn.style.zIndex = 2;
      const spinner = document.createElement('div');
      spinner.style.position = 'absolute';
      spinner.style.top = '50%';
      spinner.style.left = '50%';
      spinner.style.transform = 'translate(-50%, -50%)';
      spinner.style.width = '36px';
      spinner.style.height = '36px';
      spinner.style.border = '4px solid #eee';
      spinner.style.borderTop = '4px solid #9b4dca';
      spinner.style.borderRadius = '50%';
      spinner.style.animation = 'spin 1s linear infinite';
      spinner.style.display = 'none';
      spinner.style.zIndex = 3;
      const spinnerStyle = document.createElement('style');
      spinnerStyle.innerHTML = `@keyframes spin {0% { transform: translate(-50%, -50%) rotate(0deg);}100% { transform: translate(-50%, -50%) rotate(360deg);}}`;
      document.head.appendChild(spinnerStyle);
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '❌';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '-6px';
      closeBtn.style.right = '-6px';
      closeBtn.style.width = '18px';
      closeBtn.style.height = '18px';
      closeBtn.style.background = '#000';
      closeBtn.style.color = '#fff';
      closeBtn.style.border = '1.5px solid #E9E8E0';
      closeBtn.style.borderRadius = '50%';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.fontSize = '0.6rem';
      closeBtn.style.zIndex = '100001';
      closeBtn.style.display = 'flex';
      closeBtn.style.alignItems = 'center';
      closeBtn.style.justifyContent = 'center';

      let videoElement = null;

      function removeOverlayAndPauseVideo() {
        if (videoElement) {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
        overlay.remove();
      }

      closeBtn.onclick = () => removeOverlayAndPauseVideo();
      let startY;
      overlay.addEventListener('touchstart', e => {
        if (e.touches.length === 1) startY = e.touches[0].clientY;
      });
      overlay.addEventListener('touchmove', e => {
        if (startY !== undefined && e.touches.length === 1) {
          const dy = e.touches[0].clientY - startY;
          if (dy > 50) {
            removeOverlayAndPauseVideo();
            startY = undefined;
          }
        }
      });
      overlay.addEventListener('touchend', () => { startY = undefined; });
      playBtn.style.display = 'none';
      closeBtn.style.display = 'none';
      posterImg.onload = function () {
        playBtn.style.display = 'flex';
        closeBtn.style.display = 'flex';
      };
      posterContainer.appendChild(posterImg);
      posterContainer.appendChild(playBtn);
      posterContainer.appendChild(spinner);
      posterContainer.appendChild(closeBtn);
      overlay.appendChild(posterContainer);
      document.body.appendChild(overlay);
      overlay.addEventListener('mousedown', function (e) {
        if (e.target === overlay) removeOverlayAndPauseVideo();
      });
      playBtn.onclick = () => {
        playBtn.style.display = 'none';
        spinner.style.display = 'block';
        videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        if (posterUrl) videoElement.poster = posterUrl;
        videoElement.style.border = '2px solid #E9E8E0';
        videoElement.style.maxWidth = '66vw';
        videoElement.style.maxHeight = '60vh';
        videoElement.style.borderRadius = '10px';
        videoElement.controls = false;
        videoElement.preload = 'auto';
        videoElement.autoplay = true;
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        videoElement.playsInline = true;
        showFirstVideoWaitMessage(videoElement);
        let hasStarted = false;

        function showVideo() {
          if (!hasStarted) {
            hasStarted = true;
            posterContainer.replaceChild(videoElement, posterImg);
            spinner.style.display = 'none';
          }
        }

        function onProgress() {
          if (videoElement.duration && videoElement.buffered.length) {
            const bufferedEnd = videoElement.buffered.end(videoElement.buffered.length - 1);
            const percentBuffered = bufferedEnd / videoElement.duration;
            if (percentBuffered >= 0.25 && !hasStarted) {
              videoElement.play();
            }
          }
        }

        videoElement.addEventListener('play', showVideo);
        videoElement.addEventListener('progress', onProgress);
        videoElement.addEventListener('click', () => {
          videoElement.controls = true;
        });
        videoElement.addEventListener('ended', () => removeOverlayAndPauseVideo());
        videoElement.addEventListener('error', () => {
          spinner.style.display = 'none';
          playBtn.style.display = 'block';
          alert('Video failed to load.');
        });
        videoElement.load();
      };
    });
    allBuildingMarkers.push({ marker, category: building.category });
  });
}

function filterBuildingMarkersByModeAndCategory(mode, category) {
  let filtered = buildings.filter(b => b.mode === mode);
  if (category !== 'All') {
    filtered = filtered.filter(b => b.category === category);
  }
  addBuildingMarkers(filtered);
}

function filterBuildingMarkers(category) {
  currentCategory = category;
  filterBuildingMarkersByModeAndCategory(currentMode, currentCategory);
}

// ====== DOMContentLoaded Handler: Controls 50% Bigger & Aligned ======
document.addEventListener('DOMContentLoaded', () => {
  // Controls row
  const controlsRow = document.createElement('div');
  controlsRow.id = 'controls-row';
  controlsRow.style.position = 'fixed';
  controlsRow.style.top = '10px';
  controlsRow.style.left = '50%';
  controlsRow.style.transform = 'translateX(-50%)';
  controlsRow.style.zIndex = '1000';
  controlsRow.style.display = 'flex';
  controlsRow.style.gap = '9px';
  controlsRow.style.alignItems = 'center';

  // ====== MODE TOGGLE (50% bigger) ======
  const modeToggleContainer = document.createElement('div');
  modeToggleContainer.id = 'mode-toggle-container';
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

  function setMode(isHistory) {
    modeChecked = isHistory;
    updateToggleVisual();
    currentMode = isHistory ? 'history' : 'normal';
    filterBuildingMarkersByModeAndCategory(currentMode, currentCategory);
  }

  normalLabel.onclick = () => setMode(false);
  historyLabel.onclick = () => setMode(true);
  toggleSwitch.onclick = () => setMode(!modeChecked);

  modeToggleContainer.appendChild(normalLabel);
  modeToggleContainer.appendChild(toggleSwitch);
  modeToggleContainer.appendChild(historyLabel);

  // ===== BUTTON GROUP (Filter Button + Dropdown) =====
  const buttonGroup = (() => {
    const bg = document.createElement('div');
    bg.id = 'button-group';
    bg.style.position = 'relative';
    bg.style.display = 'flex';
    bg.style.alignItems = 'center';
    return bg;
  })();

  // 1. Filter Button
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

  // 2. Dropdown (custom)
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

  controlsRow.appendChild(modeToggleContainer);
  controlsRow.appendChild(buttonGroup);

  document.body.appendChild(controlsRow);

  filterBuildingMarkersByModeAndCategory(currentMode, currentCategory);
});

// =================== END: BUILDING MARKER FILTER DROPDOWN AND MODE TOGGLE ===================

function scaleMarkersBasedOnZoom() {
  const zoomLevel = map.getZoom();
  const markerSize = (zoomLevel - 13);
  const markerWidth = markerSize + 'em';
  const markerHeight = markerSize + 'em';
  const borderWidth = (markerSize * 0.075) + 'em';

  document.querySelectorAll('.location-marker, .building-marker').forEach(marker => {
    marker.style.width = markerWidth;
    marker.style.height = markerHeight;
    marker.style.borderWidth = borderWidth;

    const bump = marker.querySelector('.marker-bump');
    if (bump) {
      const bumpWidth = (markerSize * 0.4) + 'em';
      const bumpHeight = (markerSize * 0.25) + 'em';
      bump.style.width = bumpWidth;
      bump.style.height = bumpHeight;
    }
  });
}
scaleMarkersBasedOnZoom();

map.on('click', (e) => {
  const currentLat = e.lngLat.lat;
  const currentLng = e.lngLat.lng;
  const currentZoom = map.getZoom();
  const mapLink = generateMapLink(currentLat, currentLng, currentZoom);
  console.log('Map Link:', mapLink);
});
map.on('zoom', () => scaleMarkersBasedOnZoom());

map.on('load', () => {
  geolocate.trigger();

  const loadingScreen = document.getElementById('loading-screen');
  const elapsed = Date.now() - loadingScreenStart;
  const minDuration = 5000;

  if (loadingScreen) {
    if (elapsed >= minDuration) {
      loadingScreen.style.display = 'none';
    } else {
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, minDuration - elapsed);
    }
  }
});

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const lat = getUrlParameter('lat');
const lng = getUrlParameter('lng');
const zoom = getUrlParameter('zoom');

const defaultCenter = [-1.0835104081554843, 53.95838745239521];
const defaultZoom = 15;

const initialCenter = lat && lng ? [parseFloat(lng), parseFloat(lat)] : defaultCenter;
const initialZoom = zoom ? parseFloat(zoom) : defaultZoom;

const bottomSheet = document.createElement('div');
bottomSheet.id = 'bottom-sheet';
bottomSheet.style.position = 'fixed';
bottomSheet.style.bottom = '-100%';
bottomSheet.style.left = '50%';
bottomSheet.style.transform = 'translate(-50%)';
bottomSheet.style.right = '50%';
bottomSheet.style.width = '96%';
bottomSheet.style.height = '40%';
bottomSheet.style.backgroundColor = '#fff';
bottomSheet.style.borderTop = '2px solid #ccc';
bottomSheet.style.boxShadow = '0 -6px 15px rgba(0, 0, 0, 0.3)';
bottomSheet.style.zIndex = '10000';
bottomSheet.style.transition = 'bottom 0.3s ease';
bottomSheet.style.borderRadius = '12px 12px 0 0';
bottomSheet.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
bottomSheet.style.backgroundColor = '#E9E8E0';
bottomSheet.style.border = '2px solid #f0f0f0';
bottomSheet.style.fontFamily = "'Poppins', sans-serif";
bottomSheet.style.fontSize = '14px';
bottomSheet.style.lineHeight = '1.05';
bottomSheet.style.padding = '5px';
bottomSheet.style.overflowY = 'auto';
document.body.appendChild(bottomSheet);

function generateMapLink(latitude, longitude, zoomLevel) {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = `?lat=${latitude}&lng=${longitude}&zoom=${zoomLevel}`;
  return baseUrl + params;
}

const link = document.createElement('link');
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const stylePopup = document.createElement('style');
stylePopup.innerHTML = `
  .mapboxgl-popup-content {
    border-radius: 12px !important;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3) !important;
    padding: 10px !important;
    font-family: 'Poppins', sans-serif !important;
    background: #E9E8E0;
    border: 2px solid #f0f0f0 !important;
    line-height: 1.05;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-left: 3px;
    margin-right: 5px;
    margin-bottom: 10px;
  }
  .mapboxgl-popup-content img {
    border: 2px solid #f0f0f0 !important;
    border-radius: 8px;
  }
  .mapboxgl-popup-content p {
    font-weight: bold !important;
    text-align: center;
    letter-spacing: -0.5px;
    font-size: 13px !important;
    margin-bottom: 10px !important;
  }
  .mapboxgl-popup-close-button {
    display: none !important;
  }
  .user-location-marker {
    width: 20px;
    height: 20px;
    background-color: white;
    border: 3px solid #87CEFA;
    border-radius: 100%;
    position: relative;
  }
  .location-marker {
    z-index: 1;
  }
  .building-marker {
    z-index: 2;
  }
  .mapboxgl-popup {
    z-index: 9999 !important;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .custom-button {
    background-color: #e9e8e0;
    color: black;
    border: 1.5px solid #f0f0f0;
    padding: 3px 12px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 9px;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.16);
    white-space: nowrap;
    text-align: center;
    height: 28.5px;
    min-width: 128px;
    align-items: center;
    justify-content: center;
  }
  #button-group {
    position: relative;
    display: flex;
    align-items: center;
  }
  #mode-toggle-container {
    min-width: 128px;
    height: 28.5px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dropdown-content {
    line-height: 1.05;
    font-size: 12px;
  }
  #bottom-sheet {
    font-family: 'Poppins', sans-serif !important;
    padding: 5px;
    font-size: 14px;
    line-height: 1.05;
  }
  #bottom-sheet img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  #bottom-sheet p {
    margin-bottom: 10px;
  }
 `;
document.head.appendChild(stylePopup);

function createCustomMarker(imageUrl, color = '#9b4dca', isLocation = false) {
  const markerDiv = document.createElement('div');
  markerDiv.className = 'custom-marker';
  markerDiv.style.width = '3em';
  markerDiv.style.height = '3em';
  markerDiv.style.position = 'absolute';
  markerDiv.style.borderRadius = '25%';
  markerDiv.style.border = `0.2em solid ${color}`;
  markerDiv.style.boxSizing = 'border-box';
  markerDiv.style.overflow = 'visible';
  markerDiv.style.background = 'white';
  markerDiv.style.display = 'flex';
  markerDiv.style.alignItems = 'center';
  markerDiv.style.justifyContent = 'center';

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.style.width = '100%';
  imageElement.style.height = '100%';
  imageElement.style.objectFit = 'cover';
  imageElement.style.borderRadius = '25%';

  const bump = document.createElement('div');
  bump.className = 'marker-bump';
  bump.style.position = 'absolute';
  bump.style.left = '50%';
  bump.style.top = '100%';
  bump.style.transform = 'translateX(-50%)';
  bump.style.width = '2em';
  bump.style.height = '0.5em';
  bump.style.background = color;
  bump.style.clipPath = 'polygon(0% 0%, 100% 0%, 55% 96%, 56% 100%, 44% 100%, 45% 96%)';
  bump.style.zIndex = '1';

  markerDiv.appendChild(imageElement);
  markerDiv.appendChild(bump);

  return {
    element: markerDiv,
    id: `marker-${Date.now()}-${Math.random()}`
  };
}

let isBottomSheetOpen = false;

function toggleBottomSheet(contentHTML) {
  if (isBottomSheetOpen) {
    bottomSheet.style.bottom = '-100%';
  } else {
    const closeButtonHTML = `
            <button id="close-bottom-sheet" style="
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 3px 3px;
                background: none;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 10px;
            ">❌</button>
        `;

    bottomSheet.innerHTML = closeButtonHTML + contentHTML;
    bottomSheet.style.bottom = '0';

    document.getElementById('close-bottom-sheet').addEventListener('click', () => {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
      toggleBottomSheet();
    });
  }
  isBottomSheetOpen = !isBottomSheetOpen;
}

function createPopupContent(location, isFirebase = false) {
  const data = isFirebase ? location : location;
  const eventsData = isFirebase ? data.events : data.events;
  const videoUrl = data.videoUrl ? data.videoUrl : null;
  const tldrContent = !videoUrl
    ? `<p style="background: #f9f9f9; padding: 10px; margin-top: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 15px; color: #000000;">${data.tldr}</p>`
    : '';
  const imageContent = !videoUrl
    ? `<img src="${data.image || data.imageUrl}" alt="${data.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;" />`
    : '';

  return `
        <div style="text-align: center; padding: 0; margin: 0;">
            <p style="font-size: 15px; font-weight: bold; margin-bottom: 10px;">${data.description}</p>
            ${imageContent}
            <div style="font-size: 20px; font-weight: bold; margin-top: 0;">${data.name}</div>
            <div style="font-size: 15px; color: #666;">${data.occupation || data.dates}</div>
            ${tldrContent}
            ${eventsData && eventsData.length ? `
                <div style="margin-top: 10px;">
                    ${eventsData.map(event => `
                        <div style="background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 10px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                            <strong style="color: #7C6E4D; font-size: 15px;">${event.date || event.label}</strong>: <span style="font-size: 15px;">${event.description}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            ${videoUrl ? `
                <div style="margin-top: 10px; margin-bottom: 10px; text-align: center;">
                    <video 
                        width="300" 
                        height="464" 
                        autoplay 
                        controlsList="nodownload nofullscreen noremoteplayback" 
                        controls 
                        style="display: block; margin: 0 auto;">
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            ` : ''}
        </div>
    `;
}
