<?php
    require_once("src/track.php");
    require_once("src/album.php");
    require_once("src/artist.php");
    
    $search = "";
    $test = "";

    ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Chinook Abridged</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/styles.css">
        <script src="js/jquery-3.5.1.js"></script>
        <script src="js/script.js"></script>
    </head>
    <body>
        <form action="index.php" id="search" method="POST">
            <fieldset>                
                <select id="selector">
                    <option value="name">Name</option>
                    <option name="order" value="artist">Artist</option>
                </select>
                <input id="searchText" name="searchText" type="text" value="<?=$search?>">
                <input type="submit" id="searchBtn" value="Search">
            </fieldset>
        </form>
        <div>
            <?php
                if(isset($_POST['order'])){
                    echo $_POST['order'];
                }
                
                if(isset($_POST['searchText'])){
                    echo $_POST['searchText'];
                }            
            ?>
        </div>
    </body>
</html>
    

<?php
    // $track = new Track;
    // $album = new Album;
    // $artist = new Artist;
    
    // echo "<pre>";
    // echo print_r($track->BrowseTracks("artist", "AC/DC"));

    
    // echo "<pre>";
    // echo print_r($track->BrowseTracks("album", "For Those About To Rock We Salute You"));

    // echo "<pre>";
    // echo print_r($track->BrowseTracks("composer", "James"));

    // echo "<pre>";
    // echo print_r($track->BrowseTracks("genre", "Jazz"));

    // echo "<pre>";
    // echo print_r($album->BrowseAlbums("title", "Prenda Minha"));

    // echo "<pre>";
    // echo print_r($album->BrowseAlbums("artist", "Metallica"));

    // echo "<pre>";
    // echo print_r($artist->BrowseArtists("name", "Metallica"));

    // echo "<pre>";
    // echo print_r($artist->BrowseArtists("all", "Metallica"));

?>