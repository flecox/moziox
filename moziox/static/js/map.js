/*
  Map Class, this class is in charge of dealing with the intereaction with
  google maps. and drawing the polygons.
*/


function Map() {
  this.polygons = new Array();
  this.markers = new Array();
  this.map = null;
}

//Method to initialize the map using google maps.
Map.prototype.init = function(mapId, initLat, initLng) {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(initLat, initLng)
  };

  this.map = new google.maps.Map(document.getElementById(mapId),
    mapOptions);

  return map
}

//Set the infowwindows with the latlng when hovering a maker.
Map.prototype.setMarketWindowsInfo = function(marker, latLng) {
  google.maps.event.clearListeners(marker, 'mouseover');
  google.maps.event.clearListeners(marker, 'mouseout');
  if(marker.infow) {
    marker.infow.close();
  }
  var that = this;
  var infowindow = new google.maps.InfoWindow({
    content: "<span>" + latLng + "</span>"
  });
  infowindow.close(that.map, marker);
  google.maps.event.addListener(marker, 'mouseover', function () {
    infowindow.open(that.map, marker);
    marker.infow = infowindow;
  });
  google.maps.event.addListener(marker, 'mouseout', function () {
    marker.infow.close();
  });

}

/*
  initialize the map to be able to draw polygons in it.
  to create a plygon, click on the map, if the first point(marker)
  is clicked again. the polygon is created
  */
Map.prototype.initPolygonDrawer = function() {
  var isClosed = false;
  var that = this;
  poly = new google.maps.Polyline({ map: this.map, path: [], strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2 });
  google.maps.event.addListener(this.map, 'click', function (clickEvent) {
    if (isClosed) {
      poly = new google.maps.Polyline({ map: that.map, path: [], strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2 });
      isClosed = false
    }
    var markerIndex = poly.getPath().length;
    var isFirstMarker = markerIndex === 0;

    var marker = new google.maps.Marker({ map: that.map, position: clickEvent.latLng, draggable: true});
    map.setMarketWindowsInfo(marker, clickEvent.latLng);
    that.markers.push(marker);
    if (isFirstMarker) {
      google.maps.event.addListener(marker, 'click', function () {
        if (isClosed)
          return;
        var path = poly.getPath();
        poly.setMap(null);
        poly = new google.maps.Polygon({ map: that.map, path: path, strokeColor: "#FF0000", strokeOpacity: 0.8, strokeWeight: 2, fillColor: "#FF0000", fillOpacity: 0.35 });
        that.polygons.push(poly);
        isClosed = true;
      });
    }
    google.maps.event.addListener(marker, 'drag', function (dragEvent) {
      poly.getPath().setAt(markerIndex, dragEvent.latLng);
      map.setMarketWindowsInfo(marker, dragEvent.latLng);

    });
    poly.getPath().push(clickEvent.latLng);
  });

}


Map.prototype.setFinder = function() {
  var that = this;
  google.maps.event.addListener(this.map, 'click', function(e) {
    var color = "green";
    for(var i=0; i<that.polygons.length; i++) {
      var poly = that.polygons[i];
      if (google.maps.geometry.poly.containsLocation(e.latLng, poly)) {
        color = "red";
        break;
      }
    }
    var circle = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: .5,
      strokeColor: 'white',
      strokeWeight: .5,
      scale: 10
    };

    new google.maps.Marker({
      position: e.latLng,
      map: that.map,
      icon: circle
    })

  });
}


//Remove polygons and markers from the map.
Map.prototype.clearPolygons = function() {
  for(var i = 0; i<this.polygons.length; i++) {
      this.polygons[i].setMap(null);
  }
  this.polygons = new Array();
  for(var i = 0; i<this.markers.length; i++) {
      this.markers[i].setMap(null);
  }
  this.markers = new Array();
}


//Returns a list of arrays with tuples with lat and lng.
//used to post to the server.
Map.prototype.getCoords = function() {
  coords = new Array();
  for(var i = 0; i<this.polygons.length; i++) {
    var path = this.polygons[i].getPath();
    coords[i] = new Array();
    path.forEach(function(elem, index) {
      coords[i][index] = [elem.lat(), elem.lng()]
    });
  }
  return coords;
}


//with a list of list(polygon) containing a tuple with lat and lng
//load the object with polygons.
Map.prototype.loadPolygons = function(coordList) {
  for(var i=0; i<coordList.length; i++) {
    var poly_coords = new Array();
    for(var j=0; j<coordList[i][0].length; j++) {
      poly_coords.push(new google.maps.LatLng(coordList[i][0][j][0], coordList[i][0][j][1]));
    }
    var poly = new google.maps.Polygon({
      paths: poly_coords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    map.polygons.push(poly)
  }
}
