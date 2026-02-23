// js/navbar.js
function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    
    if (!navbarContainer) {
        console.error('Navbar container not found!');
        return;
    }
    
    // Simple fetch - navbar.html should be in root folder
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;
            
            // Initialize hamburger menu
            initializeHamburger();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            // Fallback: show a basic error message
            navbarContainer.innerHTML = '<p style="color: red; padding: 10px;">Error loading navigation. Please refresh.</p>';
        });
}

function initializeHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = hamburger.contains(event.target) || navLinks.contains(event.target);
            if (!isClickInside && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
            }
        });
    }
}

// Load navbar when page loads
document.addEventListener('DOMContentLoaded', loadNavbar);