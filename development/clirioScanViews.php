<?php

chdir('../');

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioScanViews');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "TODO",
  "primaryLink" => "#",
  "primaryLinkText" => "TODO",
  "alt" => FALSE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>TODO</h2>
    <p>Content</p>
  </section>

</div>

<?php

  Partial::build('footer');

?>