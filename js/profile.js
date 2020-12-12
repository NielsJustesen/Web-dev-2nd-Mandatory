
$(document).ready(function(){

    var totalPrice = $("#invoicePrice").text();
    var cartItems = [];
    var ogPrices = [];
    SetCart();
    
    $(".removeCartItemBtn").on("click", function(e){
        let id = e.target.offsetParent.parentNode.id;
        window.location.href="profile.php?trackIndex="+id;
    });

    $("#purchaseBtn").on("click", function(e){
        console.log("Total price: " + TotalInvoicePrice(cartItems));
    })
    

    $(".songQuantInput").on("change", function(e){
        let id = e.target.offsetParent.parentNode.id;
        quantity = parseFloat($("#songIndex"+id)[0].value);
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            if(i == id){
                item.price = ogPrices[i] * quantity;
            }
        }
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

    function SetCart(){
        cart = $(".cartRow");
        songNames = $(".songName");

       

        for (let i = 0; i < cart.length; i++) {
            let cartItem = {};
            cartItems.push(cartItem);
        }

        for (let i = 0; i < songNames.length; i++) {
            const element = songNames[i];
            let name = element.innerText;
                const item = cartItems[i];
                item.name = name;

            $.ajax({
                url: "http://localhost/Chinook-Abridged-rest-api/tracks?name="+element.innerText,
                type: "GET"
            }).done(function(response){
                item.price = parseFloat(response["UnitPrice"]);
                ogPrices.push(response["UnitPrice"]);
            }).fail(function(response){
                console.log("failed" + response)
            })

        }
    }

    function TotalInvoicePrice(array){
        total = 0.0;
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            total = total + element.price;
        }
        return total;
    }
});