import {employee_db} from "../db/db.js";
import {getCookie} from "./login.js";


let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("empFileInput");

inputFile.onchange = function (){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
    console.log(profilePic)
}

var profileImg;

inputFile.addEventListener("change",e =>{
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
        profileImg=reader.result
    });
    reader.readAsDataURL(file);
});

export function splitDate(date) {
    let datePart = date.split('T')[0];
    return datePart;
}

const getToken = () =>{
    const token = getCookie('authToken');  // Retrieve the auth token

    if (!token) {
        alert("No authentication token found. Please log in.");
        return;
    }
    return token;
}

function EmployeeNullField() {
    var img = $('<img />', {
        src: 'assets/image/emplyIMG.jpg',
        alt: 'Profile Picture',
        style: 'border-radius: 50%; width: 50px; height: 50px;',
    });

    $('#employeeId').val("");
    $('#employeeName').val("");
    // Use the appropriate method to clear file input if necessary
    // $('#empFileInput').val(null);
    $('#empGender').val("");  // No need for .toUpperCase() if just clearing
    $('#empStatus').val("");
    $('#empDesi').val("");
    $('#empRol').val("");     // No need for .toUpperCase() if just clearing
    $('#empBirthday').val("");
    $('#empJoinDate').val("");
    $('#empBranch').val("");
    $('#empContactNo').val("");
    $('#empEmail').val("");
    $('#empAddressNoOrName').val("");
    $('#empAddressLane').val("");
    $('#empCity').val("");
    $('#empState').val("");
    $('#empPostalCode').val("");
    $('#empPassword').val("");
    $('#emp_con_per').val("");
    $('#emp_con_num').val("");
    $('#profile-pic').attr('src','assets/image/emplyIMG.jpg');

}



function EmployeeModel(employeeId, employeeName, profilePic, gender, status, designation, accessRole, birthday, joinDate, branch, contactNo, email, addressNoOrName, addressLane, addressCity, addressState, postalCode, password, emergencyContactPerson, emergencyContactNumber) {
    const jD = splitDate(joinDate);
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.profilePic = profilePic;
    this.gender = gender;
    this.status = status;
    this.designation = designation;
    this.accessRole = accessRole;
    this.birthday = birthday;
    // this.joinDate = joinDate;
    this.joinDate = jD;
    this.branch = branch;
    this.contactNo = contactNo;
    this.email = email;
    this.addressNoOrName = addressNoOrName;
    this.addressLane = addressLane;
    this.addressCity = addressCity;
    this.addressState = addressState;
    this.postalCode = postalCode;
    this.password = password;
    this.emergencyContactPerson = emergencyContactPerson;
    this.emergencyContactNumber = emergencyContactNumber;

}

$('#saveEmployee').on('click', () => {

    var employeeId= $('#employeeId').val();
    var employeeName= $('#employeeName').val();
    //  var profilePic= $('#empFileInput').val();
    var gender = $('#empGender').val().toUpperCase();
    var status= $('#empStatus').val();
    var designation= $('#empDesi').val();
    var accessRole= $('#empRol').val().toUpperCase();
    var birthday= $('#empBirthday').val();
    var joinDate= $('#empJoinDate').val();
    var branch= $('#empBranch').val();
    var contactNo= $('#empContactNo').val();
    var email= $('#empEmail').val();
    var addressNoOrName= $('#empAddressNoOrName').val();
    var addressLane= $('#empAddressLane').val();
    var addressCity= $('#empCity').val();
    var addressState= $('#empState').val();
    var postalCode= $('#empPostalCode').val();
    var password= $('#empPassword').val();
    var emergencyContactPerson= $('#emp_con_per').val();
    var emergencyContactNumber= $('#emp_con_num').val();


    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/employee/saveEmployee",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: JSON.stringify({
            employeeId: employeeId,
            employeeName: employeeName,
            profilePic: profileImg,
            gender: gender,
            status: status,
            designation: designation,
            accessRole: accessRole,
            birthday: birthday,
            joinDate: joinDate,
            branch: branch,
            contactNo: contactNo,
            email: email,
            addressNoOrName: addressNoOrName,
            addressLane: addressLane,
            addressCity: addressCity,
            addressState: addressState,
            postalCode: postalCode,
            password: password,
            emergencyContactPerson: emergencyContactPerson,
            emergencyContactNumber: emergencyContactNumber
        }),
        success: function(data) {
            alert("save")
            EmployeeNullField();
            getAllEmployee();
        },
        error: function(xhr, exception) {
            alert("Error")
            console.log(exception)
        }
    });

})

