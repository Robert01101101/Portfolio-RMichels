<?php

chdir('../');

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioWeb');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "TODO",
  "primaryLink" => "https://clirioview-viw-dev.azurewebsites.net/guest/f-aVQEv0LytBKHa8vARMx-Nl",
  "primaryLinkText" => "TODO",
  "secondaryLink" => "https://apps.microsoft.com/store/detail/clirio-view-desktop/9NB14S8DFWFP",
  "secondaryLinkText" => "TODO",
  "alt" => TRUE]);

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