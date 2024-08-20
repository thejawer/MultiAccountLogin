// Create a button
const button = document.createElement('button');
button.textContent = '清除 Cookies';
button.id = 'clear-cookies-button';
button.style.position = 'fixed';
button.style.top = '0.5px';
button.style.left = '0.5px';
button.style.backgroundColor = '#ff4c4c';
button.style.color = '#fff';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.padding = '0.5px 1px';
button.style.cursor = 'pointer';
button.style.zIndex = 9999999; 

// Append button to the body
document.body.appendChild(button);

// Listen for button click to clear cookies
button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'clearCookies' });
});