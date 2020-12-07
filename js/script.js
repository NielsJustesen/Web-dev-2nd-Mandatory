$(document).ready(function(){

    const main = $("main");
     $("#searchBy").on("change", function(e){
        $("#browseResults").remove();
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
                $("<th/>").text("Tracks").appendTo(tableHeaders);
                $("<th/>").text("Albums").appendTo(tableHeaders);


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


    function tracksByArtist(selected, txt){
        removeChildren($("#browseDiv"));
        $("#browseResults").remove();

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
    }

    function albumsByArtist(artistName){
        removeChildren($("#browseDiv"));
        $("#browseResults").remove();

        var resultTable = $("<table/>").attr("id", "browseResults");
        var tableHeaders = $("<tr/>").appendTo(resultTable);

        $("<th/>").text("Artist Name").appendTo(tableHeaders);
        $("<th/>").text("Album Name").appendTo(tableHeaders);
        $("<th/>").text("Tracks").appendTo(tableHeaders);

        $.ajax({
            url: "http://localhost/Chinook-Abridged-rest-api/albums?order=artist&name="+artistName,
            type: "GET"
        }).done(function(response){

            populateAlbumRestultDiv(resultTable, response);
            resultTable.appendTo(main);

        }).fail(function(e){

            console.log("Failed "+e);

        });
    }
     
     




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
            $("<td/>").attr("class", "trackLength").text(str+"min").appendTo(tr);
            $("<td/>").attr("class", "trackPrice").html("&dollar;"+valueOfElement.UnitPrice).appendTo(tr);
            let formTd = $("<td/>").attr("class", "cartSubmitBtn").appendTo(tr);
            //add to cart form
            let form = $("<form/>").attr("method", "POST").attr("action", "profile.php").appendTo(formTd);
            let name = $("<p/>").attr("name", "trackName").attr("value", valueOfElement.Name).appendTo(form);
            name.hidden = true;
            let length = $("<p/>").attr("name", "trackLength").attr("value", str).appendTo(form);
            length.hidden = true;
            let price = $("<p/>").attr("name", "trackPrice").attr("value", valueOfElement.UnitPrice).appendTo(form);
            price.hidden = true;
            $("<input/>").attr("type", "image").attr("alt", "submit").attr("name", "addToCart").attr("src","imgs/cart.png").appendTo(form);

            // document.cookie = "testCookie=John Doe; expires=Mon, 7 Dec 2020 12:00:00 UTC";
            parent.append(tr);
        });
    }

    function populateArtistResultDiv(parent, data){

        $.each(data, function (indexInArray, valueOfElement) { 
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "artistName").text(valueOfElement.Name).appendTo(tr);
            let tracksBtn = $("<td/>").attr("class", "artistTracks").append($("<input/>").attr("type", "image").attr("src","imgs/track.png")).appendTo(tr);
            let albumsbtn = $("<td/>").attr("class", "artistAlbums").append($("<input/>").attr("type", "image").attr("src","imgs/album.png")).appendTo(tr);
            
            tracksBtn.on("click", function(e){
                tracksByArtist("artist", valueOfElement.Name)
            });

            albumsbtn.on("click", function(e){
                albumsByArtist(valueOfElement.Name);
            })
            
            parent.append(tr);
        });
    }

    function populateAlbumRestultDiv(parent, data){
        $.each(data, function (indexInArray, valueOfElement) { 
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "artistName").text(valueOfElement.Name).appendTo(tr);
            $("<td/>").attr("class", "ablumTitle").text(valueOfElement.Title).appendTo(tr);
            let tracksBtn = $("<input/>").attr("type", "image").attr("src","imgs/track.png").appendTo(tr);
            
            tracksBtn.on("click", function(e){
                tracksByArtist("album", valueOfElement.Title);
            })
            
            parent.append(tr);
        });
    }
});