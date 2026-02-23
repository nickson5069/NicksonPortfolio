// js/components.js

// Load Navbar
function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    
    if (!navbarContainer) {
        console.error('Navbar container not found!');
        return;
    }
    
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;
            initializeHamburger();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            navbarContainer.innerHTML = '<p style="color: red; padding: 20px;">Error loading navigation.</p>';
        });
}

// Load Footer
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    
    if (!footerContainer) {
        console.error('Footer container not found!');
        return;
    }
    
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
            initializeFooter();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            footerContainer.innerHTML = '<p style="color: red; padding: 20px;">Error loading footer.</p>';
        });
}

// Initialize Hamburger Menu
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

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
            });
        });

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

        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        }
    }
}

// Initialize Footer Interactions
function initializeFooter() {
    // Update copyright year
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.innerHTML = copyright.innerHTML.replace('2026', currentYear);
    }

    // Add hover effects to social icons
    const socialLinks = document.querySelectorAll('.contact-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Optional: Copy email to clipboard
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Email copied!';
                tooltip.style.position = 'absolute';
                tooltip.style.background = '#f97316';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '20px';
                tooltip.style.fontSize = '12px';
                tooltip.style.top = '-30px';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.whiteSpace = 'nowrap';
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    }
}

// Load everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadNavbar();
    loadFooter();
});