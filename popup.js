document.addEventListener('DOMContentLoaded', () => {
  const checkBtn = document.getElementById('checkBtn');

  const port = chrome.runtime.connect({
    name: "communication"
  });

  checkBtn.onclick  =  () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      port.postMessage({tabToCheck: tabs[0]});
    });
  };
});