$( document ).ready(function() {
  // init map and set it for drawing
  map = new Map();
  map.init('map-canvas', -31.421903, -64.196472);
  map.initPolygonDrawer();
  //save the service area..
  // $("form").submit(function(e) {
  //   e.preventDefault();
  //   $(".errors").html("");
  //   var data = {'mpoly':map.getCoords(), 'name': $("#id_name").val()};
  //   jQuery.ajax({
  //     url : $(this).attr("action"),
  //     dataType: 'json',
  //     type: 'POST',
  //     data: JSON.stringify(data),
  //     success:function(data) {
  //       if ('errors' in data) {
  //           var errors = "";
  //           for(var i=0; i<data.errors.length; i++) {
  //               errors += "<span>"+data.errors[i][0]+"</span> <br />"
  //           }
  //           $(".errors").html(errors);
  //       } else if ('saved' in data) {
  //           $(".success").text(data.saved);
  //       }
  //     },
  //   });
  // });

  // clean the map.
  $("#clear").click(function(e) {
    e.preventDefault();
    map.clearPolygons();
  });

});
