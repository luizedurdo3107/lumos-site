document.addEventListener("DOMContentLoaded", () => {

    if (window.lucide) {

        lucide.createIcons();

    }


    const menuButton =
        document.querySelector(".menu-button");

    const nav =
        document.querySelector(".nav-links");


    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

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


                if (icon && window.lucide) {

                    icon.setAttribute(
                        "data-lucide",
                        isOpen
                            ? "x"
                            : "menu"
                    );

                    lucide.createIcons();

                }

            }
        );


        nav.querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "open"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }



    const revealElements =
        document.querySelectorAll(
            ".news-reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "news-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );



    const canvas =
        document.getElementById(
            "newsStars"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {
        return;
    }


    let width = 0;
    let height = 0;

    let stars = [];

    const ripples = [];

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

        starCount: 500,

        maxStarSize: 1.8,

        rippleRadius: 230,

        rippleStrength: 42,

        rippleSpeed: 4.5,

        rippleInterval: 55,

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
                        ? 1.2 +
                          Math.random() * 1.4
                        : 0.35 +
                          Math.random() * 1.1,

                opacity:
                    brightStar
                        ? 0.7 +
                          Math.random() * 0.3
                        : 0.3 +
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
                    Math.random() * 0.7,

                bright:
                    brightStar

            });

        }

    }


    function createRipple(x, y) {

        ripples.push({

            x,
            y,

            radius: 0,

            life: 1

        });


        if (ripples.length > 8) {

            ripples.shift();

        }

    }


    canvas.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                canvas.getBoundingClientRect();


            mouse.targetX =
                event.clientX -
                rect.left;


            mouse.targetY =
                event.clientY -
                rect.top;


            mouse.active = true;



            const page =
                document.querySelector(
                    ".news-page"
                );


            if (page) {

                page.style.setProperty(
                    "--mouse-x",
                    `${mouse.targetX}px`
                );


                page.style.setProperty(
                    "--mouse-y",
                    `${mouse.targetY}px`
                );

            }




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


                lastRippleTime = now;

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
                "rgba(255,255,255,0.035)"
            );


            mouseGlow.addColorStop(
                0.45,
                "rgba(255,255,255,0.015)"
            );


            mouseGlow.addColorStop(
                1,
                "rgba(255,255,255,0)"
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



        stars.forEach(
            (star) => {

                let x = star.x;

                let y = star.y;



                

                x +=
                    Math.sin(
                        time *
                        star.speed +
                        star.phase
                    ) * 0.22;


                y +=
                    Math.cos(
                        time *
                        star.speed +
                        star.phase
                    ) * 0.22;



                ripples.forEach(
                    (ripple) => {

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
                                difference /
                                config.rippleRadius;


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
                                Math.cos(
                                    angle
                                ) *
                                force;


                            y +=
                                Math.sin(
                                    angle
                                ) *
                                force;

                        }

                    }
                );


                const twinkle =
                    Math.sin(
                        time *
                        0.025 +
                        star.phase
                    ) * 0.14;


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
                        star.size * 6;


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
                            255,
                            255,
                            255,
                            ${opacity * 0.5}
                        )`
                    );


                    gradient.addColorStop(
                        0.25,
                        `rgba(
                            220,
                            240,
                            238,
                            ${opacity * 0.22}
                        )`
                    );


                    gradient.addColorStop(
                        0.6,
                        `rgba(
                            180,
                            210,
                            208,
                            ${opacity * 0.06}
                        )`
                    );


                    gradient.addColorStop(
                        1,
                        "rgba(255,255,255,0)"
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
                        220,
                        235,
                        233,
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
                            255,
                            255,
                            255,
                            ${opacity * 0.18}
                        )`;


                    ctx.lineWidth = 0.5;


                    ctx.stroke();

                }

            }
        );



        ripples.forEach(
            (ripple) => {

                if (
                    ripple.life <= 0
                ) {
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
                    "rgba(255,255,255,0)"
                );


                rippleGlow.addColorStop(
                    0.45,
                    `rgba(
                        255,
                        255,
                        255,
                        ${0.025 *
                        ripple.life}
                    )`
                );


                rippleGlow.addColorStop(
                    0.5,
                    `rgba(
                        255,
                        255,
                        255,
                        ${0.05 *
                        ripple.life}
                    )`
                );


                rippleGlow.addColorStop(
                    0.55,
                    `rgba(
                        255,
                        255,
                        255,
                        ${0.02 *
                        ripple.life}
                    )`
                );


                rippleGlow.addColorStop(
                    1,
                    "rgba(255,255,255,0)"
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

            }
        );



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



    const newsItems =
        document.querySelectorAll(
            ".news-item"
        );


    newsItems.forEach(
        (item) => {

            item.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        item.getBoundingClientRect();


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
                        (
                            y -
                            centerY
                        ) /
                        25;


                    const rotateY =
                        (
                            centerX -
                            x
                        ) /
                        30;


                    item.style.transform =
                        `
                        translateY(-7px)
                        scale(1.015)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    item.style.transform =
                        "";

                }
            );

        }
    );



    const page =
        document.querySelector(
            ".news-page"
        );


    if (page) {

        page.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    page.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;


                newsItems.forEach(
                    (item, index) => {

                        if (
                            item.matches(":hover")
                        ) {
                            return;
                        }


                        const amount =
                            index === 0
                                ? 2
                                : -2;


                        item.style.transform =
                            `
                            translate(
                                ${x * amount}px,
                                ${y * amount}px
                            )
                            `;

                    }
                );

            }
        );


        page.addEventListener(
            "pointerleave",
            () => {

                newsItems.forEach(
                    (item) => {

                        if (
                            !item.matches(":hover")
                        ) {

                            item.style.transform =
                                "";

                        }

                    }
                );

            }
        );

    }

const footerRevealElements =
    document.querySelectorAll(".footer-reveal");


if (footerRevealElements.length > 0) {

    const footerObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

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
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    footerRevealElements.forEach(
        (element) => {

            footerObserver.observe(
                element
            );

        }
    );

}

});