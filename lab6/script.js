document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".nav-button");
    const pages = document.querySelectorAll(".page");
    const cardLinks = document.querySelectorAll(".card-link");


    function showPage(pageName) {

        // Hide every page
        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        // Show the selected page
        const selectedPage = document.getElementById(pageName);

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        // Update sidebar buttons
        buttons.forEach(function (button) {
            button.classList.remove("active");

            if (button.dataset.page === pageName) {
                button.classList.add("active");
            }
        });

        // Scroll back to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // Sidebar buttons
    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const pageName = button.dataset.page;

            showPage(pageName);

        });

    });


    // Buttons inside overview cards
    cardLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const pageName = link.dataset.page;

            showPage(pageName);

        });

    });


});