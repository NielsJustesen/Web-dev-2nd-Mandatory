$(document).ready(function(){

    
    $("#loginBtn").on("submit", function(e){
        e.preventDefault();

        $.ajax({
            url: "http://localhost/Chinook-Abridged-rest-api/customers?email=" + $("#email").val(),
            type: "GET",
        })
        .done(function(data){

            // console.log(data);
            formData = { "customerId": data["CustomerId"], "email": $("#email").val(), "enteredPassword": $("#pwd").val()};
            // console.log(formData);
            $.post("http://localhost/Chinook-Abridged-rest-api/login", formData)
            .done(function (data) {
                console.log(data);
                $("#loggedin").attr("value",data);

            }).fail(function(e){
                console.log("Login failed")
            });
        })
        .fail(function(e){
            console.log("Request Failed")
            console.log(e)
        });
            
    });
});