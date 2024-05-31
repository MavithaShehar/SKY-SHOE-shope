import {Items} from "../modeule/itemModel.js";
import {customer_db, items_db} from "../db/db.js";


getAllItems();




$("#select-itm-option>button").eq(0).on("click", () => {

    $('#item-form #save-item-form').show();
    $('#item-form #save-inventory-form').css ('display', 'none');

});

$("#select-itm-option>button").eq(1).on("click", () => {

    $('#item-form #save-inventory-form').show();
    $('#item-form #save-item-form').css ('display', 'none');
});

$("#select-itm-tbl-option>button").eq(0).on("click", () => {

    $('#item-section-tbls #items-tbl').show();
    $('#item-section-tbls #inve-tbl').css ('display', 'none');
});

$("#select-itm-tbl-option>button").eq(1).on("click", () => {

    $('#item-section-tbls #items-tbl').css ('display', 'none');
    $('#item-section-tbls #inve-tbl').show();
});

//-------------------------item----------------------------------

let itm_profilePic = document.getElementById("itm-profile-pic");
let itm_inputFile = document.getElementById("itmFileInput");

itm_inputFile.onchange = function (){
    itm_profilePic.src = URL.createObjectURL(itm_inputFile.files[0]);

}

var itemImg;
itm_inputFile.addEventListener("change",e =>{
    const file = itm_inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
        itemImg = reader.result
        console.log(reader.result);
    });
    reader.readAsDataURL(file);
});


//-------------------------inventory----------------------------------

// let inve_profilePic = document.getElementById("inve-profile-pic");
// let inve_inputFile = document.getElementById("inveFileInput");
//
// inve_inputFile.onchange = function (){
//     inve_profilePic.src = URL.createObjectURL(inve_inputFile.files[0]);
// }
//
// inve_inputFile.addEventListener("change",e =>{
//     const file = inve_inputFile.files[0];
//     const reader = new FileReader();
//
//     reader.addEventListener("load", () =>{
//
//     });
//     reader.readAsDataURL(file);
// });


// Function to load item IDs into the dropdown
function loadItemsId() {

    const itemIdSelect = $("#inve-itemId");
    const orderItemIdSelect = $("#order-select-itm-id");

   itemIdSelect.empty(); // Clear existing options
    orderItemIdSelect.empty(); // Clear existing options

    itemIdSelect.append(`<option selected hidden>Select Item</option>`); // Add default hidden option
    orderItemIdSelect.append(`<option selected hidden>Select Item</option>`); // Add default hidden option

    items_db.map((itm) => {
      //  console.log("Item ID is", itm.itemCode);
        itemIdSelect.append(`<option value="${itm.itemCode}">${itm.itemCode}</option>`); // Append item options
        orderItemIdSelect.append(`<option value="${itm.itemCode}">${itm.itemCode}</option>`); // Append item options
    });
}

// Ensure the DOM is fully loaded before calling the function
$(document).ready(() => {
    // loadItemsId();
});

$('#saveItem').on('click', () => {

        var itemCode = $('#itemId').val();
        var description = $('#item_description').val();
        var supplierId = $('#supp-id').val();
        var priceBuy = $('#price_buy').val();
        var priceSell = $('#price_sale').val();
        var category = $('#itemCategory').val();

        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/v1/item/saveItem",
            data: JSON.stringify({
                itemCode: itemCode,
                description: description,
                category: category,
                priceBuy: priceBuy,
                priceSell: priceSell,
                itemImg:itemImg,
                suppliers: {
                    supplierId: supplierId
                }
            }),

            success: function(data) {
                getAllItems();
                alert("Saved successfully");
            },
            error: function(xhr, status, error) {
                alert("Error occurred while saving");
                console.log(error);
            }
        });

    })


$('#updateItem').on('click', () => {

    var itemCode = $('#itemId').val();
    var description = $('#item_description').val();
    var supplierId = $('#supp-id').val();
    var priceBuy = $('#price_buy').val();
    var priceSell = $('#price_sale').val();
    var category = $('#itemCategory').val();

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/item/updateItem",
        data: JSON.stringify({
            itemCode: itemCode,
            description: description,
            category: category,
            priceBuy: priceBuy,
            priceSell: priceSell,
            itemImg:itemImg,
            suppliers: {
                supplierId: supplierId
            }
        }),
        success: function(data) {
            getAllItems()
            alert("Saved successfully");
        },
        error: function(xhr, status, error) {
            alert("Error occurred while saving");
            console.log(error);
        }
    });

})


function setData(data) {
    console.log(data.content[0].itemCode)
}

