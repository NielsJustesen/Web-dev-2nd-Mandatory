<?php 

    class User {
        public $customerId;
        public $firstName;
        public $lastName;
        public $email;
        public $company;
        public $address;
        public $city;
        public $state;
        public $country;
        public $postalCode;
        public $phone;
        public $fax;

        protected $pdo;

        //Connect to the database
        public function __construct() {
            
            $dsn = 'mysql:host=localhost; dbname=chinook_abridged; charset=utf8';
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ];

            try {
                $this->pdo = @new PDO($dsn, 'root', "", $options); 
            } catch (\PDOException $e) {
                echo 'Connection unsuccessful';
                die('Connection unsuccessful: ' . $e->getMessage());
                exit();
            }
        }

        //disconnect from the database
        public function disconnect() {
            $this->pdo = null;
        }


        

        function validate($email, $password){
            $query = <<<'SQL'
                SELECT * FROM customer WHERE email = ?;
            SQL;            
            $stmt = $this->pdo->prepare($query);
            $stmt->execute([$email]);
            if ($stmt->rowCount() < 1) {
                return false;
            }

            $result = $stmt->fetch();
            $this->customerId = $result["CustomerId"];
            $this->firstName = $result["FirstName"];
            $this->lastName = $result["LastName"];
            $this->email = $email;
            $this->company = $result["Company"];
            $this->address = $result["Address"];
            $this->city = $result["City"];
            $this->state = $result["State"];
            $this->country = $result["Country"];
            $this->postalCode = $result["PostalCode"];
            $this->phone = $result["Phone"];
            $this->fax = $result["Fax"];
            $this->disconnect();
            return (password_verify($password, $result['Password']));
        }

        function admin($password){
            $query =<<<'SQL'
                SELECT Password FROM admin
            SQL;
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch();
            return password_verify($password, $result["Password"]);
        }
    }
?>