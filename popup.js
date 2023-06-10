document.getElementById('apply').addEventListener('click', function() {
    const selectedFont = document.getElementById('font').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {font: selectedFont});
      });
});
  