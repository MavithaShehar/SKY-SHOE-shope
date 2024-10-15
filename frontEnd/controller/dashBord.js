import {getCookie} from "./login.js";
//import {getAllEmployee} from "./employeeController.js";

export async function topBarSetName() {
    console.log("dash bord is hear")
    getCookie();


    let mail = $('#userEmail').val();
    console.log("mail is ",mail)
}