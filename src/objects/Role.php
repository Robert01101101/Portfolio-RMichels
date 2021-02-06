<?php

class Role
{
    protected $id;
    protected $slug;
    protected $name;


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
    public function getSlug()
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

}
