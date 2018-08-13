<?php
class nasabah{

    // database connection and table name
    private $conn;
    private $table_name = "nasabah";

    // object properties
    public $nsb_id;
    public $email;
    public $username;
    public $password;
    public $nama_lengkap;
    public $no_ktp;
    public $tgl_lahir;
    public $alamat;
    public $kode_rahasia;
    public $created;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    function read(){

        // select all query
        $query = "SELECT
                nsb_id,email,username,password,nama_lengkap,no_ktp,tgl_lahir,alamat,kode_rahasia,created
            FROM
                " . $this->table_name . "
            ORDER BY
                created DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

// create products
    function create(){

        // query to insert record
        $query = "INSERT INTO
                " . $this->table_name . "
            SET
                nsb_id=:nsb_id, email=:email, username=:username, password=:password, nama_lengkap=:nama_lengkap, no_ktp=:no_ktp, tgl_lahir=:tgl_lahir, alamat=:alamat, kode_rahasia=:kode_rahasia, created=:created";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->nsb_id=htmlspecialchars(strip_tags($this->nsb_id));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->password=htmlspecialchars(strip_tags($this->password));
        $this->nama_lengkap=htmlspecialchars(strip_tags($this->nama_lengkap));
        $this->no_ktp=htmlspecialchars(strip_tags($this->no_ktp));
        $this->tgl_lahir=htmlspecialchars(strip_tags($this->tgl_lahir));
        $this->alamat=htmlspecialchars(strip_tags($this->alamat));
        $this->kode_rahasia=htmlspecialchars(strip_tags($this->kode_rahasia));
        $this->created=htmlspecialchars(strip_tags($this->created));

        // bind values
        $stmt->bindParam(":nsb_id", $this->nsb_id);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":nama_lengkap", $this->nama_lengkap);
        $stmt->bindParam(":no_ktp", $this->no_ktp);
        $stmt->bindParam(":tgl_lahir", $this->tgl_lahir);
        $stmt->bindParam(":alamat", $this->alamat);
        $stmt->bindParam(":kode_rahasia", $this->kode_rahasia);
        $stmt->bindParam(":created", $this->created);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }

//// used when filling up the update products form
//    function readOne(){
//
//        // query to read single record
//        $query = "SELECT
//                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
//            FROM
//                " . $this->table_name . " p
//                LEFT JOIN
//                    categories c
//                        ON p.category_id = c.id
//            WHERE
//                p.id = ?
//            LIMIT
//                0,1";
//
//        // prepare query statement
//        $stmt = $this->conn->prepare( $query );
//
//        // bind id of products to be updated
//        $stmt->bindParam(1, $this->id);
//
//        // execute query
//        $stmt->execute();
//
//        // get retrieved row
//        $row = $stmt->fetch(PDO::FETCH_ASSOC);
//
//        // set values to object properties
//        $this->name = $row['name'];
//        $this->price = $row['price'];
//        $this->description = $row['description'];
//        $this->category_id = $row['category_id'];
//        $this->category_name = $row['category_name'];
//    }
//
//// update the products
//    function update(){
//
//        // update query
//        $query = "UPDATE
//                " . $this->table_name . "
//            SET
//                name = :name,
//                price = :price,
//                description = :description,
//                category_id = :category_id
//            WHERE
//                id = :id";
//
//        // prepare query statement
//        $stmt = $this->conn->prepare($query);
//
//        // sanitize
//        $this->name=htmlspecialchars(strip_tags($this->name));
//        $this->price=htmlspecialchars(strip_tags($this->price));
//        $this->description=htmlspecialchars(strip_tags($this->description));
//        $this->category_id=htmlspecialchars(strip_tags($this->category_id));
//        $this->id=htmlspecialchars(strip_tags($this->id));
//
//        // bind new values
//        $stmt->bindParam(':name', $this->name);
//        $stmt->bindParam(':price', $this->price);
//        $stmt->bindParam(':description', $this->description);
//        $stmt->bindParam(':category_id', $this->category_id);
//        $stmt->bindParam(':id', $this->id);
//
//        // execute the query
//        if($stmt->execute()){
//            return true;
//        }
//
//        return false;
//    }
//
//// delete the products
//    function delete(){
//
//        // delete query
//        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
//
//        // prepare query
//        $stmt = $this->conn->prepare($query);
//
//        // sanitize
//        $this->id=htmlspecialchars(strip_tags($this->id));
//
//        // bind id of record to delete
//        $stmt->bindParam(1, $this->id);
//
//        // execute query
//        if($stmt->execute()){
//            return true;
//        }
//
//        return false;
//
//    }
//
//// search products
//    function search($keywords){
//
//        // select all query
//        $query = "SELECT
//                c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
//            FROM
//                " . $this->table_name . " p
//                LEFT JOIN
//                    categories c
//                        ON p.category_id = c.id
//            WHERE
//                p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?
//            ORDER BY
//                p.created DESC";
//
//        // prepare query statement
//        $stmt = $this->conn->prepare($query);
//
//        // sanitize
//        $keywords=htmlspecialchars(strip_tags($keywords));
//        $keywords = "%{$keywords}%";
//
//        // bind
//        $stmt->bindParam(1, $keywords);
//        $stmt->bindParam(2, $keywords);
//        $stmt->bindParam(3, $keywords);
//
//        // execute query
//        $stmt->execute();
//
//        return $stmt;
//    }
}