$(document).ready(function(){

    $("#signupBtn").on("submit", function(e){
        alert("called submit");
        // if(PasswordMatch($("#passwordtxt").val(), $("#confirmpasswordtxt"))){
            const data = $("#signupForm").seraialize();
            alert(data);
            $.ajax({
                url: "http://localhost/Chinook-Abridged-rest-api/customers",
                type: "POST",
                data
            })
            .done(function(response){
                alert(response + data);
                alert("User registered successfully!")
            })
            .fail(function(e){
                alert("User was not registered!")

                console.log(e)
            });
        // }else{
        //     alert("Passwords don't match");
        // }

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