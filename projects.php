<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

Partial::build('header', ["projects" => TRUE]);

$projects = Project::getProjects();

?>

<section  id="Projects">

    

    <div class="projectsFilter">

        <div>
          <h1><?php echo _("Filter Projects"); ?> (<span id="projectCount"><?= count($projects) ?></span>)</h1>
            <!--<div class="onoffswitch"> Disabled On Off Switch for now, didn't look good and overcomplicated, OR seems good as default
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="and_or_switch" tabindex="0">
                <label class="onoffswitch-label" for="and_or_switch">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
            </div>-->
        </div>
        
        <?php
            $roles = Role::getAllRoles();

            foreach ($roles as $role) {
                echo "<button class='filterBtn' data-js='".$role->getSlug()."'>";
                echo $GLOBALS['english'] ? $role->getName() : $role->getNameDe();
                echo "</button>";
            }
        ?>
    </div>

    

    <?php

    echo "<div id='projectTileHidden'>";
    echo "</div>";
    echo "<div id='projectTileVisible'>";

    foreach ($projects as $project) {
      Partial::build('projectTile', ["slug" => $project->getSlug(), "name" => $GLOBALS['english'] ? $project->getName() : $project->getNameDe() , "type" => $GLOBALS['english'] ? $project->getType() : $project->getTypeDe(), "inDevelopment" => $project->getInDevelopment(), "roles" => $project->getRoles()]);
    }

    echo "</div>";

  ?>


</section>


<?php

Partial::build('footer', ["projects" => TRUE]);

?>