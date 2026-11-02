function open(){chrome.tabs.create({url:chrome.runtime.getURL('dashboard.html')});}
chrome.action.onClicked.addListener(open);chrome.runtime.onInstalled.addListener(details=>{if(details.reason==='install')open();});
