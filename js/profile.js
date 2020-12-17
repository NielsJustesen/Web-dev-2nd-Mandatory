$(document).ready(function(){

    const baseUrl = "http://chinookabridgedapi-env.eba-nh3f5aui.us-east-1.elasticbeanstalk.com/index.php/";
    const extTracks = "tracks";
    const extArtists = "artists";
    const extAlbums = "albums";
    const extInvoices = "invoices";
    const extInvoiceLines = "invoicelines"
    const extCustomers = "customers"

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
        if(cartItems.length < 1){
            alert("Your cart is empty");
            return;
        }
        const modal = $("#purchaseModal");
        modal[0].style.display = "block";

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
        let id = e.target.id;
        quantity = parseFloat($("#"+id)[0].value);
        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            let index = id.substring(id.length-1,id.length)
            if(i == index){
                item.price = ogPrices[i] * quantity;
                cartItems[i]["quantity"] = quantity;
            }
        }
    })

    $("#invoiceSubmitForm").on("submit", function(e){

        let address =$("#invoiceBillingAddress").val();
        let city =$("#invoiceBillingCity").val();
        let state =$("#invoiceBillingState").val();
        let country =$("#invoiceBillingCountry").val();
        let postalCode =$("#invoiceBillingPostalCode").val();

        let invoiceLines= [];
        for (let i = 0; i < cartItems.length; i++) {
            const track = cartItems[i];
            invoiceLineData = {
                "quantity": parseInt(track["quantity"]),
                "trackId": parseInt(track["trackId"]),
                "unitPrice": parseFloat(ogPrices[i])
            };
            invoiceLines.push(invoiceLineData);
        }
        
        invoiceData = {
            "customerId": parseInt(customerId),
            "billindAddress": address,
            "billingCity": city,
            "billingState": state,
            "billingCountry": country,
            "billingPostalCode": postalCode,
            "total": parseFloat(TotalInvoicePrice(cartItems)),
            "invoiceLines": invoiceLines
        };
        
        $.ajax({
            url: baseUrl+extInvoices,
            type: "POST",
            data: invoiceData
        }).done(function(response){
            alert(JSON.stringify(response));
            // const invoiceID = response.InvoiceId;
            // let async_request= [];
            // let responses= [];
            // let requestBodies= [];

            // for (let i = 0; i < cartItems.length; i++) {
            //     const element = cartItems[i];
            //     invoiceLineData = {
            //         "invoiceId": parseInt(invoiceID),
            //         "quantity": parseInt(element["quantity"]),
            //         "trackId": parseInt(element["trackId"]),
            //         "unitPrice": parseFloat(ogPrices[i])
            //     };
            //     requestBodies.push(invoiceLineData);
            // }

            // for(i in requestBodies)
            // {
            //     async_request.push($.ajax({
            //         url: baseUrl+extInvoiceLines,
            //         method: "POST",
            //         data: requestBodies[i]
            //     }).done(function(response){
            //         responses.push(JSON.stringify(response));
            //     }).fail(function(response){
            //         alert("FAILED TO CREATE INVOICELINE");
            //     }));
            // }

        }).fail(function(){
            alert("FAILED TO CREATE INVOICE");
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
            url: baseUrl+extCustomers,
            type: "PUT",
            data: JSON.stringify(formData)
        })
        .done(function(response){
            alert("Success: " + response);
        }).fail(function(response){
            alert("Failed: " + response);
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
                url: baseUrl+extTracks+"?name="+element.innerText,
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