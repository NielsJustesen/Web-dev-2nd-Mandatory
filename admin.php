<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chinook Abridged</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/jquery-3.5.1.js"></script>
    <script src="js/script.js"></script>
    <script src="js/adminUpdateDelete.js"></script>
    <script src="js/adminCreate.js"></script>
    <script srt="js/ApiUrls.js"></script>
</head>
<body>
        <?php
            session_start();
            include_once("header.php");
            if(isset($_SESSION["role"]) && $_SESSION["role"] === "Admin"){

        ?>
        <main>
            <div id="adminBrowsing">
                <div id="adminTracks" class="1_3">
                    <h3>Tracks</h3>
                    <input type="image" src="imgs/create.png" id="createTrackBtn" class="adminCreateBtn">
                    <fieldset class="adminFieldset">
                        <legend>By artist name</legend>
                        <input type="text" id="adminTrackTxt" class="adminSearchTxt">
                        <input type="image" src="imgs/search.png" id="adminTracksBtn" value="Get Tracks" class="adminSearchBtn">
                    </fieldset>
                </div>
                <div id="adminAlbums" class="1_3">
                    <h3>Albums</h3>
                    <input type="image" src="imgs/create.png" id="createAlbumBtn" class="adminCreateBtn">
                    <fieldset class="adminFieldset">
                        <legend>By artist name</legend>
                        <input type="text" id="adminAlbumTxt" class="adminSearchTxt">
                        <input type="image" src="imgs/search.png" id="adminAlbumsBtn" value="Get Albums" class="adminSearchBtn">
                    </fieldset>
                </div>
                <div id="adminArtists" class="1_3">
                    <h3>Artists</h3>
                    <input type="image" src="imgs/create.png" id="createArtistBtn" class="adminCreateBtn">
                    <fieldset class="adminFieldset">
                        <legend>By artist name</legend>
                        <input type="text" id="adminArtistTxt" class="adminSearchTxt">
                        <input type="image" src="imgs/search.png" id="adminArtistsBtn" value="Get Artists" class="adminSearchBtn">
                    </fieldset>
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
                        <input type="submit" value="Update Track" class="updateBtn">
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
                        <input type="submit" value="Update Album" class="updateBtn">
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
                        <input type="submit" value="Update Artist" class="updateBtn">
                    </fieldset>
                </form>
            </div>
        </div>
        <div id="createTrackModal" class="modal">
            <div id="createTrackModalContent">
                <span class="closeForm">&times;</span>
                <form id="createTrackModalForm" method="POST">
                    <fieldset>
                        <legend>Create song</legend>
                        <label>Name</label>
                        <input type="text" name="name">
                        <label>AlbumId</label>
                        <input type="number" name="albumId">
                        <label>Composer</label>
                        <input type="text" name="composer">
                        <label>Length in milliseconds</label>
                        <input type="number" name="milliseconds">
                        <label>Bytes</label>
                        <input type="number" name="bytes">
                        <label>Price</label>
                        <input type="float" name="unitPrice">
                        <label>Mediatype</label>
                        <select name="mediaType">
                            <option value="1">MPEG audio file</option>
                            <option value="2">Protected AAC audio file</option>
                            <option value="3">Protected MPEG-4 video file</option>
                            <option value="4">Purchased AAC audio file</option>
                            <option value="5">AAC audio file</option>
                        </select>
                        <label>Genre</label>
                        <select name="genreId">
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
                        <input type="submit" value="Create Track" class="createBtn" id="trackFormSubmitBtn">
                    </fieldset>
                </form>
            </div>
        </div>
        <div id="createAlbumModal" class="modal">
            <div id="createAlbumModalContent">
                <span class="closeForm">&times;</span>
                <form id="createAlbumModalForm" method="POST">
                    <fieldset>
                        <legend>Create Album</legend>
                        <label>Title</label>
                        <input type="text" name="title">
                        <label>ArtistId</label>
                        <input type="number" name="artistId">
                        <input type="submit" value="Create Album" class="createBtn" id="albumFormSubmitBtn">
                    </fieldset>
                </form>
            </div>
        </div>
        <div id="createArtistModal" class="modal">
            <div id="createArtistModalContent">
                <span class="closeForm">&times;</span>
                <form id="createArtistModalForm" method="POST">
                    <fieldset>
                        <legend>Create Artist</legend>
                        <label>Name</label>
                        <input type="text" name="name">
                        <input type="submit" value="Create Artist" class="createBtn"  id="artistFormSubmitBtn">
                    </fieldset>
                </form>
            </div>
        </div>
        <div id="confirmTrackModal" class="modal">
            <div id="confirmTrackModalContent">
                <input type="image" src="imgs/accept.png" id="confirmTrackDelete" value="Confirm">
                <input type="image" src="imgs/cancel.png" id="cancelTrackDelete" value="Cancel">
            </div>
        </div>
        <div id="confirmAlbumModal" class="modal">
            <div id="confirmAlbumModalContent">
                <input type="image" src="imgs/accept.png" id="confirmAlbumDelete" value="Confirm">
                <input type="image" src="imgs/cancel.png" id="cancelAlbumDelete" value="Cancel">
            </div>
        </div>
        <div id="confirmArtistModal" class="modal">
            <div id="confirmArtistModalContent">
                <input type="image" src="imgs/accept.png" id="confirmArtistDelete" value="Confirm">
                <input type="image" src="imgs/cancel.png" id="cancelArtistDelete" value="Cancel">
            </div>
        </div>
        <?php
            }
            include_once("footer.htm");
        ?>
</html>