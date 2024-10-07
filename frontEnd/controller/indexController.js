// Helper function to show one section and hide the rest
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

// Dashboard navigation click handler
$('#dash-nav').on('click', () => showSection('#dash-bord'));

// Customer navigation click handler
$('#customer-nav').on('click', () => showSection('#customer-page'));

// Customer add button click handler
$('#cut-add').on('click', () => showSection('#customer-form'));

// Employee navigation click handler
$('#employee-nav').on('click', () => showSection('#employee-page'));

// Employee add button click handler
$('#emp-add').on('click', () => showSection('#employee-form'));

// Supplier navigation click handler
$('#supplier-nav').on('click', () => showSection('#supplier-save-section'));

// Supplier navigation click handler
$('#item-nav').on('click', () => showSection('#about-item-section'));

// Sale navigation click handler
$('#sale-nav').on('click', () => showSection('#sale-section'));

// resupply navigation click handler
$('#resupply-nav').on('click', () => showSection('#resupply-section'));

$('#sale-his-nav').on('click', () => showSection('#sale-history-section'));
