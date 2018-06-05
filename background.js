javascript:void(document.oncontextmenu=null);//allows for context menus on spotify web player (disabled by default)
window.oncontextmenu = null;//FIX

function onClickHandler(info){
    if (info.menuItemId == "chords") {
        alert("lets get some chords");
        getYoutubeTitle(window.location.href);
    }else{
        alert("lets get some tab");
    }
};

function getYoutubeTitle(url){
    alert(url);
}

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