import {saleHistoryModel} from "../modeule/saleHistoryModel.js";

// Initial call to fetch and display sale history data
getAllSaleHistory();

var sale_history_db = [];

// Utility function to format the date
export function splitDate(date) {
    let datePart = date.split('T')[0];
    return datePart;
}

// Utility function to format the date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

export function getAllSaleHistory() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/sale",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                sale_history_db = []; // Clear the previous data
                for (let sale of data.content) {
                    let sale_history = new saleHistoryModel(
                        sale.orderId,
                        sale.date,
                        sale.itemSaleList,
                        sale.employee,
                        sale.customer,
                        sale.itemQty,
                        sale.paymentMethod,
                        sale.totalPrice
                    );
                    sale_history_db.push(sale_history);

                }
                set_table();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX error:', textStatus, errorThrown);
        }
    });
}

function set_table() {
    // Clear the table before appending new rows
    $('#saleHistoryTable').empty();

    // Iterate over the sale_history_db array and create table rows
    for (let sale of sale_history_db) {
        var row = `<tr>
                        <td class="col01">${sale.orderId}</td>
                        <td class="col02">${splitDate(sale.date)}</td>
                        <td class="col03">${sale.paymentMethod}</td>
                        <td class="col04">${sale.totalPrice}</td>
                        <td class="col05">${sale.customer}</td>
                        <td class="col06">${sale.employee}</td>
                        <td class="col07"><button type="button" class="btn btn-success itmView">View</button></td>
                   </tr>`;
        $('#saleHistoryTable').append(row);
    }
}

// Add event listener to the view buttons
$('#saleHistoryTable').on('click', '.itmView', function() {

    console.log("image",sale_history_db)

    var orderId = $(this).closest('tr').find('.col01').text().trim();
    console.log('Order ID:', orderId);

    let saleHistory = sale_history_db.find(sale => sale.orderId === orderId);

    $('#saleItemInfo_Table').empty();

    if (saleHistory) {
        saleHistory.itemSaleList.forEach(data => {
            var img = `<img src="${data.item.itemImg}" alt="Item Image" style="width: 100px; height: 100px;">`;
            var row = `<tr>
                            <td class="col01">${img}</td>
                            <td class="col02">
                                Iteme Code: ${data.item.itemCode} <br>
                                Name      :${data.item.description} <br>
                                Sell Price:${data.item.priceSell} <br>
                                Size      : ${data.size} <br> 
                                Qty       : ${data.qty} <br> 
                                Colour: ${data.colour} <br>
                            </td>
                        </tr>`;
            $('#saleItemInfo_Table').append(row);
        });
    } else {
        console.log('Sale history item not found for Order ID:', orderId);
    }
});

// serch date
$('#saleDate').on('input', () => {
    let saleDate = $('#saleDate').val();

    let results = sale_history_db.filter((item) =>

        item.date.toLowerCase().startsWith(saleDate.toLowerCase())

    );


    $('#saleHistoryTable').empty();
    results.map((sale, index) => {



        var row = `<tr>
                        <td class="col01">${sale.orderId}</td>
                        <td class="col02">${splitDate(sale.date)}</td>
                        <td class="col03">${sale.paymentMethod}</td>
                        <td class="col04">${sale.totalPrice}</td>
                        <td class="col05">${sale.customer}</td>
                        <td class="col06">${sale.employee}</td>
                        <td class="col07"><button type="button" class="btn btn-success itmView">View</button></td>
                   </tr>`;
        $('#saleHistoryTable').append(row);
    });

});
