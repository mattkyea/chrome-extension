function onClickHandler(info){
    if (info.menuItemId == "chords") {
        alert("lets get some chords");
    }else{
        alert("lets get some tab");
    }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    var chords = chrome.contextMenus.create({"title": "Chords", "id": "chords"});
    var tab = chrome.contextMenus.create({"title": "Tabs", "id": "tab"});
});