<?php

if (isset($roles)){
  $roleString = "";
  foreach ($roles as $role) { $roleString .= $role->getSlug().","; }
  $roleString = substr($roleString, 0, -1);
}

?>

<div class="projRow projRow--visible" <?php if(isset($roles)) : ?>data-js='<?= $roleString; ?>'<?php endif; ?>>
  <div class="projPanel">
    <a href="<?= $slug; ?>">
      <img src="assets/img/<?= $slug; ?>.jpg">
      <div class="projJScontainer">
        <h2 class="projLabel"> <?= $name; ?> </h2>
        <h3 class="projMeta"> <?= $type; ?> </h3>
      </div>
    </a>
  </div>
</div>






