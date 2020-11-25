<?php
    require_once("track.php");

    $track = new Track;

    print_r($track->BrowseTracks("artist", "AC/DC"));
?>