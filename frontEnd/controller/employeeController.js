getAllEmployee();

let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("empFileInput");

inputFile.onchange = function (){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
    console.log(profilePic)
}

inputFile.addEventListener("change",e =>{
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
        console.log(reader.result);
    });
    reader.readAsDataURL(file);
});


function EmployeeModel(employeeId, employeeName, profilePic, gender, status, designation, accessRole, birthday, joinDate, branch, contactNo, email, addressNoOrName, addressLane, addressCity, addressState, postalCode, password, emergencyContactPerson, emergencyContactNumber) {
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.profilePic = profilePic;
    this.gender = gender;
    this.status = status;
    this.designation = designation;
    this.accessRole = accessRole;
    this.birthday = birthday;
    this.joinDate = joinDate;
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


var employee_db = [];

function saveEmployee() {

    var employeeId= $('#employeeId').val();
    var employeeName= $('#employeeName').val();
    var profilePic= $('#empFileInput').val();
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
        data: JSON.stringify({
            employeeId: employeeId,
            employeeName: employeeName,
            profilePic: profilePic,
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
            getAllEmployee();
        },
        error: function(xhr, exception) {
            alert("Error")
            console.log(exception)
        }
    });

}

function accessRoleCheck(select) {
    let userColor = '';

    if (select === 'USER') {
        userColor = '#A1F1F1FF'; // orange
    } else if (select === 'ADMIN') {
        userColor = '#50e72d'; // bronze
    } else {
        userColor = '#e3fc76'; // default color
    }

    return userColor; // Return the userColor value
}

function getAllEmployee() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/employee/getAllEmployee",
        async: true,
        success: function(data) {
            if (data.code === "00") {
                $('#employeeTable').empty();
                employee_db = data.content;

                for (let emp of employee_db ) {
                    // var userColor = accessRoleCheck(emp.accessRole); // Call accessRoleCheck function to get the userColor

                    var row = `<tr>
                        <td class="col01">${emp.profilePic}</td>
                        <td class="col02">${emp.employeeId}</td>
                        <td class="col03">${emp.employeeName}</td>
                        <td class="col04">${emp.gender}</td>
                        <td class="col05">${emp.status}</td>
                        <td class="col06">${emp.joinDate}</td>
                        <td class="col07">${emp.designation}</td>
                        <td class="col08" style="background-color: ${accessRoleCheck(emp.accessRole)}; font-weight: bold;">${emp.accessRole}</td>
                        <td class="col09">${emp.birthday}</td>
                        <td class="col10">${emp.contactNo}</td>
                        <td class="col11">${emp.addressNoOrName}</td>
                        <td class="col12">${emp.email}</td>
                        <td class="selection"><button type="button" class="btn btn-danger">X</button></td>
                    </tr>`;
                    $('#employeeTable').append(row);

                    // Create a new EmployeeModel object and push it to employee_db
                    // let newEmployee = new EmployeeModel(
                    //     emp.employeeId,
                    //     emp.employeeName,
                    //     emp.profilePic,
                    //     emp.gender,
                    //     emp.status,
                    //     emp.designation,
                    //     emp.accessRole,
                    //     emp.birthday,
                    //     emp.joinDate,
                    //     emp.branch,
                    //     emp.contactNo,
                    //     emp.email,
                    //     emp.addressNoOrName,
                    //     emp.addressLane,
                    //     emp.addressCity,
                    //     emp.addressState,
                    //     emp.postalCode,
                    //     emp.password,
                    //     emp.emergencyContactPerson,
                    //     emp.emergencyContactNumber
                    // );
                    // employee_db.push(newEmployee);
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
        async:true,
        success: function(data) {
            if (data.code === "00"){

                let emp = data.content;

                console.log('gender is ',emp.gender.toUpperCase())

                $('#employeeId').val(emp.employeeId);
                $('#employeeName').val(emp.employeeName);
                $('#empFileInput').val(emp.profilePic);
                $('#empGender').val(emp.gender.toUpperCase()); // Assign the uppercase value
                $('#empStatus').val(emp.status);
                $('#empDesi').val(emp.designation.toUpperCase()); // Assign the uppercase value
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
function updateEmployee(){

    console.log("employee update")

    var employeeId= $('#employeeId').val();
    var employeeName= $('#employeeName').val();
    var profilePic= $('#empFileInput').val();
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
        data: JSON.stringify({
            employeeId: employeeId,
            employeeName: employeeName,
            profilePic: profilePic,
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
            getAllEmployee();
        },
        error: function(xhr, exception) {
            alert("Error")
            console.log(exception)
        }
    });

}

// user selector
$('#systemAccess').on('change', () => {
    // $('#employeeTable').empty();
    let search_term = $('#systemAccess').val().toUpperCase();

    console.log(search_term);

    if (search_term === "EMPLOYEE"){
        $('#employeeTable').empty();
        getAllEmployee();
    } else {
        $('#employeeTable').empty();
        let results = employee_db.filter((item) =>
            item.accessRole.toUpperCase().startsWith(search_term)
        );

        console.log(employee_db.length);
        console.log(results.length);

        results.forEach((item) => {
            let row = `<tr>
                        <td class="col01">${item.profilePic}</td>
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

    console.log(search_term)
    let results = employee_db.filter((item) =>

        item.joinDate.toLowerCase().startsWith(search_term.toLowerCase())||
        item.birthday.toLowerCase().startsWith(search_term.toLowerCase())

    );


    $('#employeeTable').empty();
    results.map((item, index) => {



        let row = `<tr>
                        <td class="col01">${item.profilePic}</td>
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

// serch customer
$('#employee-search').on('input', () => {
    let search_term = $('#employee-search').val();

    console.log(search_term);

    console.log(search_term)

    let results = employee_db.filter((item) =>

        item.employeeId.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.employeeName.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.addressNoOrName.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.contactNo.startsWith(search_term)

    );


    $('#employeeTable').empty();
    results.map((item, index) => {




        let row = `<tr>
                        <td class="col01">${item.profilePic}</td>
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