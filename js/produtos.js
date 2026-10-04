document.addEventListener("DOMContentLoaded", () => {


    function initLucide() {

        if (window.lucide) {
            lucide.createIcons();
        }

    }

    initLucide();



    const menuButton =
        document.querySelector(".menu-button");

    const nav =
        document.querySelector(".nav-links");


    if (!menuButton || !nav) {
        return;
    }


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


            if (
                icon &&
                window.lucide
            ) {

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


    

    nav
        .querySelectorAll("a")
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

});