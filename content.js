document.addEventListener('copy', (event) => {
    const selection = document.getSelection().toString();
    if (selection.startsWith('http')) {
      chrome.runtime.sendMessage({ action: "shortenURL", url: selection }, (response) => {
        const shortUrl = response.shortUrl;
        event.clipboardData.setData('text/plain', shortUrl);
        event.preventDefault();  // prevent the default copy action
      });
    }
  });
  