<?php
    // $tracks = [["name"=>"Song 1", "Length"=>"4min", "price"=>"$0.99"],
    //             ["name"=>"Song 2", "Length"=>"5min", "price"=>"$0.99"],
    //             ["name"=>"Song 3", "Length"=>"3min", "price"=>"$0.99"],
    //             ["name"=>"Song 4", "Length"=>"7min", "price"=>"$0.99"],
    //         ];
    // setcookie("tracks", serialize($tracks), time() + (86400 * 30), "/");
    echo "<pre>";
    if(isset($_COOKIE)){
        echo print_r( $_COOKIE);
    }
    echo "</pre>";

    // $newTrack = ["name"=>"New Song", "Length"=>"7min", "price"=>"$0.99"];

    // if(isset($_COOKIE["tracks"])){
    //     $tracks = unserialize($_COOKIE["tracks"]);
    //     array_push($tracks, $newTrack);
    //     setcookie("tracks", serialize($tracks), time() + (86400 * 30), "/");
    // }

?>