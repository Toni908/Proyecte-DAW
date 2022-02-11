function showSpinner(){
    $(".spinner").css("display","block");
    setTimeout(function (){$("#sendCode").submit()},1500);
}

function showSpinnerRegenerate(){
    $(".spinner").css("display","block");
    setTimeout(function (){$("#regenerateCode").submit()},1500);
}

function showSpinner1(){
    $(".spinner").css("display","block");
    setTimeout(function (){$("#1").submit()},1500);
}