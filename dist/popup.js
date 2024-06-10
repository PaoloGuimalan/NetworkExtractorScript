// popup.js
document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({ type: 'get-captured-requests' }, function(response) {
      const ul = document.getElementById('requests');
      response.forEach(request => {
        const li = document.createElement('li');
        li.textContent = `URL: ${request.url}, Payload: ${JSON.stringify(request.payload)}`;
        ul.appendChild(li);
      });
    });
  });
  