<?php

chdir('../');

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioScanViews');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A collection of features in the Clirio View apps for loading and viewing photogrammetry scans. Includes on-map, AR, XR, comparison, and other views.",
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
        <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanViews/lqip/bridgeMapView.jpg" class="whiteFrame">
          <figcaption>On-Map View (Desktop)</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanViews/lqip/bridgeScanView.jpg" class="whiteFrame">
          <figcaption>Scan View (Desktop)</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanViews/scanComparison.gif" ignorelqip class="whiteFrame">
          <figcaption>Scan View Comparison Mode (Desktop)</figcaption>
        </figure>
      </div>
    </figure>
  </section>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Development</h2>
    <p>The scan views have been continously worked on from 2021 to 2023. In that timeframe I was responsible for setting up most of the logic and views involved. My workflow involved designing UX and UI, and then quickly prototyping and refining until each feature was ready for release. My teammates <a href="https://www.linkedin.com/in/toniostillman" target="_blank">Tonio Stillman</a>, <a href="https://www.linkedin.com/in/timthibault/" target="_blank">Timothy Thibault</a>, <a href="https://www.linkedin.com/in/jordan-wischmann-32a4b380/" target="_blank">Jordan Wischmann</a>, and <a href="https://www.linkedin.com/in/merdemgunay" target="_blank">Erdem Gunay</a> also made contributions. Some functionality was also carried over from the Ada Viewer app, upon which the Clirio View app was based.</p>
    <p>The initial set of requirements were the loading and viewing of scans in a scan view mode (no map), which would be supported in AR on the HoloLens 2, and in 3D non-AR on iOS. Once these core functionalities had been implemented, one of the most important additions were the comparison and measure modes. An important workflow supported by the Clirio View apps is the analysis and monitoring of construction sites, for which scan comparisons help detect differences, and scan measurements help understand scale.</p>
    <p>Later, other features were added, such as viewing scans on-map, more viewing tools such as free hand manipulation in XR, and more comparison modes such as the overlay mode which fades the transparencies on XR, and the swipe comparison view on iOS which crops the viewports.</p>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="auto-resizable-iframe">
      <div>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/hdPXCnyH6us?playlist=hdPXCnyH6us&loop=1&autoplay=1&cc_load_policy=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <figcaption>An overview of the different scan views in the Clirio View Meta Quest VR app. A scan is first opened on map, then scan view is entered, where the scan is viewed from different angles, measured, and compared to another scan.</figcaption>
    </div>
  </section>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Challenges</h2>
    <p>One of the biggest challenges has been the complexity originating from different UX flows, platforms, features, and states which have been expanded slowly over time. Particularly in the final <a href="https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/" target="_blank">MRTK2</a> versions of the Clirio View apps, complexity had ballooned, as MRTK2 had poor cross-platform support, which resulted in different prefabs, UI, and logic for iOS and HMDs.</p>
    <p>Another layer of complexity were the different file-formats, features and sources for 3D models. Especially the various material properties, texture reference formats, coordinate and unit systems were tricky to develop and test for.</p>
    <p>Solutions for these complexity challenges typically involved unifying behaviors, once similarities had been identified, and there was time to refactor. For instance, saving the initial state and reset behavior was unified across platforms and modes, and the logic for switching in and out of AR in scan view was combined with the logic for doing the same in map view. Furthermore, with the migration to <a href="https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/" target="_blank">MRTK3</a>, view logic and prefabs were combined, which greatly reduced complexity.</p>
  </section>

</div>

<?php

  Partial::build('footer');

?>