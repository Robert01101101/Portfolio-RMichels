var site = site || {};
site.window = $(window),
site.document = $(document),
site.Width = site.window.width(),
site.Height = site.window.height();
var scroller = new FancyScroll
  , ready = function() {
    scroller.scale = .1,
    scroller.check = 50,
    scroller.move = 200,
    scroller.render = 2,
    scroller.setEntries($(".ani-item, .portfolio-item")),
    resize()
}
  , resize = function() {
    var e = document.getElementById("content-holder").offsetWidth
      , n = window.innerHeight;
    scroller.resize(e, n),
    scrollerBackup = scroller
}
  , Background = function() {};
Background.headparticle = function() {
    Modernizr.webgl || alert("Your browser dosent support WebGL");
    var e, n = 0, r = 0, t = site.Width / 2, o = site.Height / 2;
    Background.camera = new THREE.PerspectiveCamera(40,site.Width / site.Height,1,2e3),
    Background.camera.position.z = 300,
    Background.scene = new THREE.Scene;
    var i = new THREE.LoadingManager
      , a = new THREE.Geometry
      , c = new THREE.ParticleBasicMaterial({
        color: 13421772,
        size: 1
    });
    function d() {
        Background.camera.position.x += 1 * (-.5 * n - Background.camera.position.x),
        Background.camera.position.y += .5 * (.5 * r - Background.camera.position.y),
        Background.camera.lookAt(Background.scene.position),
        Background.renderer.render(Background.scene, Background.camera)
    }
    new THREE.OBJLoader(i).load("/wp-content/themes/semplice4-child/obj/head_skull.obj", function(n) {
        n.traverse(function(e) {
            if (e instanceof THREE.Mesh) {
                $(e.geometry.vertices).each(function() {
                    a.vertices.push(new THREE.Vector3(7 * this.x + 100,7 * this.y + 10,7 * this.z))
                })
            }
        }),
        Background.scene.add(e)
    }),
    e = new THREE.ParticleSystem(a,c),
    Background.renderer = new THREE.WebGLRenderer({
        alpha: !0
    }),
    Background.renderer.setSize(site.Width, site.Height),
    Background.renderer.setClearColor(0, 0),
    $(".particlehead").append(Background.renderer.domElement),
    $(".particlehead").on("mousemove", function(e) {
        n = (e.clientX - t) / 2 - 300,
        r = (e.clientY - o) / 2
    }),
    site.window.on("resize", function() {
        t = site.Width / 2,
        o = site.Height / 2,
        Background.camera.aspect = site.Width / site.Height,
        Background.camera.updateProjectionMatrix(),
        Background.renderer.setSize(site.Width, site.Height)
    }),
    Background.animate = function() {
        Background.ticker = TweenMax.ticker,
        Background.ticker.addEventListener("tick", Background.animate),
        d()
    }
    ,
    d(),
    Background.animate()
}
,
$(document).ready(function() {
    Background.headparticle()
}),
$(document).ajaxComplete(function() {
    $(".full-screen-loader-container").remove(),
    $("#content-holder a").addClass("link"),
    "/" === window.location.pathname && Background.headparticle(),
    setTimeout(function() {
        ready()
    }, 1e3)
}),
$(document).ajaxStart(function() {
    $(".full-screen-loader-container").remove()
}),
$(window).load(function() {
    $("#content-holder a").addClass("link"),
    ready()
}),
$(window).resize(function() {
    resize()
});