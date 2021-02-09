<?php

require "src/Partial.php";
require "src/objects/Project.php";

// start session so that we can store logged in cookie
// session_start();

Partial::build('header');

?>


<a href="#MyWork"><i class="fas fa-chevron-down"></i></a>
<canvas id="threeModel"></canvas>
<div id="landingArea">
  <div class="row">
    <div class="col-50" id="landingText">
      <p>Hi, I'm Robert Michels.<br>I <sp id="textDesign">design</sp> and <sp id="textProgram">program</sp><br><span
  class="txt-rotate"
  data-period="2000"
  data-rotate='[ "mobile apps.", "websites.", "games.", "VR experiences."]'>digital media.</span></p>
    </div>
  </div>
</div>
<section class="sectionMedia" id="MyWork">

  <?php

    $projects = []; 

    //check if filter set
    if(isset($_GET['filter']))
    {

        // Filter is set
        //echo "filter is set";
        //echo "<br>";

        $filter = $_GET['filter'];
        $filters [] = $filter;

        if (strpos($filter, ',') !== false) { 
          $filters = explode(',', $filter);
          //print_r($filters);
          
        }

        

        //echo "<br>";

        /*
        switch ($filter) {
          case 'front-end':
              echo "switch: front-end";
              break;
          case 'vr':
              echo "switch: vr";
              break;
          case 'game-dev':
              echo "switch: game-dev";
              break;
          default:
              echo "Error: faulty URL";
              break;
        }*/

        

        $projects = Project::getProjectsByFilter($filters);

        //echo count($projects);
    } else {
      $projects = Project::getAllProjects();
    }

    foreach ($projects as $project) {
      Partial::build('projectTile', ["slug" => $project->getSlug(), "name" => $project->getName(), "type" => $project->getType()]);
    }

  ?>

  <!--<div class="projRow">
    <div class="projPanel">
      <a href="amae">
        <img src="assets/img/Amae.jpg">
        <div class="projJScontainer">
          <h2 class="projLabel">Amae</h2>
          <h3 class="projMeta">UX / UI Design</h3>
        </div>
      </a>
    </div>
  </div>
  <div class="projRow">
    <div class="projPanel">
      <a href="cyberview">
        <img src="assets/img/Cyberview.jpg">
        <div class="projJScontainer">
          <h2 class="projLabel">Cyberview</h2>
          <h3 class="projMeta">2D Game</h3>
        </div>
      </a>
    </div>
  </div>
  <div class="projRow">
    <div class="projPanel">
      <a href="risingWaters">
        <img src="assets/img/RisingWaters.jpg">
        <div class="projJScontainer">
          <h2 class="projLabel">Rising Waters</h2>
          <h3 class="projMeta">VR Experience</h3>
        </div>
      </a>
    </div>
  </div>
  <div class="projRow">
    <div class="projPanel">
      <a href="chromakey">
        <img src="assets/img/Chromakey.jpg">
        <div class="projJScontainer">
          <h2 class="projLabel">Chromakey &<br>Color Matching</h2>
          <h3 class="projMeta">Java App</h3>
        </div>
      </a>
    </div>
  </div>
  <div class="projRow">
    <div class="projPanel">
      <a href="harbingersofdeath">
        <img src="assets/img/HarbingersOfDeath.jpg">
        <div class="projJScontainer">
          <h2 class="projLabel">Harbingers Of Death</h2>
          <h3 class="projMeta">Full-stack Website (LAMP)</h3>
        </div>
      </a>
    </div>
  </div>-->
</section>

<section class="sectionText">
  <h1 id="About">About Me</h1>
  <p>I am a digital media designer hailing from Stuttgart, Germany and Vancouver, Canada. I attended Simon Fraser University, where I earned my Bachelor’s Degree of Science, majoring in Interactive Arts & Technology.<br><br>With a strong interdisciplinary background, I am interested in the design and development of interactive systems - such as games and websites. My curiosity has allowed me to apply my skills and gain more experience with plenty of platforms. These include Unity and C# for the development of games for VR, phones and desktop. I also have experience with fullstack development of websites and apps, such as using the LAMP development stack.<br><br>I am currently looking for jobs. If you are interested, please shoot me a message!</p>
</section>
<section class="sectionText">
  <h2 id="Contact">Contact:</h2>
  <p>Etiam pulvinar eget ligula sit amet sollicitudin. Aliquam sed risus metus. Morbi dapibus tristique sapien luctus molestie. Phasellus sit amet molestie ipsum, id convallis dolor.</p>
</section>

<?php

Partial::build('footer');

?>