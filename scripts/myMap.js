(function() {
	$(document).ready(function () {
		var map;
		//build & set up the basic map
		function initMap() {
			console.log('initing');
		  var mapOptions = {
		    zoom: 14,
		    center: new google.maps.LatLng(28.601648, -81.200306)
		  };
		  map = new google.maps.Map(document.getElementById('map-canvas'),
		      mapOptions);
		}

		// Initially initialize the map with all the points
		function initialize() {
		    initMap();
		    getFacilityByCity("Orlando", 17652, 100, 0);
		}

		// Keep a single instance of infowindow so there is only one popup balloon in map instance
		// var infowindow = new google.maps.InfoWindow();
		var markers = [];
		var facilitiesInArea = [];

		// converts get facilites object into markers for use by google maps
		// @ facilities is the obj returned by get facilities (by channel/other)
		// @ return markers created by get facilities
		function jsonFacilitiesToMarkers(facilities) {

		    for (key in facilities) {
		        markers.push(new google.maps.Marker({
		            position: new google.maps.LatLng(facilities[key].Latitude, facilities[key].Longitude),
		            map: map,
		            animation:google.maps.Animation.DROP,
		            title: key,
		            id: facilities[key].ID
		        }));
		    }
		    return markers;
		}

		//Given an array of gmap markers, add it to global map instance
		function loadMarkers(markerArray) {
		    console.log('loaderMarkers called');
		    if (markerArray.length > 0) {
		        for (var i = 0; i < markers.length; i++) {
		            addMarkerEvent(markerArray[i]);
		            markerArray[i].setMap(map);
		        }
		    }
		}

		// Given marker attach a click listener
		function addMarkerEvent(marker) {
		    google.maps.event.addListener(marker, 'click', function() {
		        // infowindow.setContent("<div>"+marker.title+"</div>");
		        console.log("clicked" + marker.id);
		        court_id = marker.id;
		        infowindow.open(map,this);
		    });
		}

		// The Range of bounds allowed
		var allowedBounds = new google.maps.LatLngBounds(new google.maps.LatLng(28.592276, -81.208642),
		                                                 new google.maps.LatLng(28.611530, -81.187656));

		// Listen for user trying to pan away from UCF area
		function checkBoundsEvent() {
		    if ( allowedBounds.contains(map.getCenter())) {
		        lastValidCenter = map.getCenter();
		        return;
		    }
		    map.panTo(lastValidCenter);
		}

		//get all the facilities in the given city
		function getFacilityByCity(cityName, channelId, numResultsDesired, numSkip) {
			var request = "https://sandbox.api.gnsvc.com/rest/channel/"+channelId+"/facilities?q=list&skip="+numSkip+"&take="+numResultsDesired;

			console.log($("#map-canvas").height());

			$.ajax({
				type: "GET",
				url: request,
				dataType: 'json',
				headers: {
					"Access-Control-Allow-Origin": "*",
			        "UserName": "Hackathon_Development",
			        "Password":"6YBkHF86ut7946pDwZhp"
			    },
				success: function(data, status) {
					console.log(data);
					return console.log('success!');
				},
				error: function(xhr, desc, err) {
				console.log(xhr);
				console.log("Details: " + desc + "\nError:" + err);
				return console.log('did not work...');
				}
			});
			loadMarkers(jsonFacilitiesToMarkers(factilities));
		}

		google.maps.event.addDomListener(window, 'load', initialize);
	});
})();