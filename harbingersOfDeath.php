<?php

require "src/Partial.php";
require "src/objects/Project.php";

Partial::build('header');

$project = Project::buildProjectFromSlug('harbingersOfDeath');

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "‘Are you going to die?’ compiles historic superstitions about death. This project satirizes present-day conspiracy theories, by presenting now-defunct superstitions as if they are real.",
  "primaryLink" => "http://harbingersofdeath.rmichels.com",
  "primaryLinkText" => "View Website"]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Task</h2>
    <p>The intent of this project was to practice back-end development, using the LAMP stack. Users can sign up to the site, interact with items on the site and are greeted by a customized homepage. The site features database driven content, secure authentication handling, and AJAX searching and filtering.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaSquare">
      <figure>
        <img src="assets/img/harbingersofdeath/screen-home.png">
        <figcaption class="center">Homepage</figcaption>
      </figure>
      <figure>
        <img src="assets/img/harbingersofdeath/screen-omen.png">
        <figcaption class="center">Omen Content Unit</figcaption>
      </figure>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Result</h2>
    <p>Harbingers of Death presents now-defunct omens sourced from an 1889 article as if they are real, as a satire of modern conspiracy theories. The Content Units are individual omens. They contain information about who is affected, what triggers the omen and the kind of scenario you would encounter them in. User’s can explore them through different taxonomies and by search.</p>
    <p>Visitors can filter the omens by who is at fault, who will die, and the aspect of life that they apply to. Visitors may also search omens using a text input.</p>
    <p>Website members sign in to keep track of which omens they have experienced, and who it indicates is going to die.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaSquare">
      <!--<figure>
        <img src="assets/img/harbingersofdeath/screen-search.png">
        <figcaption class="center">Search</figcaption>
      </figure>
      <figure>
        <img src="assets/img/harbingersofdeath/screen-filter.png">
        <figcaption class="center">Filter</figcaption>
      </figure>-->
      <figure>
        <img src="assets/img/harbingersofdeath/animated-form.gif" ignorelqip>
        <figcaption class="center">Form Styling (Accessible without JS)</figcaption>
      </figure>
      <figure>
        <img src="assets/img/harbingersofdeath/screen-member-home.png">
        <figcaption class="center">Member Homepage</figcaption>
      </figure>
    </div>
  </section>
  
</div>
    

<?php

  Partial::build('footer');

?>