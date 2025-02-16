let windowWidth = window.innerWidth;
console.log(windowWidth);
let bigBallX = 50;
let bigBallY = 100;
let bigBallR = 30;

document.addEventListener("DOMContentLoaded", () => {
    const patternBackground = document.querySelector('.pattern-background');
    let angle = 0;
    let sizeAngle = 0;

    // Animation function
    function animate() {
        // Slight movement around the center
        const centerX = bigBallX + 5 * Math.cos(angle); // Moves slightly left and right (radius 5)
        const centerY = 100 + 3 * Math.sin(angle); // Moves slightly up and down (radius 3)

        // Dynamic size change
        const radius = bigBallR + 5 * Math.sin(sizeAngle); // Base radius 10%, fluctuates by ±5%

        // Update clip-path dynamically
        patternBackground.style.clipPath = `circle(${radius}% at ${centerX}% ${centerY}%)`;
        patternBackground.style.webkitClipPath = `circle(${radius}% at ${centerX}% ${centerY}%)`;

        // Increase angles to animate motion
        angle += 0.02; // Controls horizontal/vertical speed
        sizeAngle += 0.015; // Controls the speed of size changes

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Update `bigBallY` based on window width
    function widthBasedElements() {
        if (windowWidth > 767) {
            bigBallX = 80;
            bigBallY = 90;
            bigBallR = 25;
        } else {
            bigBallX = 50; // Default value
            bigBallY = 100; // Default value
            bigBallR = 30;
        }
    }

    // Check window width on load
    widthBasedElements();

    // Update on resize
    window.addEventListener("resize", () => {
        windowWidth = window.innerWidth;
        console.log(windowWidth);
        widthBasedElements();
    });
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // entry.target.classList.add('visible'); // Add class when visible
            console.log("inter");
            tickerContainer.classList.add("north")
        } else {
            // entry.target.classList.remove('visible'); // Remove when out of view
            console.log("no inter");
            tickerContainer.classList.remove("north")

        }
    });
}, {
    root: null, // Uses viewport as the root
    rootMargin: '0px', // No extra margins
    threshold: 0.1 // Trigger when 50% of the element is visible
});

// Select the target element
const sectionPhotos = document.querySelector('.section-photos');
const tickerContainer = document.querySelector('.ticker-container');

// Observe the target
if (sectionPhotos) observer.observe(sectionPhotos);



sectionPhotos.addEventListener('wheel', (event) => {
    const atTop = sectionPhotos.scrollTop === 0;
    const atBottom = sectionPhotos.scrollTop + sectionPhotos.clientHeight >= sectionPhotos.scrollHeight;

    if (!atTop && !atBottom) {
        event.stopPropagation(); // Prevents outer scroll
    }
}, { passive: false });

// Touch event listeners
sectionPhotos.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
}, { passive: true });

sectionPhotos.addEventListener('touchmove', (event) => {
    const currentY = event.touches[0].clientY;
    const isScrollingDown = startY > currentY;
    const isScrollingUp = startY < currentY;

    const atTop = sectionPhotos.scrollTop === 0;
    const atBottom = sectionPhotos.scrollTop + sectionPhotos.clientHeight >= sectionPhotos.scrollHeight;

    if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
        // Allow outer scroll when at the top or bottom
        return;
    }

    // Prevent outer scrolling
    event.preventDefault();
    event.stopPropagation();
}, { passive: false });