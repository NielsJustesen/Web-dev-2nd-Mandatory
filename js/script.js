$(document).ready(function(){

     $("#searchBy").on("change", function(e){

        // const browseDiv = $("#browseDiv");
        const main = $("main");
        switch ($("#searchBy").val()) {
            
            case "track":
                removeChildren($("#browseDiv"));
                var browse = $("<div/>").attr("id", "browseDiv").appendTo(main);
                var disc = $("<span/>").text("Search tracks from: ").appendTo(browse).append("<br>");
                var selector = $("<select/>").attr("id", "order");
                var option1 = $("<option/>").attr("value","track").text("Track").appendTo(selector);
                var option2 = $("<option/>").attr("value","artist").text("Artist").appendTo(selector);
                var option3 = $("<option/>").attr("value","album").text("Album").appendTo(selector);
                selector.appendTo(browse);
                var txtInput = $("<input/>").attr("type", "text").attr("id", "searchBy").appendTo(browse);
                const btnSearchTrack = $("<input/>").attr("type", "button").attr("id", "searchBtn").attr("value", "Search").appendTo(browse);

                $(btnSearchTrack).on("click", function(e){
                    console.log("search track");
                 });
                break;
            case "artist":
                removeChildren($("#browseDiv"));
                var browse = $("<div/>").attr("id", "browseDiv").appendTo(main);
                var disc = $("<span/>").text("Search artists: ").appendTo(browse).append("<br>");
                var txtInput = $("<input/>").attr("type", "text").attr("id", "searchBy").appendTo(browse);
                var btnSearchArtist = $("<input/>").attr("type", "button").attr("id", "searchBtn").attr("value", "Search").appendTo(browse);

                $(btnSearchArtist).on("click", function(e){
                    console.log("search artist");
                 });
                break;
            case "album":
                removeChildren($("#browseDiv"));
                var browse = $("<div/>").attr("id", "browseDiv").appendTo(main);
                var disc = $("<span/>").text("Search albums by: ").appendTo(browse).append("<br>");
                var selector = $("<select/>").attr("id", "order");
                var option2 = $("<option/>").attr("value","artist").text("Artist").appendTo(selector);
                var option3 = $("<option/>").attr("value","title").text("Title").appendTo(selector);
                selector.appendTo(browse);
                var txtInput = $("<input/>").attr("type", "text").attr("id", "searchBy").appendTo(browse);
                var btnSearchAlbum = $("<input/>").attr("type", "button").attr("id", "searchBtn").attr("value", "Search").appendTo(browse);

                $(btnSearchAlbum).on("click", function(e){
                    console.log("search album");
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
});