// Cambios con el buscador pill
let localidad = $(".localidad");
let llegada = $(".llegada");
let salida = $(".salida");
let etiqueta = $(".etiqueta");

let separator1 = $(".separator1");
let separator2 = $(".separator2");
let separator3 = $(".separator3");

localidad.hover(function () {
    separator1.css("visibility","hidden");
});
localidad.mouseleave(function () {
    separator1.css("visibility","visible");
});

llegada.hover(function () {
    separator1.css("visibility","hidden");
    separator2.css("visibility","hidden");
});
llegada.mouseleave(function () {
    separator1.css("visibility","visible");
    separator2.css("visibility","visible");
});

salida.hover(function () {
    separator2.css("visibility","hidden");
    separator3.css("visibility","hidden");
});
salida.mouseleave(function () {
    separator2.css("visibility","visible");
    separator3.css("visibility","visible");
});

etiqueta.hover(function () {
    separator3.css("visibility","hidden");
});
etiqueta.mouseleave(function () {
    separator3.css("visibility","visible");
});

//Changes on header variables
let header = $("#header2");
let headerItems1 = $("#header2 form .bi");
let headerItems2 = $("#navbar-button-header");
let headerItems3 = $("#navbarContent a");
let logoHeader1 = $("#logoHeader1");
let logoHeader2 = $("#logoHeader2");

let buscadorHeader = $("#buscadorHeader");
let navbarContent = $("#navbarContent");
let buscadorHeaderTop1 = $("#buscadorHeaderTop");

window.onload = function () {
    if ($(window).scrollTop() < 40) {
        onTop();
        apareceSearchBottom();
    } else {
        onScrollHeader();
        desapareceSearchBottom();
    }
}
window.onscroll = function() {
    var distanceScrolled = document.documentElement.scrollTop;
    if (distanceScrolled < 40) {
        onTop();
        apareceSearchBottom();
    } else {
        onScrollHeader();
        desapareceSearchBottom();
    }
}

// Buscador header cambio de colores
function onTop() {
    header.addClass("nav-header-bg-1");
    header.removeClass("nav-header-bg-2");
    headerItems1.addClass("nav-header-text-2");
    headerItems1.removeClass("nav-header-text-1");
    headerItems2.addClass("navbar-toggler-t2");
    headerItems2.removeClass("navbar-toggler-t1");
    headerItems3.addClass("nav-header-text-2");
    headerItems3.removeClass("nav-header-text-1");
    logoHeader1.css("display","block");
    logoHeader2.css("display","none");
}
function onScrollHeader() {
    header.addClass("nav-header-bg-2");
    header.removeClass("nav-header-bg-1");
    headerItems1.addClass("nav-header-text-1");
    headerItems1.removeClass("nav-header-text-2");
    headerItems2.addClass("navbar-toggler-t1");
    headerItems2.removeClass("navbar-toggler-t2");
    headerItems3.addClass("nav-header-text-1");
    headerItems3.removeClass("nav-header-text-2");
    logoHeader1.css("display","none");
    logoHeader2.css("display","block");
}

// Buscador header arriba o abajo
function apareceSearchBottom() {
    buscadorHeader.addClass("d-xl-flex");
    navbarContent.removeClass("d-none");
    buscadorHeaderTop1.removeClass("d-xl-flex");
}
function desapareceSearchBottom() {
    buscadorHeader.removeClass("d-xl-flex");
    navbarContent.addClass("d-none");
    buscadorHeaderTop1.addClass("d-xl-flex");
}

//Modal hora
var hora = $("#horas");
var minutos = $("#minutos");

for (let i = 0; i < 24; i++) {
    hora.append("<option value='"+i+"'>"+i+"</option>")
}
for (let i = 0; i < 60; i++) {
    minutos.append("<option value='"+i+"'>"+i+"</option>")
}


function openSection(section) {
    let sectionType;
    let sectionHeader = $(".sectionHeader");
    switch (section) {
        case 1:
            sectionType = $("#localizacion");
            break;
        case 2:
            sectionType = $("#hora");
            break;
        case 3:
            sectionType = $("#dia");
            break;
        case 4:
            sectionType = $("#etiquetas");
            break;
    }
    for (let i = 1; i-1 < sectionHeader.length; i++) {
        closeSection(i);
    }
    if (!sectionType.hasClass("d-flex")) {
        sectionType.removeClass("d-none").addClass("d-flex").addClass("fadeIn");
        setTimeout(function () {sectionType.removeClass("fadeIn")}, 1000);
    }
}
function closeSection(section) {
    let sectionType;
    switch (section) {
        default:
            sectionType = $("#localizacion");
            break;
        case 2:
            sectionType = $("#hora");
            break;
        case 3:
            sectionType = $("#dia");
            break;
        case 4:
            sectionType = $("#etiquetas");
            break;
    }
    if (!sectionType.hasClass("d-none")) {
        sectionType.addClass("fadeOut");
        setTimeout(function () {sectionType.removeClass("d-flex").addClass("d-none")}, 900);
        setTimeout(function () {sectionType.removeClass("fadeOut")}, 900);
    }
}