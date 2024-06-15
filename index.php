<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

Partial::build('header');

?>


<div class="downArrow"  id="downArrow"><a href="#MyWork" title="View Projects"><i class="fa-solid fa-chevron-down"></i></a></div>
<canvas id="threeModel"></canvas>
<!--<canvas class="cropCanvas"></canvas>-->
<img src="assets/img/landingModel.png" id="landingModelImage"></img>
<div id="landingArea">
  <div class="row">
    <div class="col-50" id="landingText">
      <p>Hi, I'm Robert Michels.<br>I <sp id="textDesign">design</sp> and <sp id="textProgram">program</sp><br><span
          class="txt-rotate"
          data-period="2000"
          data-rotate='["games.", "VR experiences.", "mobile apps.", "websites."]'>digital media.</span></p>
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

<script>
console.log("done");
</script>

<?php

Partial::build('footer', ["index" => TRUE]);

?>