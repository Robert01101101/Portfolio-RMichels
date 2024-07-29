<?php

if (isset($roles)){
  $roleString = "";
  foreach ($roles as $role) { $roleString .= $role->getSlug().","; }
  $roleString = substr($roleString, 0, -1);
}

?>

<div class="projRow projRow--visible" <?php if(isset($roles)) : ?>data-js='<?= $roleString; ?>'<?php endif; ?>>
  <div class="projPanel <?php if ($inDevelopment) echo "inDevelopment" ?>">
    <a href="<?php echo ($inDevelopment ? 'development/' . $slug : $slug) ?>" title="<?= $name; ?>">
      <img src="<?php echo $GLOBALS['d'];?>assets/img/lqip/<?= $slug; ?>.jpg" loading="lazy" alt="<?= $name; ?>" <?php if ($inDevelopment) echo "class='inDevelopment'" ?>>
      <?php if ($inDevelopment) echo "<div class='inDevelopmentText'>In Development</div>" ?>
      <div class="projJScontainer">
        <h2 class="projLabel" data-scroll data-scroll-speed="1.8"> <?= $name; ?> </h2>
        <h3 class="projMeta"> <?= $type; ?> </h3>
      </div>
    </a>
  </div>
</div>






