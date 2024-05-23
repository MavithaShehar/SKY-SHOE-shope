
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
    console.log(profilePic)
}

itm_inputFile.addEventListener("change",e =>{
    const file = itm_inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
        console.log(reader.result);
    });
    reader.readAsDataURL(file);
});


//-------------------------inventory----------------------------------

let inve_profilePic = document.getElementById("inve-profile-pic");
let inve_inputFile = document.getElementById("inveFileInput");

inve_inputFile.onchange = function (){
    inve_profilePic.src = URL.createObjectURL(inve_inputFile.files[0]);
    console.log(profilePic)
}

inve_inputFile.addEventListener("change",e =>{
    const file = inve_inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
        console.log(reader.result);
    });
    reader.readAsDataURL(file);
});


var items_db = [];


function saveItem(){

        var itemCode = $('#itemId').val();
        var description = $('#item_description').val();
        var priceBuy = $('#price_buy').val();
        var priceSell = $('#price_sale').val();
        var category = $('#supplierCategory').val();

        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/v1/item/saveItem",
            data: JSON.stringify({
                itemCode: itemCode,
                description: description,
                category: category,
                priceBuy: priceBuy,
                priceSell: priceSell

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
    }


function updateItem(){

    var itemCode = $('#itemId').val();
    var description = $('#item_description').val();
    var priceBuy = $('#price_buy').val();
    var priceSell = $('#price_sale').val();
    var category = $('#supplierCategory').val();

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/item/updateItem",
        data: JSON.stringify({
            itemCode: itemCode,
            description: description,
            category: category,
            priceBuy: priceBuy,
            priceSell: priceSell

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

}

function getAllItems() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/item/getAllItem",
        async: true,
        success: function(data) {
            if (data.code === "00") {
                $('#itemTable').empty();
                items_db = data.content;

                for (let itm of items_db ) {
                    // var userColor = accessRoleCheck(emp.accessRole); // Call accessRoleCheck function to get the userColor

                    var row = `<tr>
                        <td class="col01">${itm.itemCode}</td>
                        <td class="col02">${itm.description}</td>
                        <td class="col03">${itm.category}</td>
                        <td class="col04">${itm.priceSell}</td>
                        <td class="col05">${itm.priceBuy}</td>
                        
                    </tr>`;
                    $('#itemTable').append(row);

                }
            }
        },
        error: function(xhr, exception) {
            alert("Error");
        }
    });
}

// fill Supplier
$('#itemTable').on('click', 'tr' , function() {

    let index = $(this).index();

    let itm_id = items_db[index].itemCode;

    console.log("id id ",itm_id);

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