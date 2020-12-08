$(document).ready(function(){

    $("#adminTracksBtn").on("click", function(e){
        let div = $(".adminTrackItem");
        if(div != undefined){
            div.remove();
        }
        const trackDiv = $("#adminTracks");
        const trackTxt = $("#adminTrackTxt");
        let trackUrl = "";
        if(TrimInput(trackTxt.val()) === "")
        {
            trackUrl = "http://localhost/Chinook-Abridged-rest-api/tracks"
        }
        else {
            trackUrl = "http://localhost/Chinook-Abridged-rest-api/tracks?order=artist&name="+trackTxt.val();
        }
        $.ajax({
            url: trackUrl,
            type: "GET"
        }).done(function(response){

            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminTrackItem"});

                let btn = $("<input>", {type:"button", value:"Change", class:"changeBtn"});
                let name = $("<span/>", {text:"Track: "+valueOfElement["Name"]});
                let composer = $("<span/>", {text:"Composer: "+valueOfElement["Composer"]});
                let unitPrice = $("<span/>", {text:"Price: "+valueOfElement["UnitPrice"]});

                divItem.append(btn).append(name).append($("<br>")).append(composer).append($("<br>")).append(unitPrice);
                divItem.appendTo(trackDiv);

                btn.on("click", function(e){
                    const modal = $("#trackModal");
                    $("#modalTrackName").val(valueOfElement["Name"]);
                    $("#modalTrackAlbumId").val(valueOfElement["AlbumId"]);
                    $("#modalTrackComposer").val(valueOfElement["Composer"]);
                    $("#modalTrackLength").val(valueOfElement["Milliseconds"]);
                    $("#modalTrackBytes").val(valueOfElement["Bytes"]);
                    $("#modalTrackUnitPrice").val(valueOfElement["UnitPrice"]);

                    modal[0].style.display = "block";
                });

            });
        }).fail(function(e){

        })
    })

    $("#adminAlbumsBtn").on("click", function(e){
        let div = $(".adminAlbumItem");
        if(div != undefined){
            div.remove();
        }
        const albumDiv = $("#adminAlbums");
        const albumTxt = $("#adminAlbumTxt");
        let albumUrl = "";

        if(TrimInput(albumTxt.val()) === "")
        {
            albumUrl = "http://localhost/Chinook-Abridged-rest-api/albums"
        }
        else {
            albumUrl = "http://localhost/Chinook-Abridged-rest-api/albums?order=artist&name="+albumTxt.val();
        }
        $.ajax({
            url: albumUrl,
            type: "GET"
        }).done(function(response){
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminAlbumItem"});

                let btn = $("<input>", {type:"button", value:"Change", class:"changeBtn"});
                let name = $("<span/>", {text:"Artist: "+valueOfElement["Name"]}).append($("<br>"));
                let title = $("<span/>", {text:"Title: "+valueOfElement["Title"]}).append($("<br>"));

                divItem.append(btn).append(name).append($("<br>")).append(title).append($("<br>"))
                divItem.appendTo(albumDiv);

                btn.on("click", function(e){
                    const modal = $("#albumModal");
                    $("#modalAlbumArtistName").val(valueOfElement["Name"]);
                    $("#modalAlbumTitle").val(valueOfElement["Title"]);
                    modal[0].style.display = "block";
                });

            });
        }).fail(function(response){
            
        })
    })

    $("#adminArtistsBtn").on("click", function(e){
        let div = $(".adminArtistItem");
        if(div != undefined){
            div.remove();
        }
        const artistDiv = $("#adminArtists");
        const artistTxt = $("#adminArtistTxt");
        let artistUrl = "";
        if(TrimInput(artistTxt.val()) === "")
        {
            artistUrl = "http://localhost/Chinook-Abridged-rest-api/artists"
        }
        else {
            artistUrl = "http://localhost/Chinook-Abridged-rest-api/artists?name="+artistTxt.val();
        }
        $.ajax({
            url: artistUrl,
            type: "GET"
        }).done(function(response){
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminArtistItem"});

                let btn = $("<input>", {type:"button", value:"Change", class:"changeBtn"});
                let name = $("<span/>", {text:"Name: "+valueOfElement["Name"]}).append($("<br>"));

                divItem.append(btn).append(name).append($("<br>"));
                divItem.appendTo(artistDiv);

                btn.on("click", function(e){
                    const modal = $("#artistModal");
                    $("#modalArtistName").val(valueOfElement["Name"]);
                    modal[0].style.display = "block";
                });
            });
        }).fail(function(response){
            
        })
    })

    function TrimInput(input){
        if (input.trim() === ""){
            return "";
        }
    }

    $(".closeForm").on("click", function(e){
        switch (e.currentTarget.offsetParent.id) {
            case "trackModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            case "artistModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            case "albumModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            default:
                break;
        }
    })
});