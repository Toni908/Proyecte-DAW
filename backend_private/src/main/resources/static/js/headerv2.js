
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
    onTop();
    apareceSearchBottom();
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