function accessRoleCheck(select) {
    let userColor = '';

    if (select === 'USER') {
        userColor = '#A1F1F1FF';
    } else if (select === 'ADMIN') {
        userColor = '#50e72d';
    } else {
        userColor = '#e3fc76';
    }

    return userColor;
}

export function getAllEmployee() {


    const token = getCookie('authToken');

    if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
    }


    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/employee/getAllEmployee",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        async: true,
        success: function(data) {
            if (data.code === "00") {
                $('#employeeTable').empty();

                for (let emp of data.content ) {

                    // var userColor = accessRoleCheck(emp.accessRole); // Call accessRoleCheck function to get the userColor
                    var img = $('<img />', {
                        src: emp.profilePic,
                        alt: 'Profile Picture',
                        style: 'border-radius: 50%; width: 50px; height: 50px;',
                    });

                    //  console.log("dfdf", emp.profilePic)

                    var row = `<tr>
                        <td class="col01">${img.prop('outerHTML')}</td>
                        <td class="col02">${emp.employeeId}</td>
                        <td class="col03">${emp.employeeName}</td>
                        <td class="col04">${emp.gender}</td>
                        <td class="col05">${emp.status}</td>
                        <td class="col06">${splitDate(emp.joinDate)}</td>
                        <td class="col07">${emp.designation}</td>
                        <td class="col08" style="background-color: ${accessRoleCheck(emp.accessRole)}; font-weight: bold;">${emp.accessRole}</td>
                        <td class="col09">${splitDate(emp.birthday)}</td>
                        <td class="col10">${emp.contactNo}</td>
                        <td class="col11">${emp.addressNoOrName}</td>
                        <td class="col12">${emp.email}</td>
                        <td class="selection"><button type="button" class="btn btn-danger">X</button></td>
                    </tr>`;

                    $('#employeeTable').append(row);
                    // // Append the img element to the last .col01 cell
                    // $('#employee-table .col01').last().append(img);


                    // Create a new EmployeeModel object and push it to employee_db
                    let newEmployee = new EmployeeModel(
                        emp.employeeId,
                        emp.employeeName,
                        emp.profilePic,
                        emp.gender,
                        emp.status,
                        emp.designation,
                        emp.accessRole,
                        emp.birthday,
                        emp.joinDate,
                        emp.branch,
                        emp.contactNo,
                        emp.email,
                        emp.addressNoOrName,
                        emp.addressLane,
                        emp.addressCity,
                        emp.addressState,
                        emp.postalCode,
                        emp.password,
                        emp.emergencyContactPerson,
                        emp.emergencyContactNumber
                    );
                    employee_db.push(newEmployee);
                }
            }
        },
        error: function(xhr, exception) {
            alert("Error");
        }
    });
}

// Delete
$('#employeeTable').on('click', '.selection button', function () {

    const emp_ID = $(this).closest('tr').find('.col02').text();

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/api/v1/employee/deleteEmployee/"+emp_ID,
        async:true,
        success: function(data) {
            alert("success")
            $('#employeeTable').empty();
            getAllEmployee();
        },
        error: function(xhr, exception) {
            alert("Error")
        }
    });


});

