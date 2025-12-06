document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#header");
    const navLinks = document.querySelectorAll("header nav a");

    let lastScrollY = window.scrollY; // Track the last vertical scroll position
    let lastHighlightedSection = null; // Track the currently highlighted section
    let hideNavbarTimeout; // Variable to store timeout for hiding navbar

    // Function to show the nav bar when the mouse is near the top of the page
    document.addEventListener("mousemove", (event) => {
        if (event.clientY < 100) {
            header.classList.add("visible"); // Show the nav bar
        } else if (window.scrollY === 0) {
            header.classList.remove("visible"); // Hide it when the mouse leaves and no scrolling
        }
    });

    // Function to show/hide navbar on mouseenter/mouseleave
    header.addEventListener("mouseenter", () => {
        header.classList.add("visible"); // Show the nav bar
        clearTimeout(hideNavbarTimeout); // Prevent hiding while hovering over nav bar
    });

    header.addEventListener("mouseleave", () => {
        // Hide the nav bar after 3 seconds of leaving the nav region
        hideNavbarTimeout = setTimeout(() => {
            if (!window.scrollY) {
                header.classList.remove("visible");
            }
        }, 2500); // Wait 3 seconds before hiding
    });

    // Function to show the nav bar when scrolling
    window.addEventListener("scroll", () => {
        // Downward scrolling: show the nav bar
        header.classList.add("visible");

        // After scrolling stops, hide the nav bar after a delay
        clearTimeout(hideNavbarTimeout); // Clear previous timeout to avoid conflicts
        hideNavbarTimeout = setTimeout(() => {
            if (window.scrollY === lastScrollY && !header.matches(":hover")) {
                header.classList.remove("visible");
            }
        }, 2500); // Wait for 3 seconds of no scrolling
        lastScrollY = window.scrollY; // Update the last scroll position
    });

    // Highlight Section on Scroll
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior
            const targetSection = document.querySelector(link.getAttribute("href"));

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: "smooth",
            });

            // Remove highlight from the last selected section
            if (lastHighlightedSection) {
                lastHighlightedSection.classList.remove("highlight");
            }

            // Add Highlight to the currently selected section
            targetSection.classList.add("highlight");
            lastHighlightedSection = targetSection; // Update the last highlighted section
        });
    });
});