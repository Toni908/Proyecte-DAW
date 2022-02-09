$.getJSON("/get/restaurantes/admin/json", function (dataRetaurante) {
    var table = $('#restaurant_table').dataTable({
        data: dataRetaurante,

        columns: [
            {"data": "id_restaurante"},
            {"data": "nombre"},
            {"data": "dies_anticipacion_reservas"},
            {"data": "telefono_restaurante"},
            {
                "data": "validated",
                render: function (data) {
                    if (data === true) {
                        return '                            <div class="form-check form-switch d-flex flex-row justify-content-center p-0 m-0">' +
                            '                                <label class="w-100 d-flex flex-row justify-content-center">' +
                            '                                    <input class="form-check-input m-0 fs-3 validar" type="checkbox" name="validar" checked>' +
                            '                                </label>' +
                            '                            </div>'
                    } else {
                        return '                            <div class="form-check form-switch d-flex flex-row justify-content-center p-0 m-0">' +
                            '                                <label class="w-100 d-flex flex-row justify-content-center">' +
                            '                                    <input class="form-check-input m-0 fs-3 validar" type="checkbox" name="validar">' +
                            '                                </label>' +
                            '                            </div>'
                    }
                }
            },
            {"data": "aforo"},
            {"data": "direccion"},
            {"data": "localidad.nombre_localidad"},
            {"data": "membresia.id_membresia", "defaultContent": "<i>Not set</i>"},
            {"data": "useracount.nombre_usuario"},
            {
                "data": "visible",
                render: function (data) {
                    if (data === true) {
                        return '                            <div class="form-check form-switch d-flex flex-row justify-content-center p-0 m-0">' +
                            '                                <label class="w-100 d-flex flex-row justify-content-center">' +
                            '                                    <input class="form-check-input m-0 fs-3" type="checkbox" name="validado" checked disabled="disabled">' +
                            '                                </label>' +
                            '                            </div>'
                    } else {
                        return '                            <div class="form-check form-switch d-flex flex-row justify-content-center p-0 m-0">' +
                            '                                <label class="w-100 d-flex flex-row justify-content-center">' +
                            '                                    <input class="form-check-input m-0 fs-3" type="checkbox" onchange="this.form.submit()" name="validado" disabled="disabled">' +
                            '                                </label>' +
                            '                            </div>'
                    }
                }
            }
        ]
    });
});

$(document).ready(function() {
    $(".body").hide();
    setTimeout(function () {
        $(".body").show();
        $(".validar").on('click', function () {
            let object = this.closest("tr");
            // let value = this.closest('tr').innerText;
            this.closest('input').name = "validationResponse"
            $("input[name=idRestaurant]").val(object.firstChild.innerText)
            $("#form").submit();
        });
    },1000);
});