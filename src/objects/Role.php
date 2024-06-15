<?php

class Role
{
    protected $id;
    protected $slug;
    protected $name;
    protected $name_de;


    public function __construct($slug)
    {
        $this->$slug = $slug;
        return $this;

    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return Project
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * @param mixed $slug
     * @return Role
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param mixed $title
     * @return Role
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getNameDe(): string
    {
        return $this->name_de;
    }

    /**
     * @param mixed $title
     * @return Role
     */
    public function setNameDe($name_de)
    {
        $this->name_de = $name_de;
        return $this;
    }

    /**
     * @return array
     */
    public static function getAllRoles(): array
    {
        include('nopublicaccess/auth.php');

        // 1. Set up MySQLi connection
        $connection = mysqli_connect($DBHOST, $DBUSER, $DBPASS, $DBNAME);
        // Test if connection succeeded
        if(mysqli_connect_errno()) { die("Database connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")" ); }

        $output  = []; 


        //Get all slugs
        $query = "SELECT * FROM role";
        $result = mysqli_query($connection, $query);

        while($row = mysqli_fetch_array($result))
        {
            $output[] = (new Role($row['role_slug']))
                                ->setName($row['role_name'])
                                ->setNameDe($row['role_name_de'])
                                ->setSlug($row['role_slug']);
        }

        // 4. Release returned data
        mysqli_free_result($result);
        // 5. Close database connection
        mysqli_close($connection);


        return $output;
    }

}
