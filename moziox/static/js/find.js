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
      map.clearPolygons();
      var coords = data['mpoly'];
      map.loadPolygons(coords);
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

  $("body").on("hit", function() {
    $(".result").css("font-size", "5px");
    $(".result").css("color", "red");
    $(".result").text("HIT!");

    $(".result").animate({
      opacity: 1,
      fontSize: "2.4em",
      borderWidth: "10px"
    }, 300, function() {
      // Animation complete.
    });
  });

  $("body").on("miss", function() {
    $(".result").css("font-size", "5px");
    $(".result").css("color", "green");
    $(".result").text("MISSED!");

    $(".result").animate({
      opacity: 1,
      fontSize: "2.4em",
      borderWidth: "10px"
    }, 300, function() {
      // Animation complete.
    });
  });
});
