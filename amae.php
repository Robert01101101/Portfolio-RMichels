<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('amae');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" =>  _("Amae is a utility app for busy parents. Amae helps parents to manage their time, learn about parenting and get help easily and quickly."),
  "primaryLink" => "https://www.figma.com/proto/MTkTlvyHoJziDU2ZnpaCSs/334_Stage5_v2?node-id=2%3A2849&viewport=422%2C1134%2C0.19956186413764954&scaling=contain",
  "primaryLinkText" => "Interactive Mockup",
  "secondaryLink" => "http://amae.rmichels.com/",
  "secondaryLinkText" => "Product Website",
  "alt" => TRUE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("The Task"); ?></h2>
    <p><?php echo _("This project was a design exercise to create a user interface mockup. It was created for an interface design course that focused on goal-oriented design. Consequently, a big part of the project was identifying user needs within a particular domain, and designing a product that helps the users achieve their goals."); ?></p>
    
    <p><?php echo _("Our domain was that of young parents. With our design, we tried to create an app that helps parents coordinate their parenting tasks, as well as get help easily and quickly when in need."); ?></p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaRow mediaRow-zigzag">
      <figure onclick="viewImage(this)">
        <img src="assets/img/amae/lqip/Screen_Dashboard.png">
        <figcaption class="center">Dashboard</figcaption>
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/amae/lqip/Screen_Nanny.png">
        <figcaption class="center">Nanny</figcaption>
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/amae/lqip/Screen_Learn.png">
        <figcaption class="center">Learn</figcaption>
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/amae/lqip/Screen_Chat.png">
        <figcaption class="center">Chat</figcaption>
      </figure>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("The Result"); ?></h2>
    <h3>Dashboard</h3>
    <p><?php echo _("The dashboard helps parents with their most frequent tasks. Parents can coordinate recurring tasks, such as diaper changes, as well as scheduled events, such as doctor appointments."); ?></p>

    <h3>Nanny</h3>
    <p><?php echo _("With the nanny feature, users can browse for and book nearby nannies. Their profiles show ratings and reviews, their skills, and more information. Users can also easily rebook previously booked nannies."); ?></p>

    <h3>Learn</h3>
    <p><?php echo _("Learn features curated articles, relevant news as well as community discussions. This helps parents as well as nannies learn more about child-rearing and provides a parenting community to engage with."); ?></p>

    <h3>Chat</h3>
    <p><?php echo _("The chat feature doubles as an easy way to stay in touch with other caretakers, as well as a way to organize. Through chat, parents can assign tasks to each other, as well as book and manage an appointment with a nanny."); ?></p>
  </section>

   <!----- Content / Media ----->
   <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaSquare">
        <figure onclick="viewImage(this)">
          <img src="assets/img/amae/lqip/process-scroll.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/amae/lqip/process-modality.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/amae/lqip/process-styleguide.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/amae/lqip/process-components.jpg">
        </figure>
      </div>
      <figcaption><?php echo _("Design artifacts that detail components of our design & define a clear styleguide to achieve consistency."); ?></figcaption>
    </figure>
  </section>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("Process"); ?></h2>
    <p><?php echo _("The project was developed in 4 months by a team of 5. I was the project manager, as well as one of the UX and UI designers. Our process began with brief domain brainstorming, followed by an ethnography study to better understand our users. After coming up with personas and multiple concept ideas, we focused on Amae. We then designed our product. For this, we designed many artifacts, such as flowcharts, wireframes, user journey maps, interaction patterns, and a style guide. In the last stages, we performed user testing and refinement. An outcome of this was that we dropped a health feature we had previously planned to include. Finally, we created a product website to present our final design."); ?></p>
    
    <h3><?php echo _("Challenges"); ?></h3>
    <p><?php echo _("One of our core challenges throughout the design process was making the app safe. One of our solutions was the design of the nanny experience. Nannies can learn and get certified through the Learn feature. Their thorough profiles feature ratings, reviews, and skills, to allow parents to find the best nanny for their needs. Parents can see what tasks a nanny has completed, call them at any time, and report a nanny. These features aim to maximize transparency to create a safe experience."); ?></p>
  </section>

<!----- Content / Media ----->
<section class="sectionMedia">
  <div class="divText">
      <h2><?php echo _("Result & Design Artifacts"); ?></h2>
      <p><?php echo _("You can try the interactive mockup below, and take a look at the file itself. We got very positive feedback and were satisfied with our final result, the journey we took to get there, and the things we learned along the way."); ?></p>
  </div>
  <div class="mediaColumn mediaColumn-fullWidth">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth mediaRow-equalHeight">
        <iframe
          height="1000"
          width="100%"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FMTkTlvyHoJziDU2ZnpaCSs%2F334_Stage5_v2%3Ftype%3Ddesign%26node-id%3D2%253A88%26t%3DeBrLfv2OywkqzBGQ-1" 
          allowfullscreen
        >
        </iframe>
        <iframe
          height="1000"
          width="100%"
          src="https://www.figma.com/embed?embed_host=astra&url=https://www.figma.com/proto/MTkTlvyHoJziDU2ZnpaCSs/334_Stage5_v2?node-id=2%3A2849&viewport=422%2C1134%2C0.19956186413764954&scaling=contain"
          allowfullscreen
        >
        </iframe>
      </div>
    </figure>

    <div class="divText">
      <h3><?php echo _("Design Artifacts"); ?></h3>
      <p><?php echo _("Below are a selection of various design artifacts from this project. These represent many stages of our process, from researching our audience and their needs, to planning out UX flows and wireframes, to our final presentation of the mockup via a fictional product website, which was created in a 2 day sprint."); ?></p>
  </div>

    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth mediaRow-equalHeight mediaRow-maxHeightMd">
        <figure onclick="viewImage(this)">
        <img src="<?php echo $GLOBALS['d'];?>assets/img/amae/lqip/personaChristina.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/amae/stage3WireflowsSimplified.jpg">
        </figure>
      </div>
    </figure>

    <figure ignorecarousel>
      <div class="mediaRow">
        <figure onclick="viewImage(this)">
          <img src="assets/img/amae/lqip/site-home.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/amae/lqip/site-taskboard.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/amae/lqip/site-concept.jpg">
        </figure>
      </div>
    </figure>
    </div>
  </section>
</div>

<?php

  Partial::build('footer');

?>