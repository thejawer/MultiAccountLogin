
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {


    if (message.action === "clearCookies") {
        console.log(sender)
        const targetDomain = getRootDomain(sender.tab.url)
        console.log('root domain url: '+targetDomain)
        let domains = []
        if (targetDomain.includes('dianping.com') || targetDomain.includes('meituan.com')) {
            domains = ['meituan.com','dianping.com'];
        } else {
            domains = [targetDomain];
        }

        Promise.all(domains.map(async (targetDomain) => {
            const cookies = await getAllCookies(targetDomain);
            await removeCookie(cookies);
        }))
        .then(() => {
            chrome.tabs.reload(sender.tab.id);
        });


    }

});




async function removeCookie(cookies) {
    return cookies.map(async (cookie) => {
        const { name, domain, storeId } = cookie;
        const url = 'http' + (cookie.secure ? 's' : '') + '://' + domain;

        console.log(`%c removed cookie ${cookie} named ${name} domain ${domain} storeId ${storeId}.`, 'background: #00ff00; color: #000');

        const result = await chrome.cookies.remove({ url, name, storeId });
        // await Promise.all(result);

        if (!result) {
            console.error(`%c Failed to remove cookie named ${name} from ${url}.`, 'background: #ff0000; color: #fff');
        } else {
            console.log(`%c Successfully removed cookie named ${name} from ${url}.`, 'background: #00ff00; color: #000');
        }
    });
}

// Async function to get all cookies for a specific domain
async function getAllCookies(domain) {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({ domain: domain }, (cookies) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(cookies);
            }
        });
    });
}


function getRootDomain(url) {

    const domains = [];

    const domain = new URL(url).hostname 
    const parts = domain.split('.').reverse()

    if (
        parts.length > 2 &&
        parts[1].match(/^(com|co|org|gov|edu|ac|net|mil)$/)
    ) {
        return parts[2] + '.' + parts[1] + '.' + parts[0]
    } else {
        return parts[1] + '.' + parts[0]
    }
}





