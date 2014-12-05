/*
This file conects the Map with the user interface.
*/

function getLastServicearea(map) {
  form = $("form");
  jQuery.ajax({
    url : form.attr("action"),
    type: 'GET',
    data: form.serialize(),
    success:function(data) {
      map.clearPolygons()
      var coords = data['mpoly'];
      map.loadPolygons(coords)
      // for(var k=0; k<map.polygons.length; k++) {
      //   map.polygons[k].setMap(map.map)
      // }
    },
  });
}

$( document ).ready(function() {
  // init map and set it for drawing
  map = new Map();
  map.init('map-canvas', -31.421903, -64.196472);
  map.setFinder();

  $("#id_service_area").change(function(e) {
    getLastServicearea(map);
  });
  getLastServicearea(map);
});
