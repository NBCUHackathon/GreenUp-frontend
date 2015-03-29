/**
 * Created by isabella on 3/28/15.
 */
Polymer('search-page', {

    ready: function () {

    },

    checkDate: function () {
        var sandbox = document.querySelector("search-page").shadowRoot.querySelector("d-calendar");
        console.log(sandbox.selectedDate);
    },

    domReady: function () {
        document.querySelector('search-page').shadowRoot.querySelector("#startTime").addEventListener('changed', function (e, d) {
            console.log("Start time: " + event.detail.time);
        });

        document.querySelector('search-page').shadowRoot.querySelector("#endTime").addEventListener('changed', function (e, d) {
            console.log("End time: " + event.detail.time);
            // check to make sure this is after the start time
        });
    }
});