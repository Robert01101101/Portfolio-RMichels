<?php

chdir('../');

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioScanViews');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A collection of features in the Clirio View apps for loading and viewing photogrammetry scans. Includes on-map, AR, comparison, and other views.",
  "primaryLink" => "https://clir.io/",
  "primaryLinkText" => "Clir.io",
  "alt" => FALSE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Overview</h2>
    <p>One of the key features of the Clirio product suite is the capability to capture photogrammetry scans with LiDAR enabled iOS devices, and then manage and view those scans. Captured scans can be viewed on-map, they can be always-on as an integral part of the map, or they can be viewed in scan view mode which comes with measure, comparison, and AR capabilities depending on the platform. In AR view, the scan can be scaled to 1m³ or 1:1 scale, or freely manipulated with hand manipulation. On iOS and Desktop, the view is controlled by touch or mouse inputs. Comparison views feature side-by-side, swipe, and overlay modes.</p>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth mediaRow-equalHeight">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/lqip/clirioScanViews.jpg">
          <figcaption>On-Map View (Desktop)</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanViews/lqip/bridgeScanView.jpg">
          <figcaption>Scan View (Desktop)</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanViews/scanComparison.gif" ignorelqip>
          <figcaption>Scan View Comparison Mode (Desktop)</figcaption>
        </figure>
      </div>
    </figure>
  </section>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Development</h2>
    <p>The scan views have been continously worked on from 2021 to 2023. In that timeframe I was responsible for setting up most of the logic and views involved. My teammates <a href="https://github.com/timothyt" target="_blank">Timothy Thibault</a>, <a href="https://www.linkedin.com/in/toniostillman" target="_blank">Tonio Stillman</a>, <a href="https://www.behance.net/wischj82b8/projects" target="_blank">Jordan Wischmann</a>, and <a href="https://www.linkedin.com/in/merdemgunay" target="_blank">Erdem Gunay</a> also made contributions. My contributions started with the beginning of the Clirio View project, which was an app developed on the foundation of the older Ada Viewer app.</p>
    <p>The initial set of requirements were the loading and viewing of scans in a scan view mode (no map), which would be supported in AR on the HoloLens 2, and in 3D non-AR on iOS. Once these core functionalities had been implemented, one of the most important additions were the comparison and measure modes. An important workflow supported by the Clirio View apps is the analysis and monitoring of construction sites, for which scan comparisons help detect differences, and scan measurements help understand scale.</p>
    <p>Later, other features were added, such as viewing scans on-map, more viewing tools such as free hand manipulation in XR, and more comparison modes such as the overlay mode which fades the transparencies on XR, and the swipe comparison view on iOS which crops the viewports.</p>
  </section>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Challenges</h2>
    <p>The scan views had a clear primary challenge: complexity.</p>
    <p>One of the biggest challenges has been the many different UX flows, platforms, features, and states which have been expanded slowly over time. Particularly in the final <a href="https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/" target="_blank">MRTK2</a> versions of the Clirio View apps, the logic was quite disorganized, as MRTK2 had poor cross-platform support, which resulted in different prefabs, UI, and logic for iOS and HMDs.</p>
    <p>Another layer of complexity were the different file-formats, features and sources for 3D models. Especially the various material properties, texture reference formats, coordinate and unit systems were tricky to develop and test for.</p>
  </section>

</div>

<?php

  Partial::build('footer');

?>