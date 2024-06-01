const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key');

if (key) {
  chrome.storage.local.get(["urlMapping"], (result) => {
    const urlMapping = result.urlMapping || {};
    const originalUrl = urlMapping[key];
    if (originalUrl) {
      window.location.replace(originalUrl);
    } else {
      document.body.textContent = "Invalid short URL.";
    }
  });
} else {
  document.body.textContent = "No short URL key provided.";
}
