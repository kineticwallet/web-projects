let startTime, endTime;
let imageSize = ""
let image = new Image()
let bitSpeed = document.getElementById("bits"), kbSpeed = document.getElementById("kbs"), mbSpeed = document.getElementById("mbs"), info = document.getElementById("info")

let totalBitSpeed = 0;
let totalKbSPeed = 0;
let totalMbSpeed = 0;
let numTests = 5;
let testsCompleted = 0;

// Get random image from unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=film"

// When image loads
image.onload = async function () {
    endTime = new Date().getTime();
    // Get image size
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed()
    })
}

// Function to calculate speed
function calculateSpeed() {
    // Time taken in seconds
    let timeDuration = (endTime - startTime) / 1000;
    // Total bits
    let loadedBits = imageSize * 8;
    let speedInBits = loadedBits / timeDuration;
    let speedInKbs = speedInBits / 1024;
    let speedInMbs = speedInKbs / 1024;

    // Update values
    totalBitSpeed += speedInBits;
    totalKbSPeed += speedInKbs;
    totalMbSpeed += speedInMbs
    testsCompleted++;

    // If all tests completed (we get 5 image then calculate average)
    if (testsCompleted === numTests) {
        let averageSpeedinBps = (totalBitSpeed / numTests).toFixed(2)
        let averageSpeedinKbps = (totalKbSPeed / numTests).toFixed(2)
        let averageSpeedinMbps = (totalMbSpeed / numTests).toFixed(2)

        // Display average speeds
        bitSpeed.innerHTML += ` ${averageSpeedinBps}`
        kbSpeed.innerHTML += ` ${averageSpeedinKbps}`
        mbSpeed.innerHTML += ` ${averageSpeedinMbps}`
        info.innerHTML = "Test Completed!"
    } else {
        // Run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Initial function to start tests
const init = async () => {
    info.innerHTML = "Testing..."
    startTime = new Date().getTime();
    image.src = imageApi;
}

// Run tests when window loads
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
}