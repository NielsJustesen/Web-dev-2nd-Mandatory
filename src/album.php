<?php



    require_once('connection.php');

    class Album extends DB {

        function Create(){

        }

        function Read(){

        }

        function BrowseAlbums($order, $name){

            switch ($order) {
                case 'title':
                    $query = <<<'SQL'
                        SELECT title FROM album WHERE title = ?;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute([$name]);
                    $results = $stmt->fetch();
                    $this->disconnect();
                    return $results;
                    break;
                    
                case 'artist':
                    $query = <<<'SQL'
                        SELECT title
                        FROM album
                        LEFT JOIN artist 
                        ON album.ArtistId = artist.ArtistId 
                        WHERE artist.Name = ?;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute([$name]);
                    $results = $stmt->fetchAll();
                    $this->disconnect();
                    return $results;
                    break;
            }
        }

        function Update(){

        }

        function Delete(){
            
        }
    }


?>