/*
var d = [];
async function getAllItems() {
    try {
        const response = await $.ajax({
            method: "GET",
            url: "http://localhost:8080/api/v1/item/getAllItem",
            async: true,
            // success: function(data) {
            //     console.log("data: " + data.content[0].itemCode)
            //     setData(data.content)
            //     d = data.content;
            //     if (data.code === "00") {
            //         $('#itemTable').empty();
            //
            //         for (let itm of data.content ) {
            //             // var userColor = accessRoleCheck(emp.accessRole); // Call accessRoleCheck function to get the userColor
            //
            //             var img = $('<img />', {
            //                 src: itm.itemImg,
            //                 alt: 'Profile Picture',
            //                 style: 'border-radius: 50%; width: 50px; height: 50px;',
            //             });
            //
            //             var row = `<tr>
            //                 <td class="col01">${img.prop('outerHTML')}</td>
            //                 <td class="col02">${itm.itemCode}</td>
            //                 <td class="col03">${itm.description}</td>
            //                 <td class="col04">${itm.category}</td>
            //                 <td class="col05">${itm.priceSell}</td>
            //                 <td class="col06">${itm.priceBuy}</td>
            //                 <td class="col07">${itm.suppliers.supplierId}</td>
            //
            //             </tr>`;
            //             $('#itemTable').append(row);
            //
            //             let items = new Items(
            //
            //                 itm.itemCode,
            //                 itm.description,
            //                 itm.category,
            //                 itm.priceBuy,
            //                 itm.priceSell,
            //                 itm.suppliers
            //
            //             )  ;
            //             items_db.push(items);
            //         }
            //     }
            // },
            // error: function(xhr, exception) {
            //     alert("Error");
            // }
        });

        if (response.code === '00') {
            // console.log(response.content)
            const data = response.content;
            console.log('data:::, ' + JSON.stringify(data))
            items_db.push(new Items(

            ))


            return response.content;
        } else {
            throw new Error("Error fetching items: " + response.message);
        }
    }catch (error) {
        console.error("Error occurred while fetching items:", error);
        throw error;
    }




    console.log(response)
    generateItems();
    console.log("content: " + d);
}
*/
export async function getAllItems() {
    try {
        const response = await $.ajax({
            method: "GET",
            url: "http://localhost:8080/api/v1/item/getAllItem",
            async: true
        });

        if (response.code === '00') {
            const data = response.content;
           // console.log('data::: ', JSON.stringify(data, null, 2));  // Log the data properly

            $('#itemTable').empty();

            for (let itm of data) {
                var img = $('<img />', {
                    src: itm.itemImg,
                    alt: 'Profile Picture',
                    style: 'border-radius: 50%; width: 50px; height: 50px;',
                });

                var row = `<tr>
                    <td class="col01">${img.prop('outerHTML')}</td>
                    <td class="col02">${itm.itemCode}</td>
                    <td class="col03">${itm.description}</td>
                    <td class="col04">${itm.category}</td>
                    <td class="col05">${itm.priceBuy}</td>
                    <td class="col06">${itm.priceSell}</td>
                    <td class="col07">${itm.suppliers.supplierId}</td>
                </tr>`;
                $('#itemTable').append(row);

                let items = new Items(
                    itm.itemCode,
                    itm.description,
                    itm.category,
                    itm.priceBuy,
                    itm.priceSell,
                    itm.itemImg,
                    itm.suppliers
                );

                items_db.push(items);
                loadItemsId();

            }
           // console.log(items_db)
             return data;  // Return the data if needed for further processing
        } else {
            throw new Error("Error fetching items: " + response.message);
        }
    } catch (error) {
        console.error("Error occurred while fetching items:", error);
        throw error;
    }
}



// fill Supplier
$('#itemTable').on('click', 'tr' , function() {

    let index = $(this).index();

    let itm_id = items_db[index].itemCode;


    getItem(itm_id);

});

function getItem(itm_id) {


    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/item/getItem/" + itm_id,
        async: true,
        success: function (data) {
            if (data.code === "00") {

                let itm = data.content;

                // Update the profile picture
                $('#itm-profile-pic').attr('src', itm.itemImg);
                $('#itemId').val(itm.itemCode);
                $('#item_description').val(itm.description);
                $('#price_buy').val(itm.priceBuy);
                $('#price_sale').val(itm.priceSell);
                $('#supplierCategory').val(itm.supplierCategory);


            }
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    });
}


///////////////////////////////////////inventory/////////////////////////////////////////////////////////


$('#inve-itemId').on('input', () => {

    let selectItemId = $('#inve-itemId').val();

    // Find the item in items_db that matches the selected ID
    let selectedItem = items_db.find(item => item.itemCode === selectItemId);

    if (selectedItem) {
        // Extract and log the description and category
        let description = selectedItem.description;
        let category = selectedItem.category;
        let priseBuy = selectedItem.priceBuy;
        var shoe_img = selectedItem.itemImg;

        calGetItemBuy(priseBuy);

        // Optionally, you can update the UI with these values
        $('#inve-description').val(description); // Make sure you have an element with ID item-description
        $('#inve-item-cataegory').val(category); // Make sure you have an element with ID item-category
        $('#inve-profile-pic').attr('src', shoe_img);
    } else {
        console.log("Item not found");
    }
});

function calGetItemBuy(priseBuy){
    $('#itm-qty').on('input', () => {

        let qty = $('#itm-qty').val();

        let totalValue = priseBuy*qty;


        $('#itm-total-value').val(totalValue);
    });
}


//**************** save items in inventory *******************************



