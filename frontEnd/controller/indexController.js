$('#dash-bord').css ('display', 'none');
$('#customer-page').css ('display', 'none');
$('#employee-page').css ('display', 'none');
$('#customer-form').css ('display', 'none');
$('#employee-form').css ('display', 'none');

$('#dash-nav').on('click', () => {
    $('#dash-bord').show();
    $('#customer-page').css ('display', 'none');
    $('#employee-page').css ('display', 'none');
    $('#customer-form').css ('display', 'none');
    $('#employee-form').css ('display', 'none');
});

$('#customer-nav').on('click', () => {
    $('#dash-bord').css ('display', 'none');
    $('#customer-page').show();
    $('#customer-form').css ('display', 'none');
    $('#employee-form').css ('display', 'none');
    $('#employee-page').css ('display', 'none');
});
$('#cut-add').on('click', () => {
    $('#dash-bord').css ('display', 'none');
    $('#customer-page').css ('display', 'none');
    $('#employee-page').css ('display', 'none');
    $('#customer-form').show();
});
$('#employee-nav').on('click', () => {
    $('#dash-bord').css ('display', 'none');
    $('#employee-page').show();
    $('#customer-page').css ('display', 'none');
    $('#customer-form').css ('display', 'none');
    $('#employee-form').css ('display', 'none');
});

$('#emp-add').on('click', () => {
    $('#dash-bord').css ('display', 'none');
    $('#customer-page').css ('display', 'none');
    $('#customer-form').css('display', 'none');
    $('#employee-page').css ('display', 'none');
    $('#employee-form').show();

});


