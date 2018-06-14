chrome.runtime.onInstalled.addListener(function() {
    var showForPages = ["*://www.youtube.com/*", "*://open.spotify.com/*", "*://www.ultimate-guitar.com/*"];
    var chords = chrome.contextMenus.create({
        "title": "Chords", 
        "id": "chords",
        "documentUrlPatterns": showForPages
    });
    var tab = chrome.contextMenus.create({
        "title": "Tabs", 
        "id": "tab",
        "documentUrlPatterns": showForPages
    });
});
chrome.contextMenus.onClicked.addListener(
    function(info){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {            
            var activeTab = tabs[0];
            var port = chrome.tabs.connect(activeTab.id, {name: "defaultPort"});
            if(info.menuItemId == "chords"){
                port.postMessage({"message": "clicked_chords"});
            }else{
                port.postMessage({"message": "clicked_tab"});
            }
            port.onMessage.addListener(function(msg) {
                if (msg.message == "open_new_tab"){
                    chrome.tabs.create({"url": msg.url});
                    chrome.tabs.query({active: true, currentWindow: true}, function(sites) {
                        var activeSite = sites[0];
                        port.postMessage({"ID": activeSite.Id, "url": activeSite.url, "message": "grab_link"});
                    });
                }else{
                    chrome.tabs.create({"url": msg.url});
                }
            });
        });
    }
);

