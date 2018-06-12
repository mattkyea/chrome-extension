//javascript:void(document.oncontextmenu=null);//allows for context menus on spotify web player (disabled by default)
//window.oncontextmenu = null;//FIX

/*
var showForPages = ["*://www.youtube.com/*", "*://open.spotify.com/*"];

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
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

chrome.contextMenus.onClicked.addListener(onClickHandler);

//what to do when button pressed
function onClickHandler(info){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        if(info.menuItemId == "chords"){
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_chords"});
        }else{
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_tab"});
        }
    })
};


//waiting for new link
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "open_new_tab" ) {
        chrome.tabs.create({"url": request.url});
        chrome.tabs.query({active: true, currentWindow: true}, function(sites) {
            var activeSite = sites[0];
            console.log("good so far");
            console.log(activeSite.id);
            chrome.tabs.sendMessage(activeSite.id, {"message": "grab_link"});
        })
        }else if(request.message === "open_link"){
            console.log("no way");
            chrome.tabs.create({"link": request.link});
        }
    }
);
/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "open_link"){
            console.log("no way");
            chrome.tabs.create({"link": request.link});
        }
    }
);
*/
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
            console.log(activeTab.id);
            if(info.menuItemId == "chords"){
                //console.log("neato");
                port.postMessage({"message": "clicked_chords"});
            }else{
                port.postMessage({"message": "clicked_tab"});
            }
            port.onMessage.addListener(function(msg) {
                if (msg.message == "open_new_tab"){
                    //console.log("sick");
                    console.log(activeTab.id);
                    chrome.tabs.create({"url": msg.url});
                    console.log(activeTab.id);
                    chrome.tabs.query({active: true, currentWindow: true}, function(sites) {
                        var activeSite = sites[0];
                        console.log("good so far");
                        console.log(activeSite.id);
                        console.log("came from " + activeSite.url);
                        port.postMessage({"ID": activeSite.Id, "url": activeSite.url, "message": "grab_link"});
                    });
                }else{
                    chrome.tabs.create({"url": msg.url});
                }
            });
        });
    }
);

