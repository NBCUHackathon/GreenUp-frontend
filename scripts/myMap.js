var desiredZip = 32826;
var desiredDist = 10;
function checkZip () {
	console.log('checking zip');
	desiredZip = document.querySelector('search-page').shadowRoot.querySelector('#zipCodeInput').value;

	if (desiredZip.length == 5) {
		console.log('go!');
		socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
	}
}
function checkDist () {
	desiredDist = document.querySelector('search-page').shadowRoot.querySelector('#radius').value;

	if (desiredZip.length == 5) {
		console.log('go!');
		socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
	}
}

$(document).ready(function (desiredZip, desiredDist) {
    var map;
    var geocoder;
    // Keep a single instance of infowindow so there is only one popup balloon in map instance
    // var infowindow = new google.maps.InfoWindow();
    var markers = [];
    var facilitiesInArea = [];
    var facilityKeys = [];
    var desiredLon = -81.2989;
    var desiredLat = 28.4158;

    desiredDist = document.querySelector('search-page').shadowRoot.querySelector('#radius').value;
    console.log('desired distance : '+ desiredDist);


    socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
    socket.on('facilities.receiveZipFromLatLon', function(data) {
        // console.log('got lat and long ' + data.lat + " " + data.lon);
        desiredLat = data.lat;
        deisredLon = data.lon;

        socket.emit('facilities.getFacilityByLatLonAndRange', {lat: desiredLat, lon: desiredLon, range: desiredDist, zip: desiredZip});
    });

    // socket.emit('facilities.getFacilityByLatLonAndRange', {lat: desiredLat, lon: desiredLon, range: desiredDist, zip: desiredZip});

    //build & set up the basic map
    function initMap() {
        console.log('initing');
        var mapOptions = {
            scrollwheel: false,
            zoom: 10,
            center: new google.maps.LatLng(28.601648, -81.200306)
        };
        map = new google.maps.Map(document.querySelector('search-page').shadowRoot.querySelector('#googleMap'), mapOptions);

    }

    // Initially initialize the map with all the points
    function initialize() {
        initMap();
    }

    // converts get facilites object into markers for use by google maps
    // @ facilities is the obj returned by get facilities (by channel/other)
    // @ return markers created by get facilities
    function jsonFacilitiesToMarkers(facilities) {
        console.log("creating markers");
        console.log(Object.keys(facilities).length);
        var markers = [];
        for (key in facilities) {
            console.log(facilities[key].Address.PostalCode);
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
        console.log('loaderMarkers called with '+ markerArray.length + " entries");
        if (markerArray.length > 0) {
            for (var i = 0; i < markers.length; i++) {
                addMarkerEvent(markerArray[i]);
                markerArray[i].setMap(map);
            }
        }
        console.log('loaderMarkers finished');
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

    function goToZipCenter() {
        //Got result, center the map and put it out there
        console.log(desiredLat + " " +desiredLon);
        map.panTo(new google.maps.LatLng(desiredLat, desiredLon));
    }

    //courseID is the number key of the course
    function goToCourse(courseId) {
        //improve this later!
        for(key in markers) {
            if (markers[key].id === courseId)
                map.panTo(markers[key].getPosition());
        }
    }

    function checkZip () {
        desiredZip = document.querySelector('search-page').shadowRoot.querySelector('#zipCodeInput').value;
        if (desiredZip.length == 5) {
            socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
        }
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    //recieve the facilities and load the markers
    socket.on('facilities.receiveFacilitiesByLatLonRange', function(data) {
        goToZipCenter();
        loadMarkers(jsonFacilitiesToMarkers(data.facilities));
    });
});


function doMyMap() {
    google.maps.event.addDomListener(window, 'load', initMap);
}