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
    <h2>Goals</h2>
    <p>The primary goal of the portfolio website you're currently on, is to communicate to potential employers and partners, what my set of skills, experiences, and interests are. The secondary goal is to practice full-stack development, while avoiding reliance on frameworks wherever possible, in order to practice and showcase fundamental skills.<p>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Process</h2>
    <p>Before starting development, I first began by browsing the web for inspiring portfolios. I created a collection of links and based off this created a moodboard.<p>
  </section>

<?php

  Partial::build('footer');

?>