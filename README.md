# Simple Gemini Wrapper

A simple Chrome extension to query the [Google Gemini API](https://ai.google.dev/gemini-api/docs/api-overview) directly from your browser.

## Features

- **Secure API Key Storage:** Enter and save your Gemini API key locally using Chrome's storage.
- **Prompt Input:** Type any prompt/question and send it to the Gemini API.
- **Instant Responses:** View the AI's response directly in the popup.
- **User-Friendly UI:** Clean, modern interface styled for clarity and ease of use.
- **Error Handling:** Clear error messages for missing API keys, empty prompts, or API errors.

## Screenshots

![Extension Icon](icons/icon128.png)

## Getting Started

### Prerequisites
- Google Gemini API key ([Get one here](https://ai.google.dev/gemini-api/docs/api-overview#api-keys))
- Chrome browser

### Installation
1. **Clone or Download** this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder (`gdsc-al-hikmah`).
5. The extension icon should appear in your browser bar.

### Usage
1. Click the extension icon to open the popup.
2. **Enter your Gemini API key** in the field and click **Save**.
3. Type your prompt/question in the textarea.
4. Click **Ask Gemini**.
5. The response will appear below.

## File Structure

- `manifest.json` — Chrome extension manifest (v3), permissions, icons, popup config.
- `popup.html` — The extension's popup UI.
- `popup.js` — Handles UI logic, API key storage, and Gemini API requests.
- `popup.css` — Styles for the popup UI.
- `icons/` — Extension icons (16x16, 48x48, 128x128).

## How It Works

- The extension stores your API key securely in Chrome's local storage.
- When you submit a prompt, it sends a POST request to the Gemini API endpoint:
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY`
- The response is parsed and displayed in the popup. If the response is empty or blocked, a message is shown.
- All logic is handled client-side; your API key is never sent to any server except Google's API.

## Customization
- You can update the UI by editing `popup.html` and `popup.css`.
- To use a different Gemini model, change the model name in `popup.js`.

## Resources
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs/api-overview)
- [Gemini API Reference](https://ai.google.dev/api)

## License

This project is for educational and personal use. See [Google Gemini API Terms](https://ai.google.dev/terms) for API usage policies. 