(function() {
	$(document).ready(function () {
		console.log('ready with jq');
		var map;
		var geocoder;
		// Keep a single instance of infowindow so there is only one popup balloon in map instance
		// var infowindow = new google.maps.InfoWindow();
		var markers = [];
		var facilitiesInArea = [];
		var facilityKeys = [];
		var desiredZip = "32779";
		var desiredLon = -81.2989;
		var desiredLat = 28.4158;
		var desiredDist = 25;
		desiredDist = document.querySelector('#search-page').shadowRoot.querySelector('#radius').value;
		console.log('desired distance : '+ desiredDist);

		socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
		socket.on('facilities.receiveZipFromLatLon', function(data) {
			console.log('got lat and long' + data.lat + " " +data.lon);
			desiredLat = data.lat;
			deisredLon = data.lon;
		});

		socket.emit('facilities.getFacilityByLatLonAndRange', {lat: desiredLat, lon: desiredLon, range: desiredDist});

		//build & set up the basic map
		function initMap() {
			console.log('initing');
		  var mapOptions = {
            scrollwheel: false,
		    zoom: 12,
		    center: new google.maps.LatLng(28.601648, -81.200306)
		  };
		  map = new google.maps.Map(document.querySelector('#search-page').shadowRoot.querySelector('#googleMap'), mapOptions);
          console.log(map);
		  console.log("done");
		}

		// Initially initialize the map with all the points
		function initialize() {
		    initMap();
		    // getFacilityByCity("Orlando", 17652, 100, 0);

		    socket.emit('facilities.getFacilityByLatLonAndRange', {lat: desiredLat, lon: desiredLon, range: desiredDist});

			//test goToCourseFunctionality
			setTimeout(function() {
				goToCourse(1743);
				console.log('waited');
			}, 3000);

			// //test goToCourseFunctionality
			// setTimeout(function() {
			// 	goToZipCenter(32779);
			// 	console.log('waited');
			// }, 5000);
		}

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

		//get all the facilities in the given city
		function getFacilityByCity(cityName, channelId, numResultsDesired, numSkip) {
			// var request = "https://sandbox.api.gnsvc.com/rest/channel/"+channelId+"/facilities?q=list&skip="+numSkip+"&take="+numResultsDesired;

			// $.ajax({
			// 	type: "GET",
			// 	url: request,
			// 	dataType: 'json',
			// 	headers: {
			// 		"Access-Control-Allow-Origin": "*",
			//   		"UserName": "Hackathon_Development",
			//   		"Password":"6YBkHF86ut7946pDwZhp"
			//     },
			// 	success: function(data, status) {
			// 		facilitiesInArea = data;
			// 		console.log(data);
			// 		return console.log('success!');
			// 	},
			// 	error: function(xhr, desc, err) {
			// 		console.log(xhr);
			// 		console.log("Details: " + desc + "\nError:" + err);
			// 		return console.log('did not work...');
			// 	}
			// });
			loadMarkers(jsonFacilitiesToMarkers(factilitiesInArea));
		}

		function goToZipCenter(zipCode) {
		    geocoder.geocode({'address': zipCode}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//Got result, center the map and put it out there
					console.log('got ' + results);
					console.log(results[0].geomertry.location);
					map.setCenter(results[0].geometry.location);
				}
		    });
		}

		//courseID is the number key of the course
		function goToCourse(courseId) {
			//improve this later!
			for(key in markers) {
				if (markers[key].id === courseId)
					map.panTo(markers[key].getPosition());
			}
		}

		google.maps.event.addDomListener(window, 'load', initialize);

		//recieve the facilities and load the markers
		socket.on('facilities.receiveFacilitiesByLatLonRange', function(data) {
			console.log('recd data');
			loadMarkers(jsonFacilitiesToMarkers(data.facilities));
		});
	});
})();