$(document).scroll(function() {
    var value=$(document).scrollTop();

    if ( value < 220 ) {
        $(".float-info").css("position","absolute").css("left","0").css("top","150px")
    } else {
        $(".float-info").css("position","fixed").css("left","0").css("top","0")
    }
});