chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.storage.local.set({ urlMapping: {}, counter: 1 });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "shortenURL") {
    chrome.storage.local.get(["urlMapping", "counter"], ({ urlMapping = {}, counter = 1 }) => {
      const shortUrlKey = generateShortUrlKey(counter);
      const shortUrl = `${chrome.runtime.getURL('')}?key=${shortUrlKey}`;
      
      urlMapping[shortUrlKey] = request.url;
      
      chrome.storage.local.set({ urlMapping, counter: counter + 1 }, () => {
        sendResponse({ shortUrl });
      });
    });
    return true;  // Indicate async response
  }
});

function generateShortUrlKey(counter) {
  return toBase62(counter);
}

function toBase62(num) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  do {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  } while (num > 0);
  return result;
}
