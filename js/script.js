$(function () {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
    $("#css-background").load("customBackground.html");
});

// js/script.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');

    // Only run if hamburger exists on the page
    if (hamburger && navLinks) {
        
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
        });

        // Close menu when a link is clicked
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

        // Close menu when overlay is clicked
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        }
    }

    // Optional: Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active-page');
        }
    });
});

// Smooth scroll for all anchor links - SINGLE VERSION
$(document).ready(function() {
    // Handle all hash links smoothly
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        
        // Skip if it's just "#" or empty
        if (href === "#" || href === "") return;
        
        const target = $(href);
        
        if (target.length) {
            e.preventDefault();
            
            // Check if element exists and is visible
            $('html, body').animate({
                scrollTop: target.offset().top - 70 // Adjust offset for header
            }, 800, 'swing');
        }
    });

    // Special handling for contact button if needed
    // (This is now covered by the general function above)
});