// fill employee
$('#employeeTable').on('click', 'tr' , function() {

    let index = $(this).index();

    let col02 = $(this).find('.col02').text();

    getEmployee(col02);


});

function getEmployee(employee_id){
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/employee/getEmployee/"+employee_id,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        async:true,
        success: function(data) {
            if (data.code === "00"){
                let emp = data.content;

                // Populate other form fields with employee information
                $('#employeeId').val(emp.employeeId);
                $('#employeeName').val(emp.employeeName);

                profileImg =  emp.profilePic
                // Update the profile picture
                $('#profile-pic').attr('src', emp.profilePic);
                $('#empGender').val(emp.gender); // Assign the uppercase value
                $('#empStatus').val(emp.status);
                $('#empDesi').val(emp.designation); // Assign the uppercase value
                $('#empRol').val(emp.accessRole);
                $('#empBirthday').val(emp.birthday);
                $('#empJoinDate').val(emp.joinDate);
                $('#empBranch').val(emp.branch);
                $('#empContactNo').val(emp.contactNo);
                $('#empEmail').val(emp.email);
                $('#empAddressNoOrName').val(emp.addressNoOrName);
                $('#empAddressLane').val(emp.addressLane);
                $('#empCity').val(emp.addressCity);
                $('#empState').val(emp.addressState);
                $('#empPostalCode').val(emp.postalCode);
                $('#empPassword').val(emp.password);
                $('#emp_con_per').val(emp.emergencyContactPerson);
                $('#emp_con_num').val(emp.emergencyContactNumber);

            }
        },
        error: function(xhr, exception) {
            alert("Error")
        }
    });
}


// update Employee
$('#updateEmployee').on('click', () => {

    var employeeId= $('#employeeId').val();
    var employeeName= $('#employeeName').val();
    // var profilePic= $('#empFileInput').val();
    var gender = $('#empGender').val().toUpperCase();
    var status= $('#empStatus').val();
    var designation= $('#empDesi').val();
    var accessRole= $('#empRol').val().toUpperCase();
    var birthday= $('#empBirthday').val();
    var joinDate= $('#empJoinDate').val();
    var branch= $('#empBranch').val();
    var contactNo= $('#empContactNo').val();
    var email= $('#empEmail').val();
    var addressNoOrName= $('#empAddressNoOrName').val();
    var addressLane= $('#empAddressLane').val();
    var addressCity= $('#empCity').val();
    var addressState= $('#empState').val();
    var postalCode= $('#empPostalCode').val();
    var password= $('#empPassword').val();
    var emergencyContactPerson= $('#emp_con_per').val();
    var emergencyContactNumber= $('#emp_con_num').val();


    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/employee/updateEmployee",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: JSON.stringify({
            employeeId: employeeId,
            employeeName: employeeName,
            profilePic: profileImg,
            gender: gender,
            status: status,
            designation: designation,
            accessRole: accessRole,
            birthday: birthday,
            joinDate: joinDate,
            branch: branch,
            contactNo: contactNo,
            email: email,
            addressNoOrName: addressNoOrName,
            addressLane: addressLane,
            addressCity: addressCity,
            addressState: addressState,
            postalCode: postalCode,
            password: password,
            emergencyContactPerson: emergencyContactPerson,
            emergencyContactNumber: emergencyContactNumber
        }),
        success: function(data) {
            alert("save")
            EmployeeNullField()
            getAllEmployee();
        },
        error: function(xhr, exception) {
            alert("Error")

        }
    });

})

