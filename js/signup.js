$(document).ready(function(){

    $("#signupForm").on("submit", function(e){
        // e.preventDefault();
        const formData = $("#signupForm").serialize();
        $.ajax({
            url: "http://localhost/Chinook-Abridged-rest-api/customers",
            type: "POST",
            data: formData
        })
        .done(function(response){
            alert(JSON.stringify(response));
        })
        .fail(function(e){
            alert("User was not registered!")
        });

    });
});