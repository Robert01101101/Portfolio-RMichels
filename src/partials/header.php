<?php

//Set cookie
setcookie("returningVisitor", "true");

//TODO: make description & title variable

?>

<!DOCTYPE html>
<html lang="en">

<!-- #################################### HEAD ###################################### --> 
<head>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-WXGTTGWVKL"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-WXGTTGWVKL');
  </script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <meta name="description" content="I am a digital media designer with a strong interdisciplinary background, based in Vancouver, Canada. I design and program games, websites, and apps. Robert Michels Portfolio.">

  <title>Portfolio | Robert Michels</title>

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">

  <!-- Load Font -->
  <!-- Load Icons -->
  <script src="https://kit.fontawesome.com/93c460f451.js" crossorigin="anonymous"></script>

  <!-- Load Favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/icon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/icon/favicon-16x16.png">
  <link rel="manifest" href="/assets/icon/site.webmanifest">
  <link rel="mask-icon" href="/assets/icon/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="/assets/icon/favicon.ico">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="msapplication-config" content="/assets/icon/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">
</head>

<body>
  <div id="MainGrid">
    <!-- ##################################### HEADER ###################################### -->
    <header>
      <nav>
        <ul>
          <li><a href="/<?php if(isset($_COOKIE['visitorFilter'])){ echo "?filter=".$_COOKIE['visitorFilter']; } ?>"><i class="fas fa-home"></i></a></li>
          <li><div class="menuCont" onclick="myFunction(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div></li>
        </ul>
        <div id="OverlayMenu">
          <ul>
          <a href="/<?php if(isset($_COOKIE['visitorFilter'])){ echo "?filter=".$_COOKIE['visitorFilter']; } ?>"><li>Portfolio</li></a>
            <a href="index#MyWork"><li>My Work</li></a>
            <a href="index#About"><li>About</li></a>
            <a href="index#Contact"><li>Contact</li></a>
          </ul>
        </div>
      </nav>
    </header>

    <script src="js/menu.js"></script>

    <!-- #################################### CONTENT ###################################### -->
    <main id="Content">