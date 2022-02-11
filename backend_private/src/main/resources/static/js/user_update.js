function validateGeneral() {
    let errors = 0;
    vaciarValidateGeneral();

    if ($(".validateNameUsuarioResponse").val()==="") {
        errors++;
        $(".validateNameUsuarioResponse").addClass("border border-danger border-2")
        $(".validateNameUsuarioResponse").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $(".validateNameUsuarioResponse").addClass("border border-success border-2")
    }
    if ($(".validateNombre").val()==="") {
        errors++;
        $(".validateNombre").addClass("border border-danger border-2")
        $(".validateNombre").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $(".validateNombre").addClass("border border-success border-2")
    }
    if ($(".validateApellido1").val()==="") {
        errors++;
        $(".validateApellido1").addClass("border border-danger border-2")
        $(".validateApellido1").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $(".validateApellido1").addClass("border border-success border-2")
    }
    if ($(".validateTelefono").val()==="") {
        errors++;
        $(".validateTelefono").addClass("border border-danger border-2")
        $(".validateTelefono").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $(".validateTelefono").addClass("border border-success border-2")
    }
    return errors===0;
}

function vaciarValidateGeneral() {
    $("#validateNameUsuarioResponse").empty();
    $("#validateNombre").empty();
    $("#validateApellido1").empty();
    $("#validateApellido2").empty();
    $("#validateTelefono").empty();
}

function vaciarChangePassword() {
    $(".password_actual").empty();
    $(".password_change").empty();
    $(".password_change_confirm").empty();
}

function vaciarPassword() {
    $(".codigo_email").empty();
    $(".password_change_recuperar").empty();
    $(".password_change_confirm_recuperar").empty();
}

function changepassword() {
    let errors = 0;
    vaciarChangePassword();

    if ($("#password_actual").val()==="") {
        errors++;
        $("#password_actual").addClass("border border-danger border-2")
        $(".password_actual").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $("#password_actual").addClass("border border-success border-2")
    }

    if ($("#password_change").val()==="") {
        errors++;
        $("#password_change").addClass("border border-danger border-2")
        $(".password_change").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $("#password_change").addClass("border border-success border-2")
    }
    if ($("#password_change_confirm").val()==="") {
        errors++;
        $("#password_change_confirm").addClass("border border-danger border-2")
        $(".password_change_confirm").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $("#password_change_confirm").addClass("border border-success border-2")
    }
    return errors===0;
}

function password() {
    let errors = 0;
    vaciarPassword();

    if ($("#codigo_email").val()==="") {
        errors++;
        $("#codigo_email").addClass("border border-danger border-2")
        $(".codigo_email").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $("#codigo_email").addClass("border border-success border-2")
    }

    if ($("#password_change_recuperar").val()==="") {
        errors++;
        $("#password_change_recuperar").addClass("border border-danger border-2")
        $(".password_change_recuperar").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $("#password_change_recuperar").addClass("border border-success border-2")
    }
    if ($("#password_change_confirm_recuperar").val()==="") {
        errors++;
        $("#password_change_confirm_recuperar").addClass("border border-danger border-2")
        $(".password_change_confirm_recuperar").append("<p class='text-danger fw-bold pt-2'>No puede estar vacio</p>");
    } else {
        $("#password_change_confirm_recuperar").addClass("border border-success border-2")
    }
    return errors===0;
}