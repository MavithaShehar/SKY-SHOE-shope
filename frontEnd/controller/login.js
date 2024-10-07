import { employee_db, items_db } from "../db/db.js";
import {getAllCustomer} from "./customerController.js";
import {getAllItems} from "./itemController.js";

getAllCustomer();
getAllItems();

export let employe_id;

$(document).ready(function() {
    $('#loginBtn').on('click', function(event) {
        let userEmail = $('#userEmail').val();
        let userPassword = $('#password').val();


        let selectedUser = employee_db.find(item => item.email === userEmail);

        if (selectedUser.email === userEmail && selectedUser.password === userPassword) {
            event.preventDefault();
            $('#loginSection').css("display", "none");
            $('#syst-user02').text(selectedUser.employeeName);
            $('#syst-user01').text(selectedUser.accessRole);
            employe_id = selectedUser.employeeId;

            console.log(employee_db);
        } else {
            alert("Invalid email or password");
        }
    });
});
