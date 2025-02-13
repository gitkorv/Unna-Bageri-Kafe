document.addEventListener("DOMContentLoaded", () => {
    const background = document.querySelector('.background');
    let angle = 0;
    let sizeAngle = 0;

    function animate() {
        // Slight movement around the center
        const centerX = 50 + 5 * Math.cos(angle); // Moves slightly left and right (radius 5)
        const centerY = 100 + 3 * Math.sin(angle); // Moves slightly up and down (radius 3)

        // Dynamic size change
        const radius = 40 + 5 * Math.sin(sizeAngle); // Base radius 10%, fluctuates by ±5%

        // Update clip-path dynamically
        background.style.clipPath = `circle(${radius}% at ${centerX}% ${centerY}%)`;
        background.style.webkitClipPath = `circle(${radius}% at ${centerX}% ${centerY}%)`;

        // Increase angles to animate motion
        angle += 0.02; // Controls horizontal/vertical speed
        sizeAngle += 0.015; // Controls the speed of size changes

        requestAnimationFrame(animate);
    }

    animate();
});

// const circle = document.querySelector(".circle")
// console.log(circle);

// setInterval(() => {
//     circle.classList.toggle("move")
// }, 5000);




