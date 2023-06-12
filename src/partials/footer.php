<?php

?>

</main>

    <!-- #################################### FOOTER ###################################### -->

    <footer id="Footer">
          <div>
            <ul class="icons">
              <div class="emailContainer"> <!-- onmouseover="overEmailOverlay()" onmouseout="outEmailOverlay()"> -->
                <a href="mailto: hi@rmichels.com" target="_blank" title="E-Mail | Right-click to copy to clipboard" id="emailLink"><li><i class="fa-solid fa-envelope fa-2x" id="email"></i></li></a>
                <!--<div id="emailOverlay" class="hide" onmouseover="overEmailContainer()" onmouseout="outEmailContainer()">
                <i class="far fa-copy js-emailcopybtn" title="Copy E-Mail to Clipboard"></i>   
                </div>-->
              </div>
              <small class="js-emaillink">hi@rmichels.com</small> 
              <a href="https://linkedin.com/in/robert-michels" target="_blank" title="LinkedIn"><li><i class="fab fa-linkedin-in fa-2x"></i></li></a>
              <a href="https://github.com/Robert01101101" target="_blank" title="GitHub"><li><i class="fab fa-github fa-2x"></i></li></a>
              <a href="https://play.google.com/store/apps/developer?id=Studio+RM" target="_blank" title="Google Play"><li><i class="fab fa-google-play fa-2x"></i></li></a>
              <a href="https://rmichels.itch.io/" target="_blank" ><li><i class="fab fa-itch-io fa-2x"title="Itch.io"></i></li></a>
            </ul>
          </div>
          <noscript><small>hi@rmichels.com</small></noscript>
          <div class="footerEnd">
            <small>Copyright &copy; <?php echo date("Y"); ?> Robert Michels. All Rights Reserved.</small>
            <div>
              <a href="<?php echo $GLOBALS['d'];?>assets/other/RobertMichelsResume.pdf"><small>Resume</small></a>
              <a href="<?php echo $GLOBALS['d'];?>privacyPolicy"><small>Privacy Policy</small></a>
            </div>
          </div>          
    </footer>
  </div>

  <div id="copyConfirm" class="hidden"><small>Copied to Clipboard!</small></div>

  <?php if(!isset($_COOKIE["returningVisitor"])) : ?>

  <?php endif; ?>

  <div id="imageViewer" class="hidden">
    <!-- Next and previous buttons -->
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
    <a class="closeBtn" onclick="closeImageViewer()">&#10006;</a>
    <i class="fa-solid fa-expand hidden" id="fullScreenExpand" onclick="expandView(this)"></i><i class="fa-solid fa-compress" id="fullScreenCompress" onclick="compressView(this)"></i>
  </div>

  <!--############### JavaScript Loading Section ###############-->
  <script type="x-shader/x-vertex" id="vertexshader">

      attribute float scale;

      void main() {

        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

        gl_PointSize = scale * ( 300.0 / - mvPosition.z );

        gl_Position = projectionMatrix * mvPosition;

      }

    </script>

    <script type="x-shader/x-fragment" id="fragmentshader">

      uniform vec3 color;

      void main() {

        if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

        gl_FragColor = vec4( color, 1.0 );

      }

    </script>
    
  <script src="<?php echo $GLOBALS['d'];?>js/three/build/three.min.js"></script>
  <script src="<?php echo $GLOBALS['d'];?>js/three/examples/js/loaders/GLTFLoader.js"></script>
  <script src="<?php echo $GLOBALS['d'];?>js/tools.js?v=1.0.0"></script>
  <script src="<?php echo $GLOBALS['d'];?>js/lqip.js?v=1.0.0"></script>

  <script src="<?php echo $GLOBALS['d'];?>js/three/waves.js?v=1.0.0"></script>
  

  <?php if(isset($index)) : ?>

    <script src="<?php echo $GLOBALS['d'];?>js/three/landingModel.js?v=1.0.0"></script>
    <script src="<?php echo $GLOBALS['d'];?>js/textAnim.js?v=1.0.0"></script>

  <?php endif; ?>
  <?php if(isset($projects)) : ?>

    <script src="<?php echo $GLOBALS['d'];?>js/projectFilter.js?v=1.0.0"></script>

  <?php else: ?>

    <script src="<?php echo $GLOBALS['d'];?>js/downArrow.js?v=1.0.0"></script>

  <?php endif; ?>

  <?php if(!isset($index) && !isset($projects)) : ?>

    <script src="<?php echo $GLOBALS['d'];?>js/imageViewer.js?v=1.0.0"></script>

  <?php endif; ?>
  
  <script src="<?php echo $GLOBALS['d'];?>js/projectTile.js?v=1.0.0"></script>
  <script src="<?php echo $GLOBALS['d'];?>js/other.js?v=1.0.0"></script>
  


</body>

</html>