// employee selector
$('#systemAccess').on('change', () => {

    $('#employeeTable').empty();

    let search_term = $('#systemAccess').val().toUpperCase();

    if (search_term === "EMPLOYEE"){
        $('#employeeTable').empty();
        getAllEmployee();
    } else {
        $('#employeeTable').empty();
        let results = employee_db.filter((item) =>
            item.accessRole.toUpperCase().startsWith(search_term)
        );

        results.forEach((item) => {

            $('#employeeTable').empty();

            var img = $('<img />', {
                src: item.profilePic,
                alt: 'Profile Picture',
                style: 'border-radius: 50%; width: 50px; height: 50px;',
            });

            let row = `<tr>
                        <td class="col01">${img.prop('outerHTML')}</td>
                        <td class="col02">${item.employeeId}</td>
                        <td class="col03">${item.employeeName}</td>
                        <td class="col04">${item.gender}</td>
                        <td class="col05">${item.status}</td>
                        <td class="col06">${item.joinDate}</td>
                        <td class="col07">${item.designation}</td>
                        <td class="col08" style="background-color: ${accessRoleCheck(item.accessRole)}; font-weight: bold;">${item.accessRole}</td>
                        <td class="col09">${item.birthday}</td>
                        <td class="col10">${item.contactNo}</td>
                        <td class="col11">${item.addressNoOrName}</td>
                        <td class="col12">${item.email}</td>
                        <td class="selection"><button type="button" class="btn btn-danger">X</button></td>
                    </tr>`;
            $('#employeeTable').append(row);
        });
    }
});


// serch date
$('#emp-date-piker').on('input', () => {
    let search_term = $('#emp-date-piker').val();

    let results = employee_db.filter((item) =>

        item.joinDate.toLowerCase().startsWith(search_term.toLowerCase())||
        item.birthday.toLowerCase().startsWith(search_term.toLowerCase())

    );


    $('#employeeTable').empty();
    results.map((item, index) => {

        var img = $('<img />', {
            src: item.profilePic,
            alt: 'Profile Picture',
            style: 'border-radius: 50%; width: 50px; height: 50px;',
        });


        let row = `<tr>
                        <td class="col01">${img.prop('outerHTML')}</td>
                        <td class="col02">${item.employeeId}</td>
                        <td class="col03">${item.employeeName}</td>
                        <td class="col04">${item.gender}</td>
                        <td class="col05">${item.status}</td>
                        <td class="col06">${item.joinDate}</td>
                        <td class="col07">${item.designation}</td>
                        <td class="col08" style="background-color: ${accessRoleCheck(item.accessRole)}; font-weight: bold;">${item.accessRole}</td>
                        <td class="col09">${item.birthday}</td>
                        <td class="col10">${item.contactNo}</td>
                        <td class="col11">${item.addressNoOrName}</td>
                        <td class="col12">${item.email}</td>
                        <td class="selection"><button type="button" class="btn btn-danger">X</button></td>
                    </tr>`;

        $('#employeeTable').append(row);
    });

});

// serch employee
$('#employee-search').on('input', () => {
    let search_term = $('#employee-search').val();

    let results = employee_db.filter((item) =>

        item.employeeId.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.employeeName.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.addressNoOrName.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.contactNo.startsWith(search_term)

    );


    $('#employeeTable').empty();
    results.map((item, index) => {

        var img = $('<img />', {
            src: item.profilePic,
            alt: 'Profile Picture',
            style: 'border-radius: 50%; width: 50px; height: 50px;',
        });



        let row = `<tr>
                        <td class="col01">${img.prop('outerHTML')}</td>
                        <td class="col02">${item.employeeId}</td>
                        <td class="col03">${item.employeeName}</td>
                        <td class="col04">${item.gender}</td>
                        <td class="col05">${item.status}</td>
                        <td class="col06">${item.joinDate}</td>
                        <td class="col07">${item.designation}</td>
                        <td class="col08" style="background-color: ${accessRoleCheck(item.accessRole)}; font-weight: bold;">${item.accessRole}</td>
                        <td class="col09">${item.birthday}</td>
                        <td class="col10">${item.contactNo}</td>
                        <td class="col11">${item.addressNoOrName}</td>
                        <td class="col12">${item.email}</td>
                        <td class="selection"><button type="button" class="btn btn-danger">X</button></td>
                    </tr>`;

        $('#employeeTable').append(row);
    });

});