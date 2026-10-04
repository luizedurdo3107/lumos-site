document.addEventListener("DOMContentLoaded", () => {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) {
        return;
    }


    const observer =
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
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {
        observer.observe(element);
    });

});