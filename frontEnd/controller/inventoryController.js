//-------------------------inventory----------------------------------

import {InventoryModel} from "../modeule/inventoryModel.js";
import {inventory_db} from "../db/db.js";

getAllInventory();


let inve_profilePic = document.getElementById("inve-profile-pic");
let inve_inputFile = document.getElementById("inveFileInput");

inve_inputFile.onchange = function (){
    inve_profilePic.src = URL.createObjectURL(inve_inputFile.files[0]);
    console.log(profilePic)
}
var itemImg;
inve_inputFile.addEventListener("change",e =>{
    const file = inve_inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
        itemImg = reader.result
        console.log(reader.result);
    });
    reader.readAsDataURL(file);
});



 async function getAllInventory() {

    console.log("getAllInventory");

    try {
        const response = await $.ajax({
            method: "GET",
            url: "http://localhost:8080/api/v1/inventory/getAllInventory",
            async: true
        });

        if (response.code === '00') {
            const data = response.content;
        //    console.log('data::: ', JSON.stringify(data, null, 2));  // Log the data properly

            $('#inventoryTable').empty();

            for (let inve of data) {

                var img = $('<img />', {
                    src: inve.itemImage,
                    alt: 'Profile Picture',
                    style: 'border-radius: 50%; width: 50px; height: 50px;',
                });

                console.log(inve)

                var row = `<tr>
                    <td class="col01">${img.prop('outerHTML')}</td>
                    <td class="col02">${inve.item.itemCode}</td>
                    <td class="col03">${inve.item.description}</td>
                    <td class="col04">${inve.item.category}</td>
                    <td class="col05">${inve.colour}</td>
                    <td class="col06">${inve.size}</td>
                    <td class="col07">${inve.qty}</td>
                    <td class="col08">${inve.item.priceBuy}</td>
                    <td class="col09">${inve.item.priceSell}</td>
                </tr>`;
                $('#inventoryTable').append(row);

                let inventory = new InventoryModel(
                    inve.size,
                    inve.qty,
                    inve.maxQty,
                    inve.colour,
                    inve.status,
                    inve.item,
                    inve.itemImage,
                    inve.date,
                    inve.totalValue,
                    inve.totalQty,

                );

                inventory_db.push(inventory);

            }
            console.log(inventory_db)
            return data;  // Return the data if needed for further processing
        } else {
            throw new Error("Error fetching items: " + response.message);
        }
    } catch (error) {
        console.error("Error occurred while fetching items:", error);
        throw error;
    }
}

$('#inveSaveBtn').on('click', () => {

    var size= $('#itm-size').val();
    var qty= $('#itm-qty').val();
    var colour = $('#itm-color').val();
    var item= $('#inve-itemId').val();
 //   var itemImage= $('#inve-profile-pic').val();
    var date= $('#itm-date').val();
    var totalValue= $('#itm-total-value').val();


    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/inventory/saveInventory",
        data: JSON.stringify({
            size:size,
            qty:qty,
            colour:colour,
            item:{
                itemCode:item
            },
            itemImage:itemImg,
            date:date,
            totalValue:totalValue

        }),
        success: function(data) {
            alert("save")
            getAllInventory();
        },
        error: function(xhr, exception) {
            alert("Error")
            console.log(this.data)
            console.log(exception)
        }
    });

})

$('#inveUpdateBtn').on('click', () => {

    var size= $('#itm-size').val();
    var qty= $('#itm-qty').val();
    var colour = $('#itm-color').val();
    var item= $('#inve-itemId').val();
    //   var itemImage= $('#inve-profile-pic').val();
    var date= $('#itm-date').val();
    var totalValue= $('#itm-total-value').val();


    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/inventory/updateInventory",
        data: JSON.stringify({
            size:size,
            qty:qty,
            colour:colour,
            item:{
                itemCode:item
            },
            itemImage:itemImg,
            date:date,
            totalValue:totalValue

        }),
        success: function(data) {
            alert("save")
            getAllInventory();
        },
        error: function(xhr, exception) {
            alert("Error")
            console.log(this.data)
            console.log(exception)
        }
    });

})

