const largeScreen = window.matchMedia("(min-width: 1024px)");
window.addEventListener("DOMContentLoaded", () => {
    let path = document.querySelector(".header__menu .path");

    function lerp(start, end, t) {
        return (start * (1 - t) + end * t).toFixed(3);
    }

    let toggle = false;
    let logoText = document.querySelector(".logo-text");
    let y = 100;
    let c = 100;
    let animationFrame;
    let menuToggle = document.querySelector(".header__toggler");
    let menuWrapper = document.querySelector(".header__menu");
    let ul = document.querySelector(".header__menu-items");
    let timer;
    menuWrapper.style.pointerEvents = "none";

    menuToggle.addEventListener("click", () => {
        toggle = !toggle;
        cancelAnimationFrame(animationFrame);
        animate();

        if (toggle) {
            timer = setTimeout(() => {
                menuWrapper.style.pointerEvents = "all";
                ul.classList.add("active-fadein");
                logoText.style.color = "var(--color-text-dark)";
            }, 500);
        } else {
            clearTimeout(timer);
            menuWrapper.style.pointerEvents = "none";
            ul.classList.remove("active-fadein");
            logoText.style.color = "var(--color-text-white)";
        }
    });

    function animate() {
        if (toggle) {
            y = lerp(y, 0, 0.099);
            c = lerp(c, 0, 0.125);
        } else {
            if (largeScreen.matches) {
                y = lerp(y, 100, 0.033);
                c = lerp(c, 100, 0.041);
            } else {
                y = lerp(y, 100, 0.099);
                c = lerp(c, 100, 0.125);
            }
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
