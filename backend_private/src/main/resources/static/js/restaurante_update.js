// VARIABLES Y COSAS QUE TIENEN QUE PASAR AL PRINCIPIO DE CARGAR LA PAGINA

const selectEtiqueta = $("#selectEtiquetas");
let numEtiquetas = 7;
let etiquetasAdded = [];
getEtiquetasGenerated();

const actualMunicipioLocalidad = $("#localidadMunicipioActual");
const changeMunicipioLocalidad = $("#localidadMunicipioChange");
changeMunicipioLocalidad.hide();

const municipios = $("#municipio");
hideLocalidad();
municipios.show();

$("#hacerseMiembro").hide();

const error = $("#error");

error.hide();

const selectEtiquetas = $('#selectEtiquetas');
const createEtiqueta = $("#create_etiqueta");

selectEtiqueta.append("<option selected><-- Buscador</option>");
createEtiqueta.attr("type","hidden");
selectEtiqueta.show();

// ETIQUETAS

$('#selectText').on('input',function(){
    createEtiqueta.attr("type","hidden");
    selectEtiquetas.show();
    searchEtiquetas($("#selectText").val());
});

selectEtiquetas.on('change', function () {
    let valueSelected = this.value;
    addEtiqueta(valueSelected)
});

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
            $("#selectEtiquetas").prepend("<option selected value='null'>Find "+length+" occurences</option>");
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
                        $("#etiquetas_box").append(getEtiquetaHTML(selectText.val()));
                        etiquetasAdded.push(selectText.val());
                        numEtiquetas--;
                    } else {
                        error.text("Etiqueta too short");
                        error.show();
                        setTimeout(function() {$("#error").hide()}, 1200);
                    }
                } else {
                    error.text("Etiqueta too long");
                    error.show();
                    setTimeout(function() {$("#error").hide()}, 1200);
                }
            } else {
                error.text("Etiqueta already added");
                error.show();
                setTimeout(function() {$("#error").hide()}, 1200);
            }
        } else {
            if (isEtiquetaAdded(value)===false) {
                if (value.length<15) {
                    if (value.length>2) {
                        $("#etiquetas_box").append(getEtiquetaHTML(value));
                        etiquetasAdded.push(value);
                        numEtiquetas--;
                    } else {
                        error.text("Etiqueta too short");
                        error.show();
                        setTimeout(function () {
                            $("#error").hide()
                        }, 1200);
                    }
                } else {
                    error.text("Etiqueta too long");
                    error.show();
                    setTimeout(function() {$("#error").hide()}, 1200);
                }
            } else {
                error.text("Etiqueta already added");
                error.show();
                setTimeout(function() {$("#error").hide()}, 1200);
            }
        }
    } else {
        error.text("Max length is 7 for etiquetas");
        error.show();
        setTimeout(function() {$("#error").hide()}, 1200);
    }
}

