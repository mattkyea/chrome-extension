//javascript:void(document.oncontextmenu=null);//allows for context menus on spotify web player (disabled by default)
//window.oncontextmenu = null;//FIX

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
        onOpenHandler();
        }
    }
);

function onOpenHandler(){
    chrome.tabs.query({active: true, currentWindow: true}, function(sites) {
        var activeSite = sites[0];
        console.log("good so far");
        console.log(activeSite.id);
        chrome.tabs.sendMessage(activeSite.id, {"message": "grab_link"});
    })
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "open_link"){
            console.log("no way");
            chrome.tabs.create({"link": request.link});
        }
    }
);