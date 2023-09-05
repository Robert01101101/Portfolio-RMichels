<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('harbingersOfDeath');

Partial::build('header', ["project" => $project]);

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
      <figure onclick="viewImage(this)">
        <img src="assets/img/harbingersofdeath/lqip/screen-home.jpg">
        <figcaption class="center">Homepage</figcaption>
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/harbingersofdeath/lqip/screen-omen.jpg">
        <figcaption class="center">Omen Content Unit</figcaption>
      </figure>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Result</h2>
    <p>Harbingers of Death presents now-defunct omens sourced from an 1889 article as if they are real, as a satire of modern conspiracy theories. The Content Units are individual omens. They contain information about who is affected, what triggers the omen, and the kind of scenario you would encounter them in. Users can explore them through different taxonomies and by search.</p>
    <p>Visitors can filter the omens by who is at fault, who will die, and the aspect of life that they apply to. Visitors may also search omens using a text input.</p>
    <p>Website members sign in to keep track of which omens they have experienced, and whom it indicates is going to die.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaSquare">
      <!--<figure onclick="viewImage(this)">
        <img src="assets/img/harbingersofdeath/lqip/screen-search.jpg">
        <figcaption class="center">Search</figcaption>
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/harbingersofdeath/lqip/screen-filter.jpg">
        <figcaption class="center">Filter</figcaption>
      </figure>-->
      <figure onclick="viewImage(this)">
        <img src="assets/img/harbingersofdeath/lqip/animated-form.jpg" lqip-gif>
        <figcaption class="center">Form Styling (ARIA-friendly)</figcaption>
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/harbingersofdeath/lqip/screen-member-home.jpg">
        <figcaption class="center">Member Homepage</figcaption>
      </figure>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Code</h2>
    <p>A crucial element for the success of this project was the separation of views and logic. This allowed us to write very clean code. For instance, when I implemented the individual omen's content pages, I seperated code responsible for displaying the page from the code that deals with retrieving and organizing data. At runtime, when the omen route is processed in <code>index.php</code>, the code constructs an <code>Omen</code> instance using <code>OmenCollection.php</code>, and passes this instance to the page view <code>omen.php</code>.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <script src="https://gist.github.com/robert-michels/6af2a14f9fd4d08094ef29c3dc8bcd6b.js"></script>
    <script src="https://gist.github.com/robert-michels/c64698d770388ce87b755a84a700070e.js"></script>
    <script src="https://gist.github.com/robert-michels/3a1012cb7637403a0287918880e163ed.js"></script>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <p>An interesting challenge was the implementation of floating labels for text inputs. These labels appear like placeholder text until the user enters text into the text input, at which point the labels are shrunk and positioned above the input, like a traditional label. The challenge was making sure that there is no compromise of function for form. As a result, labels and inputs are separate DOM objects, and the form is ARIA-friendly.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <script src="https://gist.github.com/robert-michels/27652e3e6cb30ac861fd8be6895d80df.js"></script>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <p>For this project I was also responsible for setting up our database, as well as all database queries. I designed the database with the following tables: user (to store user information), user_omen (an associative table to store which omens a user encountered), omen (to store information about each omen) and three taxonomy tables: aspect, death and fault (for tagging omens). The only two tables that can be modified through our website are the user and user_omen tables. The omen and taxology tables on the other hand are static.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaColumn">
      <figure onclick="viewImage(this)">
        <img src="assets/img/harbingersofdeath/lqip/db.jpg">
        <figcaption class="center">ER Diagram of our database.</figcaption>
      </figure>
    </div>
  </section>
  
</div>
    

<?php

  Partial::build('footer');

?>