$(document).ready(function(){
    console.log("DOM READY");

    $("#searchBtn").on("click", function(){
        console.log("WTF!");
    })
    
    $("#searchBtn").on("click", function(e){
        e.preventDetault();
        console.log("clicked");
        $.ajax({
            url: "src/api.php",
            type: "GET",
            data: {
                entity: "track",
                action: "search",
                order: $("#selector").val(),
                searchText: $("#searchText").val()
            },
            success: function(data){
                const holder = $("<div>");
                data.forEach(element => {
                    holder.append($("<p>").attr("class", "track").text(element['Name']));
                });
                $("body").append(holder)
            }
        });


        console.log($("#selector").val())
    })

});