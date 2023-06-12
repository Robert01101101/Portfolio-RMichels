<?php

chdir('../');

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('portfolio');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A full-stack website developed using the LAMP stack, utilizing Three.js and Sass.",
  "primaryLink" => "https://github.com/Robert01101101/Portfolio-RMichels",
  "primaryLinkText" => "GitHub",
  "alt" => FALSE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Overview</h2>
    <p>Hi<p>
  </section>

<?php

  Partial::build('footer');

?>