$(document).ready(function(){

    const baseUrl = "http://chinookabridgedapi-env.eba-nh3f5aui.us-east-1.elasticbeanstalk.com/index.php/";
    const extTracks = "tracks";
    const extArtists = "artists";
    const extAlbums = "albums";

    $("#createTrackBtn").on("click", function(e){
        const modal = $("#createTrackModal");
        modal[0].style.display = "block";
        $("#createTrackModalForm").on("submit", function(data){

            const formData = $("#createTrackModalForm").serialize();

            $.ajax({
                url: baseUrl+extTracks, //"http://localhost/Chinook-Abridged-rest-api/tracks",
                type: "POST",
                data: formData,
                succes: function(response){
                    alert(JSON.stringify(response));
                },
                error: function(response){
                    alert("failed"+JSON.stringify(response));
                }
            });
        })
    })

    $("#createAlbumBtn").on("click", function(e){
        const modal = $("#createAlbumModal");
        modal[0].style.display = "block";
        $("#createAlbumModalForm").on("submit", function(data){
            
            const formData = $("#createAlbumModalForm").serialize();

            $.ajax({
                url: baseUrl+extAlbums, //"http://localhost/Chinook-Abridged-rest-api/albums",
                type: "POST",
                data: formData,
                succes: function(response){
                    alert(JSON.stringify(response));
                },
                error: function(response){
                    alert("failed"+JSON.stringify(response));
                }
            });
        })
    })

    $("#createArtistBtn").on("click", function(e){
        const modal = $("#createArtistModal");
        modal[0].style.display = "block";
        $("#createArtistModalForm").on("submit", function(data){
            const formData = $("#createArtistModalForm").serialize();
            $.ajax({
                url: baseUrl+extArtists,//"http://localhost/Chinook-Abridged-rest-api/artists",
                type: "POST",
                data: formData,
                succes: function(response){
                    alert(JSON.stringify(response));
                },
                error: function(response){
                    alert("failed"+JSON.stringify(response));
                }
            })
        })
    })


    $(".closeForm").on("click", function(e){
        switch (e.currentTarget.offsetParent.id) {
            case "createTrackModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            case "createArtistModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            case "createAlbumModal":
                e.currentTarget.offsetParent.style.display = "none";
                break;
            default:
                break;
        }
    })
});