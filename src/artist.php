<?php



    require_once('connection.php');

    class Artist extends DB {

        function Create(){

        }

        function Read(){

        }

        function BrowseArtists($order,$name){

            switch ($order) {
                case 'name':
                    $query = <<<'SQL'
                        SELECT Name
                        FROM artist
                        WHERE Name LIKE ?;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute(["%".$name."%"]);
                    $results = $stmt->fetchAll();
                    $this->disconnect();
                    return $results;
                    break;
                
                default:
                    $query = <<<'SQL'
                        SELECT Name FROM artist;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute();
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