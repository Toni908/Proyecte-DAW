error.hide();

selectEtiqueta.append("<option selected>"+traductions.buscador+"</option>");
createEtiqueta.attr("type","hidden");
selectEtiqueta.show();

$('#selectText').on('input',function(){
    createEtiqueta.attr("type","hidden");
    selectEtiquetas.show();
    searchEtiquetas($("#selectText").val());
});

selectEtiquetas.on('change', function () {
    let valueSelected = this.value;
    addEtiqueta(valueSelected)
});

hideLocalidad();
municipios.show();

$.getJSON("/get/municipios/admin/json", function (data) {
    municipios.empty();
    $.each(data, function (key, object) {
        $("#municipio").append("<option value='" + key + "'>" + object.nombre_municipio + "</option>")
    });
    municipios.prepend("<option value='' selected>"+traductions.municipality+"</option>");
});

// MUNICIPIO Y LOCALIDADES

municipios.on('change', function () {
    $("#localidadText").show();
    showLocalidades();
});

function showLocalidades() {
    let municipioSelected = $("#municipio option:selected").text();

    if (municipioSelected!==traductions.municipality) {
        $.getJSON("/get/localidades/admin/json", function (dataLocalidad) {
            $("#localidad").empty();
            $.each(dataLocalidad, function (key, object) {
                if (object.nombre_municipio.nombre_municipio === municipioSelected) {
                    $("#localidad").append("<option value='" + key + "'>" + object.nombre_localidad + "</option>")
                }
            });
        });
    } else {
        hideLocalidad();
    }
}

function hideLocalidad() {
    $("#localidad").empty();
    $("#localidad").append("<option value=\"XX99\">"+traductions.selectM+"</option>")
}

function validate() {
    let errors = 0;
    if ($("#nombre").val()==null) {
        errors++;
    }
    if (!checkNamePattern()) {
        errors++;
        $(".validateNameResponse").addClass("border border-danger border-2")
        $("#validateNameResponse").append("<p class='text-danger fw-bold pt-2'>"+traductions.formName+"</p>");
    } else {
        $(".validateNameResponse").addClass("border border-success border-2")
    }
    if ($("#telefono_restaurante").val()==="0") {
        errors++;
        $(".validateTelefonoResponse").addClass("border border-danger border-2")
        $("#validateTelefonoResponse").append("<p class='text-danger fw-bold pt-2'>"+traductions.formPhone+"</p>");
    } else {
        $(".validateTelefonoResponse").addClass("border border-success border-2")
    }
    if ($("#localidad option:selected").text()==="<-Seleciona antes un Municipio") {
        errors++;
        $(".validateLocalidadResponse").addClass("border border-danger border-2")
        $("#validateLocalidadResponse").append("<p class='text-danger fw-bold pt-2'>"+traductions.formLocation+"</p>");
    } else {
        $(".validateLocalidadResponse").addClass("border border-success border-2")
    }
    if ($("#image").val()==="") {
        errors++;
        $(".validateImagenResponse").addClass("border border-danger border-2")
        $("#validateImagenResponse").append("<p class='text-danger fw-bold pt-2'>"+traductions.formImage+"</p>");
    } else {
        $(".validateImagenResponse").addClass("border border-success border-2")
    }
    if ($("input[name=etiquetas]").length===0) {
        errors++;
        $(".validateEtiquetasResponse").addClass("border border-danger border-2")
        $("#validateEtiquetasResponse").append("<p class='text-danger fw-bold pt-2 text-center w-100'>"+traductions.formTag+"</p>");
    } else {
        $(".validateEtiquetasResponse").addClass("border border-success border-2")
    }
    if ($("#direccion").val()==="") {
        errors++;
        $(".validateDireccion").addClass("border border-danger border-2")
        $("#validateDireccion").append("<p class='text-danger fw-bold pt-2 text-center w-100'>"+traductions.formAddress+"</p>");
    } else {
        $(".validateDireccion").addClass("border border-success border-2")
    }
    if ($("#aforo").val()==="" || $("#aforo").val()===0) {
        errors++;
        $(".validateAforo").addClass("border border-danger border-2")
        $("#validateAforo").append("<p class='text-danger fw-bold pt-2 text-center w-100'>"+traductions.formCapacity+"</p>");
    } else {
        $(".validateAforo").addClass("border border-success border-2")
    }

    // INSERT GOOGLE MAP MARK
    if (latitud.val()==null || longitud.val()==null) {
        errors++;
        $("#miGoogleMap").addClass("border border-danger border-2")
        $(".googleMaps").append("<p class='text-danger fw-bold pt-2 text-center w-100'>"+traductions.formMap+"</p>");
    }
    return errors===0;
}
function checkNamePattern(){
    var re = /^[A-Za-z][a-z]+(?:[ ]+[A-Za-z][a-z]+)*$/;
    return re.test($("#nombre").val());
}

var latitud = $("#latitud");
var longitud = $("#longitud");
// GOOGLE MAPS

$(document).ready(function() {
    var mapProp= {
        center:new google.maps.LatLng(39.59939, 2.98024),
        zoom:10,
    };

    var map = new google.maps.Map(document.getElementById("miGoogleMap"),mapProp);

    var marker;

    function placeMarker(location) {
        if ( marker ) {
            marker.setPosition(location);
        } else {
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
        latitud.val(location.lat());
        longitud.val(location.lng());
    }

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
});