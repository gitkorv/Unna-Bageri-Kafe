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
