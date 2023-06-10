chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.font) {
        localStorage.setItem("global_font", request.font);
        changeFont(request.font);
    }
});

function changeFont(font) {
    let elements = document.querySelectorAll('*');
    for (const element of elements) {
        element.style.fontFamily = font;
    }
}

let storedFont = localStorage.getItem("global_font");
if (storedFont) {
    changeFont(storedFont);
}