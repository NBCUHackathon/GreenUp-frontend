/**
* Created by isabella on 3/28/15.
*/
//window.onload = function() {
//    document.querySelector("#search").addEventListener("click", showPage(0));
//    document.querySelector("#results").addEventListener("click", showPage(1));
//}

function showPage(index) {
    console.log("page changed");
    document.querySelector("core-animated-pages").selected = index;

    if(index === 1) {
        //var socket = io('http://45.55.134.215:9999');
        socket.emit("reservations.get.golfer");

        // Set selected
        var res = document.querySelector("#results");
        res.style.backgroundColor = "rgb(240, 240, 240)";
        res.style.color = "black";

        // Unset previous
        var res = document.querySelector("#search");
        res.style.backgroundColor = "#B6AD93";
        res.style.color = "white";
    } else if(index === 0) {
        // Set selected
        var res = document.querySelector("#search");
        res.style.backgroundColor = "rgb(240, 240, 240)";
        res.style.color = "black";

        // Unset previous
        var res = document.querySelector("#results");
        res.style.backgroundColor = "#B6AD93";
        res.style.color = "white";
    }
}

//isabella -- help! THis should toggle the visibility of the login window (id="login-window")
function toggleLogin () {
    console.log("Login Toggled");
    // document.querySelector("core-pages").selected = index;
}


function toggle() {
    var t = document.querySelector("#loginCred");
    console.log(t);
    if(t.style.opacity === "1") {
        t.style.opacity = 0;
        console.log("made it 0");
        console.log(t);
    } else {
        t.style.opacity = 1;
        console.log("made it 1");
        console.log(t);
    }
}