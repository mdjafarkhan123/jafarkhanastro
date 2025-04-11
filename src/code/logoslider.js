import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
document.addEventListener("DOMContentLoaded", () => {
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
            reverseDirection: true, // Also needed for RTL autoplay
        },
        speed: 5000,
        allowTouchMove: false,
        freeMode: true,
    });
});
