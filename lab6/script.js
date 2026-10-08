document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".nav-button");
    const pages = document.querySelectorAll(".page");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const pageToShow = button.getAttribute("data-page");

            /* Hide every page */
            pages.forEach(function (page) {
                page.classList.remove("active");
            });

            /* Show the page that was clicked */
            document
                .getElementById(pageToShow)
                .classList.add("active");

            /* Change the selected sidebar button */
            buttons.forEach(function (otherButton) {
                otherButton.classList.remove("active");
            });

            button.classList.add("active");

            /* Go back to the top of the document */
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });

});