document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu & Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    // Toggle navigation menu visibility and icon on hamburger click
    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Toggles a class that shows/hides the nav
        hamburger.querySelector('i').classList.toggle('fa-bars'); // Changes bars icon
        hamburger.querySelector('i').classList.toggle('fa-times'); // to times (X) icon
    });

    // Close mobile nav when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active'); // Hide the nav
            hamburger.querySelector('i').classList.remove('fa-times'); // Revert icon to bars
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

}); // Closing the DOMContentLoaded event properly

window.onload = () => {
    setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10); // small delay to override browser behavior
};



// --- Smooth Scrolling for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Skip if href is just "#" or invalid
        if (targetId === "#" || !document.querySelector(targetId)) return;

        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;

        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset - 20; // Optional: adjust extra spacing

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

    // --- Reveal Animations on Scroll (using Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal'); // Select all sections with 'reveal' class

    const observerOptions = {
        root: null, // The viewport is the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.1 // Trigger when 10% of the target element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // If the element enters the viewport
                entry.target.classList.add('active'); // Add 'active' class to trigger CSS animation
                
                // For elements *inside* a revealed section (like skill cards, project cards)
                const revealItems = entry.target.querySelectorAll('.reveal-item');
                revealItems.forEach((item, index) => {
                    // Stagger the animation of these internal items
                    item.style.transitionDelay = `${index * 0.1}s`; // 0.1s delay for each subsequent item
                    item.classList.add('active'); // Activate their animation
                });
                observer.unobserve(entry.target); // Stop observing once it has been revealed
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing each revealable element
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Back to Top Button Functionality ---
    const backToTopBtn = document.getElementById('back-to-top');

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 550) { // If scrolled down more than 550
            backToTopBtn.classList.add('show'); // Show the button
        } else {
            backToTopBtn.classList.remove('show'); // Hide the button
        }
    });

    // Scroll to top when the button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to the top
        });
    });

    // --- Lightbox (Image Zoom/Gallery) Functionality ---
    const lightbox = document.getElementById('lightbox'); // The main lightbox overlay
    const lightboxImage = document.querySelector('.lightbox-image'); // The image inside the lightbox
    const lightboxCaption = document.querySelector('.lightbox-caption'); // The caption for the image
    const lightboxClose = document.querySelector('.lightbox-close'); // The close (X) button
    const lightboxPrev = document.querySelector('.lightbox-prev'); // The previous arrow button
    const lightboxNext = document.querySelector('.lightbox-next'); // The next arrow button

    // Collect all images intended for the lightbox gallery (those with data-lightbox-group="main-gallery")
    const galleryImages = Array.from(document.querySelectorAll('img[data-lightbox-group="main-gallery"]'));
    let currentImageIndex = 0; // Keep track of the currently viewed image in the gallery

    // Function to open the lightbox with a specific image
    function openLightbox(index) {
        // Basic bounds check to ensure index is valid
        if (index < 0 || index >= galleryImages.length) return; 

        currentImageIndex = index; // Update current index
        const img = galleryImages[currentImageIndex]; // Get the image element from the gallery

        lightboxImage.src = img.src; // Set the lightbox image source
        lightboxCaption.textContent = img.alt; // Set the lightbox image caption from the alt text
        
        // --- Use the 'show' class to trigger CSS transitions ---
        lightbox.classList.add('show');

   
    }

    // Function to close the lightbox
    function closeLightbox() {
        // --- IMPROVEMENT HERE: Remove the 'show' class to trigger CSS transitions ---
        lightbox.classList.remove('show');
    }


    // Add click listeners to all gallery images to open the lightbox
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    // Add click listeners for lightbox controls
    lightboxClose.addEventListener('click', closeLightbox); // Close button


    // Close lightbox if the user clicks on the semi-transparent background (outside the image content)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Check if the click occurred directly on the lightbox background
            closeLightbox();
        }
    });

    // --- Contact Form Submission (Basic Client-Side Example) ---
    // IMPORTANT: This JavaScript only handles client-side form behavior (prevents default submit, shows alert, logs data, resets form).
    // For actual email sending, you MUST have a server-side script or use a service like Formspree.io.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) { // Ensure the form exists before adding listener
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission (page reload)
            
            alert('Form submitted! (In a real application, this would send an email.)');
            console.log('Form data:', new FormData(contactForm)); // Log form data to console
            contactForm.reset(); // Clear the form fields after submission
             // Scroll to top after successful submission
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // optional for smooth animation
            });
        });
    }