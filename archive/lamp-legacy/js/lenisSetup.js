// Initialize Lenis
window.lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  //console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


var currentlyEnabled = true;

// Function to toggle Lenis smooth scrolling
function toggleLenisSmoothing(enabled) {
    lenis.destroy(); 

    lenis = new Lenis({
        // Your existing Lenis options
        smoothWheel: enabled,
    });
  
    // Save the setting to localStorage
    localStorage.setItem('lenisSmoothScrolling', enabled);

    if (currentlyEnabled != enabled) window.location.reload();

    currentlyEnabled = enabled;
}
  
document.addEventListener('DOMContentLoaded', () => {
    // Get the toggle element
    const lenisScrollToggle = document.getElementById('lenisScrollToggle');
  
    // Set initial state based on localStorage (default to true if not set)
    const lenisSmoothScrollingEnabled = localStorage.getItem('lenisSmoothScrolling') !== 'false';
    currentlyEnabled = lenisSmoothScrollingEnabled;
    lenisScrollToggle.checked = lenisSmoothScrollingEnabled;
  
    // Set initial Lenis state
    toggleLenisSmoothing(lenisSmoothScrollingEnabled);
  
    // Add event listener to the toggle
    lenisScrollToggle.addEventListener('change', (e) => {
      toggleLenisSmoothing(e.target.checked);
    });
});