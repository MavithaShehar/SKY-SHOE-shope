import { customer_db, inventory_db } from "../db/db.js";
import { OrderModel } from "../modeule/orderModel.js";
import { employe_id } from "./login.js";
import {loadItemsId} from "./itemController.js";

loadItemsId();

var orders_db = [];

datePic();
generateUUID6();

$('#price').text("00");
$('#total-value').text("00");
$('#sub-total-value').text("00");

function generateUUID6() {
    let characters = '0A1B2C3D4E5F6G7H8I9J0K8L7M6N5O4P3Q2R1STUVWXYZ';
    let uuid = 'O'; // Set the first character to 'O'
    for (let i = 1; i < 6; i++) { // Start from index 1 to add the remaining characters
        let randomIndex = Math.floor(Math.random() * characters.length);
        uuid += characters[randomIndex];
    }
    $('#order_id').val(uuid);
}

let order_profilePic = document.getElementById("order-itm-profile-pic");
let order_inputFile = document.getElementById("order-itm-FileInput");

order_inputFile.onchange = function () {
    order_profilePic.src = URL.createObjectURL(order_inputFile.files[0]);
    console.log(order_profilePic);
}
var itemImg;
order_inputFile.addEventListener("change", e => {
    const file = order_inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        itemImg = reader.result;
        console.log(reader.result);
    });
    reader.readAsDataURL(file);
});

export function loadCustomerId() {
    const customerSelect = $("#ordr-cust-id");
    customerSelect.empty(); // Clear existing options
    customerSelect.append('<option selected hidden>Select Customer</option>'); // Add default hidden option

    customer_db.map((itm) => {
        customerSelect.append(`<option value="${itm.customerId}">${itm.customerId}</option>`); // Append customer options
    });
}

$('#ordr-cust-id').on('input', () => {
    let order_cust_id = $('#ordr-cust-id').val();
    let selectedCustomer = customer_db.find(cust => cust.customerId === order_cust_id);

    $('#order-cust-name').val(selectedCustomer.customerName);
    $('#order-cust-loyalty').val(selectedCustomer.level);
});

function datePic() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    $('#order-date').val(formattedDate);

    console.log("datePic",datePic)

}

let orderItemName;
let selectedItemData;
let selectedItemDataIndex;

$('#itm-Search-Btn').on('click', () => {
    let order_itm_id = $('#order-select-itm-id').val();
    let order_itm_color = $('#order-itm-color').val();
    let order_itm_size = $('#order-itm-size').val();

    selectedItemData = inventory_db.find(itm => itm.itemCode === order_itm_id && itm.size === order_itm_size && itm.colour === order_itm_color);
    selectedItemDataIndex = inventory_db.findIndex(item => item.itemCode === order_itm_id && item.size === order_itm_size && item.colour === order_itm_color

    );



    if (selectedItemData) {
        orderItemName = selectedItemData.itemDescription;
        $('#order-itm-catagory').val(selectedItemData.itemCategory);
        $('#order-itm-price').val(selectedItemData.itemPriceSell);
        $('#order-itm-available-qty').val(selectedItemData.qty);
        $('#order-itm-size').val(selectedItemData.size);
        $('#order-itm-color').val(selectedItemData.colour);
        $('#order-itm-profile-pic').attr('src', selectedItemData.itemImage);
        itemImg = selectedItemData.itemImage;
        $('#discount').val(0);

    } else {
        $('#order-itm-catagory').val(' EMPTY');
        $('#order-itm-price').val(' EMPTY');
        $('#order-itm-available-qty').val(' EMPTY');
        $('#order-itm-size').val(' EMPTY');
        $('#order-itm-color').val(' EMPTY');
        $('#order-itm-profile-pic').attr('src', "");
        $('#discount').val(0);
    }
});

$('#orderBtn').on('click', async () => {
    console.log("orderbtn");
    await createOrderItem();
    await OrderItemsManeg();
    loadSelectedItems();

});

