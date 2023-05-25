<?php

chdir('../');

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioCloud');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A web-based collection of tools for managing workspaces in Clirio View. Includes a user dashboard, workspace and observation creation tools, and bing maps.",
  "primaryLink" => "https://cloud.clir.io/",
  "primaryLinkText" => "Try Clirio Cloud",
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