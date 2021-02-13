<?php

require "src/Partial.php";
require "src/objects/Project.php";

// start session so that we can store logged in cookie
// session_start();

Partial::build('header');

?>


<div class="downArrow"><a href="#MyWork"><i class="fas fa-chevron-down"></i></a></div>
<canvas id="threeModel"></canvas>
<canvas class="cropCanvas"></canvas>
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
      Partial::build('projectTile', ["slug" => $project->getSlug(), "name" => $project->getName(), "type" => $project->getType()]);
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
  <p>I am a digital media designer hailing from Stuttgart, Germany and Vancouver, Canada. I attended Simon Fraser University, where I earned my Bachelor’s Degree of Science, majoring in Interactive Arts & Technology.<br><br>With a strong interdisciplinary background, I am interested in the design and development of interactive systems - such as games and websites. My curiosity has allowed me to apply my skills and gain more experience with plenty of platforms. These include Unity and C# for the development of games for VR, phones and desktop. I also have experience with fullstack development of websites and apps, such as using the LAMP development stack.<br><br>I am currently looking for jobs. If you are interested, please shoot me a message!</p>
</section>
<section class="sectionText">
  <h2 id="Contact">Contact:</h2>
  <p>Etiam pulvinar eget ligula sit amet sollicitudin. Aliquam sed risus metus. Morbi dapibus tristique sapien luctus molestie. Phasellus sit amet molestie ipsum, id convallis dolor.</p>
</section>

<script>
console.log("done");
</script>

<?php

Partial::build('footer', ["index" => TRUE]);

?>