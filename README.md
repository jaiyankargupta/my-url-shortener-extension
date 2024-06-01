
# URL Shortener Chrome Extension

This Chrome extension shortens URLs when copied and provides a simple interface to manually shorten the current tab's URL.

## Project Structure

```
my-url-shortener-extension/
├── manifest.json
├── background.js
├── content.js
├── redirect.html
├── redirect.js
├── popup.html
├── popup.js
├── options.html
└── options.js
```

## Installation

1. Clone or download the repository to your local machine.

2. Open Google Chrome and go to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click on "Load unpacked" and select the directory containing the extension files (`my-url-shortener-extension`).

5. The extension should now appear in your list of extensions.

## How It Works

### URL Shortening

1. **Copy Event Handling**: The content script (`content.js`) listens for copy events. If the copied text is a URL, it sends a message to the background script to shorten the URL and replaces the clipboard content with the shortened URL.

2. **Interception and Storage**: The background script (`background.js`) listens for URL shortening requests, generates a short URL key using a counter, and stores the mapping between the short URL and the original URL in Chrome's local storage.

3. **Redirection Handling**: The redirection page (`redirect.html` and `redirect.js`) handles the redirection from the shortened URL to the original URL by reading the `key` parameter from the URL and looking up the original URL in Chrome's local storage.

### Popup Interface

The popup interface (`popup.html` and `popup.js`) provides a simple button to manually shorten the URL of the current tab. The shortened URL is displayed in the popup.

## Files

### `manifest.json`

Defines the extension's metadata and permissions.

### `background.js`

Handles URL shortening requests and stores the mappings between shortened URLs and original URLs in Chrome's local storage.

### `content.js`

Listens for copy events and sends messages to the background script to shorten URLs.

### `redirect.html`

Displays a message while redirecting to the original URL.

### `redirect.js`

Handles the redirection from the shortened URL to the original URL by looking up the key in Chrome's local storage.

### `popup.html`

Defines the HTML for the extension's popup interface.

### `popup.js`

Provides functionality for the popup interface to shorten the URL of the current tab and display the shortened URL.

### `options.html` and `options.js`

Currently, these files provide a basic structure for the options page but have no additional options to configure.

## Future Improvements

- Enhance the URL shortening algorithm to handle collisions and ensure uniqueness.
- Add configurable options for users to customize the extension's behavior.
- Implement error handling and user feedback for cases where URL shortening or redirection fails.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the extension.

## License

This project is licensed under the MIT License.
