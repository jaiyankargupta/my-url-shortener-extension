document.getElementById('shortenBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      chrome.runtime.sendMessage({ action: "shortenURL", url: url }, (response) => {
        document.getElementById('status').textContent = `Short URL: ${response.shortUrl}`;
      });
    });
  });
  