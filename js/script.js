$(document).ready(function(){

    const main = $("main");
    const baseUrl = "http://chinookabridgedapi-env.eba-nh3f5aui.us-east-1.elasticbeanstalk.com/index.php/";
    const extTracks = "tracks";
    const extArtists = "artists";
    const extAlbums = "albums";
    const extInvoices = "invoices";
    const extInvoiceLines = "invoicelines";
    const extCustomers = "customers";

    $("#getArtistsBtn").on("click", function(e){
        RemoveChildren($("#browseDiv"));
        $("#browseResults").remove();

        var resultTable = $("<table/>").attr("id", "browseResults");
        var tableHeaders = $("<tr/>").appendTo(resultTable);
        $("<th/>").text("Artist Name").appendTo(tableHeaders);
        $("<th/>").text("Tracks").appendTo(tableHeaders);
        $("<th/>").text("Albums").appendTo(tableHeaders);

        $.ajax({
            url: baseUrl+extArtists, //"http://localhost/Chinook-Abridged-rest-api/artists",
            type: "GET"
        }).done(function(response){

            PopulateArtistResultDiv(resultTable, response);
            resultTable.appendTo(main);

        }).fail(function(e){
            console.log("Failed "+e);
        });
    })

    $("#getAlbumsBtn").on("click", function(e){
        RemoveChildren($("#browseDiv"));
        $("#browseResults").remove();
        
        var resultTable = $("<table/>").attr("id", "browseResults");
        var tableHeaders = $("<tr/>").appendTo(resultTable);

        $("<th/>").text("Artist Name").appendTo(tableHeaders);
        $("<th/>").text("Album Name").appendTo(tableHeaders);
        $("<th/>").text("Browse").appendTo(tableHeaders);

        $.ajax({
            url: baseUrl+extAlbums,//"http://localhost/Chinook-Abridged-rest-api/albums",
            type: "GET"
        }).done(function(response){

            PopulateAlbumRestultDiv(resultTable, response);
            resultTable.appendTo(main);

        }).fail(function(e){
            console.log("Failed "+JSON.stringify(e));
        });
    })

    $("#getTracksBtn").on("click", function(e){
        $("#browseResults").remove();
        
        let selected = $("#order").val();
        let txt = $("#searchBy").val();
        console.log(txt)
        let resultTable = $("<table/>").attr("id", "browseResults");
        let tableHeaders = $("<tr/>").appendTo(resultTable);
        $("<th/>").text("Name").appendTo(tableHeaders);
        $("<th/>").text("Length").appendTo(tableHeaders);
        $("<th/>").text("Price").appendTo(tableHeaders);
        $("<th/>").text("Add to cart").appendTo(tableHeaders);
     

        $.ajax({
           url: baseUrl+extTracks+"?order="+selected+"&name="+txt,//"http://localhost/Chinook-Abridged-rest-api/tracks?order="+selected+"&name="+txt,
           type: "GET"
        }).done(function(response){

            PopulateTrackResultDiv(resultTable, response);
            resultTable.appendTo(main);

        }).fail(function(e){
            console.log("Failed "+JSON.stringify(e));
        });
    });


    function TracksByArtist(selected, txt){
        RemoveChildren($("#browseDiv"));
        $("#browseResults").remove();

        let resultTable = $("<table/>").attr("id", "browseResults");
        let tableHeaders = $("<tr/>").appendTo(resultTable);
        $("<th/>").text("Name").appendTo(tableHeaders);
        $("<th/>").text("Length").appendTo(tableHeaders);
        $("<th/>").text("Price").appendTo(tableHeaders);
        $("<th/>").text("Add to cart").appendTo(tableHeaders);

        $.ajax({
            url: baseUrl+extTracks+"?order="+selected+"&name="+txt,//"http://localhost/Chinook-Abridged-rest-api/tracks?order="+selected+"&name="+txt,
            type: "GET"
        }).done(function(response){

            PopulateTrackResultDiv(resultTable, response);
            resultTable.appendTo(main);

        }).fail(function(e){
            console.log("Failed "+JSON.stringify(e));
        });
    }

    function AlbumsByArtist(artistName){
        RemoveChildren($("#browseDiv"));
        $("#browseResults").remove();

        var resultTable = $("<table/>").attr("id", "browseResults");
        var tableHeaders = $("<tr/>").appendTo(resultTable);

        $("<th/>").text("Artist Name").appendTo(tableHeaders);
        $("<th/>").text("Album Name").appendTo(tableHeaders);
        $("<th/>").text("Tracks").appendTo(tableHeaders);

        $.ajax({
            url: baseUrl+extAlbums+"?order="+extArtists+"&name="+artistName,//"http://localhost/Chinook-Abridged-rest-api/albums?order=artist&name="+artistName,
            type: "GET"
        }).done(function(response){

            PopulateAlbumRestultDiv(resultTable, response);
            resultTable.appendTo(main);

        }).fail(function(e){

            console.log("Failed "+e);

        });
    }

    function RemoveChildren(parent){
    for (let i = parent.children.length - 1; i >= 0; i--) {
        parent.remove(parent.children[i]);
        }
    }

    function PopulateTrackResultDiv(parent, data){
        $.each(data, function (indexInArray, valueOfElement) { 

            let minLength = valueOfElement.Milliseconds / 60000;
            let minutes = String(minLength).substr(0,4);
            
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "trackName").text(valueOfElement.Name).appendTo(tr);
            $("<td/>").attr("class", "trackLength").text(minutes+"min").appendTo(tr);
            $("<td/>").attr("class", "trackPrice").html(valueOfElement.UnitPrice).appendTo(tr);
            let formTd = $("<td/>").attr("class", "cartSubmitBtn").appendTo(tr);
    
            //add to cart form
            const submitId = valueOfElement.Name+String(valueOfElement.Milliseconds);
            let form = $("<form/>", {action:"browse.php" ,method:"POST"});
            let name = $("<input/>", {type:"hidden", name:"trackName", value:valueOfElement.Name});
            let price = $("<input/>", {type:"hidden", name:"trackPrice", value:valueOfElement.UnitPrice});
            let trackId = $("<input/>", {type:"hidden", name:"trackId", value:valueOfElement.TrackId});
            let submit = $("<input/>", {type: "image", alt:"submit", name:"addToCart", src:"imgs/cart.png", id:submitId})
            form.append(name).append(price).append(trackId).append(submit)
            form.appendTo(formTd);

            parent.append(tr);
        });
    }

    function PopulateArtistResultDiv(parent, data){

        $.each(data, function (indexInArray, valueOfElement) { 
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "artistName").text(valueOfElement.Name).appendTo(tr);
            let tracksBtn = $("<td/>").attr("class", "artistTracks").append($("<input/>").attr("type", "image").attr("src","imgs/track.png")).appendTo(tr);
            let albumsbtn = $("<td/>").attr("class", "artistAlbums").append($("<input/>").attr("type", "image").attr("src","imgs/album.png")).appendTo(tr);
            
            tracksBtn.on("click", function(e){
                TracksByArtist("artist", valueOfElement.Name)
            });

            albumsbtn.on("click", function(e){
                AlbumsByArtist(valueOfElement.Name);
            })
            
            parent.append(tr);
        });
    }

    function PopulateAlbumRestultDiv(parent, data){
        $.each(data, function (indexInArray, valueOfElement) { 
            let tr = $("<tr/>").attr("class", "tableItem").appendTo(parent);
            $("<td/>").attr("class", "artistName").text(valueOfElement.Name).appendTo(tr);
            $("<td/>").attr("class", "ablumTitle").text(valueOfElement.Title).appendTo(tr);
            let tracksBtn = $("<input/>").attr("type", "image").attr("src","imgs/track.png");
            $("<td/>").attr("class", "albumsTracks").appendTo(tr).append(tracksBtn);
            
            tracksBtn.on("click", function(e){
                TracksByArtist("album", valueOfElement.Title);
            })
            
            parent.append(tr);
        });
    }
});