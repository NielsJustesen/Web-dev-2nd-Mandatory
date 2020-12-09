$(document).ready(function(){
    // get all tracks either by artist name or just all
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
            // set up each track in its individual div element
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminTrackItem"});

                let btn = $("<input>", {type:"button", value:"Change", class:"changeBtn"});
                let name = $("<span/>", {text:"Track: "+valueOfElement["Name"]});
                let composer = $("<span/>", {text:"Composer: "+valueOfElement["Composer"]});
                let unitPrice = $("<span/>", {text:"Price: "+valueOfElement["UnitPrice"]});

                divItem.append(btn).append(name).append($("<br>")).append(composer).append($("<br>")).append(unitPrice);
                divItem.appendTo(trackDiv);
                // get the form for a track so that it can be modified and updated
                btn.on("click", function(e){
                    const modal = $("#trackModal");
                    $("#modalTrackName").val(valueOfElement["Name"]);
                    $("#modalTrackAlbumId").val(valueOfElement["AlbumId"]);
                    $("#modalTrackComposer").val(valueOfElement["Composer"]);
                    $("#modalTrackLength").val(valueOfElement["Milliseconds"]);
                    $("#modalTrackBytes").val(valueOfElement["Bytes"]);
                    $("#modalTrackUnitPrice").val(valueOfElement["UnitPrice"]);

                    modal[0].style.display = "block";
                    // the PUT form for sending the request for the api
                    $("#trackModalForm").on("submit", function(e){
                        name = $("#modalTrackName").val();
                        albumId = $("#modalTrackAlbumId").val();
                        composer = $("#modalTrackComposer").val();
                        length = $("#modalTrackLength").val();
                        size = $("#modalTrackBytes").val();
                        price = $("#modalTrackUnitPrice").val();
                        mediaType = $("#modalTrackMediaTypeId").val();
                        genre = $("#modalTrackGenreId").val();

                        formData = {
                            "name": name,
                            "albumId": albumId,
                            "mediaTypeId": mediaType,
                            "genreId": genre,
                            "composer": composer,
                            "milliseconds": length,
                            "bytes": size,
                            "unitPrice": price
                        };
                        let id = valueOfElement["TrackId"];
                        let putUrl = "http://localhost/Chinook-Abridged-rest-api/tracks/"+id;
                        
                        // update the track with ajax
                        $.ajax({
                            url: putUrl,
                            type: "PUT",
                            contentType: 'application/json',
                            data: JSON.stringify(formData)
                        }).done(function(response){
                            alert("SUCCESS "+JSON.stringify(response));
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    });
                });

            });
        }).fail(function(e){
            alert("FAILED "+JSON.stringify(e));
        });
    });

    // get all albums either by artist name or just all
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

            // set up each album in its individual div element
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminAlbumItem"});

                let btn = $("<input>", {type:"button", value:"Change", class:"changeBtn"});
                let name = $("<span/>", {text:"Artist: "+valueOfElement["Name"]}).append($("<br>"));
                let title = $("<span/>", {text:"Title: "+valueOfElement["Title"]}).append($("<br>"));

                divItem.append(btn).append(name).append($("<br>")).append(title).append($("<br>"))
                divItem.appendTo(albumDiv);

                // get the form for an album so that it can be modified and updated
                btn.on("click", function(e){
                    const modal = $("#albumModal");
                    $("#modalAlbumTitle").val(valueOfElement["Title"]);
                    $("#modalAlbumArtistId").val(valueOfElement["ArtistId"]);
                    modal[0].style.display = "block";

                    // the PUT form for sending the request for the api
                    $("#albumModalForm").on("submit", function(e){
                        albumTitle = $("#modalAlbumTitle").val();
                        artistId = $("#modalAlbumArtistId").val();
                        formData = {
                            "title": albumTitle,
                            "artistId": artistId
                        };
                        let id = valueOfElement["AlbumId"];
                        let putUrl = "http://localhost/Chinook-Abridged-rest-api/albums/"+id;
                       
                        // update the album with ajax
                        $.ajax({
                            url: putUrl,
                            type: "PUT",
                            contentType: 'application/json',
                            data: JSON.stringify(formData)
                        }).done(function(response){
                            alert(JSON.stringify(response));
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    });

                });

            });
        }).fail(function(e){
            alert("FAILED "+JSON.stringify(e));
        });
    });

    // get all artists either by artist name or just all
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

            // set up each artist in its individual div element
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminArtistItem"});

                let btn = $("<input>", {type:"button", value:"Change", class:"changeBtn"});
                let name = $("<span/>", {text:"Name: "+valueOfElement["Name"]}).append($("<br>"));
                divItem.append(btn).append(name).append($("<br>"));
                divItem.appendTo(artistDiv);

                // get the form for an artist so that it can be modified and updated
                btn.on("click", function(e){
                    const modal = $("#artistModal");
                    $("#modalArtistName").val(valueOfElement["Name"]);
                    modal[0].style.display = "block";
                    
                    // the PUT form for sending the request for the api
                    $("#artistModalForm").on("submit", function(e){
                        value = $("#modalArtistName").val();
                        formData = {
                            "name":value
                        };
                        let id = valueOfElement["ArtistId"];
                        let putUrl = "http://localhost/Chinook-Abridged-rest-api/artists/"+id;

                        // update the artist with ajax
                        $.ajax({
                            url: putUrl,
                            type: "PUT",
                            contentType: 'application/json',
                            data: JSON.stringify(formData)
                        }).done(function(response){
                            alert(JSON.stringify(response));
                            modal[0].style.display = "none";
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    });
                });
            });
        }).fail(function(e){
            alert("FAILED "+JSON.stringify(e));
        });
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