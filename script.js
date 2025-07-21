document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lenis for smooth scroll
    let lenis;
    if (typeof Lenis !== "undefined") {
      lenis = new Lenis({
        smooth: true,
      });
    } else {
      console.error("Lenis is not defined. Please make sure the Lenis library is loaded.");
      // Provide a fallback to prevent errors in raf
      lenis = {
        raf: function(time) {
          requestAnimationFrame(lenis.raf);
        }
      };
    }
  
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
  
    // Animation function
    function initAnimations() {
      // Select all scrollable elements
      document.querySelectorAll(".elem").forEach((elem) => {
        const image = elem.querySelector("img");
        const xTransform = gsap.utils.random(-100, 100);
  
        const tl = gsap.timeline();
  
        tl.set(image, {
          transformOrigin: `{xTransform < 0 ? "0%" : "100%"} center`
        })
          .to(
            image,
            {
              scale: 0,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            },
            "start"
          )
          .to(elem, {
            xPercent: xTransform,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
      });
    }
  
    // RAF function
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
  
    // Start the animation loop
    requestAnimationFrame(raf);
    
    // Initialize animations
    initAnimations();
  });