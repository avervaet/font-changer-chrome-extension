chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.font == "None") {
        localStorage.removeItem("global_font");
        location.reload();
    }
    else if (request.font) {
        localStorage.setItem("global_font", request.font);
        changeFont(request.font);
        extractImagesAndReplace();
    }
});

function changeFont(font) {
    let elements = document.querySelectorAll('*');
    for (const element of elements) {
        element.style.fontFamily = font;
    }
}

function getElementWithBackgroundImage() {
    // Get all the elements on the page
    const allElements = document.getElementsByTagName('*');

    // Array to store elements with background-image
    const elementsWithBackgroundImage = [];

    // Iterate through each element
    for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];
    
    // Get the computed style of the element
    const styles = window.getComputedStyle(element);
    
    // Check if the computed style contains a background-image property
    if (styles.getPropertyValue('background-image') !== 'none') {
        elementsWithBackgroundImage.push(element);
        }
    }

    return elementsWithBackgroundImage;
}

function extractImagesAndReplace() {
    // if url is le monde
    if (window.location.href.includes("lemonde.fr")) {
        console.log("Le Monde");
        let image = document.querySelectorAll('div[class^="Header__logo"]');
        console.log(`Found ${images.length} images.`);
    } else {
    /*
    Extracts images from the page and replaces them with a white image
    */
    let images = document.querySelectorAll('img');
    console.log(`Found ${images.length} images.`);
    
    // Normal images
    for (const image of images) {
        let src = image.src;
        if (src.includes("data:image")) {
            continue;
        }
        let width = image.width;
        let height = image.height;

        // Data URL for a 1x1 white pixel
        let whitePixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";
        
        // Set the source of the image to the white pixel (change src & srcset)
        image.src = whitePixel;
        image.srcset = whitePixel;

        // Set the dimensions to be the same as the original image
        image.width = width;
        image.height = height;

        console.log(`Replaced image with src: ${src}`);
    }

    // SVG images located in CSS (to replace with normal images)
    let cssImages = getElementWithBackgroundImage();
    console.log(`Found ${cssImages.length} CSS images.`);
    for (const cssImage of cssImages) {
        let style = cssImage.style;
        let backgroundImage = style.backgroundImage;
        let url = backgroundImage.slice(5, -2);
        if (url.includes("data:image/png;base64")) {
            continue;
        }
        let width = cssImage.offsetWidth;
        let height = cssImage.offsetHeight;

        // Data URL for a 1x1 white pixel
        let whitePixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";
        
        // Set the source of the image to the white pixel (change src & srcset)
        style.backgroundImage = `url(${whitePixel})`;

        // Set the dimensions to be the same as the original image
        cssImage.width = width;
        cssImage.height = height;

        console.log(`Replaced CSS image with url: ${url}`);
    }
}
}

let storedFont = localStorage.getItem("global_font");
if (storedFont) {
    changeFont(storedFont);
}
