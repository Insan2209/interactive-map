let mapInstance = null;

function InitMap()
{
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
    // for use with browserify / webpack
    var L = require('leaflet')
    L.RasterCoords = require('leaflet-rastercoords')

    var img = [
      27444,  // original width of image
      25522   // original height of image
    ]
    // create the map
    var map = L.map('map', {
      crs: L.CRS.Simple
    })

    // assign map and image dimensions
    var rc = new L.RasterCoords(map, img)
    // set max zoom Level (might be `x` if gdal2tiles was called with `-z 0-x` option)
    map.setMaxZoom(rc.zoomLevel())
    // all coordinates need to be unprojected using the `unproject` method
    // set the view in the lower right edge of the image
    map.setView(rc.unproject([img[0], img[1]]), 2)

    // the tile layer containing the image generated with `gdal2tiles --leaflet -p raster -w none <img> tiles`
    L.tileLayer('./tiles/{z}/{x}/{y}.png', {
      noWrap: true,
      bounds: rc.getMaxBounds(),
      maxNativeZoom: rc.zoomLevel(),
      maxZoom: 7,
      minZoom: 2,
    }).addTo(map)
}

export default InitMap