async function OrderItemsManeg() {
    console.log("inventory_db qty is 01 ::: ", inventory_db[selectedItemDataIndex].qty);

    let stockQty = $('#order-itm-available-qty').val();
    let orderQty = parseInt($('#order-qty').val());

    let newQty = stockQty - orderQty;

    $('#order-itm-available-qty').val(newQty);

    inventory_db[selectedItemDataIndex].qty = newQty;

    console.log(inventory_db[selectedItemDataIndex]);

    let size = inventory_db[selectedItemDataIndex].size;
    let qty = inventory_db[selectedItemDataIndex].qty;
    let colour = inventory_db[selectedItemDataIndex].colour;
    let item = inventory_db[selectedItemDataIndex].itemCode;
    let itemImg = inventory_db[selectedItemDataIndex].itemImage;
    let date = inventory_db[selectedItemDataIndex].date; // Corrected from data to date
    let totalValue = inventory_db[selectedItemDataIndex].total;



    console.log(size, qty, colour, item, itemImg, date, totalValue);

//    UpdateInventoryItm(size, qty, colour, item, itemImg, date, totalValue);
}


async function createOrderItem() {
    let orderId = $('#order_id').val();
    let customerId = $('#ordr-cust-id').val();

    let orderItemId = $('#order-select-itm-id').val();
    let orderItemCategory = $('#order-itm-catagory').val();
    let orderItemPrice = parseFloat($('#order-itm-price').val());
    let orderQty = parseInt($('#order-qty').val());
    let orderItmSize = $('#order-itm-size').val();
    let orderItmColor = $('#order-itm-color').val();
    let orderDate = $('#order-date').val();
    let orderItmPic = itemImg;
    let discount = parseFloat($('#discount').val());

    console.log("order-itm-profile-pic is ",itemImg);

    let price = orderQty * orderItemPrice;
    let subTotalMount = await calculateMount(discount, orderQty, orderItemPrice);

    let orderModel = new OrderModel(
        orderItemId,
        orderItemCategory,
        orderItemPrice,
        orderItmPic,
        orderItmSize,
        orderQty,
        orderItmColor,
        orderDate,
        discount,
        subTotalMount,
        itemImg
    );

    console.log("orderModel is ",orderModel);

    orders_db.push(orderModel);

    updateTotalValues();
}

var total = 0;
var subTotal = 0;

async function calculateMount(discount, orderQty, orderItemPrice) {
    let discountAmount = (orderItemPrice * discount) / 100;
    let discountedPrice = orderItemPrice - discountAmount;
    let subTotalMount = discountedPrice * orderQty;

    return subTotalMount;
}

function updateTotalValues() {
    total = orders_db.reduce((sum, order) => sum + (order.qty * order.priceSell), 0);
    let itemTotal = orders_db.reduce((sum, order) => (order.qty * order.priceSell), 0);
    subTotal = orders_db.reduce((sum, order) => sum + order.total, 0);

    $('#price').text(itemTotal.toFixed(2));
    $('#total-value').text(total.toFixed(2));
    $('#sub-total-value').text(subTotal.toFixed(2));
}

const loadSelectedItems = () => {
    $('#order-tbl-body').empty();

    orders_db.map((item, index) => {
        var img = $('<img />', {
            src: item.itemImage,
            alt: 'Profile Picture',
            style: 'width: 100px; height: 100px;',
        });

        let tbl_row = `<tr>
                        <td class="col01">${img.prop('outerHTML')}</td>
                        <td class="col02">${item.itemCode}</td>
                        <td class="col03">${item.itemCode}</td>
                        <td class="col04">${item.category}</td>
                        <td class="col05">${item.qty}</td>
                        <td class="col06">${item.colour}</td>
                        <td class="col07">${item.size}</td>
                        <td class="col08">${item.priceSell}</td>
                        <td class="col09">${item.total.toFixed(2)}</td>
                        <td class="col11">${item.discount}</td>
                        <td class="col10"><button type="button" class="btn btn-danger">X</button></td>
                        </tr>`;
        $('#order-tbl-body').append(tbl_row);
    });
};

let paymentType = "";

// Handle the purchase button click event

