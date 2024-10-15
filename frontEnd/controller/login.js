//import {getAllEmployee} from "./employeeController.js";
import {topBarSetName} from "./dashBord.js";

$(document).ready(function() {
    $('#loginBtn').on('click', function(event) {
        event.preventDefault();

        var settings = {
            "url": "http://localhost:8080/api/v1/auth/signIn",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": $('#userEmail').val(),
                "password": $('#password').val()
            }),
        };

        $.ajax(settings).done(function (response) {
            if (response.token) {
                const authToken = response.token;
                document.cookie = `authToken=${authToken}; path=/; secure; SameSite=Strict`;
                console.log('Token stored in cookie:', document.cookie);
               // getAllEmployee();  // Call after login success
                  topBarSetName();
                event.preventDefault();
                    $('#loginSection').css("display", "none");
            } else {
                alert("Login successful but no token found.");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Login failed. Please check your email or password.");
            console.error("Login failed:", textStatus, errorThrown);
        });
    });
});

export function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        // Remove whitespace at the beginning of the cookie name and compare it
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}
