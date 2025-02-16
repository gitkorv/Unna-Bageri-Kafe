let windowWidth = window.innerWidth;
console.log(windowWidth);
let bigBallX = 50;
let bigBallY = 100;
let bigBallR = 30;

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

const mainWrapper = document.querySelector("main");
console.log(mainWrapper);


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            tickerContainer.classList.add("north")
            console.log("here");
            // mainWrapper.style.overflowY = "hidden"
            //     setTimeout(() => {
            //         mainWrapper.style.overflowY = ""

            //     }, 500);
            
        } else {
            tickerContainer.classList.remove("north")

        }
    });
}, {
    root: null, // Uses viewport as the root
    rootMargin: '0px', // No extra margins
    threshold: .75 // Trigger when 50% of the element is visible
});

// Select the target element
const sectionPhotos = document.querySelector('.section-photos');
const tickerContainer = document.querySelector('.ticker-container');

// Observe the target
if (sectionPhotos) observer.observe(sectionPhotos);



const photoItems = document.querySelectorAll('.photo-item');
const photoTexts = document.querySelectorAll('.photo-text');
const photoItemWrappers = document.querySelectorAll('.photo-item-wrapper');

console.log(photoItems); // Check if elements exist

const photoWrapperObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        let photoItem = entry.target.querySelector(".photo-item")
        let photoText = entry.target.querySelector(".photo-text")

        if (entry.isIntersecting) {
            photoItem.classList.remove("off-frame");
            photoText.classList.remove("off-frame");
        } else {
            photoItem.classList.add("off-frame");
            photoText.classList.add("off-frame");
        }
    });
}, {
    root: null,
    rootMargin: "25% 0px 15%", // Extends observer's area to include elements shifted 120% right
    threshold: 0.1
});

photoItemWrappers.forEach(wrapper => photoWrapperObserver.observe(wrapper));


// sectionPhotos.addEventListener('wheel', (event) => {
//     const atTop = sectionPhotos.scrollTop === 0;
//     const atBottom = sectionPhotos.scrollTop + sectionPhotos.clientHeight >= sectionPhotos.scrollHeight;

//     if (!atTop && !atBottom) {
//         event.stopPropagation(); // Prevents outer scroll
//         console.log("top!");
//     }
// }, { passive: false });

// // Touch event listeners
// sectionPhotos.addEventListener('touchstart', (event) => {
//     startY = event.touches[0].clientY;
// }, { passive: true });

// sectionPhotos.addEventListener('touchmove', (event) => {
//     const currentY = event.touches[0].clientY;
//     const isScrollingDown = startY > currentY;
//     const isScrollingUp = startY < currentY;

//     const atTop = sectionPhotos.scrollTop === 0;
//     const atBottom = sectionPhotos.scrollTop + sectionPhotos.clientHeight >= sectionPhotos.scrollHeight;

//     if ((atTop && isScrollingUp) || (atBottom && isScrollingDown)) {
//         // Allow outer scroll when at the top or bottom
//         return; 
//     }
//     // Prevent parent from scrolling
//     event.stopPropagation();
// }, { passive: false });

