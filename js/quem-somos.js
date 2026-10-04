document.addEventListener("DOMContentLoaded", () => {

function initLucideIcons() {

    if (window.lucide) {
        lucide.createIcons();
    }

}

initLucideIcons();

    const menuButton =
        document.querySelector(
            ".menu-button"
        );

    const nav =
        document.querySelector(
            ".nav-links"
        );


    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.toggle(
                        "open"
                    );


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
            ".about-reveal"
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
                            "about-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.15,

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


    const teamMembers =
        document.querySelectorAll(
            ".team-member"
        );


    teamMembers.forEach(
        (member) => {

            member.addEventListener(
                "mouseenter",
                () => {

                    teamMembers.forEach(
                        (otherMember) => {

                            if (
                                otherMember !==
                                member
                            ) {

                                otherMember.classList.remove(
                                    "is-active"
                                );

                            }

                        }
                    );


                    member.classList.add(
                        "is-active"
                    );

                }
            );


            member.addEventListener(
                "mouseleave",
                () => {

                    member.classList.remove(
                        "is-active"
                    );

                }
            );

            member.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target.closest(
                            ".linkedin-button"
                        )
                    ) {

                        return;

                    }


                    const active =
                        member.classList.contains(
                            "is-active"
                        );


                    teamMembers.forEach(
                        (otherMember) => {

                            otherMember.classList.remove(
                                "is-active"
                            );

                        }
                    );


                    if (!active) {

                        member.classList.add(
                            "is-active"
                        );

                    }

                }
            );

        }
    );



    document.addEventListener(
        "click",
        (event) => {

            if (
                !event.target.closest(
                    ".team-member"
                )
            ) {

                teamMembers.forEach(
                    (member) => {

                        member.classList.remove(
                            "is-active"
                        );

                    }
                );

            }

        }
    );
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