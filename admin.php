<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chinook Abridged</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery-3.5.1.js"></script>
    <script src="js/script.js"></script>
    <script src="js/admin.js"></script>
</head>
<body>
        <?php
            session_start();
            include_once("header.php");
        ?>
        <main>
            <div id="adminBrowsing">
                <div id="adminTracks" class="1_3">
                    <h3>Tracks</h3>
                    <p>By artist name</p>
                    <input type="text" id="adminTrackTxt">
                    <input type="button" id="adminTracksBtn" value="Get Tracks">
                </div>
                <div id="adminAlbums" class="1_3">
                    <h3>Albums</h3>
                    <p>By artist name</p>
                    <input type="text" id="adminAlbumTxt">
                    <input type="button" id="adminAlbumsBtn" value="Get Albums">
                </div>
                <div id="adminArtists" class="1_3">
                    <h3>Artists</h3>
                    <p>By artist name</p>
                    <input type="text" id="adminArtistTxt">
                    <input type="button" id="adminArtistsBtn" value="Get Artists">
                </div>
            </div>
        </main>
        <div id="trackModal" class="modal">
            <div id="trackModalContent">
                <span class="closeForm">&times;</span>
                <form id="trackModalForm" method="PUT">
                    <fieldset>
                        <legend>Edit song</legend>
                        <label>Name</label>
                        <input type="text" name="trackName" id="modalTrackName">
                        <label>AlbumId</label>
                        <input type="number" name="trackAlbumId" id="modalTrackAlbumId">
                        <label>Composer</label>
                        <input type="text" name="trackComposer" id="modalTrackComposer">
                        <label>Length in milliseconds</label>
                        <input type="number" name="trackLength" id="modalTrackLength">
                        <label>Bytes</label>
                        <input type="number" name="trackBytes" id="modalTrackBytes">
                        <label>Price</label>
                        <input type="float" name="trackUnitPrice" id="modalTrackUnitPrice">
                        <label>Mediatype</label>
                        <select name="trackMediaTypeId" id="modalTrackMediaTypeId">
                            <option value="1">MPEG audio file</option>
                            <option value="2">Protected AAC audio file</option>
                            <option value="3">Protected MPEG-4 video file</option>
                            <option value="4">Purchased AAC audio file</option>
                            <option value="5">AAC audio file</option>
                        </select>
                        <label>Genre</label>
                        <select name="trackGenreId" id="modalTrackGenreId">
                            <option value="1">Rock</option>
                            <option value="2">Jazz</option>
                            <option value="3">Metal</option>
                            <option value="4">Alternative & Punk</option>
                            <option value="5">Rock And Roll</option>
                            <option value="6">Blues</option>
                            <option value="7">Latin</option>
                            <option value="8">Reggae</option>
                            <option value="9">Pop</option>
                            <option value="10">Soundtrack</option>
                            <option value="11">Bossa Nova</option>
                            <option value="12">Easy Listening</option>
                            <option value="13">Heavy Metal</option>
                            <option value="14">R&B/Soul</option>
                            <option value="15">Electronical/Dance</option>
                            <option value="16">World</option>
                            <option value="17">Hip Hop/Rap</option>
                            <option value="18">Science Fiction</option>
                            <option value="19">TV Shows</option>
                            <option value="20">Sci Fi & Fantasy</option>
                            <option value="21">Drama</option>
                            <option value="22">Comedy</option>
                            <option value="23">Alternative</option>
                            <option value="24">Classical</option>
                            <option value="25">Opera</option>
                        </select>
                        <input type="submit" value="Update">
                    </fieldset>
                </form>
            </div>
        </div>
        <div id="albumModal" class="modal">
            <div id="albumModalContent">
                <span class="closeForm">&times;</span>
                <form id="albumModalForm" method="PUT">
                    <fieldset>
                        <legend>Edit Album</legend>
                        <label>Title</label>
                        <input type="text" name="albumArtist" id="modalAlbumTitle">
                        <label>ArtistId</label>
                        <input type="text" name="albumTitle" id="modalAlbumArtistId">
                        <input type="submit" value="Update">
                    </fieldset>
                </form>
            </div>
        </div>
        <div id="artistModal" class="modal">
            <div id="artistModalContent">
                <span class="closeForm">&times;</span>
                <form id="artistModalForm" method="PUT">
                    <fieldset>
                        <legend>Edit Artist</legend>
                        <label>Name</label>
                        <input type="text" name="name" id="modalArtistName">
                        <input type="submit" id="updateArtistBtn" value="Update Artist">
                    </fieldset>
                </form>
            </div>
        </div>
        <?php
            include_once("footer.htm");
        ?>
</html>