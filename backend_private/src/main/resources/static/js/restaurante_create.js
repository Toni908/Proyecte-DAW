let selectEtiqueta = $("#selectEtiquetas");
let numEtiquetas = 7;
let etiquetasAdded = [];

let error = $("#error");
let municipios = $("#municipio");
let selectEtiquetas = $('#selectEtiquetas');
let createEtiqueta = $("#create_etiqueta");

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

function searchEtiquetas(etiquetaSearched) {
    $.getJSON( "/get/etiquetas/admin/json", function( data ) {
        let length = 0;
        selectEtiqueta.empty();
        $.each( data, function(key, object) {
            if (object.nombre.includes(etiquetaSearched)) {
                selectEtiqueta.append("<option id='" + object.id_etiqueta + "'>" + object.nombre + "</option>");
                length++;
            }
        });

        if (selectEtiqueta.text()==="") {
            selectEtiquetas.hide();
            $("#create_etiqueta").attr("type","button");
        } else {
            $("#selectEtiquetas").prepend("<option selected value='null'>"+traductions.encontrados+" "+length+" "+traductions.ocurrencias+"</option>");
        }
    });
}

function addEtiqueta(value) {
    let selectText = $("#selectText");
    if (numEtiquetas!==0) {
        if (value == null) {
            if (isEtiquetaAdded(selectText.val())===false) {
                if (selectText.val().length<15) {
                    if (selectText.val().length>2) {
                        $("#etiquetas_box").append("<div onclick='deleteEtiqueta(this)' class='text-center d-flex flex-row flex-wrap' ><i class='bi bi-tag-fill'><input name='etiquetas' class='border-0 text-center' style='background-color: lightgray; width: 8vw; height: auto' value='" + selectText.val() + "' readonly><input class='align-self-center rounded-circle fw-bold border-0 bg-danger text-white pt-0' style='font-size: 10px; width: 20px; height: 20px' type='button' value='X'></div>");
                        etiquetasAdded.push(selectText.val());
                        numEtiquetas--;
                    } else {
                        error.text(traductions.short);
                        error.show();
                        setTimeout(function() {$("#error").hide()}, 1200);
                    }
                } else {
                    error.text(traductions.long);
                    error.show();
                    setTimeout(function() {$("#error").hide()}, 1200);
                }
            } else {
                error.text(traductions.added);
                error.show();
                setTimeout(function() {$("#error").hide()}, 1200);
            }
        } else {
            if (isEtiquetaAdded(value)===false) {
                if (value.length<15) {
                    if (value.length>2) {
                        $("#etiquetas_box").append("<div onclick='deleteEtiqueta(this)' class='text-center d-flex flex-row flex-wrap'><i class='bi bi-tag-fill'></i><input name='etiquetas' class='border-0 text-center' style='background-color: lightgray; width: 8vw; height: auto' value='" + value + "' readonly><input class='align-self-center rounded-circle fw-bold border-0 bg-danger text-white pt-0' style='font-size: 10px; width: 20px; height: 20px' type='button' value='X'></div>");
                        etiquetasAdded.push(value);
                        numEtiquetas--;
                    } else {
                        error.text(traductions.short);
                        error.show();
                        setTimeout(function () {
                            $("#error").hide()
                        }, 1200);
                    }
                } else {
                    error.text(traductions.long);
                    error.show();
                    setTimeout(function() {$("#error").hide()}, 1200);
                }
            } else {
                error.text(traductions.added);
                error.show();
                setTimeout(function() {$("#error").hide()}, 1200);
            }
        }
    } else {
        error.text(traductions.max);
        error.show();
        setTimeout(function() {$("#error").hide()}, 1200);
    }
}

function deleteEtiqueta(etiqueta) {
    etiquetasAdded = etiquetasAdded.filter(value => value !== etiqueta.firstChild.value);
    etiqueta.remove();
    numEtiquetas++;
}

function isEtiquetaAdded(value) {
    for (let i = 0; i < etiquetasAdded.length; i++) {
        if (etiquetasAdded[i] === value) {
            return true;
        }
    }
    return false;
}

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
    $("#localidad").append("<option value=\"\">"+traductions.selectM+"</option>")
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