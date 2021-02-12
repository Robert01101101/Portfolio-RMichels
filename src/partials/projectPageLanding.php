<?php

?>

<a href="#"><i class="fas fa-chevron-down"></i></a>
<div id="projLanding"> <!--___________ Proj Landing ____________-->
  <div class="row">
    <div class="col-50">
      <div class="landingText">
        <h1><?php echo $project->getName() ?></h1>
        <p><?php if (isset($description)) echo $description ?></p>
        <br>
        <?php 
          if (isset($primaryLink)) echo '<a href="'.$primaryLink.'" target="_blank">'.$primaryLinkText.'  &#8594;</a>';
          if (isset($secondaryLink)) echo '<a href="'.$secondaryLink.'" target="_blank">'.$secondaryLinkText.'  &#8594;</a>';
        ?>
      </div> 
    </div>
    <div class="col-50">
      <img src="assets/img/<?php echo $project->getSlug() ?>.jpg" class="imgBG alt">
      <img src="assets/img/<?php echo $project->getSlug() ?>.jpg">
    </div>
  </div>
</div>