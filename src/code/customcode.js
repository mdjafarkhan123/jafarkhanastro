import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    function cursorFollowerEffect() {
        if (window.innerWidth <= 1024) return;
        const follower = document.getElementById("cursorFollower");
        const wrapper = document.querySelector(".page-wrapper");

        let targetX = 0,
            targetY = 0;
        let currentX = 0,
            currentY = 0;

        wrapper.addEventListener("mousemove", (e) => {
            const rect = wrapper.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
        });

        gsap.ticker.add(() => {
            currentX += (targetX - currentX) * 0.04;
            currentY += (targetY - currentY) * 0.04;

            gsap.set(follower, {
                x: currentX,
                y: currentY,
            });
        });
    }

    function buttonEffect() {
        function resetMagnet(button, text) {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 2.5,
                ease: "elastic.out(1.2, 0.2)",
            });

            gsap.to(text, {
                x: 0,
                y: 0,
                ease: "power3.out",
            });
        }

        const buttons = document.querySelectorAll(".magnetic-button");
        buttons.forEach((button) => {
            const text = button.querySelector(".btn .text");
            const buttonMagnetPower = button.dataset.strength;
            const textMagnetPower = button.dataset.strengthText;
            const bg = button.querySelector(".btn__bg");

            //========= BG follow mouse effect
            const handleOrigin = (e) => {
                const rect = button.getBoundingClientRect();
                bg.style.left = `${e.clientX - rect.left}px`;
                bg.style.top = `${e.clientY - rect.top}px`;
            };

            button.addEventListener("mouseenter", (e) => {
                handleOrigin(e);
            });
            button.addEventListener("mousemove", function (e) {
                const rect = button.getBoundingClientRect();
                const offsetX = e.clientX - rect.left - rect.width / 2;
                const offsetY = e.clientY - rect.top - rect.height / 2;

                // Move button and text with GSAP
                gsap.to(button, {
                    x: offsetX * 0.5 * buttonMagnetPower,
                    y: offsetY * 0.5 * buttonMagnetPower,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                gsap.to(text, {
                    x: offsetX * textMagnetPower * 0.5,
                    y: offsetY * textMagnetPower * 0.5,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });

            button.addEventListener("mouseleave", (e) => {
                resetMagnet(button, text);
                handleOrigin(e);
            });
        });
    }

    //============ Logo Slider ============
    function slider() {
        new Swiper(".swiper", {
            modules: [Autoplay],
            loop: true,
            slidesPerView: "auto",
            spaceBetween: 40,
            centeredSlides: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                reverseDirection: true,
            },
            speed: 5000,
            allowTouchMove: false,
            freeMode: true,
        });
    }

    //============== Text opacity animaton =============//
    function aboutTextAnimation() {
        document.querySelectorAll(".split-word").forEach((element) => {
            const text = new SplitType(element, { types: "words" });
            const scrollConfig = {
                trigger: element,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                toggleActions: "play play reverse reverse",
            };

            gsap.fromTo(
                element.querySelectorAll("div.word"),
                { opacity: 0.2 },

                {
                    opacity: 1,
                    stagger: 0.2,
                    scrollTrigger: scrollConfig,
                }
            );
        });
    }

    aboutTextAnimation();
    slider();
    buttonEffect();
    cursorFollowerEffect();
});
