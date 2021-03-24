<?php

require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('cyberview');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A narrative-driven 2D platformer, which revolves around unit 241, an AI-equipped droid that gains conciousness. Using a range of available body mods, unit 241 has to fight enemies, solve puzzles, and escape the building.",
  "primaryLink" => "https://rmichels.itch.io/cyberview",
  "primaryLinkText" => "Itch.io",
  "secondaryLink" => "https://404teamnotfound561902897.wordpress.com/",
  "secondaryLinkText" => "Development Blog"]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Task</h2>
    <p>The goal of this project was to design and develop a fully-fledged game. The project was created in an advanced game design course, and we used the Unity game engine to develop the game.</p>
    
    <p>Cyberview is a 2D platformer, where you fight enemies and solve puzzles, using a range of body mods. But be careful! You can only equip up to three at a time, and each use depletes your energy. After all, you are still a robot and are bound by your robot body's limits.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaSquare">
        <figure onclick="viewImage(this)">
          <img src="assets/img/cyberview/lqip/screen-0.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/cyberview/lqip/screen-1.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/cyberview/lqip/screen-2.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/cyberview/lqip/screen-3.jpg">
        </figure>
      </div>
      <figcaption class="center">Screenshots from the game.</figcaption>
    </figure>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Result</h2>
    <h3>Mechanics</h3>
    <p>An important aspect of our design was the game mechanics. The most important two mechanics were the ability to swap body mods, and energy depletion when using body mods. Body mods include a drill, grappling hook, strong arms, gun, regular and super legs, as well as a jetpack.</p>
    
    <h3>Narrative</h3>
    <p>Unit 241 is an all-purpose android at the mega-factory Airsite. This factory uses androids, like Unit 241, to carry out all sorts of dangerous tasks. All androids come equipped with highly functional AI, but their cognitive abilities are inhibited to what is essential for their tasks. When 241 is damaged in a mine collapse, the android's intelligence inhibitor is shut off, allowing 241 to think freely. You get to explore the Airsite factory with 241 and overcome many challenges, while discovering what it means to be alive. Find a way out, and try to save the other bots!</p>
  </section>

  <!----- Content / Video ----->
  <div class="auto-resizable-iframe">
    <div>
      <iframe src="https://www.youtube.com/embed/cMnbb1hC0T4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>


</div>


<?php

  Partial::build('footer');

?>