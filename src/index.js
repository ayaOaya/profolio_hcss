gsap.registerPlugin(ScrollTrigger);

/* background change */
gsap.utils.toArray('.section').forEach((section, i) => {
  
  if(section.getAttribute('data-color') !== null) {
    
    var colorAttr = section.getAttribute('data-color')
    
    gsap.to(".wrap", {
      backgroundColor: colorAttr === "dark" ? gsap.getProperty("html", "--dark") : gsap.getProperty("html", "--light"),
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        scrub: true,
        start:'top bottom',
        end: '+=100%'
      }
    });

  }
  
});

/* ball  */
gsap.set(".ball", {xPercent: -50, yPercent: -50});

const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 0.2;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
  mouse.x = e.x;
  mouse.y = e.y;  
});

gsap.ticker.add(() => {
  
  // adjust speed for higher refresh monitors
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
  
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});

/* end of ball */



const throttled = (delay, fn) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

const movableElementsWrapper = document.querySelector(
  ".movable-elements-wrapper"
);
const sp = 0.99;

const items = gsap.utils.toArray(".movable").map(element => {
  return {
    element,
    shiftValue: element.getAttribute("data-value") / 60,
    xSet: gsap.quickSetter(element, "x", "px"),
    ySet: gsap.quickSetter(element, "y", "px"),
  }
});

const ms = {
  x: 0,
  y: 0
};

const mouseMoveHandler = (e) => {
  ms.x = e.x;
  ms.y = e.y;
};

movableElementsWrapper.onmousemove = mouseMoveHandler;

gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - sp, gsap.ticker.deltaRatio());
  
  items.forEach(item => {
    item.xSet(item.shiftValue * ms.x * dt);
    item.ySet(item.shiftValue * ms.y * dt);
  });
});

/* contact */
gsap.to(".contact-h2", {x:-1000, duration:3, delay:1.5 ,scrollTrigger: {
  trigger: ".contact-h2",
  scrub:true

}})
gsap.to(".about", {x:-1000, duration:3, delay:1.5 ,scrollTrigger: {
  trigger: ".about",
  scrub:true

}})