$('#purchase-btn').on('click', () => {
        let order_id = $('#order_id').val();
        let date = $('#order-date').val();
        let employee_id = employe_id; // Ensure this variable is defined somewhere
        let customer_id = $('#ordr-cust-id').val();
        let total = $('#sub-total-value').text();
        let itemQty = orders_db.length;
        let paymentOption = paymentType;

        let itemData = orders_db.map(item => ({
            itemSaleId: item.itemSaleId,
            itemCode: {
                itemCode: item.itemCode
            },
            colour: item.colour,
            qty: item.qty,
            size: item.size,
            itemImg:item.itemImg
        }));

    if(paymentOption !== null && paymentOption !== "") {

        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/v1/sale/save",
            data: JSON.stringify({
                orderId: {
                    orderId: order_id
                },
                orderItemDate: date,
                orderItemQty: itemQty,
                paymentOption: paymentOption,
                points: null,
                totalPrice: total,
                customerId: {
                    customerId: customer_id
                },
                employeeId: {
                    employeeId: "E001"
                },
                itemData: itemData
            }),
            success: function (data) {
                alert("save");
                $('#order-tbl-body').empty();
                resetValues();
                clearFields();
            },
            error: function (xhr, exception) {
                alert("Error");
                console.log("Error details:", xhr.responseText);
                console.log(exception);
            }
        });

        orders_db = [];
        updateTotalValues();

    } else {
        alert("Payment type is required");
    }

});

// Handle the payment type button click events
$('#monyPayment').on('click', () => {
    paymentType = "CASH";
});

$('#cardPayment').on('click', () => {
    paymentType = "CARD";
});




function resetValues() {
    total = 0;
    subTotal = 0;
    $('#price').text("00");
    $('#total-value').text("00");
    $('#sub-total-value').text("00");
}

$('#order-tbl-body').on('click', '.col10 button', function () {
    console.log("click Remove button");
    const removeItmID = $(this).closest('tr').find('.col02').text();
    const removeItmSize = $(this).closest('tr').find('.col07').text();
    const removeItmColour = $(this).closest('tr').find('.col06').text();
    const removeItmQty = $(this).closest('tr').find('.col05').text();
    const removeItmPriceSell = $(this).closest('tr').find('.col08').text();
    const removeItmTotal = $(this).closest('tr').find('.col09').text();

    const indexToRemove = orders_db.findIndex(item =>
        item.itemCode === removeItmID &&
        item.size === removeItmSize &&
        item.colour === removeItmColour
    );
    const indexIncesItm = inventory_db.findIndex(item =>
        item.itemCode === removeItmID &&
        item.size === removeItmSize &&
        item.colour === removeItmColour
    );

    if (indexToRemove !== -1) {
        orders_db.splice(indexToRemove, 1);
        total -= parseFloat(removeItmPriceSell) * parseInt(removeItmQty);
        subTotal -= parseFloat(removeItmTotal);

        $('#total-value').text(total.toFixed(2));
        $('#sub-total-value').text(subTotal.toFixed(2));
        $('#price').text("00");


        console.log("inventory_db qty is 03 ::: ",  inventory_db[selectedItemDataIndex].qty)


        let stockQty  = inventory_db[indexIncesItm].qty;
     //   let removeQty  = orders_db[indexToRemove].orderModel.order;
        let newQty = parseFloat(stockQty)+parseFloat(removeItmQty);


        inventory_db[indexIncesItm].qty=newQty;

        let size = inventory_db[indexIncesItm].size
        let qty = inventory_db[indexIncesItm].qty
        let colour = inventory_db[indexIncesItm].colour
        let item = inventory_db[indexIncesItm].itemCode
        let itemImg = inventory_db[indexIncesItm].itemImage
        let date = inventory_db[indexIncesItm].data
        let totalValue = inventory_db[indexIncesItm].total



        UpdateInventoryItm(size,qty,colour,item,itemImg,date,totalValue)


        loadSelectedItems();
    }

});

function UpdateInventoryItm(size,qty,colour,item,itemImg,date,totalValue){

    console.log("/////////////////////////////////////////////////")
    console.log(size,qty,colour,item,itemImg,date,totalValue);


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
        },
        error: function(xhr, exception) {
            alert("Error")
            console.log(this.data)
            console.log(exception)
        }
    });
}


function clearFields() {
    var img = $('<img />', {
        src: "ass",
        alt: 'Profile Picture',
        style: 'width: 100px; height: 100px;',
    });

    $('#order_id').val("");
    $('#ordr-cust-id').val("");
    $('#order-select-itm-id').val("");
    $('#order-itm-catagory').val("");
    $('#order-itm-price').val("");
    $('#order-qty').val("");
    $('#order-itm-size').val("");
    $('#order-itm-color').val("");
    $('#order-date').val("");
    $('#order-itm-profile-pic').attr('src', img.attr('src'));
    $('#discount').val("");

    generateUUID6();
}