// image preloader
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 1345,
};

let imageLoaded = 0;
const images = [];

// preloading images
function preloadImages(){
    for(var i = 1; i <= frames.maxIndex; i++){
        const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            imageLoaded++;
            if(imageLoaded === frames.maxIndex){
                loadImage(frames.currentIndex);
                startAnimation();
            }
        };
        images.push(img);
    }
}

function loadImage(index){
    if(index >= 0 && index <= frames.maxIndex){
        const img = images[index];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale
        
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
    }
}


function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
            end: "bottom bottom",
        },
    });


    function updateFrame(index){
        return {
            currentIndex: index,
            ease: "linear",
            onUpdate: function(){
                loadImage(Math.floor(frames.currentIndex))
            },
        }
    }


    // first 50 frames tk first text chalega and second text ayega
    tl
    .to(frames, updateFrame(100), "first")
    .to(".animate1", {
        opacity: 0,
        ease: "linear",
    }, "first") 


    // after that 50 frames ke badh first text opacity 0 and next 80 frames tk second text chalega 
    .to(frames, updateFrame(190), "second")
    .to(".animate2", {
        opacity: 1,
        ease: "linear",
    }, "second")

    .to(frames, updateFrame(270), "third")
    .to(".animate2", {
        opacity: 1,
        ease: "linear",
    }, "third")


    .to(frames, updateFrame(350), "fourth")
    .to(".animate2", {
        opacity: 0,
        ease: "linear",
    }, "fourth")


    .to(frames, updateFrame(420), "fifth")
    .to(".animate3", {
        opacity: 1,
        ease: "linear",
    }, "fifth")


    .to(frames, updateFrame(490), "sixth")
    .to(".animate3", {
        opacity: 1,
        ease: "linear",
    }, "sixth")


    .to(frames, updateFrame(575), "seventh")
    .to(".animate3", {
        opacity: 0,
        ease: "linear",
    }, "seventh")


    .to(frames, updateFrame(659), "eight")
    .to(".panel", {
        x: "0%",
        ease: "expo",
    }, "eight")


    .to(frames, updateFrame(730), "ninth")
    .to(".panel", {
        x: "0%",
        ease: "expo",
    }, "ninth")


    .to(frames, updateFrame(755), "tenth")
    .to(".panel", {
        opacity: 0,
        ease: "linear",
    }, "tenth")


    .to(frames, updateFrame(850), "eleventh")
    .to("canvas", {
        scale: 0.5,
        ease: "linear",
    }, "eleventh")


    .to(frames, updateFrame(900), "twelvth")
    .to(".panelizm", {
        opacity: 1,
        ease: "expo",
    }, "twelvth")


    .to(frames, updateFrame(1035), "twelvth")
    .to(".panelizm span", {
        width: 200,
        ease: "expo",
    }, "twelvth")


    .to(frames, updateFrame(1120), "thirteen")
    .to("canvas", {
        scale: 1,
        ease: "linear",
    }, "thirteen")


    .to(frames, updateFrame(1200), "fourteen")
    .to(".panelizm", {
        scale: 2,
        ease: "circ",
    }, "fourteen")

    .to(frames, updateFrame(1343), "fifteen")
    .to(".panelizm", {
        scale: 2,
        ease: "circ",
    }, "fifteen")
}



window.addEventListener("resize", function(){
    loadImage(Math.floor(frames.currentIndex));
})

preloadImages();