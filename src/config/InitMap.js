/* eslint-disable no-unused-vars */
import { inTypeFetch } from '../utility/DataFetch';

let mapInstance = null;

async function InitMap(onIslandClick)
{

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- map configuration --> ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  // for use with browserify / webpack
  const L = require('leaflet')
  L.RasterCoords = require('leaflet-rastercoords')

  const img = [
    27444,  // original width of image
    25522   // original height of image
  ]

  // custom CRS with origin point (0,0) is top left and not bottom left
  const TopLeftOriginCRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0)
  });

  // create the map
  const map = L.map('map', {
    crs: TopLeftOriginCRS,
    zoomSnap: 0,
    zoomDelta: 0.25,
    zoomControl: false,
    attributionControl: false,
  })

  // assign map and image dimensions
  const rc = new L.RasterCoords(map, img)
  // set the view in the middle of the image, initial zoom to 2 and custom max bounds
  const deviceWidth = document.documentElement.clientWidth
  let boundsValue = deviceWidth/10; 
  if(boundsValue > 200) {
    boundsValue = 200;
  }
  console.log(boundsValue)
  map.setView(rc.unproject([img[0]/2, img[1]/2]), 2)
  map.setMaxBounds([[0-boundsValue,215+boundsValue],[200+boundsValue,0-boundsValue]])

  // the tile layer containing the image generated with `gdal2tiles --leaflet -p raster -w none <img> tiles`
  const basemap = L.tileLayer('./tiles/{z}/{x}/{y}.png', {
    noWrap: true,
    bounds: rc.getMaxBounds(),
    maxZoom: 7,
    minZoom: 2,
  }).addTo(map)

  // fetching islands data
  const { data: islandData, error } = await inTypeFetch('map_parts', 'name, type, x, y, area, description, chickens, pigs, snakes', ['island', 'fort', 'outpost', 'seapost']);
  if (error) {
    console.error('Error fetching island data:', error);
    return;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- popups and popupFunctions --> ///////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // popup with coordinates, purely for checking x and y for map stuff - will be commented out later
  /*const popup2 = L.popup();
  function onMapClick(e) {
    popup2
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }
  map.on('click', onMapClick);*/

  //creation of custom marker layer
  const customMarkers = L.layerGroup();

  //function for adding custom markers by users
  function addMarker(lat, lng)
  {
    const marker = L.marker([lat, lng], {
      draggable: true,
      icon: L.icon({iconUrl: 'svg/customMarker.svg', shadowUrl: 'svg/customMarker.svg', iconSize: [40, 52], shadowSize: [0, 0], iconAnchor: [20, 52], shadowAnchor: [0, 0], popupAnchor: [0, 0]})
    })
    customMarkers.addLayer(marker);
    map.closePopup();
  }

  //function for removing custom markers
  function removeMarkers()
  {
    customMarkers.clearLayers();
    map.closePopup();
  }

  //function for calculating distance
  function getDistance(lat1, lng1, lat2, lng2)
  {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2));
  }

  //function for finding closest X type location
  function findClosest(lat, lng, column, value)
  {
    if (islandData && islandData.length > 0) 
    {
      let closestLocation = null;
      let minDistance = Infinity;
      islandData.forEach(island => {
        if(island[column] === value)
        {
          const distance = getDistance(lat, lng, island.x, island.y)
          if (distance < minDistance) {
            minDistance = distance;
            closestLocation = island;
          }
        }
      })
      onIslandClick(closestLocation)
      map.flyTo([closestLocation.x, closestLocation.y], 6);
      map.closePopup();
    } 
    else 
    {
      console.log("No island data found");
    }
  }

  //popup with menu on rightclick
  const popup = L.popup({maxWidth: 500, minWidth: 160})
  function onRightClick(e) 
  {
    const location = e.latlng
    popup
      .setLatLng(location)
      .setContent(`
        <ul>
          <li onclick="addMarker(${location.lat}, ${location.lng})">Add Marker</li>
          <li onclick="removeMarkers()">Clear Markers</li>
          <li onclick="findClosest(${location.lat}, ${location.lng}, 'chickens', true)">Closest Chickens</li>
          <li onclick="findClosest(${location.lat}, ${location.lng}, 'pigs', true)">Closest Pigs</li>
          <li onclick="findClosest(${location.lat}, ${location.lng}, 'snakes', true)">Closest Snakes</li>
          <li onclick="findClosest(${location.lat}, ${location.lng}, 'type', 'outpost')">Closest Outpost</li>
        </ul>`)
      .openOn(map)
      window.addMarker = addMarker;
      window.removeMarkers = removeMarkers;
      window.findClosest = findClosest;
  }
  map.on('contextmenu', onRightClick)

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- region polygons layer --> ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  
  // creating all of region polygons (borders)
  const TSOP_polygon = L.polygon([
    [0, 0],
    [0, 82.47],
    [9.71, 82.22],
    [17.41, 79.09],
    [19.40, 75.68],
    [26.61, 77.12],
    [30.81, 74.05],
    [38.24, 76.27],
    [41.22, 78.53],
    [43.20, 82.30],
    [48.31, 82.42],
    [50.69, 79.35],
    [53.79, 76.81],
    [57.37, 78.34],
    [60.44, 76.78],
    [61.73, 78.97],
    [66.87, 79.57],
    [75.67, 76.62],
    [79.25, 65.68],
    [83.89, 62.92],
    [91.86, 61.57],
    [95.90, 56.24],
    [102.55, 52.57],
    [106.12, 45.46],
    [110.51, 39.25],
    [107.82, 25.74],
    [107.36, 14.01],
    [113.73, 0],
  ], {color: '#0284c7', fillOpacity: 0.1});

  const TW_polygon = L.polygon([
    [0, 84.27],
    [9.87, 83.92],
    [18.18, 80.63],
    [20.19, 77.53],
    [26.73, 78.55],
    [31.24, 76.02],
    [38.19, 78.01],
    [40.48, 80.02],
    [42.56, 83.57],
    [48.05, 83.72],
    [50.80, 91.05],
    [56.12, 94.32],
    [64.10, 92.24],
    [67.28, 95.65],
    [80.93, 97.82],
    [83.05, 107.56],
    [88.80, 109.58],
    [95.37, 105.89],
    [99.35, 107.76],
    [102.68, 116.73],
    [100.56, 126.36],
    [102.79, 137.47],
    [100.43, 151.21],
    [94.04, 161.81],
    [81.85, 160.27],
    [79.23, 163.96],
    [70.69, 166.41],
    [63.57, 177.48],
    [57.18, 179.16],
    [48.67, 170.14],
    [41.98, 165.78],
    [37.16, 168.77],
    [27.07, 168.97],
    [23.25, 165.59],
    [14.33, 170.68],
    [8.85, 165.27],
    [0, 168.60],
  ], {color: '#4f46e5', fillOpacity: 0.1});

  const TAI_polygon = L.polygon([
    [115.61, 0],
    [109.22, 14.47],
    [109.54, 25.81],
    [112.20, 39.49],
    [107.30, 46.52],
    [103.56, 54.25],
    [97.01, 58.16],
    [93.35, 62.87],
    [96.30, 69.69],
    [92.18, 78.69],
    [94.45, 90.25],
    [95.96, 104.66],
    [100.67, 106.64],
    [104.27, 117.02],
    [102.26, 126.38],
    [104.31, 137.49],
    [101.66, 151.17],
    [108.92, 153.41],
    [116.78, 150.00],
    [122.38, 153.78],
    [128.54, 151.74],
    [132.00, 153.40],
    [144.42, 150.38],
    [151.32, 147.91],
    [155.38, 135.93],
    [150.55, 116.36],
    [154.58, 111.74],
    [153.45, 95.67],
    [158.29, 86.26],
    [155.92, 72.18],
    [154.36, 64.77],
    [151.08, 52.62],
    [153.77, 45.69],
    [150.87, 39.83],
    [151.73, 35.90],
    [158.66, 28.59],
    [161.62, 18.27],
    [162.85, 9.78],
    [159.89, 0],
  ], {color: '#16a34a', fillOpacity: 0.1});

  const TDR_polygon = L.polygon([
    [199.39, 214.40],
    [199.39, 169.22],
    [184.94, 172.73],
    [174.64, 161.16],
    [170.49, 153.66],
    [159.08, 156.53],
    [156.37, 150.94],
    [151.85, 149.87],
    [144.91, 152.26],
    [131.76, 155.08],
    [128.54, 153.49],
    [122.42, 155.41],
    [116.66, 152.19],
    [109.06, 155.19],
    [101.46, 152.76],
    [94.39, 163.70],
    [82.59, 162.14],
    [79.66, 165.47],
    [71.55, 168.33],
    [64.34, 178.91],
    [57.68, 180.97],
    [58.36, 185.10],
    [60.75, 189.66],
    [56.92, 197.26],
    [57.93, 201.00],
    [61.73, 205.04],
    [62.51, 214.40],
  ], {color: '#dc2626', fillOpacity: 0.1});

  const NMS_polygon = L.polygon([
    [49.19, 83.41],
    [51.48, 80.25],
    [53.84, 78.12],
    [57.49, 79.48],
    [60.13, 77.94],
    [61.25, 79.83],
    [66.93, 80.65],
    [76.63, 77.56],
    [80.44, 66.54],
    [84.35, 64.44],
    [92.13, 62.95],
    [95.07, 69.69],
    [90.98, 78.53],
    [93.41, 90.58],
    [94.74, 104.86],
    [88.75, 108.15],
    [84.29, 106.68],
    [81.79, 97.05],
    [67.98, 94.41],
    [64.62, 91.26],
    [56.34, 93.20],
    [51.88, 90.37],
  ], {color: '#4b5563', fillOpacity: 0.1});

  // adding all region polygons into one layer
  const regionPolygons = L.layerGroup([TSOP_polygon, TW_polygon, TAI_polygon, TDR_polygon, NMS_polygon]);

  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- region logos layer --> ///////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  //placing regions logos in right coordinates
  const TSOP_logo = L.imageOverlay("/img/The Shores of Plenty Logo.png",[[34, 12], [67.83, 62]])
  const TW_logo = L.imageOverlay("/img/The Wilds Logo.png",[[26, 104], [60.83, 154]])
  const TAI_logo = L.imageOverlay("/img/The Ancient Isles Logo.png",[[108, 53], [146.63, 103]])
  const TDR_logo = L.imageOverlay("/img/The Devil's Roar Logo.png",[[103, 167], [153, 207.41]])

  //adding all region logos into one layer
  const regionLogos = L.layerGroup([TSOP_logo, TW_logo, TAI_logo, TDR_logo]);
  regionLogos.addTo(map);

  // updating visibility based on zoom
  const updateLogoVisibility = () => {
    const currentZoom = map.getZoom();
    regionLogos.eachLayer(layer => {
      const logo = layer.getElement();
      if (logo) {
        logo.style.display = currentZoom < 3.5 ? 'block' : 'none';
      }
    });
  };
  map.on('zoomend', updateLogoVisibility);
  map.on('overlayadd', function(e) {
    if (e.layer === regionLogos) {
      updateLogoVisibility();
    }
  });
  updateLogoVisibility();

  ////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- tile names layer --> ///////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const rows = 26;
  const cols = 26;
  const tileWidth = img[0] / rows;
  const tileHeight = img[1] / cols;

  const insideTileNames = L.layerGroup();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      
      const x1 = c * tileWidth;
      const y1 = r * tileHeight;
  
      const centerX = x1 + tileWidth / 2;
      const centerY = y1 + tileWidth / 2;
  
      const centerLatLng = rc.unproject([centerX, centerY]);
  
      const rowNumber = r + 1;
      const colLetter = String.fromCharCode(65 + c);
  
      const labelText = `${colLetter}${rowNumber}`;
  
      const marker = L.marker(centerLatLng, {
        interactive: false,
        icon: L.divIcon({
          className: 'grid-label',
          html: `<span class="text-base font-bokor text-center text-shadow">${labelText}</span>`
        })
      })
      insideTileNames.addLayer(marker);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- tile names layer 2 --> ///////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  const outsideTileNames = L.layerGroup();

  for (let r = 0; r < rows; r++) {
      
      const y1 = r * tileHeight;
  
      const centerY = y1 + tileHeight / 2;
  
      const centerLatLng = rc.unproject([-500, centerY]);
  
      const rowNumber = r + 1;
  
      const labelText = `${rowNumber}`;
  
      const marker = L.marker(centerLatLng, {
        interactive: false,
        icon: L.divIcon({
          className: 'grid-label',
          html: `<span class="text-lg font-bokor text-center text-shadow text-[#CCC9DC]">${labelText}</span>`
        })
      })
      outsideTileNames.addLayer(marker);
    }

  for (let c = 0; c < cols; c++) {
    
    const x1 = c * tileWidth;

    const centerX = x1 + tileWidth / 2;

    const centerLatLng = rc.unproject([centerX, -500]);

    const colLetter = String.fromCharCode(65 + c);

    const labelText = `${colLetter}`;

    const marker = L.marker(centerLatLng, {
      interactive: false,
      icon: L.divIcon({
        className: 'grid-label',
        html: `<span class="text-lg font-bokor text-center text-shadow text-[#CCC9DC]">${labelText}</span>`
      })
    })
    outsideTileNames.addLayer(marker);
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- island names layer --> ///////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  const islandNames = L.layerGroup();

  if (islandData && islandData.length > 0) {
    
    islandData.forEach(island => {
      const name = L.divIcon({iconSize: [200,30], html: island.name, className: "text-xl font-bokor text-center hover:text-2xl hover:text-shadow shadow-white text-nowrap"})
      const marker = L.marker([island.x-1, island.y], {icon: name});
      marker.on(`click`, () => {
        onIslandClick(island);
      });
      islandNames.addLayer(marker);

      //making island names layer visible by default
      map.addLayer(islandNames)
    });
    
    // updating visibility based on zoom
    const updateTextVisibility = () => {
      const currentZoom = map.getZoom();
      islandNames.eachLayer(layer => {
        const icon = layer.getElement();
        if (icon) {
          icon.style.display = currentZoom >= 3.5 ? 'block' : 'none';
        }
      });
      insideTileNames.eachLayer(layer => {
        const icon = layer.getElement();
        if (icon) {
          icon.style.display = currentZoom >= 3.5 ? 'block' : 'none';
        }
      });
    };
  
    map.on('zoomend', updateTextVisibility);
    map.on('overlayadd', function(e) {
      if (e.layer === islandNames || e.layer === insideTileNames) {
        updateTextVisibility();
      }
    });
  
    updateTextVisibility();
  } else {
    console.log("No island data found");
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// <-- creating layer menu --> ///////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  // making some layers visible by default
  map.addLayer(regionPolygons);
  map.addLayer(regionLogos);
  map.addLayer(customMarkers);
  map.addLayer(outsideTileNames);
  
  // creating two variables that contains all base layers and overlay layers
  const baseLayers = {
    '<span class="text-neutral-600 font-semibold pl-2">Basemap</span>': basemap,
  }
  const overlayLayers = {
    '<span class="text-purple-600 font-semibold pl-2">Custom Markers</span>': customMarkers,
    '<span class="text-sky-600 font-semibold pl-2">Region Borders</span>': regionPolygons,
    '<span class="text-orange-600 font-semibold pl-2">Region Logos</span>': regionLogos,
    '<span class="text-green-600 font-semibold pl-2">Island Names</span>': islandNames,
    '<span class="text-red-600 font-semibold pl-2">Outside Tile Names</span>': outsideTileNames,
    '<span class="text-yellow-600 font-semibold pl-2">Inside Tile Names</span>': insideTileNames,
  }

  // creation of layer control panel and adding base and overlay layers to it
  const layerControl = L.control.layers(baseLayers,overlayLayers, {position: 'topleft'}).addTo(map);
  const layerControlContainer = layerControl.getContainer();
  
  layerControlContainer.classList.add("xl:translate-x-[25vw]", "2xl:translate-x-[20vw]", "transition-transform", "duration-500", "bg-palette1-a")

  return {map, layerControlContainer};
};

export default InitMap