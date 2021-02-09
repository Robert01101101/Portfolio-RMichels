<?php

require "src/Partial.php";
require "src/objects/Project.php";

// start session so that we can store logged in cookie
// session_start();

Partial::build('header');

$projects = Project::getProjects();

?>

<section  id="Projects">

    <h1>Filter Projects (<span id="projectCount"><?= count($projects) ?></span>)</h1>

    <div class="projectsFilter">
        
        <?php

            $roles = Role::getAllRoles();

            foreach ($roles as $role) {
                echo "<button class='filterBtn' data-js='".$role->getSlug()."'>";
                echo $role->getName();
                echo "</button>";
            }

        ?>
    </div>

    <?php

    echo "<div id='projectTileHidden'>";
    echo "</div>";
    echo "<div id='projectTileVisible'>";

    foreach ($projects as $project) {
      Partial::build('projectTile', ["slug" => $project->getSlug(), "name" => $project->getName(), "type" => $project->getType(), "roles" => $project->getRoles()]);
    }

    echo "</div>";

  ?>


</section>


<?php

Partial::build('footer', ["projects" => TRUE]);

?>