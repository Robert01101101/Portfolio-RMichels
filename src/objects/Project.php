<?php

require "src/objects/Role.php";

class Project
{
    protected $id;
    protected $slug;
    protected $name;
    protected $name_de;
    protected $type;
    protected $type_de;
    protected $year;
    protected $inDevelopment;
    protected $company;
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
     * @return string
     */
    public function getNameDe(): string
    {
        return $this->name_de;
    }

    /**
     * @param mixed $title
     * @return Project
     */
    public function setNameDe($name_de)
    {
        $this->name_de = $name_de;
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
     * @return mixed
     */
    public function getTypeDe(): string
    {
        return $this->type_de;
    }

    /**
     * @param mixed $title
     * @return Project
     */
    public function setTypeDe($type_de)
    {
        $this->type_de = $type_de;
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

    /**
     * @return bool
     */
    public function getInDevelopment(): bool
    {
        return $this->inDevelopment;
    }

    /**
     * @param mixed $bool
     * @return Project
     */
    public function setInDevelopment($inDevelopment)
    {
        $this->inDevelopment = $inDevelopment;
        return $this;
    }

    /**
     * @return string
     */
    public function getCompany(): string
    {
        return $this->company;
    }

    /**
     * @param mixed $string
     * @return Project
     */
    public function setCompany($company)
    {
        $this->company = $company;
        return $this;
    }

    public static function buildProjectFromSlug(string $slug) : self {
        include('nopublicaccess/auth.php');

        // 1. Set up MySQLi connection
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
            $project_name_de = $row['project_name_de'];
            $project_type = $row['project_type'];
            $project_type_de = $row['project_type_de'];
            $project_year = $row['project_year'];
            $project_slug = $row['project_slug'];
            $project_inDevelopment = $row['project_indevelopment'];
            $project_company = $row['project_company'];

            $output = (new Project($project_slug))
                            ->setId($project_id)
                            ->setName($project_name)
                            ->setNameDe($project_name_de)
                            ->setType($project_type)
                            ->setTypeDe($project_type_de)
                            ->setYear($project_year)
                            ->setSlug($project_slug)
                            ->setInDevelopment($project_inDevelopment)
                            ->setCompany($project_company);
        }

        //2 GET ROLES
        $query = "SELECT * FROM ((project INNER JOIN project_roles ON project.project_id = project_roles.project_id) INNER JOIN role ON project_roles.role_id = role.role_id) WHERE project.project_slug = '".$slug."' ORDER BY role.role_id ASC";
        $result = mysqli_query($connection, $query);


        while($row = mysqli_fetch_array($result))
        {
            $role = (new Role($row['role_slug']))
                            ->setName($row['role_name'])
                            ->setNameDe($row['role_name_de'])
                            ->setSlug($row['role_slug']);

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
        include('nopublicaccess/auth.php');

        // 1. Set up MySQLi connection
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

        $query .= "ORDER BY project.project_id ASC;";

        //echo $query;
        
        $result = mysqli_query($connection, $query);

        //reduce to only slugs, clean up duplicates
        $slugs;
        while($row = mysqli_fetch_array($result))
        {
            $slugs[] = $row['project_slug'];
        }
        if (isset ($slugs)){
            $slugs = array_values(array_unique($slugs));
            foreach ($slugs as $slug) {
                $output[] = Project::buildProjectFromSlug($slug);
            }
        } 

        // 4. Release returned data
        mysqli_free_result($result);
        // 5. Close database connection
        mysqli_close($connection);


        return $output;
    }

    public static function getProjects(int $count = 0) : array {
        include('nopublicaccess/auth.php');

        // 1. Set up MySQLi connection
        $connection = mysqli_connect($DBHOST, $DBUSER, $DBPASS, $DBNAME);
        // Test if connection succeeded
        if(mysqli_connect_errno()) { die("Database connection failed: " . mysqli_connect_error() . " (" . mysqli_connect_errno() . ")" ); }

        $output  = []; 


        //Get all slugs
        $query = "SELECT project_slug FROM project";
        $result = mysqli_query($connection, $query);

        if ($count != 0){
            $i = 0;

            while($row = mysqli_fetch_array($result))
            {
                if ($i>=$count) break;
                $output[] = Project::buildProjectFromSlug($row['project_slug']);
                $i++;
            }
        } else {
            while($row = mysqli_fetch_array($result))
            {
                $output[] = Project::buildProjectFromSlug($row['project_slug']);
            }
        }
        

        // 4. Release returned data
        mysqli_free_result($result);
        // 5. Close database connection
        mysqli_close($connection);


        return $output;
    }
}
