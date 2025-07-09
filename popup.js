document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveKeyButton = document.getElementById('saveKey');
  const promptInput = document.getElementById('promptInput');
  const askButton = document.getElementById('askButton');
  const responseOutput = document.getElementById('responseOutput');

  // Load the saved API key when the popup opens
  chrome.storage.local.get('geminiApiKey', (data) => {
    if (data.geminiApiKey) {
      apiKeyInput.value = data.geminiApiKey;
    }
  });

  // Save the API key to local storage
  saveKeyButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.local.set({ 'geminiApiKey': apiKey }, () => {
        alert('API Key saved successfully!');
      });
    } else {
      alert('Please enter an API Key.');
    }
  });

  // Handle the "Ask Gemini" button click
  askButton.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      responseOutput.textContent = 'Please enter a prompt.';
      return;
    }

    // Get the saved API key
    chrome.storage.local.get('geminiApiKey', async (data) => {
      const apiKey = data.geminiApiKey;
      if (!apiKey) {
        responseOutput.textContent = 'API Key is not set. Please save your API key first.';
        return;
      }

      await callGeminiApi(prompt, apiKey);
    });
  });

  async function callGeminiApi(prompt, apiKey) {
    responseOutput.textContent = 'Thinking...';
    askButton.disabled = true;

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }],
          }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error.message}`);
      }
      
      const data = await response.json();

      // Extract the text from the response
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        responseOutput.textContent = text;
      } else {
        // Handle cases where the response might be blocked for safety reasons
        responseOutput.textContent = 'No content received. The response may have been blocked or is empty.';
        console.log('Full API Response:', data); // Log the full response for debugging
      }

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      responseOutput.textContent = `Error: ${error.message}`;
    } finally {
      askButton.disabled = false;
    }
  }
});