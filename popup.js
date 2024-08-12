document.getElementById('clear-data').addEventListener('click', () => {

    chrome.runtime.sendMessage({ action: 'clearCookies' }, () => {
      console.log('Closed cookies send message');
    });
  });