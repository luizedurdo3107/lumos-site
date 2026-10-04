document.addEventListener("DOMContentLoaded", () => {

    function updateIcons() {
        if (window.lucide) {
            lucide.createIcons();
        }
    }

    updateIcons();


    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon = menuButton.querySelector(
                "[data-lucide]"
            );

            if (icon) {

                icon.setAttribute(
                    "data-lucide",
                    isOpen ? "x" : "menu"
                );

                updateIcons();

            }

        });


        nav.querySelectorAll("a").forEach((link) => {

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
        document.querySelectorAll(".congress-reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "congress-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -45px 0px"
                }

            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "congress-visible"
            );

        });

    }


    const experienceCards =
        document.querySelectorAll(".experience-card");

    experienceCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.12}s`;

    });


    const journeyTrack =
        document.querySelector(".journey-track");


    if (journeyTrack) {

        const journeyObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "journey-active"
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


        journeyObserver.observe(journeyTrack);

    }


    const heroPhoto =
        document.querySelector(".hero-photo");

    const heroImage =
        document.querySelector(".hero-photo img");


    if (
        heroPhoto &&
        heroImage &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        heroPhoto.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroPhoto.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width - 0.5;

                const y =
                    (event.clientY - rect.top)
                    / rect.height - 0.5;


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
                    "scale(1) translate(0, 0)";

            }
        );

    }



    const experienceButton =
        document.querySelector(
            'a[href="#experiencia"]'
        );


    if (experienceButton) {

        experienceButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const target =
                    document.querySelector(
                        "#experiencia"
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    const footerElements =
        document.querySelectorAll(
            ".footer-reveal"
        );


    if (footerElements.length > 0) {

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


        footerElements.forEach((element) => {

            footerObserver.observe(element);

        });

    }

});