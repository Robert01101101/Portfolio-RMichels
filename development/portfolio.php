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
    <p>The primary goal of the portfolio website you're currently on, is to communicate to potential employers and partners, what my set of skills, experiences, and interests are. The secondary goal is to practice full-stack development, while avoiding reliance on frameworks wherever possible, in order to practice and showcase fundamental skills. Other goals include sharing and participating with the design and developer communities, and trying out different technologies and ideas I'm interested in.<p>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Process</h2>
    <p>Before starting development, I first began by browsing the web for inspiring portfolios. I created a collection of links and based off this created a moodboard.<p>
  </section>

  <!----- Content / Figma ----->
  <div class="auto-resizable-iframe">
    <div>
    <iframe
      height="450"
      width="800"
      src="https://www.figma.com/embed?embed_host=astra&url=https://www.figma.com/file/xPdNmMgz0wm4pf0wcf1j8C/Portfolio?type=design&node-id=1%3A951&t=QGxHsmY0wqgq1XLX-1"
      allowfullscreen
    >
    </iframe>
    </div>
  </div>
  

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Outcome</h2>
    <p>While it is hard to measure the success of the communication goal, I believe based off analytics and interactions I've had, that having a web-presence has helped to share my ethos and work with the community.</p>
    <p>I learned a great deal about PHP, server configuration, safety practices in web development, and many other things while working on my portfolio, and it is an ongoing journey. I think I have been successful with my goal to practice and learn. However, I'm not sure whether my restriction to only fundamental skills and the avoidance of frameworks like React have been a good idea. It has definitely forced me to learn these fundamental skills thoroughly, but I think practicing modern frameworks would have sped up development, and helped me practice these equally important skills as well.</p>
    <p>I also had success with my other goals, for instance, I first tried to capture photogrammetry and render it with Three.js when I added the 3D avatar to the homepage. These technologies I started to learn about in the process, would later come in handy with my job at <a href="https://clir.io/" target="_blank">Clirio</a>, where photogrammetry scanning was a key part of the product, and the <a href="clirioScanShare">Clirio Scan Share</a> feature I worked on would render the captured photogrammetry scans in a 3D webviewer.<p>
  </section>

<?php

  Partial::build('footer');

?>