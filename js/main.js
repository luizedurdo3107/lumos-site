document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon = menuButton.querySelector("[data-lucide]");

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

                const icon = menuButton.querySelector(
                    "[data-lucide]"
                );

                if (icon) {

                    icon.setAttribute(
                        "data-lucide",
                        "menu"
                    );

                    lucide.createIcons();
                }
            });

        });
    }



    const canvas =
        document.getElementById("galaxyCanvas");

    if (!canvas) {

        console.error(
            "Canvas da galáxia não encontrado."
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");

    if (!ctx) {

        console.error(
            "Canvas 2D não suportado pelo navegador."
        );

        return;
    }


    let width = 0;
    let height = 0;



    let stars = [];



    const ripples = [];



    let animationFrame = null;

    let time = 0;

    let lastRippleTime = 0;



    const mouse = {

        x: -1000,
        y: -1000,

        targetX: -1000,
        targetY: -1000,

        active: false

    };



    const config = {

        starCount: 450,


        maxStarSize: 1.8,

        rippleRadius: 230,


        
        rippleStrength: 45,


    
        rippleSpeed: 4.5,

        rippleInterval: 50,


        
        brightStarChance: 0.14

    };


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


        canvas.style.width =
            `${width}px`;

        canvas.style.height =
            `${height}px`;


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
            i < config.starCount;
            i++
        ) {

        

            const brightStar =
                Math.random() <
                config.brightStarChance;


            stars.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,


                size:
                    brightStar
                        ? 1.3 +
                          Math.random() * 1.5
                        : 0.35 +
                          Math.random() * 1.15,


                opacity:
                    brightStar
                        ? 0.75 +
                          Math.random() * 0.25
                        : 0.35 +
                          Math.random() * 0.55,


                phase:
                    Math.random() *
                    Math.PI *
                    2,


                speed:
                    0.005 +
                    Math.random() *
                    0.015,


                depth:
                    0.3 +
                    Math.random() *
                    0.7,


                bright:
                    brightStar

            });

        }

    }

    function createRipple(x, y) {

        ripples.push({

            x: x,

            y: y,

            radius: 0,

            life: 1

        });



        if (ripples.length > 8) {

            ripples.shift();

        }

    }


    canvas.addEventListener(
        "pointermove",
        event => {

            const rect =
                canvas.getBoundingClientRect();


            mouse.targetX =
                event.clientX -
                rect.left;


            mouse.targetY =
                event.clientY -
                rect.top;


            mouse.active = true;


            

            const now =
                performance.now();


            if (
                now -
                lastRippleTime >
                config.rippleInterval
            ) {

                createRipple(
                    mouse.targetX,
                    mouse.targetY
                );


                lastRippleTime =
                    now;
            }

        }
    );



    canvas.addEventListener(
        "pointerleave",
        () => {

            mouse.active = false;

            mouse.targetX = -1000;

            mouse.targetY = -1000;

        }
    );



    function animate() {

        time += 1;



        ctx.clearRect(
            0,
            0,
            width,
            height
        );



        mouse.x +=
            (
                mouse.targetX -
                mouse.x
            ) * 0.08;


        mouse.y +=
            (
                mouse.targetY -
                mouse.y
            ) * 0.08;



        for (
            let i = ripples.length - 1;
            i >= 0;
            i--
        ) {

            const ripple =
                ripples[i];


            ripple.radius +=
                config.rippleSpeed;


            ripple.life -=
                0.009;


            if (
                ripple.life <= 0 ||
                ripple.radius > 900
            ) {

                ripples.splice(
                    i,
                    1
                );

            }

        }


        if (mouse.active) {

            const mouseGlow =
                ctx.createRadialGradient(
                    mouse.x,
                    mouse.y,
                    0,
                    mouse.x,
                    mouse.y,
                    180
                );


            mouseGlow.addColorStop(
                0,
                "rgba(92, 230, 220, 0.055)"
            );


            mouseGlow.addColorStop(
                0.45,
                "rgba(76, 211, 205, 0.025)"
            );


            mouseGlow.addColorStop(
                1,
                "rgba(76, 211, 205, 0)"
            );


            ctx.beginPath();

            ctx.arc(
                mouse.x,
                mouse.y,
                180,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                mouseGlow;

            ctx.fill();

        }


        stars.forEach(star => {

         

            let x = star.x;

            let y = star.y;



            x +=
                Math.sin(
                    time *
                    star.speed +
                    star.phase
                ) *
                0.22;


            y +=
                Math.cos(
                    time *
                    star.speed +
                    star.phase
                ) *
                0.22;



            ripples.forEach(ripple => {

                const dx =
                    star.x -
                    ripple.x;


                const dy =
                    star.y -
                    ripple.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );



                const difference =
                    Math.abs(
                        distance -
                        ripple.radius
                    );


            

                if (
                    difference <
                    config.rippleRadius
                ) {

                    let influence =
                        1 -
                        (
                            difference /
                            config.rippleRadius
                        );


                    influence =
                        Math.max(
                            0,
                            influence
                        );



                    influence =
                        Math.pow(
                            influence,
                            1.25
                        );


                   

                    const angle =
                        Math.atan2(
                            dy,
                            dx
                        );



                    const force =
                        influence *
                        ripple.life *
                        config.rippleStrength *
                        (
                            0.65 +
                            star.depth
                        );


                    

                    x +=
                        Math.cos(angle) *
                        force;


                    y +=
                        Math.sin(angle) *
                        force;

                }

            });


            const twinkle =
                Math.sin(
                    time *
                    0.025 +
                    star.phase
                ) *
                0.14;


            const opacity =
                Math.max(
                    0.08,

                    Math.min(
                        1,

                        star.opacity +
                        twinkle
                    )
                );


            if (star.bright) {

                const glowRadius =
                    star.size *
                    6;


                const gradient =
                    ctx.createRadialGradient(
                        x,
                        y,
                        0,
                        x,
                        y,
                        glowRadius
                    );


                gradient.addColorStop(
                    0,
                    `rgba(
                        185,
                        255,
                        248,
                        ${opacity * 0.5}
                    )`
                );


                gradient.addColorStop(
                    0.25,
                    `rgba(
                        105,
                        230,
                        222,
                        ${opacity * 0.25}
                    )`
                );


                gradient.addColorStop(
                    0.6,
                    `rgba(
                        85,
                        205,
                        200,
                        ${opacity * 0.08}
                    )`
                );


                gradient.addColorStop(
                    1,
                    "rgba(80, 200, 195, 0)"
                );


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    glowRadius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    gradient;


                ctx.fill();

            }



            ctx.beginPath();

            ctx.arc(
                x,
                y,
                star.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    210,
                    242,
                    240,
                    ${opacity}
                )`;


            ctx.fill();



            if (
                star.bright &&
                star.size > 1.5
            ) {

                const crossSize =
                    star.size * 3;


                ctx.beginPath();

                ctx.moveTo(
                    x - crossSize,
                    y
                );

                ctx.lineTo(
                    x + crossSize,
                    y
                );

                ctx.moveTo(
                    x,
                    y - crossSize
                );

                ctx.lineTo(
                    x,
                    y + crossSize
                );


                ctx.strokeStyle =
                    `rgba(
                        190,
                        250,
                        246,
                        ${opacity * 0.18}
                    )`;


                ctx.lineWidth =
                    0.5;


                ctx.stroke();

            }

        });



        ripples.forEach(ripple => {


            if (ripple.life <= 0) {
                return;
            }


            const rippleGlow =
                ctx.createRadialGradient(
                    ripple.x,
                    ripple.y,
                    Math.max(
                        0,
                        ripple.radius - 50
                    ),
                    ripple.x,
                    ripple.y,
                    ripple.radius + 40
                );


            rippleGlow.addColorStop(
                0,
                "rgba(100, 230, 222, 0)"
            );


            rippleGlow.addColorStop(
                0.45,
                `rgba(
                    100,
                    235,
                    226,
                    ${0.035 * ripple.life}
                )`
            );


            rippleGlow.addColorStop(
                0.5,
                `rgba(
                    140,
                    250,
                    242,
                    ${0.06 * ripple.life}
                )`
            );


            rippleGlow.addColorStop(
                0.55,
                `rgba(
                    100,
                    225,
                    218,
                    ${0.025 * ripple.life}
                )`
            );


            rippleGlow.addColorStop(
                1,
                "rgba(80, 200, 195, 0)"
            );


            ctx.beginPath();

            ctx.arc(
                ripple.x,
                ripple.y,
                ripple.radius + 40,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                rippleGlow;


            ctx.fill();

        });


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    resizeCanvas();

    animate();


    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

        }
    );


    const aboutSection = document.querySelector(".about-section");

if (aboutSection) {

    const aboutObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    aboutSection.classList.add("is-visible");

                    aboutObserver.unobserve(aboutSection);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    aboutObserver.observe(aboutSection);
}

const revealElements = document.querySelectorAll(".reveal-up");

if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}


const productRevealElements = document.querySelectorAll(
    ".reveal-product"
);

if (productRevealElements.length > 0) {

    const productObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    productObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    productRevealElements.forEach((element) => {

        productObserver.observe(element);

    });

}


const footerElements = document.querySelectorAll(".footer-reveal");

if (footerElements.length > 0) {

    const footerObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("footer-visible");

                    footerObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    footerElements.forEach((element) => {

        footerObserver.observe(element);

    });

}

});

