document.getElementById('clear-cookies-button').addEventListener('click', () => {

    chrome.runtime.sendMessage({ action: 'clearCookies' }, () => {
      console.log('Closed cookies send message');
    });
  });