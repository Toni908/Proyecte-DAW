setTimeout(function (){$(".message_error").hide()},3500);
setTimeout(function (){$(".message_success").hide()},3500);


function hideMessages() {
    setTimeout(function (){$(".message_error").hide()},3500);
    setTimeout(function (){$(".message_success").hide()},3500);
}
function showMessages() {
    $(".message_error").show();
    $(".message_success").show();
}

function flashMessages() {
    showMessages();
    hideMessages();
}