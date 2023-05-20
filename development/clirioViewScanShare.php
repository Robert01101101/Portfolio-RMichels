<?php

chdir('../');

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioViewScanShare');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "Scan Share is a feature of the Clirio View product suite, for sharing photogrammetry scans quickly, and displaying them in a webviewer.",
  "primaryLink" => "http://#/",
  "primaryLinkText" => "Link TODO",
  "secondaryLink" => "http://#/",
  "secondaryLinkText" => "Secondary Link TODO",
  "alt" => TRUE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Overview</h2>
    <p>The Clirio View Scan Share feature lets users quickly share a photogrammetry scan captured with the Clirio Scan app. Pressing the share button on any of the Clirio View apps will open a pop-up to configure the share options. The user has the option to set the share to expire, password protect it, and to require that the viewer has been invited to the workspace, in which case the recipient will need to log in with their Clirio View account to view the scan.</p> 
    <p>Once the user is satisfied with their selected options, they can generate the link, and either copy it to clipboard or use the share function to trigger the share options native to each platform. For instance, on iOS this will open the sharing options with the option to pick from compatible apps such as messengers, while on Windows Desktop the Mail app will open.</p>
    <p>There is also an option for users to instead embed the link, in which case the user can configure their desired with and height, and the app will format an embed iframe element code snippet accordingly for the user to copy and embed on their website.</p>
  </section>


  <!----- Content / Embed 3D Scan ----->
  <figure ignorecarousel>
    <iframe src="https://clirioview-viw-prd.azurewebsites.net/guest/MEVdEANk9_Zhr6tlm4ibd1Vn" style="width: 100%" class="clirioScanShareEmbed"></iframe>
    <figcaption>Interactive example of an embedded scan share. Try to look at the model from different angles!</figcaption>
  </figure>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Development Overview</h2>
    <p>There were two stories for the development of this feature: clientside app share UI and logic, and the webviewer.</p>

    <h3>Share UI and Logic</h3>
    <p>Developed with C# in Unity, as a pop-up accessible through the observation details view in the Clirio View app. UI designed in Figma in collaboration with <a href="https://www.behance.net/wischj82b8/projects" target="_blank">Jordan Wischmann</a>.</p>

    <h3>Webviewer</h3>
    <p>Developed with Blazor APS.NET and Three.js. Backend token sharing implemented by <a href="https://github.com/timothyt" target="_blank">Timothy Thibault</a>.</p>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioViewScanShare/scanShareClientSideUi.jpg">
          <figcaption>Share UI</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioViewScanShare/scanShareClientSideUiEmbed.jpg">
          <figcaption>Embed UI</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioViewScanShare.jpg">
          <figcaption>Webviewer</figcaption>
        </figure>
      </div>
    </figure>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Share UI and Logic</h2>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Webviewer</h2>
  </section>


</div>

<?php

  Partial::build('footer');

?>