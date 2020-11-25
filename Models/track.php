<?php



    require_once('connection.php');

    class Track extends DB {

        function Create(){

        }

        function Read($id){



            $query = <<<'SQL'
                SELECT movie_id, title, overview, release_date, runtime
                FROM movie 
                WHERE movie_id = ?;
            SQL;

            $stmt = $this->pdo->prepare($query);
            $stmt->execute([$id]);
            $results = $stmt->fetch();
        }

        function BrowseTracks($order, $name){

            switch($order){

                case "album":
                    $query = <<<'SQL'
                        SELECT track.Name
                        FROM track
                        LEFT JOIN album
                        ON track.AlbumId = album.AlbumId 
                        WHERE album.Title = ?;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute([$name]);
                    $results = $stmt->fetchAll();

                    $this->pdo->disconnect();

                    return $results;
                break;

                case "composer":
                    $query = <<<'SQL'
                        SELECT track.Name, track.Composer
                        FROM track
                        WHERE Composer LIKE  %?%;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute([$name]);
                    $results = $stmt->fetchAll();

                    $this->pdo->disconnect();

                    return $results;
                break;

                case "genre":
                    $query = <<<'SQL'
                        SELECT track.Name
                        FROM track
                        LEFT JOIN genre
                        ON track.GenreId = genre.GenreID
                        WHERE genre.Name = ?;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute([$name]);
                    $results = $stmt->fetchAll();

                    $this->pdo->disconnect()

                    return $results;
                break;

                case "artist":
                    $query = <<<'SQL'
                        SELECT track.Name
                        FROM track
                        LEFT JOIN album
                        ON track.AlbumId = album.AlbumId
                        LEFT JOIN artist
                        ON album.ArtistId = artist.ArtistId
                        WHERE artist.Name = ?;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute([$name]);
                    $results = $stmt->fetchAll();

                    $this->pdo->disconnect()

                    return $results;
                break;

                default:
                    $query = <<<'SQL'
                        SELECT Name FROM track
                        WHERE Name = ?;
                    SQL;

                    $stmt = $this->pdo->prepare($query);
                    $stmt->execute([$name]);
                    $results = $stmt->fetchAll();

                    $this->pdo->disconnect()

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