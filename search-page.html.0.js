/**
 * Created by isabella on 3/28/15.
 */
var startTime, endTime;
var desiredZip = 32826;
var desiredDist = 10;
var map;
var geocoder;
var markers = [];
var facilitiesInArea = [];
var facilityKeys = [];
var desiredLon = -81.2989;
var desiredLat = 28.4158;

//var socket = io('http://45.55.134.215:9999');

Polymer('search-page', {

    ready: function () {

    },

    checkDate: function () {
        var sandbox = document.querySelector("search-page").shadowRoot.querySelector("d-calendar");
        console.log(sandbox.selectedDate);
    },

    domReady: function () {

        document.querySelector('search-page').shadowRoot.querySelector("#notify").addEventListener('click', function() {
            var zip = document.querySelector("search-page").shadowRoot.querySelector("#zipCodeInput").value;
            var radius = document.querySelector("search-page").shadowRoot.querySelector("#maxPrice").immediateValue;
            var maxPrice = document.querySelector("search-page").shadowRoot.querySelector("#radius").immediateValue;
            var date = document.querySelector("search-page").shadowRoot.querySelector("d-calendar").selectedDate;
            var s = startTime;
            var e = endTime;

            console.log(s + "," + e + " " + typeof s);

            console.log(s.toISOString());
            var j = {"zip": zip, "radius": radius, "start": s.toISOString(), "end": e.toISOString(), "maxPrice": maxPrice};
            if(j.start.toString().charAt(j.start.length-1) === 'Z'){
                j.start = j.start.substring(0, j.start.length-2);
            }
            if(j.end.toString().charAt(j.end.length-1) === 'Z'){
                j.end = j.end.substring(0, j.end.length-2);
            }

            socket.emit("reservation.sent", j);
            console.log("sending: " + JSON.stringify(j));
            var t = document.querySelector("paper-toast");
            t.text = "Preferences submitted! Go to the results tab to see your status.";
            t.show();
        });

        document.querySelector('search-page').shadowRoot.querySelector("#startTime").addEventListener('changed', function (e, d) {
            console.log("Start time: " + event.detail.time);
            startTime = event.detail.time;

            // Enable notify button
            if(startTime != undefined && endTime != undefined) {
                document.querySelector("search-page").shadowRoot.querySelector("#notify").removeAttribute("disabled");
                document.querySelector("search-page").shadowRoot.querySelector("#notify").removeAttribute("class");
            }
        });

        document.querySelector('search-page').shadowRoot.querySelector("#endTime").addEventListener('changed', function (e, d) {
            console.log("End time: " + event.detail.time);
            endTime = event.detail.time;
            // check to make sure this is after the start time

            // Enable notify button
            if(startTime != undefined && endTime != undefined) {
                document.querySelector("search-page").shadowRoot.querySelector("#notify").removeAttribute("disabled");
                document.querySelector("search-page").shadowRoot.querySelector("#notify").removeAttribute("class");
            }
        });

        desiredDist = document.querySelector('search-page').shadowRoot.querySelector('#radius').value;
        console.log('desired distance : '+ desiredDist);


        socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
        socket.on('facilities.receiveZipFromLatLon', function(data) {
            // console.log('got lat and long ' + data.lat + " " + data.lon);
            desiredLat = data.lat;
            desiredLon = data.lon;

            socket.emit('facilities.getFacilityByLatLonAndRange', {lat: desiredLat, lon: desiredLon, range: desiredDist, zip: desiredZip});
        });

        //doMyMap();
        initMap();

        //recieve the facilities and load the markers
        socket.on('facilities.receiveFacilitiesByLatLonRange', function(data) {
            goToZipCenter(this.map);
            console.log("map: " + this.map);
            loadMarkers(jsonFacilitiesToMarkers(data.facilities));
        });
    },

    checkZip: function () {
        console.log('checking zip');
        desiredZip = document.querySelector('search-page').shadowRoot.querySelector('#zipCodeInput').value;

        if (desiredZip.length == 5) {
            console.log('go!');
            socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
        }
    },

    checkDist: function () {
        desiredDist = document.querySelector('search-page').shadowRoot.querySelector('#radius').value;

        if (desiredZip.length == 5) {
            console.log('go!');
            socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
        }
    }
});

//build & set up the basic map
function initMap() {
    console.log('initing');
    var mapOptions = {
        scrollwheel: false,
        zoom: 10,
        center: new google.maps.LatLng(28.601648, -81.200306)
    };
    this.map = new google.maps.Map(document.querySelector('search-page').shadowRoot.querySelector('#googleMap'), mapOptions);

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
            map: this.map,
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
            markerArray[i].setMap(this.map);
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
        infowindow.open(this.map,this);
    });
}

function goToZipCenter(map) {
    //Got result, center the map and put it out there
    console.log(desiredLat + " " +desiredLon);
    map.panTo(new google.maps.LatLng(desiredLat, desiredLon));
}

//courseID is the number key of the course
function goToCourse(courseId) {
    //improve this later!
    for(key in markers) {
        if (markers[key].id === courseId)
            this.map.panTo(markers[key].getPosition());
    }
}

function checkZip () {
    desiredZip = document.querySelector('search-page').shadowRoot.querySelector('#zipCodeInput').value;
    if (desiredZip.length == 5) {
        socket.emit('facilities.getLatLonFromZip', {zip: desiredZip});
    }
}