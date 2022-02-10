let restaurants = $(".restaurantes");
let restaurantActive;
let restaurant = "";
let datepicker = $("#datepicker");

let titleTime = $("#titleTime");

let title = $("#title");

$(".datepicker").hide();

const error = $("#error");

const table = $("#table");

const activeRest = $(".activeRest");

error.hide();

const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
};
let currentTime = new Date().toLocaleDateString('en-US', options);

if (restaurants.length!==0) {
    if (activeRest.length!==0) {
        restaurant = activeRest;
        removeRestaurantCSS(restaurant);
        restaurantActive = activeRest.attr('name');
        selectRestaurantCSS(restaurant);
        title.text(restaurant.attr('for'));
    } else {
        restaurant = restaurants.eq(0);
        removeRestaurantCSS(restaurant);
        restaurantActive = restaurants.attr('name')[0];
        selectRestaurantCSS(restaurant);
        title.text(restaurant.attr('for'));
    }

}

// ANIMATION DATE PICKER
$(document).on('click', '.ui-datepicker-next', function () {
    $(".ui-datepicker-title>span").hide().show(500);
    $(".ui-datepicker-calendar").hide('slide', { direction: 'right' }, 500).show('slide', { direction: 'left' }, 500)
})

$(document).on('click', '.ui-datepicker-prev', function () {
    $(".ui-datepicker-title>span").hide().show(500);
    $(".ui-datepicker-calendar").hide('slide', { direction: 'left' }, 500).show('slide', { direction: 'right' }, 500)
})

createDataTable(null);
activeTheFirstIfExist();

function activeTheFirstIfExist() {
    if (restaurantActive !== undefined) {
        var date = new Date(currentTime);
        titleTime.text(reFormatDateLeftToRight(currentTime));
        table.DataTable().destroy();
        $.getJSON("/get/reservas/json/"+restaurantActive+"/"+date, function (data) {
            createDataTable(data);
        });
    } else {
        $("#table").append("<h1 class='title_principal text-center'>No hay restaurantes creados para ver las reservas, <a href='/restaurant/create' class='z-index1 text-success fw-bold'>crea uno ahora</a></h1>")
    }
}

$( function() {
    datepicker.datepicker({
        weekStart: 1,
        todayBtn: "linked",
        daysOfWeekHighlighted: "0,6",
        todayHighlight: true,
        onSelect: function(dateText, inst) {
            var date = new Date(reFormatDate(dateText));
            table.DataTable().destroy();
            titleTime.text(reFormatDateLeftToRight(dateText));
            $.getJSON("/get/reservas/json/" + restaurantActive+"/"+date, function (data) {
                createDataTable(data);
            });
        }
    });
} );
$(".datepicker").datepicker({
    weekStart: 1,
    todayBtn: "linked",
    daysOfWeekHighlighted: "0,6",
    todayHighlight: true,
    onSelect: function(dateText, inst) {
        var date = new Date(reFormatDate(dateText));
        table.DataTable().destroy();
        titleTime.text(reFormatDateLeftToRight(dateText));
        $.getJSON("/get/reservas/json/" + restaurantActive+"/"+date, function (data) {
            createDataTable(data);
        });
    }
});

restaurants.on('click', function () {
    var date = new Date(currentTime);
    table.DataTable().destroy();
    titleTime.text(reFormatDateLeftToRight(currentTime));
    $.getJSON( "/get/reservas/json/"+$(this).attr('name')+"/"+date, function( data ) {
        createDataTable(data);
    });
    datepicker.datepicker('setDate', null);
    restaurantActive = $(this).attr('name');
    removeRestaurantCSS(restaurant);
    restaurant = $(this);
    selectRestaurantCSS(restaurant);
    title.text($(this).attr('for'));
});

function reFormatDate(date) {
    let current = date.split("/");
    return current[2]+"-"+current[0]+"-"+current[1];
}

function reFormatDateLeftToRight(date) {
    let current = date.split("/");
    return current[1]+"-"+current[0]+"-"+current[2];
}

function createDataTable(data) {
    var fecha;
    $.each(data, function (key, object) {
        fecha = new Date(object.fecha);
        object.fecha = formatDate(object)[0]+"-"+getMonthDate(object)+"-"+fecha.getFullYear();
    });
    table.dataTable({
        data: data,
        responsive: {
            details: false
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'print',
                customize: function ( win ) {
                    $(win.document.body)
                        .prepend(
                            '<p style="position:absolute; top:0; left:0; font-size: 50px; opacity: 0.05" >'+title.text()+" del dia "+titleTime.text()+'</p>'
                        );

                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                }
            }
        ],
        columns: [
            {
                "className":      'dt-control displayColumn border-0',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            {"data": "nombre"},
            {"data": "personas"},
            {"data": "telefono", "className" : 'displayColumn'},
            {"data": "Hora", "defaultContent": getHoraDate(fecha)},
            {"data":"correo"}
        ],
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
    });
}

$('#table tbody').on('click', 'td.dt-control', function () {
    var tr = $(this).closest('tr');
    var row = $("#table").DataTable().row(tr);

    if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shown');
    } else {
        row.child(format(row.data())).show();
        tr.addClass('shown');
    }
});

function format ( d ) {
    return '<table cellpadding="6" cellspacing="0" border="0" class="displayColumn">'+
        '<tr>'+
        '<td>Fecha:</td>'+
        '<td>'+d.fecha+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Telefono:</td>'+
        '<td>'+d.telefono+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Lenguaje:</td>'+
        '<td>'+d.lenguaje+'</td>'+
        '</tr>'+
        '</table>';
}

function formatDate(date){
    var getDate = date.fecha.toString().split("-");
    return getDate[2].split("T");
}

function getMonthDate(date) {
    var getDay = date.fecha.toString().split("-");
    return getDay[1];
}

function getHoraDate(hora) {
    var date = new Date(hora);
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}

function selectRestaurantCSS(restaurant) {
    restaurant.css("border","solid black 2px");
    restaurant.css("border-bottom-right-radius","15px");
    restaurant.css("border-top-right-radius","15px");
}

function removeRestaurantCSS(restaurant) {
    restaurant.css("border","solid black 0");
}

$( '#datepickcheck' ).on( 'click', function() {
    if( $(this).is(':checked') ){
        $("#datepicker").hide();
        $(".datepicker").show();
    } else {
        $("#datepicker").show();
        $(".datepicker").hide();
    }
});
if( $("#datepickcheck").is(':checked') ){
    $("#datepicker").hide();
    $(".datepicker").show();
} else {
    $("#datepicker").show();
    $(".datepicker").hide();
}