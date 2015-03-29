/**
* Created by isabella on 3/28/15.
*/
//window.onload = function() {
//    document.querySelector("#search").addEventListener("click", showPage(0));
//    document.querySelector("#results").addEventListener("click", showPage(1));
//}

function showPage(index) {
    console.log("page changed");
    document.querySelector("core-pages").selected = index;
}

//isabella -- help! THis should toggle the visibility of the login window (id="login-window")
function toggleLogin () {
    console.log("Login Toggled");
    // document.querySelector("core-pages").selected = index;
}



