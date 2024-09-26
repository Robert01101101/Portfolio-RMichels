<?php

?>

<div id="projMeta"> <!--___________ Proj Meta ____________-->
  <div class="projMetaItem">
    <h2><?php echo _("Type"); ?></h2>
    <p><?php echo $GLOBALS['english'] ? $project->getType() : $project->getTypeDe() ?></p>
  </div>
  <div class="projMetaItem">
    <h2><?php echo _("Year"); ?></h2>
    <p><?php echo $project->getYear() ?></p>
  </div>
  <div class="projMetaItem skillsApplied">
    <h2><?php echo _("Skills Applied"); ?></h2>
    <ul>
      <?php 

        $roles = $project->getRoles();
        foreach ($roles as $role) {
            echo "<li>";
            echo $GLOBALS['english'] ? $role->getName() : $role->getNameDe();
            echo "</li>";
        }

      ?>
    </ul>
  </div>
  <div class="projMetaItem team">

    <?php if (empty($project->getCompany())): ?>
      <h2>Team</h2>
      <ul>
      <?php 

        
        $teammembers = $project->getTeammembers();
        if (empty($teammembers)) echo "<li>Personal Project</li>";

        foreach ($teammembers as $teammember) {
            echo "<li>".$teammember."</li>";
        }

      ?>
    </ul>
    <?php else: ?>
      <h2><?php echo _("Company"); ?></h2>
      <a href="https://clir.io/" target="_blank"><?php echo $project->getCompany() ?></a>
    <?php endif; ?>


   
    
  </div>
</div>