$(document).ready(function(){
    $("#createTrackBtn").on("click", function(e){
        const modal = $("#createTrackModal");
        modal[0].style.display = "block";
        $("#createTrackModalForm").on("submit", function(data){
            const formData = $("#createTrackModalForm").serialize();
            console.log(formData);

            $.ajax({
                url: "http://localhost/Chinook-Abridged-rest-api/tracks",
                type: "POST",
                data: formData,
                succes: function(data){
                    alert(data);
                },
                failure: function(data){
                    alert("failed");
                }
            })
        })
    })

    $("#createAlbumBtn").on("click", function(e){
        const modal = $("#createAlbumModal");
        modal[0].style.display = "block";
        $("#createAlbumModalForm").on("submit", function(data){
            const formData = $("#createAlbumModalForm").serialize();
            $.ajax({
                url: "http://localhost/Chinook-Abridged-rest-api/albums",
                type: "POST",
                data: formData,
                succes: function(data){
                    alert(data);
                },
                failure: function(data){
                    alert("failed");
                }
            })
        })
    })

    $("#createArtistBtn").on("click", function(e){
        const modal = $("#createArtistModal");
        modal[0].style.display = "block";
        $("#createArtistModalForm").on("submit", function(data){
            const formData = $("#createArtistModalForm").serialize();
            $.ajax({
                url: "http://localhost/Chinook-Abridged-rest-api/artists",
                type: "POST",
                data: formData,
                succes: function(data){
                    alert(data);
                },
                failure: function(data){
                    alert("failed");
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