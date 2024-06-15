<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('clirioScanShare');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => _("Scan Share is a feature of the Clirio product suite, for sharing photogrammetry scans quickly, and displaying them in a webviewer."),
  "primaryLink" => "https://clirioview-viw-dev.azurewebsites.net/guest/f-aVQEv0LytBKHa8vARMx-Nl",
  "primaryLinkText" => "Sample Share",
  "secondaryLink" => "https://apps.microsoft.com/store/detail/clirio-view-desktop/9NB14S8DFWFP",
  "secondaryLinkText" => "Clirio View Desktop"]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("Overview"); ?></h2>
    <p><?php echo _("The Clirio Scan Share feature lets users quickly share a photogrammetry scan captured with the Clirio Scan app. The feature is comprised of share options in the Clirio View app developed in Unity and a webviewer developed in Blazor and Three.js, through which shared scans can be viewed. Pressing the share button on any of the Clirio View apps will open a pop-up to configure the share. The user has the option to set expiry, password protection, and to require that the viewer has been invited to the workspace, in which case the recipient will need to log in with their Clirio account to view the scan."); ?></p> 
    <p><?php echo _("Once the user is satisfied with their selected options, they can generate the link, and either copy it to the clipboard or use the share function to trigger the share options native to each platform. For instance, on iOS this will open the share dialogue with compatible apps such as messengers, while on Windows the mail app will open. There is also an option for users to configure and generate a formatted embed iframe element with the share."); ?></p>
    <p><?php echo _("The webviewer through which recipients can view the scan is intended to be as lightweight and accessible as possible. The scan can be viewed from different angles, some metadata and a scale legend is displayed, and there are some buttons to hide or show elements."); ?></p>
  </section>


  <!----- Content / Embed 3D Scan ----->
  <figure ignorecarousel>
    <iframe src="https://clirioview-viw-prd.azurewebsites.net/guest/MEVdEANk9_Zhr6tlm4ibd1Vn" style="width: 100%" class="clirioScanShareEmbed"></iframe>
    <figcaption><?php echo _("An interactive example of an embedded scan share. Click and drag to look at the model from different angles. The same share can also be opened on its "); ?><a href="https://clirioview-viw-prd.azurewebsites.net/guest/MEVdEANk9_Zhr6tlm4ibd1Vn" target="_blank"><?php echo _("page");?></a>.</figcaption>
  </figure>


  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("Development"); ?></h2>
    <p><?php echo _("There were two stories for the development of this feature: the clientside app share UI and logic, and the webviewer."); ?></p>

    <h3><?php echo _("Share UI and Logic"); ?></h3>
    <p><?php echo _("Developed with C# in Unity, as a pop-up accessible through the observation details view of any scan in the Clirio View app. UI was designed in Figma in collaboration with "); ?><a href="https://www.linkedin.com/in/jordan-wischmann-32a4b380/" target="_blank">Jordan Wischmann</a>.</p>

    <h3><?php echo _("Webviewer"); ?></h3>
    <p><?php echo _("Developed with Blazor and Three.js. Backend token sharing was implemented by "); ?><a href="https://www.linkedin.com/in/timthibault/" target="_blank">Timothy Thibault</a>.</p>
  </section>


  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanShare/lqip/scanShareClientSideUi.png">
          <figcaption>Share UI</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanShare/lqip/scanShareClientSideUiEmbed.png">
          <figcaption>Embed UI</figcaption>
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/lqip/clirioScanShare.jpg" class="whiteFrame">
          <figcaption>Webviewer</figcaption>
        </figure>
      </div>
    </figure>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2><?php echo _("Share UI and Logic"); ?></h2>
    <p><?php echo _("The share UI has gone through multiple iterations. Initially developed for "); ?><a href="https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk2/" target="_blank">MRTK2</a><?php echo _(" with few options, the feature was later expanded to include expiry, password protection, and embed functionalities. Finally, in 2023, the UI was refreshed in collaboration with "); ?><a href="https://www.linkedin.com/in/jordan-wischmann-32a4b380/" target="_blank">Jordan Wischmann</a><?php echo _(", who designed mockups in Figma, as the Clirio View app was migrated to "); ?><a href="https://learn.microsoft.com/en-us/windows/mixed-reality/mrtk-unity/mrtk3-overview/" target="_blank">MRTK3</a>.</p>
    <p><?php echo _("When a user opens the share panel for a scan, the client checks whether there are existing links. If there are, the existing links are provided for the user to share. For any new configuration of a share that hasn't been created yet, the user can press generate, and a request will be sent to a backend API implemented by "); ?><a href="https://www.linkedin.com/in/timthibault/" target="_blank">Timothy Thibault</a>. <?php echo _("The returned result includes a URL for the client to display to the user, and to include in native share options for each platform."); ?></p>
    <p><?php echo _("The biggest challenge for me was designing the UX, as there were a lot of options for the user. This included the option to make shares private so that users could restrict sharing internally to teams in workspaces, which required an additional authentication flow in the webviewer as well. The range of options also made it more difficult to design a compact UI. I utilized dynamic design and layouts so that hidden options such as expiry renewal or password change could be elegantly hidden or shown. Developing the logic was a fairly easy process, thinking about how the feature should work in the first place was the bigger challenge. After every user interaction, the UI refreshes to match the share configuration and all other states. If there is a share matching the configuration, that existing link is shown, otherwise the generate share button is shown."); ?></p>
    <p><?php echo _("An interesting change to my approach to writing controllers was first tested in this feature, after a discussion I had with my teammate "); ?><a href="https://www.linkedin.com/in/toniostillman" target="_blank">Tonio Stillman</a>. <?php echo _("In the past, I would write public functions for button clicks, and hook them up in the inspector via the button's "); ?><code>OnClick()</code> <?php echo _("event. Here, I instead set all the event listeners in the controller itself, kept all the corresponding listener functions private, and simplified the inspector setup so that each button only gets assigned once to the controller, and no other reference is needed. This makes setup in the editor less error-prone and maintainable, as it requires less understanding of the code."); ?></p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-centered">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/clirioScanShare/lqip/scanShareWalkthrough.jpg" lqip-gif class="whiteFrame">
          <figcaption>Share UX Walkthrough</figcaption>
        </figure>
      </div>
    </figure>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Webviewer</h2>
    <p><?php echo _("Implementing the webviewer was the more complex story, as it was standalone and most functionality needed to be created from scratch. The viewer was written in C# with Blazor, JavaScript with Three.js, and uses Tailwind CSS for styling. I had worked with Three.js in the past and enjoyed using it again, and a lot of my work revolved around setting up the viewer correctly."); ?></p>
    <p><?php echo _("When the user opens a share link, the page sends a request to our backend API to gather information about the share, including whether it's public, and a list of SAS tokens for all the files required to render the scan. If the scan is private, the user is routed to a login page, otherwise, the scan begins to load its resources right away. The viewer is lightweight, and only provides some metadata, and options to reset the view and show/hide the grid and dimensions legend."); ?></p>
    <p><?php echo _("Challenges with the setup of Three.js included adding support for loading the texture files defined in the MTL file with the correct SAS tokens, ensuring different MTL file formats and material properties are supported and displayed as desired, and making the viewer dynamic so it supports a wide range of model sizes and shapes, on a wide range of devices."); ?></p>
  </section>


   <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="divText">
      <h2><?php echo _("Code Sample"); ?></h2>
      <p><?php echo _("The code snippet below contains the code related to loading the 3D Model inside the webviewer, using Three.js. It's a small section of the actual file, but it shows some of the solutions to challenges encountered, such as the modified process for loading the textures defined in the MTL file using SAS tokens, and functions to help configure the viewer based on the model dimensions."); ?></p>
    </div>
    <script src="https://gist.github.com/Robert01101101/ec153ae228a8ae3f6fe28b143073b669.js"></script>
  </section>

</div>

<?php

  Partial::build('footer');

?>