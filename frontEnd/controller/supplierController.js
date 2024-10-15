import {supplier_db} from "../db/db.js";
import {Supplier} from "../modeule/supplierModel.js";
import {getCookie} from "./login.js";


const getToken = () =>{
    const token = getCookie('authToken');  // Retrieve the auth token

    if (!token) {
        alert("No authentication token found. Please log in.");
        return;
    }
    return token;
}

$('#supp-save-btn').on('click', () => {
    var supplierId = $('#supplierId').val();
    var supplierName = $('#supplierName').val();
    var supplierCategory = $('#supplierCategory').val();
    var mobileNo = $('#mobileNo').val();
    var landLineNo = $('#landLineNo').val();
    var email = $('#supp-email').val();
    var addressNoOrName = $('#address').val();
    var addressCity = $('#city').val();
    var addressState = $('#state').val();
    var itemCode = $('#item-code').val();
    var postalCode = $('#supp-postalCode').val();
    var country = $('#country').val();

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/suppliers/saveSuppliers",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: JSON.stringify({
            supplierId: supplierId,
            supplierName: supplierName,
            supplierCategory: supplierCategory,
            mobileNo: mobileNo,
            landLineNo: landLineNo,
            email: email,
            addressNoOrName: addressNoOrName,
            addressState: addressState,
            addressCity: addressCity,
            itemCode:itemCode,
            postalCode: postalCode,
            country: country
        }),
        success: function(data) {
            getAllSupplier();
            alert("Saved successfully");
        },
        error: function(xhr, status, error) {
            alert("Error occurred while saving");
            console.log(error);
        }
    });
})

export function getAllSupplier() {

    const token = getCookie('authToken');  // Retrieve the auth token

    if (!token) {
        alert("No authentication token found. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/suppliers/getAllSuppliers",
        async: true,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(data) {
            if (data.code === "00") {
                $('#supplierTable').empty();

                for (let sup of data.content ) {
                    // var userColor = accessRoleCheck(emp.accessRole); // Call accessRoleCheck function to get the userColor

                    var row = `<tr>
                        <td class="col01">${sup.supplierName}</td>
                        <td class="col02">${sup.mobileNo}</td>
                        <td class="col03">${sup.email}</td>
                        <td class="col04">${sup.supplierCategory}</td>
                        <td class="col05">${sup.country}</td>
                        
                    </tr>`;
                    $('#supplierTable').append(row);

                    let newSupplier = new Supplier(
                        sup.supplierId,
                        sup.supplierName,
                        sup.supplierCategory,
                        sup.mobileNo,
                        sup.landLineNo,
                        sup.email,
                        sup.addressNoOrName,
                        sup.addressCity,
                        sup.addressState,
                        sup.postalCode,
                        sup.country
                    );
                    supplier_db.push(newSupplier);

                }
            }
        },
        error: function(xhr, exception) {
            alert("Error");
        }
    });
}


// fill Supplier
$('#supplierTable').on('click', 'tr' , function() {

    let index = $(this).index();

    let sup_id = supplier_db[index].supplierId;

    console.log("id id ",sup_id);

    getSupplier(sup_id);

});

function getSupplier(sup_id) {


    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/suppliers/getSuppliers/" + sup_id,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        async: true,
        success: function (data) {
            if (data.code === "00") {

                let sup = data.content;


                $('#supplierId').val(sup.supplierId);
                $('#supplierName').val(sup.supplierName);
                $('#supplierCategory').val(sup.supplierCategory.toUpperCase());
                $('#mobileNo').val(sup.mobileNo);
                $('#landLineNo').val(sup.landLineNo);
                $('#supp-email').val(sup.email);
                $('#address').val(sup.addressNoOrName);
                $('#city').val(sup.addressCity);
                $('#state').val(sup.addressState);
                $('#supp-postalCode').val(sup.postalCode);
                $('#country').val(sup.country);

            }
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    });
}

$('#supp-update-btn').on('click', () => {
    var supplierId = $('#supplierId').val();
    var supplierName = $('#supplierName').val();
    var supplierCategory = $('#supplierCategory').val();
    var mobileNo = $('#mobileNo').val();
    var landLineNo = $('#landLineNo').val();
    var email = $('#supp-email').val();
    var addressNoOrName = $('#address').val();
    var addressCity = $('#city').val();
    var addressState = $('#state').val();
    var postalCode = $('#supp-postalCode').val();
    var country = $('#country').val();

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/suppliers/updateSuppliers",
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
        data: JSON.stringify({
            supplierId: supplierId,
            supplierName: supplierName,
            supplierCategory: supplierCategory,
            mobileNo: mobileNo,
            landLineNo: landLineNo,
            email: email,
            addressNoOrName: addressNoOrName,
            addressState: addressState,
            addressCity: addressCity,
            postalCode: postalCode,
            country: country
        }),
        success: function (data) {
            getAllSupplier();
            alert("Saved successfully");
        },
        error: function (xhr, status, error) {
            alert("Error occurred while saving");
            console.log(error);
        }
    });
})

// search supplier
$('#formGroupExampleInput').on('input', () => {
    let search_term = $('#formGroupExampleInput').val();

    console.log(search_term);

    console.log(search_term)

    let results = supplier_db.filter((item) =>

        item.supplierName.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.email.toLowerCase().startsWith(search_term.toLowerCase()) ||
        item.country.toLowerCase().startsWith(search_term.toLowerCase())


    );


    $('#supplierTable').empty();
    results.map((item, index) => {


        let tbl_row = `<tr>
                        <td class="col01">${item.supplierName}</td>
                        <td class="col02">${item.contactNo}</td>
                        <td class="col03">${item.email}</td>
                        <td class="col04">${item.supplierCategory}</td>
                        <td class="col05">${item.country}</td>
                                                        </tr>`;
        $('#supplierTable').append(tbl_row);
    });

});
