$(document).ready(function(){

    $(".removeCartItemBtn").on("click", function(e){
        var parent = e.target.offsetParent.parentNode;
        parent.remove();
    });

});