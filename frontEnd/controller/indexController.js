// Helper function to show one section and hide the rest
import {getCookie} from "./login.js";
import {getAllEmployee} from "./employeeController.js";

import{getAllCustomer} from "./customerController.js";
import {getAllSupplier} from "./supplierController.js";
import {getAllResupply} from "./resupplyController.js";
import {getAllItems} from "./itemController.js";
import {getAllInventory} from "./inventoryController.js";
import {getAllSaleHistory} from "./saleHistoryController.js";

import {loadSupplierId} from "./itemController.js";


function showSection(sectionToShow) {
    const sections = [
        '#dash-bord',
        '#customer-page',
        '#employee-page',
        '#customer-form',
        '#employee-form',
        '#supplier-save-section',
        '#about-item-section',
        '#sale-section',
        '#resupply-section',
        '#sale-history-section'
    ];

    sections.forEach(section => {
        if (section === sectionToShow) {
            $(section).show();
        } else {
            $(section).hide();
        }
    });
}

// Initial state: Show dashboard
showSection('#dash-bord');
//getCookie();

// Dashboard navigation click handler
$('#dash-nav').on('click', () => showSection('#dash-bord'));

// Customer navigation click handler
$('#customer-nav').on('click', () => {
    showSection('#customer-page')
    getAllCustomer();
});

// Customer add button click handler
$('#cut-add').on('click', () => showSection('#customer-form'));

// Employee navigation click handler
$('#employee-nav').on('click', () =>{
    showSection('#employee-page')
    getAllEmployee();
});

// Employee add button click handler
$('#emp-add').on('click', () => showSection('#employee-form'));

// Supplier navigation click handler
$('#supplier-nav').on('click', () => {
    showSection('#supplier-save-section');
    getAllSupplier();
});

// Supplier navigation click handler
$('#item-nav').on('click', () =>{
    showSection('#about-item-section');
    getAllItems();
    getAllInventory();
    loadSupplierId();
});

// Sale navigation click handler
$('#sale-nav').on('click', () =>{
    showSection('#sale-section')
    $('#customer-table-body').empty();
    $('#item-table-body').empty();
    $('#inventory-table-body').empty();

    getAllCustomer();
    getAllItems();
    getAllInventory();
});

// resupply navigation click handler
$('#resupply-nav').on('click', () =>{
    getAllResupply();
    showSection('#resupply-section')
});

$('#sale-his-nav').on('click', () =>{
    showSection('#sale-history-section')
   getAllSaleHistory();
});

