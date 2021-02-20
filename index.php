<?php

require "src/Partial.php";
require "src/objects/Project.php";

// start session so that we can store logged in cookie
// session_start();

Partial::build('header');

?>


<div class="downArrow"  id="downArrow"><a href="#MyWork"><i class="fas fa-chevron-down"></i></a></div>
<canvas id="threeModel"></canvas>
<!--<canvas class="cropCanvas"></canvas>-->
<img src="assets/img/lqip/landingModel.gif" id="landingModelImage"></img>
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

        $filter = $_GET['filter'];
        $filters [] = $filter;

        if (strpos($filter, ',') !== false) { 
          $filters = explode(',', $filter);
          
        }

        $projects = Project::getProjectsByFilter($filters);

        //if error in URL, get default
        if (isset($projects)) {
          if (empty($projects)) {
            $projects = Project::getProjects(5);
          } else {
            //Set cookie
            setcookie("visitorFilter", $filter);
          }
        }

    } else {
      $projects = Project::getProjects(5);

      //Delete cookie if no filter set (in case user manually typed in vanilla url)
      setcookie("visitorFilter", "", time() - 3600);
    }

    foreach ($projects as $project) {
      Partial::build('projectTile', ["slug" => $project->getSlug(), "name" => $project->getName(), "type" => $project->getType(), "inDevelopment" => $project->getInDevelopment()]);
    }

  ?>

<!-- source: https://codepen.io/fliseno1k/pen/WNboLBy -->
<div class="seeMoreBtn">
  <a href="projects">
    <span>See More</span>
    <div class="liquid"></div>
  </a>
</div>


</section>

<section class="sectionText">
  <h1 id="About">About Me</h1>
  <p>I’m Robert Michels, a designer and developer from Vancouver. I attended Simon Fraser University (SFU), where I earned my Bachelor’s Degree in Science with a major in Interactive Arts & Technology. My inexhaustible curiosity has made me a jack of all trades, who’s specialized in designing and developing games and websites.</p>
  <h2>Skills</h2>
  <div class="skills">
    <div>
      <h3>Design Skills</h3>
      <ul>
        <li>UX Design</li>
        <li>UI Design</li>
        <li>Game Design</li>
        <li>VR Ix Design</li>
      </ul>
    </div><div>
      <h3>Development Skills</h3>
      <ul>
        <li>Web Front-End</li>
        <li>Web Back-End</li>
        <li>Game Dev</li>
        <li>VR Dev</li>
        <li>Java</li>
        <li>D3.js</li>
        <li>Three.js</li>
      </ul>
    </div><div>
      <h3>Other Skills</h3>
      <ul>
        <li>Project Management</li>
        <li>3D Modelling</li>
        <li>CAD Modelling</li>
      </ul>
    </div>
  </div>
</section>

<script>
console.log("done");
</script>

<?php

Partial::build('footer', ["index" => TRUE]);

?>