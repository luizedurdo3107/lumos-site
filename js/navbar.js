document.addEventListener("DOMContentLoaded", () => {

    const menuButton =
        document.querySelector(".menu-button");

    const nav =
        document.querySelector(".nav-links");


    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    nav?.querySelectorAll("a").forEach(link => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();

        link.classList.remove("active");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });



    if (!menuButton || !nav) {
        return;
    }


    menuButton.addEventListener("click", () => {

        const isOpen =
            nav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

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

});