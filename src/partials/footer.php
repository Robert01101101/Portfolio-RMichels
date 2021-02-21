<?php

?>

</main>

    <!-- #################################### FOOTER ###################################### -->

    <footer>
      <h2>Intrigued?</h2>
      <div class="footer_row">
        <div class="footer_lCol">
          <h3>Get in touch with me &nbsp;&#8594;</h3>
          <noscript><small>robert_michels@outlook.com</small></noscript>
        </div>
        <div class="footer_rCol">
          <div>
            <ul class="icons">
              <div class="emailContainer" onmouseover="overEmailOverlay()" onmouseout="outEmailOverlay()">
                <a href="mailto: robert_michels@outlook.com" target="_blank" title="E-Mail"><li><i class="fas fa-at fa-2x" id="email"></i></li></a>
                <div id="emailOverlay" class="hide" onmouseover="overEmailContainer()" onmouseout="outEmailContainer()">
                  <small class="js-emaillink">robert_michels@outlook.com</small>  
                  <i class="far fa-copy js-emailcopybtn" title="Copy E-Mail to Clipboard"></i> 
                </div>
              </div>
              <a href="https://linkedin.com/in/robert-michels" target="_blank" title="LinkedIn"><li><i class="fab fa-linkedin-in fa-2x"></i></li></a>
              <a href="https://github.com/robert-michels" target="_blank" title="GitHub"><li><i class="fab fa-github fa-2x"></i></li></a>
              <a href="https://play.google.com/store/apps/developer?id=Studio+RM" target="_blank" title="Google Play"><li><i class="fab fa-google-play fa-2x"></i></li></a>
              <a href="https://rmichels.itch.io/" target="_blank" ><li><i class="fab fa-itch-io fa-2x"title="Itch.io"></i></li></a>
            </ul>
          </div>
          <small>Copyright &copy; <?php echo date("Y"); ?> Robert Michels. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  </div>

  <div id="copyConfirm" class="hidden"><small>Copied to Clipboard!</small></div>

  <?php if(!isset($_COOKIE["returningVisitor"])) : ?>

    <div id="tmpVisitorPopUp">
      <div>
        <h2>Hello There!</h2>
        <p>This website is in development &#38; is expected to be finished by Mid-February 2020.</p>
        <p>If you are a stranger who just happened to stumble upon this, feel free to explore, but be warned - things aren't quite done yet.</p>
        <p>If you would like to give me feedback, that would be much appreciated!</p>
        <div>
          <a href="https://forms.gle/kWRg97XYz8k5jd8u7" target="_blank" onclick="closePopUp()">Open survey in another tab &#8594;</a>
          <button onclick="closePopUp()">Close &#38; explore site &#8594;</button>
        </div>   
      </div>
    </div>
    <script>
    function closePopUp() {
      document.getElementById("tmpVisitorPopUp").style.display = "none";
    }
    </script>

  <?php endif; ?>

  <div id="imageViewer" class="hidden">
    <!-- Next and previous buttons -->
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
    <a class="closeBtn" onclick="closeImageViewer()">&#10006;</a>
    <i class="fas fa-expand hidden" id="fullScreenExpand" onclick="expandView(this)"></i><i class="fas fa-compress" id="fullScreenCompress" onclick="compressView(this)"></i>
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
    
  <script src="js/three/build/three.min.js"></script>
  <script src="js/three/examples/js/loaders/GLTFLoader.js"></script>
  <script src="js/tools.js"></script>
  <script src="js/lqip.js"></script>
  <!--<script src="three/myThreeScript.js"></script>-->
  <!--<script src="three/skull.js"></script>-->

  <script src="js/three/waves.js"></script>
  

  <?php if(isset($index)) : ?>

    <script src="js/three/landingModel.js"></script>
    <script src="js/textAnim.js"></script>

  <?php endif; ?>
  <?php if(isset($projects)) : ?>

    <script src="js/projectFilter.js"></script>

  <?php else: ?>

    <script src="js/downArrow.js"></script>

  <?php endif; ?>

  <?php if(!isset($index) && !isset($projects)) : ?>

    <script src="js/imageViewer.js"></script>

  <?php endif; ?>
  
  <script src="js/projectTile.js"></script>
  <script src="js/other.js"></script>
  


</body>

</html>