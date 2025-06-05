


gsap.registerPlugin(ScrollTrigger);

gsap.from(".why-choose-us", {
    x: -500,
    duration: 1,
    opacity: 0,
    start: "20px 80%",
    edd: "bottom 100px",
    scrollTrigger: {
        trigger: ".why-choose-us ",
        start:"top 50%",     
        toggleActions: "play pause resume reset",
        // markers:true
    },
});

gsap.from(".feature-section-1", {
    x: 500,
    duration: 1,
    opacity: 0,
    start: "20px 80%",
    edd: "bottom 100px",
    scrollTrigger: {
        trigger: ".feature-section-1 ",
        start:"top 50%",     
        toggleActions: "play pause resume reset",
        // markers:true
    },
});

gsap.from(".feature-section-2", {
    y: -100,
    duration: 1.5,
    opacity: 0,
    start: "20px 80%",
    edd: "bottom 100px",
    scrollTrigger: {
        trigger: ".feature-section-2 ",
        start:"top 50%",     
        toggleActions: "play pause resume reset",
        // markers:true
    },
});

gsap.from(".feature-section-3", {
    x: -500,
    duration: 1,
    opacity: 0,
    start: "20px 80%",
    edd: "bottom 100px",
    scrollTrigger: {
        trigger: ".feature-section-3 ",
        start:"top 50%",     
        toggleActions: "play pause resume reset",
        // markers:true
    },
});

gsap.from(".how-we-help", {
    y: 100,
    duration: 1.5,
    opacity: 0,
    start: "20px 80%",
    edd: "bottom 100px",
    scrollTrigger: {
        trigger: ".how-we-help ",
        start:"top 50%",     
        toggleActions: "play pause resume reset",
        // markers:true
    },
});

gsap.from(".who-we-help", {
    x: 300,
    duration: 1,
    delay: 0.5,
    opacity: 0,
    start: "20px 80%",
    edd: "bottom 20px",
    scrollTrigger: {
        trigger: ".how-we-help ",
        start:"top 50%",     
        toggleActions: "play pause resume reset",
        // markers:true
    },
});
          
gsap.from('header', {duration: 4.5  , ease: "power2.out", y: -100 });
gsap.from('.hero-content-wrap', {duration: 3.6  , ease: "elastic.out(3, 0.3)", opacity:0, x: -50, delay: 1 });
gsap.from('.why-choose-content', {duration: 5  , ease: "power4.out", opacity:0, x: -80, delay: 2 });
gsap.from('.hero-img', { duration: 3.5, ease: "power2.out", opacity:0, x: 150, delay: 2.7 });
