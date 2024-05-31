import { employee_db, items_db } from "../db/db.js";
import {getAllCustomer} from "./customerController.js";
import {getAllItems} from "./itemController.js";

getAllCustomer();
getAllItems();

$(document).ready(function() {
    $('#loginBtn').on('click', function(event) {
        let userEmail = $('#userEmail').val();
        let userPassword = $('#password').val();

        // Find the user in the employee_db
        let selectedUser = employee_db.find(item => item.email === userEmail);

        // Check if the user exists and if the password matches
        if (selectedUser.email === userEmail && selectedUser.password === userPassword) {
            event.preventDefault(); // Prevents the form from submitting
            $('#loginSection').css("display", "none");

            console.log(employee_db);
        } else {
            alert("Invalid email or password");
        }
    });
});
