const selectEtiqueta = $("#selectEtiquetas");
const selectEtiquetas = $('#selectEtiquetas');
const createEtiqueta = $("#create_etiqueta");
let numEtiquetas = 7;
let etiquetasAdded = [];
const actualMunicipioLocalidad = $("#localidadMunicipioActual");
const changeMunicipioLocalidad = $("#localidadMunicipioChange");
const municipios = $("#municipio");
const error = $("#error");

function hideMessagesEtiqueta() {
    setTimeout(function (){error.hide()},3500);
    setTimeout(function (){error.hide()},3500);
}
function showMessagesEtiqueta() {
    error.show();
    error.show();
}

function flashMessagesEtiqueta() {
    showMessagesEtiqueta();
    hideMessagesEtiqueta();
}

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
                        $("#etiquetas_box").append("<div onclick='deleteEtiqueta(this)' class='ps-3 pe-3 text-center d-flex flex-row flex-wrap' style='border-radius: 15px; border: lightgrey 1px solid'><input name='etiquetas' class='border-0 text-center' style='border-radius: 15px; border: lightgrey 1px solid; width: 8vw; height: auto' value='" + selectText.val() + "' readonly><div class='align-self-center rounded-circle fw-bold border-0 bg-danger text-white pt-0' style='font-size: 10px; width: 20px; height: 20px'>X</div>");
                        etiquetasAdded.push(selectText.val());
                        numEtiquetas--;
                    } else {
                        error.text(traductions.short);
                        flashMessagesEtiqueta();
                    }
                } else {
                    error.text(traductions.long);
                    flashMessagesEtiqueta();
                }
            } else {
                error.text(traductions.added);
                flashMessagesEtiqueta();
            }
        } else {
            if (isEtiquetaAdded(value)===false) {
                if (value.length<15) {
                    if (value.length>2) {
                        $("#etiquetas_box").append("<div onclick='deleteEtiqueta(this)' class='ps-3 pe-3 text-center d-flex flex-row flex-wrap' style='border-radius: 10px; border: lightgrey 1px solid'><input name='etiquetas' class='border-0 text-center' style='border-radius: 15px; border: lightgrey 1px solid; width: 8vw; height: auto' value='" + value + "' readonly><div class='align-self-center rounded-circle fw-bold border-0 bg-danger text-white pt-0' style='font-size: 10px; width: 20px; height: 20px'>X</div>");
                        etiquetasAdded.push(value);
                        numEtiquetas--;
                    } else {
                        error.text(traductions.short);
                        flashMessagesEtiqueta();
                    }
                } else {
                    error.text(traductions.long);
                    flashMessagesEtiqueta();
                }
            } else {
                error.text(traductions.added);
                flashMessagesEtiqueta();
            }
        }
    } else {
        error.text(traductions.max);
        flashMessagesEtiqueta();
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