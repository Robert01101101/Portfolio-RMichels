<?php

require "src/Partial.php";
require "src/objects/Project.php";

// start session so that we can store logged in cookie
// session_start();

Partial::build('header', ["projects" => TRUE]);

$projects = Project::getProjects();

?>

<section  id="Projects">

    

    <div class="projectsFilter">

        <div>
          <h1>Filter Projects (<span id="projectCount"><?= count($projects) ?></span>)</h1>
            <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="and_or_switch" tabindex="0">
                <label class="onoffswitch-label" for="and_or_switch">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
            </div>
        </div>
        
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
      Partial::build('projectTile', ["slug" => $project->getSlug(), "name" => $project->getName(), "type" => $project->getType(), "inDevelopment" => $project->getInDevelopment(), "roles" => $project->getRoles()]);
    }

    echo "</div>";

  ?>


</section>


<?php

Partial::build('footer', ["projects" => TRUE]);

?>