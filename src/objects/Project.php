<?php

require "src/objects/Role.php";

class Project
{
    protected $id;
    protected $slug;
    protected $name;
    protected $type;
    protected $year;
    protected $roles = []; 
    protected $teammembers = []; 


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
     * @return Project
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
     * @return Project
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }


    /**
     * @return mixed
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param mixed $title
     * @return Project
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

   /**
     * @return string
     */
    public function getYear(): string
    {
        return $this->year;
    }

    /**
     * @param mixed $title
     * @return Project
     */
    public function setYear($year)
    {
        $this->year = $year;
        return $this;
    }

    /**
     * @return string
     */
    public function getRoles(): array
    {
        return $this->roles;
    }

    /**
     * @param mixed $title
     * @return Project
     */
    public function addRole($role)
    {
        $this->roles[] = $role;
        return $this;
    }

    /**
     * @return string
     */
    public function getTeammembers(): array
    {
        return $this->teammembers;
    }

    /**
     * @param mixed $title
     * @return Project
     */
    public function addTeammember($teammember)
    {
        $this->teammembers[] = $teammember;
        return $this;
    }

    public static function buildProjectFromSlug(string $slug) : self {

        // 1. Set up MySQLi connection
        $DBHOST = "localhost";
        $DBUSER = "u596735338_u596735338";
        $DBPASS = "_6P_sgvxipYH,Sd";
        $DBNAME = "u596735338_robert_michels";
        $connection = mysqli_connect($DBHOST, $DBUSER, $DBPASS, $DBNAME);
        // Test if connection succeeded
        if(mysqli_connect_errno()) { die("Database connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")" ); }

        $output;


        //1 GET CORE
        $query = "SELECT * FROM project WHERE project.project_slug = '".$slug."'";
        $result = mysqli_query($connection, $query);


        while($row = mysqli_fetch_array($result))
        {
            $project_id = $row['project_id'];
            $project_name = $row['project_name'];
            $project_type = $row['project_type'];
            $project_year = $row['project_year'];
            $project_slug = $row['project_slug'];

            $output = (new Project($project_slug))
                            ->setId($project_id)
                            ->setName($project_name)
                            ->setType($project_type)
                            ->setYear($project_year)
                            ->setSlug( $project_slug);
        }

        //2 GET ROLES
        $query = "SELECT * FROM ((project INNER JOIN project_roles ON project.project_id = project_roles.project_id) INNER JOIN role ON project_roles.role_id = role.role_id) WHERE project.project_slug = '".$slug."'";
        $result = mysqli_query($connection, $query);


        while($row = mysqli_fetch_array($result))
        {
            $role = (new Role($row['role_slug']))
                            ->setName($row['role_name']);

            $output->addRole($role);
        }

        //3 GET TEAMMEMBERS
        $query = "SELECT * FROM ((project INNER JOIN project_teammembers ON project.project_id = project_teammembers.project_id) INNER JOIN teammember ON project_teammembers.teammember_id = teammember.teammember_id) WHERE project.project_slug = '".$slug."' ORDER BY teammember_lname ASC;";
        $result = mysqli_query($connection, $query);

        while($row = mysqli_fetch_array($result))
        {
            $output->addTeammember($row['teammember_fname']." ".$row['teammember_lname']);
        }

        // 4. Release returned data
        mysqli_free_result($result);
        // 5. Close database connection
        mysqli_close($connection);


        return $output;
    }

    public static function getProjectsByFilter(array $filters) : array {

        // 1. Set up MySQLi connection
        $DBHOST = "localhost";
        $DBUSER = "u596735338_u596735338";
        $DBPASS = "_6P_sgvxipYH,Sd";
        $DBNAME = "u596735338_robert_michels";
        $connection = mysqli_connect($DBHOST, $DBUSER, $DBPASS, $DBNAME);
        // Test if connection succeeded
        if(mysqli_connect_errno()) { die("Database connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")" ); }

        $output  = []; 


        //1 Filter
        $query = "SELECT * FROM ((project INNER JOIN project_roles ON project.project_id = project_roles.project_id) INNER JOIN role ON project_roles.role_id = role.role_id) WHERE role.role_slug = '".$filters[0]."'";

        if (count($filters) > 1){
            for ($i = 1; $i < count($filters); $i++) {
                $query .= " OR role.role_slug = '".$filters[$i]."'";
            }
        }

        //echo $query;
        
        $result = mysqli_query($connection, $query);

        //reduce to only slugs, clean up duplicates
        $slugs;
        while($row = mysqli_fetch_array($result))
        {
            $slugs[] = $row['project_slug'];
        }
        $slugs = array_values(array_unique($slugs));

        foreach ($slugs as $slug) {
            $output[] = Project::buildProjectFromSlug($slug);
        }

        // 4. Release returned data
        mysqli_free_result($result);
        // 5. Close database connection
        mysqli_close($connection);


        return $output;
    }

    public static function getAllProjects() : array {

        // 1. Set up MySQLi connection
        $DBHOST = "localhost";
        $DBUSER = "u596735338_u596735338";
        $DBPASS = "_6P_sgvxipYH,Sd";
        $DBNAME = "u596735338_robert_michels";
        $connection = mysqli_connect($DBHOST, $DBUSER, $DBPASS, $DBNAME);
        // Test if connection succeeded
        if(mysqli_connect_errno()) { die("Database connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")" ); }

        $output  = []; 


        //Get all slugs
        $query = "SELECT project_slug FROM project";
        $result = mysqli_query($connection, $query);


        while($row = mysqli_fetch_array($result))
        {
            $output[] = Project::buildProjectFromSlug($row['project_slug']);
            if (strcmp($row['project_slug'], 'harbingersOfDeath') === 0) break;
        }

        // 4. Release returned data
        mysqli_free_result($result);
        // 5. Close database connection
        mysqli_close($connection);


        return $output;
    }
}
