<?php

    header('Content-Type:application/json');
    header('Accept-version:v1');
    
    if(isset($_POST['entity']) && isst($_POST['action'])){

        $entity = $_POST['entity'];
        $action = $_POST['action'];

        switch ($entity) {
            case 'track':
                require_once("Models/track.php");
                $track = new Track;

                switch ($action) {
                    case 'search':
                            if(isset($_POST['searchText']) && isset($_POST['order'])){
                                echo json_encode($track->BrowseTracks($_POST['order'], $_POST['searchText']));
                            }
                        break;
                    
                    default:
                        break;
                }
                break;

            case 'album':
                switch ($action) {
                    case 'search':
                        break;
                    
                    default:
                        break;
                }
                break;

            case 'artist':
                switch ($action) {
                    case 'search':
                        break;
                    
                    default:
                        break;
                }
                break;
            
            default:
               
                break;
        }
    }





?>