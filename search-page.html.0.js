/**
 * Created by isabella on 3/28/15.
 */
var startTime, endTime;

var socket = io('http://45.55.134.215:9999');

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
            console.log(s + "," + e);

            var j = {"zip": zip, "radius": radius, "start": s, "end": e};

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