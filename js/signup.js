$(document).ready(function(){

    $("#signupForm").on("submit", function(e){
        // e.preventDefault();
        const formData = $("#signupForm").serialize();
        alert(formData);
        $.ajax({
            url: "http://localhost/Chinook-Abridged-rest-api/customers",
            type: "POST",
            data: formData
        })
        .done(function(response){
            alert(response);
        })
        .fail(function(e){
            alert("User was not registered!")
        });

    });


    function PasswordMatch(pwd, conPwd){
        if(pwd === conPwd){
            return true;
        }
        else{
            return false;
        }
    }
   
});