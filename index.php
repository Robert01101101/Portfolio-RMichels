<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

Partial::build('header');

?>


<div class="downArrowWrapper"><div class="downArrow forceHide hide"  id="downArrow"><a data-scroll-to href="#MyWork" title="View Projects"><i class="fa-solid fa-chevron-down"></i></a></div></div>
<canvas id="threeModel"></canvas>
<!--<canvas class="cropCanvas"></canvas>-->
<div class="landingImageWrapper"><img src="assets/img/landingModel.png" id="landingModelImage"></img></div>
<div id="landingArea">
  <div class="row">
    <div class="col-50" id="landingText">
      <p><?php if (isset($_GET["greeting"])) {
                  echo _("Hi ".$_GET["greeting"].", <br>I'm Robert Michels.");
                } else {
                  echo _("Hi, I'm Robert Michels."); 
                }
                ?><br><?php echo _("I design and program"); ?><br><span
          class="txt-rotate"
          data-period="2000"
          data-rotate='["<?php echo _("full-stack apps.\", \"games.\", \"VR experiences.\", \"mobile apps.\", \"websites."); ?>"]'><?php echo _("digital media."); ?></span></p>
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
      $projects = Project::getProjects(6);

      //Delete cookie if no filter set (in case user manually typed in vanilla url)
      setcookie("visitorFilter", "", time() - 3600);
    }

    foreach ($projects as $project) {
      Partial::build('projectTile', ["slug" => $project->getSlug(), "name" => $GLOBALS['english'] ? $project->getName() : $project->getNameDe() , "type" => $GLOBALS['english'] ? $project->getType() : $project->getTypeDe(), "inDevelopment" => $project->getInDevelopment()]);
    }

  ?>

<!-- source: https://codepen.io/fliseno1k/pen/WNboLBy -->
<div class="seeMoreBtn">
  <a href="projects">
    <span><?php echo _("See More") ?></span>
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