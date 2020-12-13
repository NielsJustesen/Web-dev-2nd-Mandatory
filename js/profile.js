$(document).ready(function(){

    const table = $("#invoiceCartTable");
    const customerId = $("#customerId").text();
    var cartItems = [];
    var ogPrices = [];
    SetCart();

    //Return the correct Id of the song that is to be removed
    $(".removeCartItemBtn").on("click", function(e){

        let id = e.target.offsetParent.parentNode.id;
        window.location.href="profile.php?trackIndex="+id;

    });

    $("#purchaseBtn").on("click", function(e){
        
        const modal = $("#purchaseModal");
        modal[0].style.display = "block";
        console.log("Total price: " + TotalInvoicePrice(cartItems));
        console.log(cartItems);

        const table = $("<table/>", {id:"invoiceCartTable"});
        const tHeaders =$("<tr/>");
        const thName = $("<th/>", {text:"Name"});
        const thPrice = $("<th/>", {text:"Price"});
        const thQuantity = $("<th/>", {text:"Quantity"});
        table.append(tHeaders).append(thName).append(thPrice).append(thQuantity);
        for (let i = 0; i < cartItems.length; i++) {
            const newRow = $("<tr/>");
            const name = $("<td/>", {text:cartItems[i]["name"]});
            const price = $("<td/>", {text:cartItems[i]["price"]})
            const quant = $("<td/>", {text:cartItems[i]["quantity"]})
            newRow.append(name).append(price).append(quant);
            table.append(newRow);
        }

        const invoiceDiv = $("<div/>", {class:"totalPrice"});
        const label = $("<p/>", {id:"invoicePriceTxt", text:"Total Price:"});
        const price = $("<p/>", {id:"invoicePrice", text:TotalInvoicePrice(cartItems)});
        invoiceDiv.append(label).append(price);
        
        $("#invoiceCart").append(table).append(invoiceDiv);

        $("#invoicePrice").text(TotalInvoicePrice(cartItems));
        $("#cancelInvoiceBtn").on("click", function(e){
            modal[0].style.display = "none";
            RemoveChildren(table);
            invoiceDiv.remove();
        })
    })
    

    $(".songQuantInput").on("change", function(e){
        // let id = e.target.offsetParent.parentNode.id;
        let id = e.target.id;
        quantity = parseFloat($("#"+id)[0].value);
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            let index = id.substring(id.length-1,id.length)
            if(i == index){
                item.price = ogPrices[i] * quantity;
                // quantities.push([item.name, item.price, quantity]);
                cartItems[i]["quantity"] = quantity;
                // console.log(item.price)
            }
        }
    })

    $("#invoiceSubmitForm").on("submit", function(e){

        let address =$("#invoiceBillingAddress").val();
        let city =$("#invoiceBillingCity").val();
        let state =$("#invoiceBillingState").val();
        let country =$("#invoiceBillingCountry").val();
        let postalCode =$("#invoiceBillingPostalCode").val();
        formData = {
            "customerId": customerId,
            "billingAddress": address,
            "billingCity": city,
            "billingState": state,
            "billingCountry": country,
            "billingPostalCode": postalCode,
            "total": TotalInvoicePrice(cartItems)
        };

        alert(JSON.stringify(formData));
        $.ajax({
            url: "http://localhost/Chinook-Abridged-rest-api/invoices",
            type: "POST"
        }).done(function(response){

        }).fail(function(response){

        });
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
        let cart = $(".cartRow");
        let songNames = $(".songName");

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
                item.trackId = response["TrackId"];
                ogPrices.push(response["UnitPrice"]);
                item.quantity = 1;
            }).fail(function(response){
                console.log("failed" + response)
            })

        }

        console.log(cartItems)
        // console.log(ogPrices)
    }

    function TotalInvoicePrice(array){
        total = 0.0;
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            total = total + element.price;
        }
        return total.toFixed(2);
    }

    function RemoveChildren(parent){
        for (let i = parent.children.length - 1; i >= 0; i--) {
            parent.remove(parent.children[i]);
            }
        }
});