const time =  4 * 60 * 1000;
let newHtml = '';
let oldHtml = '';

const notificationOptions = {
  type: 'basic',
  title: 'WYNIKI SIĘ POJAWIŁYYYYYYYY!!!!!!!!',
  iconUrl: 'exam_icon.jpg',
  message: 'SPRAWDŹ BO WYNIKI SIĘ POJAWIŁYYYYYYYY!!!!!!',
  requireInteraction: true
};

const syncHttpGet = (theUrl) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    oldHtml = syncHttpGet(msg.tabToCheck.url);
    const interval = setInterval(() => {
      newHtml = syncHttpGet(msg.tabToCheck.url);
      if (newHtml !== oldHtml) {
        clearInterval(interval);
        chrome.notifications.create('', notificationOptions);
      }
    }, time);
  });
});