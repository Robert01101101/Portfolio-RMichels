<?php

require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('siar');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "Semester in Alternate Realities (SIAR) is a program in which interdisciplinary teams tackle real-world problems using xR technologies. With the design challenge of “VR4good”, we set out to create transformative experiences with a positive impact."]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>About the program</h2>
    <p>Semester in Alternate Realities (SIAR) was unlike any other course I took at my time at SFU. A team of two instructors set out with a small class to create extended reality (xR) projects that aim for a positive impact. While it was a great opportunity to learn VR design and development, the course stood out for its interdisciplinary and collaborative nature. Key takeaways from the course were soft skills such as agile project development, teambuilding, project pitching and presenting, as well as hard skills, such as Unity VR development. If you wanna find out more, check out this <a href="http://ispace.iat.sfu.ca/riecke/teaching/siar/" target="_blank" title="iSpace Lab: Semester in Alternate Realities">info page</a>. Finally, I’d like to thank our professors Bernhard Riecke and Patrick Pennefather for this great experience.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaGrid">
        <figure onclick="viewImage(this)">
          <img src="assets/img/siar/1.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/siar/2.jpg">
        </figure>
    </div>
    <figcaption>(L) The marshmallow challenge was one of the team building exercises we did. (R) Interdisciplinary collaboration features a lot of conceptual discussions.</figcaption>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Rising Waters</h2>
    <p>A VR project for the Oculus Go, that tackles the topic of climate change. Set in the future, the user gets to explore the city of Richmond, B.C., in the aftermath of a flood caused by rising sea levels.</p>
    <p>Rising Waters is a mostly passive experience for the Oculus Go headset. Due to the limiting 3DOF tracking of the Oculus Go combined with the sparse input interface, we created a simple walkthrough experience that follows a predefined track. Users can pause and unpause their walkthrough, and look around to explore the environment. At first, users are confronted with dozens of screens around them, which show clips related to global warming and its impacts. Then, they are dropped into a hypothetical future Richmond, which has been flooded due to rising sea levels. The user sees the world around them from the perspective of a surveying drone which has been deployed to collect probes and scan for human signals. This mission to collect data takes the user through Richmond suburban areas, under the SkyTrain, and finally onto a rooftop where an old radio is still giving off signals. Our hope is that the experience raises awareness for the problem of climate change, and deepens the understanding of what the potential local impact could be.</p>
  </section>

  <!----- Content / Video ----->
  <div class="auto-resizable-iframe">
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/mFMDWg2QdYU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <figcaption>Rising Waters project introduction, walkthrough & technical overview.</figcaption>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>FIT4U</h2>
    <p>A VR project for the Oculus Rift, that masquerades as a meditative fitness experience. After collecting a bit of personal information, we confront users with a dramatized hacking encounter, which is personalized to the user’s personal data.</p>
    <p>This project idea was initially developed in a smaller team, but later completed and polished by the entire class, in an exercise of hivemind collaboration. While there is a standalone version published to Itch.io, our final prototype requires manual operation. The process begins by signing up attendees to our showcase into time slots. A teammate and I would then begin searching the web for publicly available data of the user, typically by searching for their social media. Once the user arrives for their appointment, our teammate who plays a yoga instructor, would guide them into an isolated room and walk them into the experience in a very relaxing manner. Once in VR, users filled out a short form and then began a series of breathing and stretching exercises. Not before long, this is interrupted by the hacking event. The room around the user begins to flicker and collapses, to reveal that they’re in a virtual room, which displays the user’s personal data all around them. Inspired by the Matrix, we then provide them with two options: delete all of their data, or keep it. Depending on their choice, the experience either ends immediately, or they’re transported back into the fitness room, which is then overrun by personalized ads. The goal is that the experience helps users better understand what data they have made public and reflect whether they are comfortable with their approach to privacy.</p>
  </section>

  <!----- Content / Video ----->
  <div class="auto-resizable-iframe">
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/SX7YzMAc1OE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <figcaption>FIT4U project overview & showcase footage.</figcaption>
    </div>
  </section>

</div>



<?php

  Partial::build('footer');

?>