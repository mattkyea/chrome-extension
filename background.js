javascript:void(document.oncontextmenu=null);//allows for context menus on spotify web player (disabled by default)
window.oncontextmenu = null;//FIX

function onClickHandler(info){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        if(info.menuItemId == "chords"){
            //alert("lets get some chords");
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_chords"});
        }else{
            alert("lets get some tab");
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_tab"});
        }
})};

console.log("howdy");

chrome.contextMenus.onClicked.addListener(onClickHandler);

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