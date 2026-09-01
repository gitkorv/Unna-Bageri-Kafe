let windowWidth = window.innerWidth;
console.log(windowWidth);
let bigBallX = 50;
let bigBallY = 100;
let bigBallR = 30;

const patternBackground = document.querySelector('.pattern-background');
let angle = 0;
let sizeAngle = 0;

const DOT_ANIMATION_DURATION = 15000;
const PATH_NUMBER = /-?\d*\.?\d+/g;

function getDotClipFrames() {
    for (const sheet of document.styleSheets) {
        let rules;

        try {
            rules = sheet.cssRules;
        } catch {
            continue;
        }

        for (const rule of rules) {
            if (rule.name !== "dotanim" || !rule.cssRules) continue;

            return [...rule.cssRules]
                .map((keyframe) => {
                    const clipPath = keyframe.style.clipPath || keyframe.style.webkitClipPath;
                    const path = clipPath.trim().match(/^path\((['"]?)(.*)\1\)$/)?.[2];

                    if (!path) return null;

                    return {
                        offset: keyframe.keyText === "from"
                            ? 0
                            : keyframe.keyText === "to"
                                ? 1
                                : parseFloat(keyframe.keyText) / 100,
                        path
                    };
                })
                .filter(Boolean)
                .sort((a, b) => a.offset - b.offset);
        }
    }

    return [];
}

function buildPathMorph(paths) {
    const template = paths[0].replace(PATH_NUMBER, "\0");
    const pathCommands = paths[0].match(/[a-z]/gi).join("");
    const pointSets = paths.map((path) => path.match(PATH_NUMBER).map(Number));
    const matchingPaths = paths.every((path, index) => {
        return path.match(/[a-z]/gi).join("") === pathCommands
            && pointSets[index].length === pointSets[0].length;
    });

    if (!matchingPaths) return null;

    return (fromPathIndex, toPathIndex, progress) => {
        let pointIndex = 0;
        const fromPoints = pointSets[fromPathIndex];
        const toPoints = pointSets[toPathIndex];

        return template.replace(/\0/g, () => {
            const value = fromPoints[pointIndex] + (toPoints[pointIndex] - fromPoints[pointIndex]) * progress;
            pointIndex += 1;
            return Number(value.toFixed(3));
        });
    };
}

function easeInOut(progress) {
    return progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

function setupUnnaDotsAnimation() {
    const unnaDots = document.querySelector(".unna-dots");

    if (!unnaDots) return;

    const frames = getDotClipFrames();
    const morphPath = frames.length > 1 && buildPathMorph(frames.map((frame) => frame.path));

    if (!morphPath) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const clipPath = `path('${frames[0].path}')`;
        unnaDots.style.clipPath = clipPath;
        unnaDots.style.webkitClipPath = clipPath;
        return;
    }

    function animateUnnaDots(time) {
        const progress = (time % DOT_ANIMATION_DURATION) / DOT_ANIMATION_DURATION;
        const nextFrameIndex = frames.findIndex((frame) => frame.offset >= progress);
        const fromFrameIndex = Math.max(0, nextFrameIndex - 1);
        const toFrameIndex = nextFrameIndex === -1 ? 0 : nextFrameIndex;
        const fromFrame = frames[fromFrameIndex];
        const toFrame = frames[toFrameIndex];
        const frameDistance = toFrame.offset - fromFrame.offset || 1;
        const frameProgress = easeInOut((progress - fromFrame.offset) / frameDistance);
        const clipPath = `path('${morphPath(fromFrameIndex, toFrameIndex, frameProgress)}')`;

        unnaDots.style.clipPath = clipPath;
        unnaDots.style.webkitClipPath = clipPath;

        requestAnimationFrame(animateUnnaDots);
    }

    requestAnimationFrame(animateUnnaDots);
}

setupUnnaDotsAnimation();

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


const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            tickerSVG.classList.add("north")
            console.log("in");
            // mainWrapper.style.overflowY = "hidden"
            //     setTimeout(() => {
            //         mainWrapper.style.overflowY = ""

            //     }, 500);
            
        } else {
            tickerSVG.classList.remove("north")
            console.log("out");
        }
    });
}, {
    root: null, // Uses viewport as the root
    rootMargin: '0px', // No extra margins
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Select the target element
const photoSection = document.querySelector('.section-photos');
const sectionHead = document.querySelector('.section-head');
const tickerContainer = document.querySelector('.ticker-container');
const tickerSVG = document.querySelector('.wave-text-svg');

// Observe the target
if (photoSection) sectionObserver.observe(photoSection);



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
