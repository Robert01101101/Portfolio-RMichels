<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioCloud');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => _("A web-based collection of tools for managing workspaces in Clirio View. Includes a user dashboard, workspace and observation creation tools, and interactive Bing maps."),
  "primaryLink" => "https://cloud.clir.io/",
  "primaryLinkText" => "Clirio Cloud",
  "alt" => FALSE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("Overview"); ?></h2>
    <p><?php echo _("Clirio Cloud is a collection of tools that have been growing over time. These tools are provided to users of the Clirio Suite on a website developed with Blazor. Clirio builds solutions that help users inspect, document, and collaborate in 3D and XR on geospatial workspaces."); ?><p>

    </p><?php echo _("One of the main goals of Clirio Cloud is to complement the upload and organizational capabilities of the iOS Clirio apps, which serve as the primary capture platform. While a user can easily capture and upload 3D photogrammetry scans with Clirio's iOS apps, they might also want to upload other 3D models, for which Clirio Cloud provides an interface. Other workspace tools are upload and management of custom basemaps, upload of boreholes, guest invitations, point of interest creation, and workspace deletion."); ?></p>

    <p><?php echo _("Furthermore, Clirio Cloud provides an analytics dashboard to users, as well as an easy way to access the Clirio knowledge base and training videos. Finally, there also are subscription and account management tools."); ?></p>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaSquare">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioCloud/lqip/dashboard.jpg">
          <figcaption><?php echo _("Dashboard"); ?></figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioCloud/lqip/workspaceList.jpg">
          <figcaption><?php echo _("Workspace List"); ?></figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioCloud/lqip/workspaceView.jpg">
          <figcaption><?php echo _("Workspace Management Tools"); ?></figcaption>
        </figure>
        <figure onclick="viewImage(this)" id="img_createPoi">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioCloud/lqip/createPoi.jpg">
          <figcaption><?php echo _("Workspace Management Example: Create POI"); ?></figcaption>
        </figure>
      </div>
    </figure>
  </section>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("Development"); ?></h2>
    <p><?php echo _("The website was initially set up by "); ?><a href="https://www.linkedin.com/in/timthibault/" target="_blank">Timothy Thibault</a><?php echo _(" using Blazor, to try using a web framework that has C# as its programming language, which would be an advantage considering we also used C# for Unity development. After setting up authentication, subscription management, and workspace listing with metadata, development was mostly handed off to me."); ?></p>

    <p><?php echo _("The first stories I implemented revolved around workspace management, where I added observation upload features. These typically use Blazor's forms to let users fill out required information, and a file upload tray. These first stories encompassed a variety of challenges. I had to connect to our APIs to load workspace and POI data, as well as to upload data. There was also the need to validate certain data such as coordinates, and to provide user feedback such as marking required or incorrect fields and showing the upload status. I designed the UI on the fly, following the existing styling."); ?></p>

    <p><?php echo _("After adding all of the workspace management features such as 3D model upload and user invitations, I started working on another set of stories revolving around the dashboard. I partnered up with "); ?><a href="https://www.linkedin.com/in/jordan-wischmann-32a4b380/" target="_blank">Jordan Wischmann</a><?php echo _(", who designed mockups, which I then implemented."); ?></p>

    <p><?php echo _("A noteworthy feature that was added fairly late, are the interactive Bing maps. These are used to position new workspaces and points of interest and can get the user's location for convenience. They are accommodated by a set of GPS coordinate input fields, which sync with the map."); ?></p>

    <h3><?php echo _("Learning"); ?></h3>
    <p><?php echo _("I enjoyed learning Blazor, as it shared some similarities to PHP but had quite a lot of advantages, such as easy form binding to data models, data validation, and improved readability and writeability to me as a developer who often works in C#. Besides Blazor, the Tailwind CSS Framework was also new to me, but learning that wasn't too hard since I am fairly familiar with CSS3. I did enjoy learning about it too, because I prefer its customizability and efficiency compared to Bootstrap, although I still prefer Sass for my personal projects."); ?></p>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth mediaRow-equalHeight">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioCloud/lqip/create3dModel.jpg"> 
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioCloud/lqip/editBasemaps.jpg">
        </figure>
      </div>
      <figcaption><?php echo _("Some examples of data model binding to forms in Blazor. Expanding/collapsing optional sections of the form, and rearranging elements in a list, is made easy with Blazor since user inputs result in direct feedback without the need to write boilerplate code."); ?></figcaption>
    </figure>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="divText">
      <h2><?php echo _("Code Sample"); ?></h2>
      <p><?php echo _("An example of data binding between the form and data model for the "); ?><span onclick="viewImage('img_createPoi')" class="inTextLink"><?php echo _("Create POI"); ?></span><?php echo _(" page."); ?></p>
    </div>
    <script src="https://gist.github.com/Robert01101101/062fa22fe781689ed11a85d85e4b2b3e.js"></script>
  </section>
</div>

<?php

  Partial::build('footer');

?>