<?php

require "config.php";
require "src/Partial.php";
require "src/objects/Project.php";

$project = Project::buildProjectFromSlug('tourguide');

Partial::build('header', ["project" => $project]);

Partial::build('projectPageLanding', 
  ["project" => $project, 
  "description" => "A crossplatform Flutter app that helps users explore tours with navigation, information on places, and chat with an AI tourguide. A personal project currently in development.",
  "primaryLink" => "mailto:hi@rmichels?subject=Request%20access%20to%20join%20Tourguide%20Closed%20Testing&amp;body=Please%20add%20me%20to%20the%20Closed%20Testing%20of%20tourguide.%0AEmail%20to%20add%3A%20%5BInsert%20Your%20Email%20used%20on%20your%20Android%20Phone%5D",
  "primaryLinkText" => "Request invite to Closed Testing",
  "secondaryLink" => "https://play.google.com/apps/internaltest/4701730952049203829",
  "secondaryLinkText" => "Access Closed Testing (requires invite)",
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
  <section class="sectionText">
    <h2>Development Progress</h2>
    <p>The tourguide app is currently in closed testing on the Google Play store. I plan to also host it as a webapp, and possibly an iOS app if I see demand for the app. You can <a href="mailto:hi@rmichels?subject=Request%20access%20to%20join%20Tourguide%20Closed%20Testing&amp;body=Please%20add%20me%20to%20the%20Closed%20Testing%20of%20tourguide.%0AEmail%20to%20add%3A%20%5BInsert%20Your%20Email%20used%20on%20your%20Android%20Phone%5D">request</a> to join testing if you're interested in trying it out.<p>
    <p>As of July 2024 the app has functionality for users to create a tour with waypoints, an explore page to browse these user-created tours, an AI chat page utilizing Google's Gemini AI roleplaying as a helpful tourguide, and a profile page. I'm using Firebase services such as Authentication, Firestore, Storage, Crashlytics and Remote Config, as well as Google APIs like Places, Maps and Vertex AI to power my app.</p>
  </section>

  <!----- Content / Text ----->
  <section class="sectionText">
    <h2>What I learned</h2>
    <p>Flutter has been a delight to work with. I was previously working at <a href="https://clir.io/">Clirio</a>, where I was creating complex UIs with C# in Unity, a setup that's not really ideal for creating complex UIs, even less so with Clirio's apps supporting VR, MR, touchscreens on iOS and Android, as well as Desktop, and catering UI for each of those platforms. In comparison to the challenges this posed, Flutter makes it a breeze to implement complex UIs across many devices, while also working with an intuitive architecture of Stateless- and StatefulWidgets, Providers, and a large amount of packages to help speed up common tasks.</p>
  </section>

<?php

  Partial::build('footer');

?>