function getEtiquetaHTML(value) {
    return "" +
        "<div class=\"border border-2 w-auto\" style=\"border-color: #808080;border-radius: 15px\" onclick='deleteEtiqueta(this)'>" +
        "<i class='bi bi-tag ps-2'></i>" +
        "<label class=\"w-auto\">" +
        "<input name='etiquetas' class='border-0 ps-2' style=\"border-radius: 15px;\" value='"+value+"' readonly/>" +
        "</label>" +
        "</div>";
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
function getEtiquetasGenerated() {
    const etiquetas = $("input[name='etiquetas']");
    for (let i = 0; i < etiquetas.length; i++) {
        etiquetasAdded.push(etiquetas.eq(i).val())
    }
}

$('#changeLocalidad').on( 'click', function() {
    if( $(this).is(':checked') ){
        changeMunicipioLocalidad.show();
        actualMunicipioLocalidad.hide();
        actualMunicipioLocalidad.find("input[type=text]").disable = true;
        changeMunicipioLocalidad.find("input[type=text]").disable = false;

        $.getJSON("/get/municipios/admin/json", function (data) {
            municipios.empty();
            $.each(data, function (key, object) {
                $("#municipio").append("<option value='" + key + "'>" + object.nombre_municipio + "</option>")
            });
            municipios.prepend("<option value='' selected>-- Municipios --</option>");
        });
    } else {
        changeMunicipioLocalidad.hide();
        actualMunicipioLocalidad.show();
        actualMunicipioLocalidad.find("input[type=text]").disable = false;
        changeMunicipioLocalidad.find("input[type=text]").disable = true;
    }
});

// MUNICIPIO Y LOCALIDADES

municipios.on('change', function () {
    $("#localidad").show();
    showLocalidades();
});

function showLocalidades() {
    let municipioSelected = $("#municipio option:selected").text();

    if (municipioSelected!=="-- Municipios --") {
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
$( '#checkMiembro' ).on( 'click', function() {
    if( $(this).is(':checked') ){
        $("#hacerseMiembro").show();
    } else {
        $("#hacerseMiembro").hide();
    }
});

function hideLocalidad() {
    $("#localidad").empty();
    $("#localidad").append("<option value=\"\"><-Seleciona antes un Municipio</option>")
}

// VALIDATIONS

function checkNamePattern(){
    const re = /^[A-Za-z][a-z]+(?:[ ]+[A-Za-z][a-z]+)*$/;
    return re.test($("#nombre").val());
}

function vaciarValidateGeneral() {
    $("#validateNameResponse").empty();
    $("#validateTelefonoResponse").empty();
    $("#validateDiasAnticipacionResponse").empty();
    $("#validateLocalidadResponse").empty();
    $("#insertLocalidad input[name=myLocalidad]").remove();
}

function validateGeneral() {
    let errors = 0;
    vaciarValidateGeneral();
    if ($("#nombre").val()==null) {
        errors++;
    }
    if (!checkNamePattern()) {
        errors++;
        $(".validateNameResponse").addClass("border border-danger border-2");
        $("#validateNameResponse").append("<p class='text-danger fw-bold pt-2'>El nombre no puede contener numberos y tiene que ser minuscula menos la primera letra</p>");
    } else {
        $(".validateNameResponse").addClass("border border-success border-2")
    }

    if (!Number.isInteger(parseInt($("#dies_anticipacion_reservas").val()))) {
        errors++;
        $(".validateDiasAnticipacionResponse").addClass("border border-danger border-2");
        $("#validateDiasAnticipacionResponse").append("<p class='text-danger fw-bold pt-2'>Tiene que ser un numero</p>");
    } else {
        $(".validateDiasAnticipacionResponse").addClass("border border-success border-2");
    }

    if ($("#telefono_restaurante").val()==="") {
        errors++;
        $(".validateTelefonoResponse").addClass("border border-danger border-2")
        $("#validateTelefonoResponse").append("<p class='text-danger fw-bold pt-2'>No has selecionado ningun telefono</p>");
    } else {
        $(".validateTelefonoResponse").addClass("border border-success border-2")
    }

    if( $("#checkMiembro").is(':checked') ){
        if ($("#localidad option:selected").text()==="<-Seleciona antes un Municipio") {
            errors++;
            $(".validateLocalidadResponse").addClass("border border-danger border-2")
            $("#validateLocalidadResponse").append("<p class='text-danger fw-bold pt-2'>No has selecionado ninguna localidad</p>");
        } else {
            $(".validateLocalidadResponse").addClass("border border-success border-2")
        }
    }
    $("#myLocalidadChanged").val($("#localidad option:selected").text());

    return errors===0;
}
function validateEtiquetas() {
    return etiquetasAdded !== null;
}

function validateImages() {
    const matches = $("#inputSubmitImages").find('input[type="checkbox"]:not(:checked)');
    for (let i = 0; i < matches.length; i++) {
        matches.get(i).disable = "disabled";
        console.log(matches.get(i))
    }
    return true;
}


// GOOGLE MAPS
var latitud = $("#latitud");
var longitud = $("#longitud");
// GOOGLE MAPS

myMap();
function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(latitud.val(), longitud.val()),
        zoom:10,
    };

    var map = new google.maps.Map(document.getElementById("miGoogleMap"),mapProp);

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud.val(), longitud.val()),
        map: map
    });

    var marker;

    function placeMarker(location) {
        if ( marker ) {
            marker.setPosition(location);
            latitud.val(location.lat().toFixed(10));
            longitud.val(location.lng().toFixed(10));
        } else {
            marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
    }

    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}