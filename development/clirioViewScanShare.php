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
  <iframe src="https://clirioview-viw-prd.azurewebsites.net/guest/MEVdEANk9_Zhr6tlm4ibd1Vn" style="width: 100%" class="clirioScanShareEmbed"></iframe>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Placeholder</h2>
    <p>Sed dapibus nisi sem, vel ornare ex sollicitudin vitae. Vestibulum magna ante, lacinia eget maximus sed, sagittis gravida nunc. Maecenas tempus sem ac odio pulvinar, ut posuere nibh efficitur. Nulla malesuada rutrum auctor. Sed fermentum eleifend risus, sed pulvinar erat. Suspendisse non augue eu erat consectetur tincidunt et vel nisi. Aenean et dui nec massa pellentesque pellentesque eget at velit. Vivamus eget metus ut ex aliquet suscipit ac a purus</p>

    <p>Donec vel dignissim tortor, id porttitor metus. Donec sit amet elementum mauris. Integer vehicula vestibulum lacus pulvinar mattis. Nunc vitae ligula vel massa posuere vulputate id ac velit. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tortor odio, finibus eu gravida ac, vehicula id leo. Donec molestie ante sit amet libero elementum efficitur. Cras lobortis ut ligula ac scelerisque. Ut pretium mi nec porta pharetra.</p>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaSquare">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/img.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/img.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/img.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/img.jpg">
        </figure>
      </div>
      <figcaption>Caption</figcaption>
    </figure>
  </section>


</div>

<?php

  Partial::build('footer');

?>