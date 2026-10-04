document.addEventListener("DOMContentLoaded", () => {


    function updateIcons() {

        if (window.lucide) {
            lucide.createIcons();
        }

    }

    updateIcons();


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


                if (icon) {

                    icon.setAttribute(
                        "data-lucide",
                        isOpen
                            ? "x"
                            : "menu"
                    );

                    updateIcons();

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
            ".incubation-reveal"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "incubation-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -45px 0px"
                }

            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "incubation-visible"
                );

            }
        );

    }


    const cards =
        document.querySelectorAll(
            ".achievement-card"
        );


    cards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 0.12}s`;

        }
    );



    const nextTrack =
        document.querySelector(
            ".next-track"
        );


    if (nextTrack) {

        const nextObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "next-active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.3
                }

            );


        nextObserver.observe(
            nextTrack
        );

    }



    const heroPhoto =
        document.querySelector(
            ".hero-photo"
        );

    const heroImage =
        document.querySelector(
            ".hero-photo img"
        );


    if (
        heroPhoto &&
        heroImage &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        heroPhoto.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroPhoto
                        .getBoundingClientRect();


                const x =
                    (
                        event.clientX
                        - rect.left
                    )
                    / rect.width
                    - 0.5;


                const y =
                    (
                        event.clientY
                        - rect.top
                    )
                    / rect.height
                    - 0.5;


                heroImage.style.transform =
                    `
                    scale(1.045)
                    translate(
                        ${x * 5}px,
                        ${y * 5}px
                    )
                    `;

            }
        );


        heroPhoto.addEventListener(
            "mouseleave",
            () => {

                heroImage.style.transform =
                    "scale(1) translate(0,0)";

            }
        );

    }




    const achievementButton =
        document.querySelector(
            'a[href="#conquista"]'
        );


    if (achievementButton) {

        achievementButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const target =
                    document.querySelector(
                        "#conquista"
                    );


                if (target) {

                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    }



    const footerElements =
        document.querySelectorAll(
            ".footer-reveal"
        );


    if (footerElements.length) {

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
                    threshold: 0.08
                }

            );


        footerElements.forEach(
            (element) => {

                footerObserver.observe(
                    element
                );

            }
        );

    }

});