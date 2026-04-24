gsap.registerPlugin(ScrollTrigger, SplitText);

// Loader
gsap.to(".loader-text", {opacity:1, duration:1.5, ease:"power4.out"});
gsap.to(".loader", {opacity:0, delay:2.5, duration:1.5, onComplete:() => document.querySelector(".loader").style.display="none"});

// Custom Cursor
document.addEventListener("mousemove", (e) => {
    gsap.to(".custom-cursor", {x:e.clientX, y:e.clientY, duration:0.2});
});

// Hero Split Text
const splitHero = new SplitText(".split-me", {type:"chars,words"});
gsap.from(splitHero.chars, {y:150, opacity:0, stagger:0.06, duration:2, ease:"power4.out", delay:0.5});

// Scroll Animations
gsap.utils.toArray(".section-heading").forEach(h => {
    gsap.from(h, {opacity:0, y:150, duration:1.8, ease:"power3.out", scrollTrigger:{trigger:h, start:"top 85%"}});
});

gsap.utils.toArray(".about-para, .tags span, .project-item").forEach(el => {
    gsap.from(el, {opacity:0, y:100, duration:1.5, stagger:0.15, ease:"power3.out", scrollTrigger:{trigger:el, start:"top 80%"}});
});

// Parallax on Images
gsap.utils.toArray(".project-visual img").forEach(img => {
    gsap.to(img, {
        yPercent:-30,
        ease:"none",
        scrollTrigger:{trigger:img.parentElement, start:"top bottom", end:"bottom top", scrub:true}
    });
});