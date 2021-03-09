<?php

?>

<div id="projMeta"> <!--___________ Proj Meta ____________-->
  <div class="projMetaItem">
    <h2>Type</h2>
    <p><?php echo $project->getType() ?></p>
  </div>
  <div class="projMetaItem">
    <h2>Year</h2>
    <p><?php echo $project->getYear() ?></p>
  </div>
  <div class="projMetaItem">
    <h2>My Roles</h2>
    <ul>

      <?php 

        $roles = $project->getRoles();
        foreach ($roles as $role) {
            echo "<li>".$role->getName()."</li>";
        }

      ?>

    </ul>
  </div>
  <div class="projMetaItem">
    <h2>Team</h2>    
    <ul>
      
      <?php 

        $teammembers = $project->getTeammembers();

        foreach ($teammembers as $teammember) {
            echo "<li>".$teammember."</li>";
        }

      ?>

    </ul>
  </div>
</div>