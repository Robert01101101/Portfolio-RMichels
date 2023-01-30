<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

// start session so that we can store logged in cookie
// session_start();

Partial::build('header', ["about" => TRUE]);

?>

<section class="sectionText about">
  <div>
    <h1 id="About">About Me</h1>
    <p>I’m Robert Michels, a designer, and developer from Vancouver. I attended Simon Fraser University (SFU), where I earned my Bachelor’s Degree in Science with a major in Interactive Arts & Technology. My degree and my inexhaustible curiosity have made me an expert in the combination of design and technology. These days I’m looking to work on the design and development of interactive applications.</p>
  </div>
  <div>
    <h2>Skills</h2>
    <div class="skills">
      <div>
        <h3>Design</h3>
        <ul>
          <li>UX Design</li>
          <li>UI Design</li>
          <li>Game Design</li>
          <li>VR Ix Design</li>
          <li>Figma</li>
          <li>Adobe CC</li>
        </ul>
      </div>
      <div>
        <h3>Development</h3>
        <ul>
          <li>HTML</li>
          <li>SCSS</li>
          <li>JS</li>
          <li>PHP</li>
          <li>MySQL</li>
          <li>C#</li>
          <li>Unity</li>
          <li>Java</li>
          <li>D3.js</li>
          <li>Three.js</li>
        </ul>
      </div>
      <div>
        <h3>Other</h3>
        <ul>
          <li>Project Management</li>
          <li>3D Modelling</li>
          <li>CAD Modelling</li>
        </ul>
      </div>
    </div>
  </div>
</section>


<?php

Partial::build('footer', ["projects" => TRUE]);

?>