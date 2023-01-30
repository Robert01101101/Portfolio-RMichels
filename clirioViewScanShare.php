<?php

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
    <h2>Placeholder</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi mi, dignissim vehicula diam vel, vulputate aliquam neque. Sed ut vehicula nisl. Aenean nec purus condimentum, eleifend enim ultricies, congue diam. Phasellus magna libero, finibus ac porttitor et, sodales ut lacus. Vestibulum rutrum mi facilisis, consectetur diam in, dapibus arcu. Mauris interdum ullamcorper turpis. Donec a ullamcorper ex.</p>
    
    <p>Proin facilisis efficitur urna in volutpat. Integer a lectus quis purus convallis varius auctor egestas mi. Duis ultrices risus vel tortor feugiat porta. Pellentesque sem sem, scelerisque blandit suscipit ac, tincidunt non elit. Curabitur tempus volutpat condimentum. Duis ut metus nec dui mattis convallis non et felis. In nec euismod est. Ut mattis eu nisi quis laoreet. Cras nec bibendum ex. Cras libero lectus, auctor id lorem quis, fringilla vehicula odio. Donec lobortis erat ipsum, vel auctor odio tempor scelerisque. Donec vel congue arcu. Phasellus tincidunt felis sed sollicitudin pulvinar.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaSquare">
        <figure onclick="viewImage(this)">
          <img src="assets/img/img.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/img.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/img.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="assets/img/img.jpg">
        </figure>
      </div>
      <figcaption>Caption</figcaption>
    </figure>
  </section>
  

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Placeholder</h2>
    <p>Sed dapibus nisi sem, vel ornare ex sollicitudin vitae. Vestibulum magna ante, lacinia eget maximus sed, sagittis gravida nunc. Maecenas tempus sem ac odio pulvinar, ut posuere nibh efficitur. Nulla malesuada rutrum auctor. Sed fermentum eleifend risus, sed pulvinar erat. Suspendisse non augue eu erat consectetur tincidunt et vel nisi. Aenean et dui nec massa pellentesque pellentesque eget at velit. Vivamus eget metus ut ex aliquet suscipit ac a purus</p>

    <p>Donec vel dignissim tortor, id porttitor metus. Donec sit amet elementum mauris. Integer vehicula vestibulum lacus pulvinar mattis. Nunc vitae ligula vel massa posuere vulputate id ac velit. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tortor odio, finibus eu gravida ac, vehicula id leo. Donec molestie ante sit amet libero elementum efficitur. Cras lobortis ut ligula ac scelerisque. Ut pretium mi nec porta pharetra.</p>
  </section>
</div>

<?php

  Partial::build('footer');

?>