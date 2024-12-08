let mapInstance = null;

function InitMap()
{
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

  //custom CRS with origin point (0,0) is bottom left and not top left corner
  const BottomLeftOriginCRS = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, -1, 199.390625)
});
  // create the map
  const map = L.map('map', {
    crs: BottomLeftOriginCRS,
    zoomSnap: 0,
    zoomDelta: 0.25,
    zoomControl: false,
    attributionControl: false,
  })

  // assign map and image dimensions
  const rc = new L.RasterCoords(map, img)
  // all coordinates need to be unprojected using the `unproject` method
  // set the view in the middle of the image, initial zoom to 2 and max bounds 25 units outside of map
  map.setView(rc.unproject([img[0]/2, img[1]/2]), 2)
  map.setMaxBounds([[-25,-25],[225,240]])

  // the tile layer containing the image generated with `gdal2tiles --leaflet -p raster -w none <img> tiles`
  L.tileLayer('./tiles/{z}/{x}/{y}.png', {
    noWrap: true,
    bounds: rc.getMaxBounds(),
    maxZoom: 7,
    minZoom: 2,
  }).addTo(map)

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }

  map.on('click', onMapClick);
}

export default InitMap