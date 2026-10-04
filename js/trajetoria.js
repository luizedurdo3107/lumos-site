document.addEventListener("DOMContentLoaded", () => {

    if (window.lucide) {
        lucide.createIcons();
    }

    const menuButton =
        document.querySelector(".menu-button");

    const nav =
        document.querySelector(".nav-links");


    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon =
                menuButton.querySelector(
                    "[data-lucide]"
                );

            if (icon) {

                icon.setAttribute(
                    "data-lucide",
                    isOpen ? "x" : "menu"
                );

                lucide.createIcons();
            }

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.15,
            rootMargin:
                "0px 0px -60px 0px"
        }
    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});


const footerElements =
    document.querySelectorAll(".footer-reveal");

const footerObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "footer-visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.1,
            rootMargin:
                "10px 10px -20px 10px"
        }
    );


footerElements.forEach(element => {
    footerObserver.observe(element);
});



    const canvas =
        document.getElementById(
            "trajectoryStars"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    let width = 0;
    let height = 0;

    let stars = [];

    let mouse = {
        x: -1000,
        y: -1000
    };


    const STAR_COUNT = 180;


    function resizeCanvas() {

        const rect =
            canvas.getBoundingClientRect();

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        width = rect.width;
        height = rect.height;

        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        createStars();
    }


    function createStars() {

        stars = [];

        for (
            let i = 0;
            i < STAR_COUNT;
            i++
        ) {

            stars.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                radius:
                    Math.random() *
                    1.5 +
                    0.3,

                opacity:
                    Math.random() *
                    0.7 +
                    0.2,

                speed:
                    Math.random() *
                    0.15 +
                    0.03,

                phase:
                    Math.random() *
                    Math.PI *
                    2

            });

        }

    }


    canvas.addEventListener(
        "pointermove",
        event => {

            const rect =
                canvas.getBoundingClientRect();

            mouse.x =
                event.clientX -
                rect.left;

            mouse.y =
                event.clientY -
                rect.top;

        }
    );


    canvas.addEventListener(
        "pointerleave",
        () => {

            mouse.x = -1000;
            mouse.y = -1000;

        }
    );


    let time = 0;


    function animate() {

        time += 1;

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        stars.forEach(star => {

            let x = star.x;
            let y = star.y;


          

            x +=
                Math.sin(
                    time *
                    star.speed +
                    star.phase
                ) *
                0.25;

            y +=
                Math.cos(
                    time *
                    star.speed +
                    star.phase
                ) *
                0.25;


            
            const dx =
                x - mouse.x;

            const dy =
                y - mouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 140) {

                const force =
                    (1 -
                        distance / 140) *
                    8;

                x +=
                    (dx / (distance || 1)) *
                    force;

                y +=
                    (dy / (distance || 1)) *
                    force;

            }



            const twinkle =
                Math.sin(
                    time *
                    0.025 +
                    star.phase
                ) *
                0.15;


            const opacity =
                Math.max(
                    0.08,
                    star.opacity +
                    twinkle
                );


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(
                    205,
                    235,
                    230,
                    ${opacity}
                )`;

            ctx.fill();

        });


        requestAnimationFrame(
            animate
        );

    }


    resizeCanvas();

    animate();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    const images =
        document.querySelectorAll(
            ".trajectory-image, .incubation-image"
        );


    images.forEach(image => {

        image.addEventListener(
            "mousemove",
            event => {

                const rect =
                    image.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;


                image.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.015)
                    `;

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "";

            }
        );

    });

});