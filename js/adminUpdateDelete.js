$(document).ready(function(){
    
    const baseUrl = "http://chinookabridgedapi-env.eba-nh3f5aui.us-east-1.elasticbeanstalk.com/index.php/";
    const extTracks = "tracks";
    const extArtists = "artists";
    const extAlbums = "albums";
    
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
            trackUrl = baseUrl+extTracks; //"http://localhost/Chinook-Abridged-rest-api/tracks"
        }
        else {
            trackUrl = baseUrl+extTracks+"?order=artist&name="+trackTxt.val(); //"http://localhost/Chinook-Abridged-rest-api/tracks?order=artist&name="+trackTxt.val();
        }
        $.ajax({
            url: trackUrl,
            type: "GET"
        }).done(function(response){
            // set up each track in its individual div element
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminTrackItem"});

                let changeBtn = $("<input>", {type:"image", src:"imgs/edit.png", class:"changeBtn"});
                let deleteBtn = $("<input>", {type:"image", src:"imgs/delete.png", class:"deleteBtn"});
                
                let discName = $("<label/>", {text:"Name:"});
                let name = $("<p/>", {text:valueOfElement["Name"]});
                
                let discComposer = $("<label/>", {text:"Composer:"});
                let composer = $("<p/>", {text:valueOfElement["Composer"]});
                
                let discPrice = $("<label/>", {text:"Price:"});
                let unitPrice = $("<p/>", {text:valueOfElement["UnitPrice"]});

                divItem.append(changeBtn).append(deleteBtn).append(discName).append(name).append(discComposer).append(composer).append(discPrice).append(unitPrice);
                divItem.appendTo(trackDiv);
                // get the form for a track so that it can be modified and updated
                changeBtn.on("click", function(e){
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
                        // update the track with ajax
                        $.ajax({
                            url: baseUrl+extTracks,
                            type: "POST",
                            data: {
                                "trackId": valueOfElement["TrackId"],
                                "name": $("#modalTrackName").val(),
                                "albumId": parseInt($("#modalTrackAlbumId").val()),
                                "composer": $("#modalTrackComposer").val(),
                                "milliseconds": $("#modalTrackLength").val(),
                                "bytes": $("#modalTrackBytes").val(),
                                "unitPrice": $("#modalTrackUnitPrice").val(),
                                "mediaTypeId":parseInt($("#modalTrackMediaTypeId").val()),
                                "genreId": parseInt($("#modalTrackGenreId").val())
                            }
                        }).done(function(response){
                            alert("SUCCESS "+JSON.stringify(response));
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    });
                });


                deleteBtn.on("click", function(e){
                    const modal = $("#confirmTrackModal");
                    modal[0].style.display = "block";
                    
                    let confirmBtn = $("#confirmTrackDelete");
                    let cancelBtn = $("#cancelTrackDelete");

                    confirmBtn.on("click", function(e){
                        let id = parseInt(valueOfElement["TrackId"]);
                        $.ajax({
                            url: baseUrl+extTracks+"/"+id,
                            type: "DELETE",
                            contentType: 'application/json'
                        }).done(function(response){
                            alert("SUCCESS "+JSON.stringify(response));
                            location.reload();
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    })

                    cancelBtn.on("click", function(e){
                        modal[0].style.display = "none";
                    })
                    
                })
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
            albumUrl = baseUrl+extAlbums;  //"http://localhost/Chinook-Abridged-rest-api/albums"
        }
        else {
            albumUrl = baseUrl+extAlbums+"?order=artist&name="+albumTxt.val();  //"http://localhost/Chinook-Abridged-rest-api/albums?order=artist&name="+albumTxt.val();
        }
        $.ajax({
            url: albumUrl,
            type: "GET"
        }).done(function(response){

            // set up each album in its individual div element
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminAlbumItem"});

                let changeBtn = $("<input>", {type:"image", src:"imgs/edit.png", class:"changeBtn"});
                let deleteBtn = $("<input>", {type:"image", src:"imgs/delete.png", class:"deleteBtn"});

                let discName = $("<label/>", {text:"Name:"});
                let name = $("<p/>", {text:valueOfElement["Name"]});

                let discTitle = $("<label/>", {text:"Title:"});
                let title = $("<p/>", {text:valueOfElement["Title"]});

                let discId = $("<label/>", {text:"AlbumId:"});
                let id = $("<p/>", {text:valueOfElement["AlbumId"]});


                divItem.append(changeBtn).append(deleteBtn).append(discName).append(name).append(discTitle).append(title).append(discId).append(id);
                divItem.appendTo(albumDiv);

                // get the form for an album so that it can be modified and updated
                changeBtn.on("click", function(e){
                    const modal = $("#albumModal");
                    $("#modalAlbumTitle").val(valueOfElement["Title"]);
                    $("#modalAlbumArtistId").val(valueOfElement["ArtistId"]);
                    modal[0].style.display = "block";

                    // the PUT form for sending the request for the api
                    $("#albumModalForm").on("submit", function(e){
                        // update the album with ajax
                        $.ajax({
                            url: baseUrl+extAlbums,
                            type: "POST",
                            data: {
                                "albumId": valueOfElement["AlbumId"],
                                "title": $("#modalAlbumTitle").val(),
                                "artistId": $("#modalAlbumArtistId").val()
                            }
                        }).done(function(response){
                            alert(JSON.stringify(response));
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    });

                });

                deleteBtn.on("click", function(e){

                    const modal = $("#confirmAlbumModal");
                    modal[0].style.display = "block";
                    
                    let confirmBtn = $("#confirmAlbumDelete");
                    let cancelBtn = $("#cancelAlbumDelete");

                    confirmBtn.on("click", function(e){
                        let id = parseInt(valueOfElement["AlbumId"]);
                        $.ajax({
                            url: baseUrl+extAlbums+"/"+id,
                            type: "DELETE",
                            contentType: 'application/json'
                        }).done(function(response){
                            alert("SUCCESS "+JSON.stringify(response));
                            location.reload();
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    })

                    cancelBtn.on("click", function(e){
                        modal[0].style.display = "none";
                    })
                })
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
            artistUrl = baseUrl+extArtists; //"http://localhost/Chinook-Abridged-rest-api/artists"
        }
        else {
            artistUrl = baseUrl+extArtists+"?name="+artistTxt.val(); //"http://localhost/Chinook-Abridged-rest-api/artists?name="+artistTxt.val();
        }
        $.ajax({
            url: artistUrl,
            type: "GET"
        }).done(function(response){

            // set up each artist in its individual div element
            $.each(response, function (indexInArray, valueOfElement) { 
                
                let divItem = $("<div/>", {class:"adminArtistItem"});

                let changeBtn = $("<input>", {type:"image", src:"imgs/edit.png", class:"changeBtn"});
                let deleteBtn = $("<input>", {type:"image", src:"imgs/delete.png", class:"deleteBtn"});

                let discName = $("<label/>", {text:"Composer:"})
                let name = $("<p/>", {text:valueOfElement["Name"]});
                let discId = $("<label/>", {text:"ArtistId:"})
                let id = $("<p/>", {text:valueOfElement["ArtistId"]});

                divItem.append(changeBtn).append(deleteBtn).append(discName).append(name).append(discId).append(id);
                divItem.appendTo(artistDiv);

                // get the form for an artist so that it can be modified and updated
                changeBtn.on("click", function(e){
                    const modal = $("#artistModal");
                    $("#modalArtistName").val(valueOfElement["Name"]);
                    modal[0].style.display = "block";
                    
                    // the PUT form for sending the request for the api
                    $("#artistModalForm").on("submit", function(e){
                        // update the artist with ajax
                        $.ajax({
                            url: baseUrl+extArtists,
                            type: "POST",
                            data: {
                                "artistId": valueOfElement["ArtistId"],
                                "name": $("#modalArtistName").val()
                            }
                        }).done(function(response){
                            alert(JSON.stringify(response));
                            modal[0].style.display = "none";
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    });
                });

                deleteBtn.on("click", function(e){
                    const modal = $("#confirmArtistModal");
                    modal[0].style.display = "block";
                    
                    let confirmBtn = $("#confirmArtistDelete");
                    let cancelBtn = $("#cancelArtistDelete");

                    confirmBtn.on("click", function(e){
                        let id = parseInt(valueOfElement["ArtistId"]);
                        $.ajax({
                            url: baseUrl+extArtists+"/"+id,
                            type: "DELETE",
                            contentType: 'application/json'
                        }).done(function(response){
                            alert("SUCCESS "+JSON.stringify(response));
                            location.reload();
                        }).fail(function(e){
                            alert("FAILED "+JSON.stringify(e));
                        });
                    })

                    cancelBtn.on("click", function(e){
                        modal[0].style.display = "none";
                    })
                })
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