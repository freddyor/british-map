// pages/index.js
import { useEffect } from 'react';
import { buildings } from '../buildings.js';
import { locations } from '../locations.js';

export default function Home() {
  useEffect(() => {
    // Dynamically load Mapbox GL JS CSS
    const mapboxCSS = document.createElement('link');
    mapboxCSS.href = "/assets/mapbox-gl/mapbox-gl.css";
    mapboxCSS.rel = "stylesheet";
    document.head.appendChild(mapboxCSS);

    // Dynamically load Mapbox GL JS JavaScript
    const mapboxScript = document.createElement('script');
    mapboxScript.src = "/assets/mapbox-gl/mapbox-gl.js";
    mapboxScript.defer = true;
    mapboxScript.onload = () => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZGRvbWF0ZSIsImEiOiJjbTc1bm5zYnQwaG1mMmtxeDdteXNmeXZ0In0.PuDNORq4qExIJ_fErdO_8g';
      initializeMap(); // Call function to set up your map
    };
    document.body.appendChild(mapboxScript);

    // Function to initialize the map
    function initializeMap() {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/freddomate/cm8q8wtwx00a801qzdayccnvz',
        center: [-1.0835104081554843, 53.95838745239521], // Default York coordinates
        zoom: 15,
        pitch: 45,
        bearing: -17.6,
      });

      addBuildingMarkers();
      addLocationMarkers();

      map.on('load', () => {
        geolocate.trigger();
      });

      // Add a zoom event listener to the map
      map.on('zoom', () => {
        scaleMarkersBasedOnZoom();
      });

      // Geolocation control
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

      geolocate.on('geolocate', (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude;
        const position = [lon, lat];
        console.log(position);
        userLocationMarker.setLngLat(position);
      });

      function addLocationMarkers() {
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
      }

      function addBuildingMarkers() {
        buildings.forEach(building => {
          const outlineColor = building.colour === "yes" ? '#FF69B4' : '#FFFFFF'; // Pink if "colour" is "yes", otherwise white
          const { element: markerElement } = createCustomMarker(building.image, outlineColor, false);
          markerElement.className += ' building-marker';

          const marker = new mapboxgl.Marker({
            element: markerElement
          })
            .setLngLat(building.coords)
            .addTo(map);

          marker.getElement().addEventListener('click', () => {
            map.getCanvas().style.cursor = 'pointer';

            // Check for video URL
            const videoUrl = building.videoUrl; // Assuming videoUrl is part of the building data
            if (videoUrl) {
              const videoElement = document.createElement('video');
              videoElement.src = videoUrl;
              videoElement.style.display = 'none';
              videoElement.controls = true;
              videoElement.autoplay = true;

              document.body.appendChild(videoElement);
              videoElement.play();
              if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen();
              }

              videoElement.addEventListener('ended', () => {
                document.body.removeChild(videoElement);
              });
            } else {
              console.error('Video URL not available for this building.');
            }
          });
        });
      }

      function scaleMarkersBasedOnZoom() {
        const zoomLevel = map.getZoom();
        const markerSize = (zoomLevel - 13) + 'em';

        document.querySelectorAll('.location-marker').forEach(marker => {
          marker.style.width = markerSize;
          marker.style.height = markerSize;
        });

        document.querySelectorAll('.building-marker').forEach(marker => {
          marker.style.width = markerSize;
          marker.style.height = markerSize;
        });
      }

      function createCustomMarker(imageUrl, color = '#9b4dca', isLocation = false) {
        const markerDiv = document.createElement('div');
        markerDiv.className = 'custom-marker';
        markerDiv.style.width = '3em';
        markerDiv.style.height = '3em';
        markerDiv.style.position = 'absolute';
        markerDiv.style.borderRadius = '50%';
        markerDiv.style.border = `0.15em solid ${color}`;
        markerDiv.style.boxSizing = 'border-box';
        markerDiv.style.overflow = 'hidden';

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.style.width = '100%';
        imageElement.style.height = '100%';
        imageElement.style.objectFit = 'cover';
        imageElement.style.borderRadius = '50%';

        markerDiv.appendChild(imageElement);

        return { element: markerDiv, id: `marker-${Date.now()}-${Math.random()}` };
      }
    }

    // Ensure the function runs once the page is loaded
  }, []); // Empty dependency array ensures this runs once after the component is mounted

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      {/* Add other components or elements here */}
    </div>
  );
}
