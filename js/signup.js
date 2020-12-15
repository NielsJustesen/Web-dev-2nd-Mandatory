$(document).ready(function(){

    const baseUrl = "http://chinookabridgedapi-env.eba-nh3f5aui.us-east-1.elasticbeanstalk.com/index.php/";
    const extCustomers = "customers";
    $("#signupForm").on("submit", function(e){
        // e.preventDefault();
        const formData = $("#signupForm").serialize();
        $.ajax({
            url: baseUrl+extCustomers,//"http://localhost/Chinook-Abridged-rest-api/customers",
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