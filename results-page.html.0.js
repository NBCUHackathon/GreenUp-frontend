/**
 * Created by isabella on 3/28/15.
 */
Polymer('results-page', {

    domReady: function () {
        this.$.list.data = [{"name":"3 Golf 5 You", "cost":"87.50", "status": "Pending", "date": "Mon, Jan 1"},
            {"name":"Pro Golfer", "cost":"32.25", "status": "Accepted", "date": "Wed, March 7"}];

    },

    showResult: function() {
        console.log(event.detail);

        var data = event.detail.data;
        var dia = this.$.itemDialog;

        // Create data to populate paper-dialog
        var title, price, status, container;
        var att = document.createAttribute("class");
        //fake the user now
        //polymer is weird
        //not sure if this should even be here? maybe in a different scope?
        var user = {
            isAuthenticated: true,
            name: {
                "first":"David",
                "last": "Pate"
            },
            email: "david.pate@grimpy.com"
        };

        title = "<div style='font-weight: 600;font-size: 24px;padding-bottom: 20px;'>" + data.name + "</div>";
        price = "<div style='float: left;'>$" + data.cost + "</div>";
        status = "<div style='float: right;'>" + data.status + "</div>";
        container = "<div style='width: 300px;'>" + price + status + "</div>";

        if(user.isAuthenticated === true) {
            if(data.status === 'Accepted') {
                var button = "<paper-button raised style='margin-top: 25px; width: 100%; background-color: #03a9f4; color: white;' on-click='{{book}}'>BOOK NOW!</paper-button>";
                dia.innerHTML = title + container + button;
            } else {
                dia.innerHTML = title + container;
            }
        }
        else {
            var button = "<paper-button raised style='margin-top: 25px; width: 100%; background-color: #5c6bc0; color: white;' on-click='toggleLogin();'>YOU NEED TO LOGIN!</paper-button>";
            dia.innerHTML = title + container + button;
        }

        dia.open();


        //console.log(event.detail.item);
        //
        //if(event.detail.isSelected) {
        //    console.log("Selected to view: " + JSON.stringify(event.detail.item));
        //    this.$.itemDialog.open();
        //    event.detail.isSelected = false;
        //
        //} else {
        //    console.log("Selected to hide: " + JSON.stringify(event.detail.item));
        //}
    },

    book: function() {
        console.log("booking..");
    }

});
