<?php

//Set cookie
setcookie("returningVisitor", "true");

//TODO: make description & title variable

//Set Language
//THIS WORKS WITH HOSTINGER BUT NOT MY SETUP -> WRONG LOCALE NAME?
session_start();
$accepted_languages = ['en', 'de'];
$browser_lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
$lang = in_array($browser_lang, $accepted_languages) ? $browser_lang : 'en';
// Adjust locale setting
$locale = ($lang == 'en') ? 'en_US' : 'de_DE';
$lang = isset($_SESSION['language']) ? $_SESSION['language'] : $locale;
putenv("LC_ALL=$lang");
setlocale(LC_ALL, $lang);
bindtextdomain("messages", "./locale");
bind_textdomain_codeset("messages", "UTF-8");
textdomain("messages");
$GLOBALS['english'] = $lang != 'de_DE';

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

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const portfolioLinkValue = getUrlParameter('portfolio_link');
    if (portfolioLinkValue){
      console.log('Sending event with portfolio_link: ' + portfolioLinkValue); 
      gtag('event', 'portfolio_link', {
        'portfolio_link': portfolioLinkValue,
      });
    }
  </script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <?php if(isset($project)) : ?>
    <meta name="description" content="<?php echo $project->getName() ?> (<?php echo $project->getType() ?>) | Robert Michels Portfolio | I’m Robert Michels, a designer and developer from Vancouver. I design and program games, websites, and apps. ">
    <title><?php echo $project->getName() ?> | Robert Michels Portfolio</title>

  <?php elseif(isset($projects)) : ?>
    <meta name="description" content="Browse through all my projects. Filter them to only see relevant projects. | Robert Michels Portfolio">
    <title>All Projects | Robert Michels Portfolio</title>

    <?php elseif(isset($about)) : ?>
    <meta name="description" content="Who is this Robert Michels? I'm a digital media designer and developer from Vancouver. I design and program games, websites, and apps.">
    <title>About | Robert Michels Portfolio</title>

  <?php else : ?>
    <meta name="description" content="I’m Robert Michels, a designer and developer from Vancouver. I design and program games, websites, and apps. | Robert Michels Portfolio">
    <title>Portfolio | Robert Michels</title>

  <?php endif; ?>



  <link rel="stylesheet" href="<?php echo $GLOBALS['d'];?>css/normalize.css">
  <link rel="stylesheet" href="<?php echo $GLOBALS['d'];?>css/main.css?v=1.1.4">

  <!-- Load Font -->
  <!-- Load Icons -->
  <script src="https://kit.fontawesome.com/cbd0a6dcda.js" crossorigin="anonymous"></script>

  <!-- Load Favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo $GLOBALS['d'];?>/assets/icon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $GLOBALS['d'];?>/assets/icon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $GLOBALS['d'];?>/assets/icon/favicon-16x16.png">
  <link rel="manifest" href="<?php echo $GLOBALS['d'];?>/assets/icon/site.webmanifest">
  <link rel="mask-icon" href="<?php echo $GLOBALS['d'];?>/assets/icon/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="<?php echo $GLOBALS['d'];?>/assets/icon/favicon.ico">
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
          <?php if(isset($project) || isset($about)) : ?>
            <li class="homeIcon"><a title="Home" href="/<?php if(isset($_COOKIE['visitorFilter'])){ echo "?filter=".$_COOKIE['visitorFilter']; } ?>"><i class="fa-solid fa-house"></i></a></li>

          <?php else : ?>
            <li class="homeIcon"><a title="About" href="<?php echo $GLOBALS['d'];?>about" title="About"><i class="fa-solid fa-circle-info"></i></a></li>

          <?php endif; ?>

          <li><div class="menuCont" onclick="toggleMenu()" id="MenuToggle" title="Menu">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div></li>
        </ul>
        <div id="OverlayMenu" class="hidden"><!-- TODO: find no js solution -->
          <ul id="MenuContent">
            <a title="Featured Work" href="/<?php if(isset($_COOKIE['visitorFilter'])){ echo "?filter=".$_COOKIE['visitorFilter']; } ?>">
              <li <?php if(!isset($about) && !isset($projects) && !isset($project)){ echo "class='curPage'"; } ?>><?php echo _("Featured Work"); ?></li>
            </a>
            <a href="<?php echo $GLOBALS['d'];?>about" title="About">
              <li <?php if(isset($about)){ echo "class='curPage'"; } ?>><?php echo _("About"); ?></li>
            </a>
            <a href="<?php echo $GLOBALS['d'];?>projects" title="All Projects">
              <li <?php if(isset($projects)){ echo "class='curPage'"; } ?>><?php echo _("All Projects"); ?></li>
            </a>
            <div class="overlayMenuSpacer"></div> <!-- TODO: Move out of Nav -->
            <div class="overlayMenuLanguageSelector">  <!-- TODO: Move out of Nav -->
              <form method="post" action="set_language.php" id="LanguageForm">
                  <input type="hidden" name="language" value="<?php echo $lang == 'en_US' ? 'de_DE' : 'en_US'; ?>">
                  <input type="submit" value="<?php echo $lang == 'en_US' ? 'Deutsch' : 'English'; ?>">
              </form>
            </div>
          </ul>
        </div>
      </nav>
    </header>
    
    <!-- #################################### CONTENT ###################################### -->
    <main id="Content">
    <script src="<?php echo $GLOBALS['d'];?>js/menu.js?v=1.0.0"></script>