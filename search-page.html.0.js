/**
 * Created by isabella on 3/28/15.
 */
var startTime, endTime;

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
            var radius = document.querySelector("search-page").shadowRoot.querySelector("#radius").immediateValue;
            var date = document.querySelector("search-page").shadowRoot.querySelector("d-calendar").selectedDate;
            var s = startTime;
            var e = endTime;
            console.log(s + "," + e + " " + typeof s);
            //if(s.toString().charAt(s.length-1) === 'Z'){
            //    s = s.splice(0, -1);
            //}
            //if(e.toString().charAt(e.length-1) === 'Z'){
            //    e = e.splice(0, -1);
            //}
            console.log(s.toISOString());
            var j = {"zip": zip, "radius": radius, "start": s.toISOString(), "end": e.toISOString()};
            if(j.start.toString().charAt(j.start.length-1) === 'Z'){
                j.start = j.start.substring(0, j.start.length-2);
            }
            if(j.end.toString().charAt(j.end.length-1) === 'Z'){
                j.end = j.end.substring(0, j.end.length-2);
            }
            socket.emit("reservation.sent", j);
            console.log("sending: " + JSON.stringify(j));
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
    }
});