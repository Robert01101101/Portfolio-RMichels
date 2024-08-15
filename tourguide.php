<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('tourguide');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A crossplatform Flutter app that helps users explore tours with navigation, information on places, and chat with an AI tourguide. A personal project currently in development.",
  //"primaryLink" => "https://play.google.com/apps/testing/com.robertmichelsdigitalmedia.tourguideapp",
  //"primaryLinkText" => "Join Google Play Testing (Beta)",
  "primaryLink" => "https://play.google.com/store/apps/details?id=com.robertmichelsdigitalmedia.tourguideapp",
  "primaryLinkText" => "Google Play Store Page (Beta)",
  "secondaryLink" => "https://github.com/Robert01101101/tourguide_app",
  "secondaryLinkText" => "Github Repository",
  "alt" => FALSE]);

Partial::build('projectPageMeta', ["project" => $project]);

?>


<div id="projContent"> <!--___________ Proj Content ____________-->

  <!----- Content / Text ----->
  <section class="sectionText">
    <?php if ($GLOBALS['english'] == false) echo "Dieser Bereich der Website wurde noch nicht vollständig auf Deutsch übersetzt." ?>
    <h2>Overview</h2>
    <p>While on vacation in Rome, I became frustrated with the lack of options available for free detailed tours of the city. There are websites with suggested daily schedules, Google Maps supports adding a small number of places into a route, but I couldn't find a cohesive platform combining navigation and information on the places I visit into a tour I can simply follow. Like any programmer would, I thought to myself, "I can create an app for this!"<p>
    <p>I had my eye on the Flutter framework, and this seemed like the perfect opportunity to learn the Dart language and how to build a crossplatform app with Flutter.</p>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText mockup">
    <div>
      <h2>Current Prototype</h2>
      <p>Last updated on August 12, 2024</p>
      <h3>Explore</h3>
      <p>Explore user-created tours that are popular, close to you, or find your next destination with the highest rated tours around the world.</p>
      <p>Get point-to-point navigation powered by Google API, and detailed descriptions for the places you'll see. Take in your destination while you listen to the history and fun facts with text-to-speech.</p>
      <h3>AI Tourguide</h3>
      <p>Ask your AI Tourguide about the best local destinations, parks, or beaches, or get a brief overview of the history or meaning of a place. Powered by Google Gemini with Vertex AI.</p>
      <h3>Contribute</h3>
      <p>Easily create new tours to contribute to the community, using a form powered by flutter's stepper widget. Add basic info, places, details, and you're done and the new tour is ready for people to explore.</p>
      <h3>Profile</h3>
      <p>Manage your profile settings, notification settings, and manage your account.</p>
    </div>
    <canvas id="threeModel" class="inText" mockup-phone></canvas>
  </section>
  <video id="video" src="assets/video/tourguideScreencap.mp4" style="display:none" autoplay loop muted></video>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>Development History</h2>
    <h3>Update - July 29 2024</h3>
    <p>I've made good progress and have published the app to Open Testing (Beta) on Google Play. In order to get CI/CD with fastlane and GitHub Actions up and running, I had to first publish my app. This required quite a bit of work in order to make sure that I comply with all the requirements - things like the ability to block and report users or content, ensuring account and data deletion works, and adding TOS and a privacy policy.</p>
    <p>The last few weeks have been a great learning experience, as I got to really dig into the backend side of things, setting up email notifications and a system for myself to manage community reports. I discovered the great library of Firebase extensions like Trigger Email from Firestore and Delete User Data, which have come in handy. To extend their functionality, I also wrote some cloud functions to help with processes like unsubscribing from emails through a link in the email.</p>
    <p>Wrapping up this work I moved on to setting up CI/CD. I had previous experience with managing CI/CD such as Azure Pipelines and XCode Cloud, but this was my first time setting it all up by myself, and also my first time using fastlane or GitHub Actions. For debugging purposes I also learned some of the basics of Docker and VirtualBox to standardize and test different environments. It's now up and running, with commits to my main branch automatically building and deploying to Google Play, which is pretty sweet.
    </p>
    <h3>Getting Started - July 10 2024</h3>
    <p>The tourguide app is currently in closed testing on the Google Play store. I plan to also host it as a webapp, and possibly an iOS app if I see demand for the app. You can <a href="mailto:hi@rmichels?subject=Request%20access%20to%20join%20Tourguide%20Closed%20Testing&amp;body=Please%20add%20me%20to%20the%20Closed%20Testing%20of%20tourguide.%0AEmail%20to%20add%3A%20%5BInsert%20Your%20Email%20used%20on%20your%20Android%20Phone%5D">request</a> to join testing if you're interested in trying it out.<p>
    <p>As of July 2024 the app has functionality for users to create a tour with waypoints, an explore page to browse these user-created tours, an AI chat page utilizing Google's Gemini AI roleplaying as a helpful tourguide, and a profile page. I'm using Firebase services such as Authentication, Firestore, Storage, Crashlytics and Remote Config, as well as Google APIs like Places, Maps and Vertex AI to power my app.</p>
  </section>

  

  
  <!----- Content / Media ----->
  <section class="sectionMedia">
    <figure ignorecarousel>
      <div class="mediaRow mediaRow-equalWidth mediaRow-equalHeight">
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/tourguide/Screenshot_1.jpg"> 
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/tourguide/Screenshot_2.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/tourguide/Screenshot_3.jpg"> 
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/tourguide/Screenshot_4.jpg">
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/tourguide/Screenshot_5.jpg"> 
        </figure>
        <figure onclick="viewImage(this)">
          <img src="<?php echo $GLOBALS['d'];?>assets/img/tourguide/Screenshot_6.jpg">
        </figure>
      </div>
      <figcaption><?php echo _("Screenshots from 2024/08/04"); ?></figcaption>
    </figure>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>What I've learned so far</h2>
    <p>Flutter has been a delight to work with. I was previously working at <a href="https://clir.io/">Clirio</a>, where I was creating complex UIs with C# in Unity, a setup that's not really ideal for creating complex UIs, even less so with Clirio's apps supporting VR, MR, touchscreens on iOS and Android, as well as Desktop, and catering UI for each of those platforms. In comparison to the challenges this posed, Flutter makes it a breeze to implement complex UIs across many devices, while also working with an intuitive architecture of Stateless- and StatefulWidgets, Providers, and a large amount of packages to help speed up common tasks.</p>
  </section>

  
  <!----- Content / Media ----->
  <section class="sectionText">
    <h2>To-Do's</h2>
    <p>You can see what I still have planned on my scrum board. It's a lot :)</p>
    <blockquote class="trello-board-compact">
      <a href="https://trello.com/b/ThscGOXW/tourguide-app">Trello Board</a>
    </blockquote>
    <script src="https://p.trellocdn.com/embed.min.js"></script>
  </section>
<?php

  Partial::build('footer');

?>