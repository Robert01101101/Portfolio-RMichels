<?php

?>

<a href="#"><i class="fas fa-chevron-down"></i></a>
<div id="projLanding"> <!--___________ Proj Landing ____________-->
  <div class="row">
    <div class="col-50">
      <div class="landingText">
        <h1><?php echo $project->getName() ?></h1>
        <p>Amae is a utility app for busy parents. Amae helps parents to manage their time, learn about parenting and get help easily and quickly.</p>
        <br>
        <a href="//amae.rmichels.com/" target="_blank">View on Website  &#8594;</a>
      </div> 
    </div>
    <div class="col-50">
      <img src="assets/img/<?php echo $project->getSlug() ?>.jpg" class="imgBG alt">
      <img src="assets/img/<?php echo $project->getSlug() ?>.jpg">
    </div>
  </div>
</div>