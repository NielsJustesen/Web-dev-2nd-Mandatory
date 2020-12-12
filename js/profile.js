
$(document).ready(function(){

    $(".removeCartItemBtn").on("click", function(e){
        let id = e.target.offsetParent.parentNode.id;
        window.location.href="profile.php?trackIndex="+id;
    });
    

    $(".songQuantity").on("change", function(e){
        let price = $(".songPrice").html()
        console.log("original price: "+price);
        let quantity = $(".songQuantity").val();
        console.log("qunatity: "+quantity);

        let newPrice = price * quantity;
        console.log("new price: "+newPrice);

        $(".songPrice", {html:newPrice});
    })

    $("#editProlie").on("click", function(e){
        const modal = $("#editProfileModal");
        modal[0].style.display = "block";

        $("#editProfileForm").on("submit", function(e){
            let firstName = $("#editFirstName").val();
            let lastName = $("#editLastName").val();
            let email = $("#editEmail").val();
            let company = $("#editCompany").val();
            let phone = $("#editPhone").val();
            let fax = $("#editFax").val();
            formData = {
                "customerId": customerId,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "company": company,
                "phone": phone,
                "fax": fax
            };
            UpdateRequest(formData);
        })
    })
    $("#editShipping").on("click", function(e){
        const modal = $("#editShippingModal");
        modal[0].style.display = "block";

        $("#editShippingForm").on("submit", function(e){
            let address =$("#editAddress").val();
            let city =$("#editCity").val();
            let state =$("#editState").val();
            let country =$("#editCountry").val();
            let postalCode =$("#editPostalCode").val();
            formData = {
                "customerId": customerId,
                "address": address,
                "city": city,
                "state": state,
                "country": country,
                "postalCode": postalCode
            };
            UpdateRequest(formData);
        })
    })
    $("#editPassword").on("click", function(e){
        const modal = $("#editPasswordModal");
        modal[0].style.display = "block";

        $("#edittPasswordForm").on("submit", function(e){
            password = $("#newPassword").val();
            formData = {
                "customerId": customerId,
                "password": password
            };
            UpdateRequest(formData);
        })
    })

    $(".closeForm").on("click", function(e){
        switch (e.currentTarget.offsetParent.id) {
            case "editProfileModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            case "editShippingModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            case "editPasswordModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            default:
                break;
        }
    })

    function UpdateRequest(formData){
        $.ajax({
            url: "http://localhost/Chinook-Abridged-rest-api/customers",
            type: "PUT",
            data: JSON.stringify(formData)
        })
        .done(function(response){
            alert(response);
        }).fail(function(response){
            alert(response);
        })
    }
});