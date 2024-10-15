import {resupply_db} from "../db/db.js";
import {ResupplyModel} from "../modeule/resupplyModel.js";
import {getCookie} from "./login.js";

export const getAllResupply = () =>{

    const token = getCookie('authToken');

    if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/resupply/getAllResupply",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        async:true,
        success: function(data) {
            if (data.code === "00"){
                $('#resupplyTable').empty();

                for(let sup of data.content){

                    let resupplyId = sup.resupplyId;
                    let date =  sup.date;
                    let totalValue = sup.totalValue;
                    let totalQty = sup.totalQty;

                    var row = `<tr>
                     <td class="col01">${resupplyId}</td>
                    <td class="col02">${date}</td>
                    <td class="col03">${totalValue}</td>
                    <td class="col04">${totalQty}</td>

                </tr>`;
                    $('#resupplyTable').append(row);

                    let resupplyModel = new ResupplyModel(
                        sup.resupplyId,
                        sup.date,
                        sup.totalValue,
                        sup.totalQty
                    );
                    resupply_db.push(resupplyModel)
                }
            }
        },
        error: function(xhr, exception) {
            alert("Error")
        }
    });

}
