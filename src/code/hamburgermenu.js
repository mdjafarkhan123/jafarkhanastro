window.addEventListener("DOMContentLoaded", () => {
    let path = document.querySelector(".header__menu .path");

    function lerp(start, end, t) {
        return (start * (1 - t) + end * t).toFixed(3);
    }

    let toggle = false;
    let y = 100;
    let c = 100;
    let animationFrame;
    let menuToggle = document.querySelector(".header__toggler");
    let ul = document.querySelector(".header__menu-items");
    let timer;

    menuToggle.addEventListener("click", () => {
        toggle = !toggle;
        cancelAnimationFrame(animationFrame);
        animate();

        if (toggle) {
            timer = setTimeout(() => {
                ul.classList.add("active-fadein");
            }, 500);
        } else {
            clearTimeout(timer);
            ul.classList.remove("active-fadein");
        }
    });

    function animate() {
        if (toggle) {
            y = lerp(y, 0, 0.099);
            c = lerp(c, 0, 0.125);
        } else {
            y = lerp(y, 100, 0.045);
            c = lerp(c, 100, 0.065);
        }
        path.setAttribute(
            "d",
            `M 0 ${y} L 0 100 100 100 100 ${y} C ${50} ${c}, ${50} ${c}, 0 ${y}`
        );
        if ((toggle && y < 1 && c < 1) || (!toggle && y > 99 && c > 99)) {
            cancelAnimationFrame(animationFrame);
            return;
        }

        animationFrame = requestAnimationFrame(animate);
    }
});
