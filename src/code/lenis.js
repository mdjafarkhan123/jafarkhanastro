import Lenis from "lenis";
const lenis = new Lenis({
    wheelMultiplier: 1.5,
    smoothWheel: true,
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
