$(document).ready(function(){

     $("#searchBy").on("change", function(e){
        $("#browseResults").remove();
        const main = $("main");
        switch ($("#searchBy").val()) {
            
            case "track":
                removeChildren($("#browseDiv"));
                var browse = $("<div/>").attr("id", "browseDiv").appendTo(main);
                $("<span/>").text("Search tracks from: ").appendTo(browse).append("<br>");
                var selector = $("<select/>").attr("id", "order");
                $("<option/>").attr("value","artist").text("Artist").appendTo(selector);
                $("<option/>").attr("value","album").text("Album").appendTo(selector);
                $("<option/>").attr("value","composer").text("Composer").appendTo(selector);
                selector.appendTo(browse);
                var txtInput = $("<input/>").attr("type", "text").attr("id", "searchBy").appendTo(browse);
                const btnSearchTrack = $("<input/>").attr("type", "button").attr("id", "searchBtn").attr("value", "Search").appendTo(browse);
                $(btnSearchTrack).on("click", function(e){
                    $("#browseResults").remove();
                    
                    let selected = selector.val();
                    let txt = txtInput.val();

                    let resultTable = $("<table/>").attr("id", "browseResults");
                    let tableHeaders = $("<tr/>").appendTo(resultTable);
                    $("<th/>").text("Name").appendTo(tableHeaders);
                    $("<th/>").text("Length").appendTo(tableHeaders);
                    $("<th/>").text("Price").appendTo(tableHeaders);
                    $("<th/>").text("Add to cart").appendTo(tableHeaders);
                 

                   $.ajax({
                       url: "http://localhost/Chinook-Abridged-rest-api/tracks?order="+selected+"&name="+txt,
                       type: "GET"
                    }).done(function(response){

                        populateTrackResultDiv(resultTable, response);
                        resultTable.appendTo(main);

                    }).fail(function(e){

                        console.log("Failed "+e);

                    });
                 });
                break;
            case "artist":

                removeChildren($("#browseDiv"));
                $("#browseResults").remove();

                var resultTable = $("<table/>").attr("id", "browseResults");
                var tableHeaders = $("<tr/>").appendTo(resultTable);
                $("<th/>").text("Artist Name").appendTo(tableHeaders);

                $.ajax({
                    url: "http://localhost/Chinook-Abridged-rest-api/artists",
                    type: "GET"
                }).done(function(response){

                    populateArtistResultDiv(resultTable, response);
                    resultTable.appendTo(main);

                }).fail(function(e){

                    console.log("Failed "+e);

                });
                break;
            case "album":
                removeChildren($("#browseDiv"));
                $("#browseResults").remove();
                
                var resultTable = $("<table/>").attr("id", "browseResults");
                var tableHeaders = $("<tr/>").appendTo(resultTable);

                $("<th/>").text("Artist Name").appendTo(tableHeaders);
                $("<th/>").text("Album Name").appendTo(tableHeaders);
                $("<th/>").text("Browse").appendTo(tableHeaders);

                $.ajax({
                    url: "http://localhost/Chinook-Abridged-rest-api/albums",
                    type: "GET"
                }).done(function(response){

                    populateAlbumRestultDiv(resultTable, response);
                    resultTable.appendTo(main);

                }).fail(function(e){

                    console.log("Failed "+e);

                });
                break;
            default:
                browseDiv.children.show();
                break;
        }
     });
     
     




     function removeChildren(parent){
        for (let i = parent.children.length - 1; i >= 0; i--) {
            parent.remove(parent.children[i]);
         }
     }

    function populateTrackResultDiv(parent, data){
        $.each(data, function (indexInArray, valueOfElement) { 

            let minLength = valueOfElement.Milliseconds / 60000;
            let str = String(minLength).substr(0,4);
            
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "trackName").text(valueOfElement.Name).appendTo(tr);
            $("<td/>").attr("class", "trackLength").text(str+"m").appendTo(tr);
            $("<td/>").attr("class", "trackPrice").html("&dollar;"+valueOfElement.UnitPrice).appendTo(tr);
            $("<input/>").attr("type", "image").attr("class", "addToCart").attr("src","imgs/cart.png").appendTo(tr);
            parent.append(tr);
        });
    }

    function populateArtistResultDiv(parent, data){

        $.each(data, function (indexInArray, valueOfElement) { 
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "artistName").text(valueOfElement.Name).appendTo(tr);
            $("<input/>").attr("type", "button").attr("value","Tracks").appendTo(tr);
            $("<input/>").attr("type", "button").attr("value","Albums").appendTo(tr);
            parent.append(tr);
        });
    }

    function populateAlbumRestultDiv(parent, data){
        $.each(data, function (indexInArray, valueOfElement) { 
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "artistName").text(valueOfElement.Name).appendTo(tr);
            $("<td/>").attr("class", "ablumTitle").text(valueOfElement.title).appendTo(tr);
            $("<input/>").attr("type", "button").attr("value","Tracks").appendTo(tr);
            parent.append(tr);
        });
    }
});