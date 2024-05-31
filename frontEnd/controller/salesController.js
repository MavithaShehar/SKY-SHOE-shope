import {customer_db,inventory_db} from "../db/db.js";

var orders_db = [];

datePic();
generateUUID6()

$('#price').text("00");
$('#total-value').text("00");
$('#sub-total-value').text("00");

function generateUUID6() {
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let uuid = 'O'; // Set the first character to 'O'
    for (let i = 1; i < 6; i++) { // Start from index 1 to add the remaining characters
        let randomIndex = Math.floor(Math.random() * characters.length);
        uuid += characters[randomIndex];
    }

    $('#order_id').val(uuid);
}

let order_profilePic = document.getElementById("order-itm-profile-pic");
let order_inputFile = document.getElementById("order-itm-FileInput");

order_inputFile.onchange = function (){
    order_profilePic .src = URL.createObjectURL(order_inputFile.files[0]);
    console.log(order_profilePic )
}
var itemImg;
order_inputFile.addEventListener("change",e =>{
    const file = order_inputFile.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
        itemImg = reader.result
        console.log(reader.result);
    });
    reader.readAsDataURL(file);
});


export function loadCustomerId() {
    const customerSelect = $("#ordr-cust-id");
    customerSelect.empty(); // Clear existing options
    customerSelect.append('<option selected hidden>Select Item</option>'); // Add default hidden option

    customer_db.map((itm) => {

        customerSelect.append(`<option value="${itm.customerId}">${itm.customerId}</option>`); // Append item options
    });
}

$('#ordr-cust-id').on('input',()=>{
    let order_cust_id = $('#ordr-cust-id').val();

    let selectedCustomer = customer_db.find(cust => cust.customerId === order_cust_id);

    $('#order-cust-name').val(selectedCustomer.customerName);
    $('#order-cust-loyalty').val(selectedCustomer.level);


});

function datePic(){
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');

    let formattedDate = `${year}-${month}-${day}`;
    $('#order-date').val(formattedDate);
}


$('#order-select-itm-id').on('change', () => {
    let order_itm_id = $('#order-select-itm-id').val();

    let selectedItemData = inventory_db.find(itm => itm.item.itemCode === order_itm_id);
    if (selectedItemData) {

        $('#order-itm-catagory').val(selectedItemData.item.category);
        $('#order-itm-price').val(selectedItemData.item.priceSell);
        $('#order-itm-available-qty').val(selectedItemData.qty);
        $('#order-itm-size').val(selectedItemData.size);
        $('#order-itm-color').val(selectedItemData.colour);
        $('#order-itm-profile-pic').attr('src', selectedItemData.itemImage);
        $('#discount').val(0);
    } else {
        console.log("Item not found");
        // Optionally, clear the input fields if item not found
        $('#order-itm-catagory').val(' EMPTY');
        $('#order-itm-price').val(' EMPTY');
        $('#order-itm-available-qty').val(' EMPTY');
        $('#order-itm-size').val(' EMPTY');
        $('#order-itm-color').val(' EMPTY');
        $('#order-itm-profile-pic').attr('src',"");
        $('#discount').val(0);
    }
});

$('#orderBtn').on('click', () => {
    console.log("orderbtn");
    createOrderItem();
});

function createOrderItem() {
    //let orderItemCatagory = $('#order-itm-catagory').val();
    let orderItemPrice = parseFloat($('#order-itm-price').val());
    let orderQty = parseInt($('#order-qty').val());
    // let orderItmSize = $('#order-itm-size').val();
    // let orderItmColor = $('#order-itm-color').val();
    // let orderItmPic = $('#order-itm-profile-pic').attr();
    let discount = parseFloat($('#discount').val());

    console.log(orderQty);
    console.log(discount);
    console.log(orderItemPrice);

    calculateMount(discount, orderQty, orderItemPrice);
}
var total = 0;
var subTotal =0
function calculateMount(discount, orderQty, orderItemPrice) {

     var totalMount =(orderQty * orderItemPrice );
     total =total+totalMount;

    var subTotalMount= (orderQty * orderItemPrice * (1 - discount / 100)); // Adjusted the formula to include discount
        subTotal = subTotalMount+subTotal

    $('#price').text(subTotalMount);
    $('#total-value').text(total);
    $('#sub-total-value').text(subTotal);


}




