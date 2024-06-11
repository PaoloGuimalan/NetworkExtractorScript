// background.js
let capturedRequests = [];

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if(!details.url.includes("neonaiserver.onrender.com") && !details.url.includes("neonremote.netlify.app")){
      if (details.method === "POST" && details.requestBody) {
        let payload;
        if (details.requestBody.formData) {
          payload = details.requestBody.formData;
        } else if (details.requestBody.raw) {
          const rawBytes = details.requestBody.raw[0].bytes;
          payload = new TextDecoder().decode(rawBytes);
        }
        console.log('Request payload:', payload);
        capturedRequests.push({ url: details.url, payload: payload, method: details.method });
      }
      else{
        capturedRequests.push({ url: details.url, payload: "N/A", method: details.method });
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'get-captured-requests') {
    sendResponse(capturedRequests);
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    console.log('Active tab:', tab);
  });
});
