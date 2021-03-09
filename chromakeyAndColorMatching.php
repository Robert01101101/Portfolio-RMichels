<?php

require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('chromakeyAndColorMatching');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A digital image compositing process. Automatically creates high quality composites. Advantages include the ability to deal with any foreground color, preventing color spill, and color grading the subject to match the background.",
  "primaryLink" => "assets/other/ChromakeyAndColorMatching.exe",
  "primaryLinkText" => "Download app"]);

Partial::build('projectPageMeta', ["project" => $project]);

?>

<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Task</h2>
    <p>The goal of this project was to practice computational signal processing techniques for digital media. We researched experimental image processing techniques, and decided to combine two techniques which we believed would complement each other well. The first technique is an advanced chroma key, which neutralizes color spill and supports all possible foreground colors. The second technique transfers color characteristics from one image to another. The idea was that by combining these two techniques, we would create a very effective process that creates high quality image composites, where the subject doesn’t noticeably differ from the background.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaColumn"><div class="mediaRow">
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/1.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/2.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/3.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/4.jpg">
      </figure>
    </div>
    <div class="mediaRow">
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/5.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/6.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/7.jpg">
      </figure>
      <figure onclick="viewImage(this)">
        <img src="assets/img/chromakeyAndColorMatching/8.jpg">
      </figure>
    </div></div>
    
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>The Result</h2>
    <p>Our interface allows users to select a foreground image which includes both a green and magenta background and create a matte. At the same time, the user is also able to select the background image in which the foreground image will appear on top. The color transfer of the background image will affect the foreground image and apply its characteristics at a set value. Once set, the user is able to control the intensity of the color transfer, brightness transfer, and the blurring of the foreground matte edges to help create a more believable composite image. The user is also able to view all of the process images created to form the final output image in order to view the progression. Lastly, the user is able to save the image they have created with a save button on the bottom of the main screen.</p>
    <p>The first step in this process is based on the paper <i>Color invariant chroma keying and color spill neutralization for dynamic scenes and cameras</i> (Grundhöfer, Kurz, Thiele, & Bimber, 2010). This technique cleverly uses two complementary background colors, such as green and magenta, to be able to A) feature any colors in the foreground, and B) automatically suppress color spill. A) is achieved by deriving the maximum of the two mattes resulting from a simple chromakey with each background color. B) is achieved by blending the two images with the complementary background colors, so that the light spilling onto the subject is neutralized into a grayscale tone, rather than green or magenta.</p>
    <p>The second step in the process is not specifically intended for composites, but proved to be very useful. The technique described in <i>Color transfer between images</i> (Reinhard, Adhikhmin, Gooch, & Shirley, 2001) analyzes a source image’s color characteristics by calculating mean and standard deviation of each color channel. These characteristics are then applied to the color distribution of the target image. For this technique to work, the images need to be converted into the lαβ color space, which heavily considers the human visual system and minimizes correlation between channels for most natural scenes.</p>
  </section>

  <!----- Content / Media ----->
  <section class="sectionMedia">
    <div class="mediaColumn">
      <figure onclick="viewImage(this)" fullscreen class="wide">
        <img src="assets/img/chromakeyAndColorMatching/overview.jpg">
        <figcaption>An overview of the entire process, with clear distinction between the two techniques implemented, and additional processing applied to the images.</figcaption>
      </figure>
    </div>

    <!----- Content / Video ----->
    <div class="auto-resizable-iframe">
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/6KXxwxTnbgM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <figcaption>App demo, walkthrough of the code, and explanation of the theory behind the technique.</figcaption>
    </div>
  </section>

  
  
</div>


<?php

  Partial::build('footer');

?>