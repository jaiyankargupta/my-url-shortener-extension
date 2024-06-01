chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
    chrome.storage.local.set({ urlMapping: {}, counter: 1 });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "shortenURL") {
      chrome.storage.local.get(["urlMapping", "counter"], (result) => {
        const urlMapping = result.urlMapping || {};
        let counter = result.counter || 1;
  
        const shortUrlKey = generateShortUrlKey(counter);
        const shortUrl = chrome.runtime.getURL(`redirect.html?key=${shortUrlKey}`);
  
        urlMapping[shortUrlKey] = request.url;
        counter += 1;
  
        chrome.storage.local.set({ urlMapping, counter }, () => {
          sendResponse({ shortUrl });
        });
      });
      return true;  // Return true to indicate async response
    }
  });
  
  function generateShortUrlKey(counter) {
    return toBase62(counter);
  }
  
  function toBase62(num) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (num > 0) {
      result = chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result || '0';
  }
  