document.getElementById('shortenBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    chrome.runtime.sendMessage({ action: "shortenURL", url: url }, (response) => {
      const shortUrl = response.shortUrl;
      const statusDiv = document.getElementById('status');
      statusDiv.textContent = `Short URL: ${shortUrl}`;
      statusDiv.style.display = 'block';
      copyToClipboard(shortUrl);
      statusDiv.addEventListener('click', () => {
        copyToClipboard(shortUrl);
      });
    });
  });
});

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Short URL copied');
}
