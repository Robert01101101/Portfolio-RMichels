<?php

require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('futureEarth');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "Future Earth is a VR adventure game set in a dystopian future, where the player has to grow trees, fight droids and collect parts.",
  "primaryLink" => "https://sidequestvr.com/app/2597/future-earth",
  "primaryLinkText" => "SideQuest",
  "secondaryLink" => "https://404teamnotfound444314077.wordpress.com/",
  "secondaryLinkText" => "Development Blog",
  "alt" => TRUE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Task</h2>
    <p>Future Earth was created as an exercise in designing and developing immersive environments.</p>
    <p>With the concept design, we aimed to create a VR adventure game that encourages sustainable behaviors in players. This is achieved by placing the player in a dystopian futuristic environment and giving them the power to radically transform it for the better through gameplay.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaGrid">
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/3.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/4.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/5.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/6.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/7.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/8.jpg">
      </figure>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Result</h2>
    <h3>Story</h3>
    <p>Set in a dystopian future, you are the first human to walk planet earth in a long time.</p>
    <p>Your mission objective is to plant and sustain 100 trees. Whether or not humanity will attempt to return to earth hinges upon your success.</p>
    <p>But that isn't an easy feat. Climate change and unsustainable human habits have created a toxic wasteland. And to make things worse, robots left behind to clean up, have fried in the sun and turned dangerous over time. Fight these bots, collect technical components, build sustainable technology and become the one to save the world!</p>
    <h3>Success</h3>
    <p>Our project won best overall project, best interaction design, project for impact, and best VR/AR in our class.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaGrid">
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/9.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/10.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/11.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/12.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/13.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/14.jpg">
      </figure>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Process</h2>
    <p>The project was developed in 4 months by a team of 4. I was the project manager, as well as one of the VR / game designers & developers.</p>
    <p>After deciding to create a project for impact with the theme of sustainability, we started to create a game. Our goal was to create a VR game that’s appealing to players without interest in sustainability, to reach a broader audience.</p>
    <p>As the PM, I split the concept design into a list of core and bonus features. The core design featured a small game, where players fight rogue robots, collect their parts, and build water filtering technology that helps trees to grow. This core prototype was implemented within the first three months.</p>
    <p>After a round of usertesting, we proceed to implement updated features in response to our testing results. These included measures to better communicate the narrative, such as a major update to the level design and the implementation of an aesthetic change as the player plants more trees. We also had time to implement some of our bonus features, which were mostly aesthetic improvements such as the addition of VFX, better models, and multiple collectible parts.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaGrid">
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/15.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/16.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/17.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/18.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/19.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/20.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/hud1.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/hud2.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/hud3.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/futureearth/lqip/hud4.jpg">
      </figure>
    </div>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Code</h2>
    <p>My programming efforts for this project focussed on the more unusual features of our game, such as spare part collection, item building, UI interactions, story sequencing and more. Another interesting feature I implemented was the trees, which required animations for growth and monitoring of their health based on the available water supply. In order to achieve fine control over the growth behavior, I used a Coroutine, which is also used to control dying trees. Instead of using an Unity animation I implemented smooth growth by affecting scale and rotation with the help of <code>Mathf.SmoothStep()</code> and <code>Mathf.Sin()</code> for smoothing. A challenge that came up was a bug where birds would land at the position of the tree's origin. The fix was simple: disabling their perch-targets until the trees had finished growing, and only then enabling them, so that their target positions were correctly located at the fully grown branches.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <script src="https://gist.github.com/robert-michels/13bb15385194385ba5d5700ee224d858.js"></script>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <p>One of the interesting changes that resulted from our user tests was the more drastic environment change coupled to player progress. The environment changes as the player plants more trees. In order to achieve the desired emotional effect with the player, we incorporated many variable layers: the skybox, fog, dust particles, water, lighting and post processing. All of these aspects of the environment are interpolated between a start and an end state, by the method <code>SetEnvironment()</code> which I implemented in <code>GameCtrl.cs</code>. For instance, the fog has definitions of its color, start distance and end distance for both the beginning and the end.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <script src="https://gist.github.com/robert-michels/1272b6f0de41f4409cf4e61fdfbbd622.js"></script>
  </section>
  
</div>
    

<?php

  Partial::build('footer');

?>