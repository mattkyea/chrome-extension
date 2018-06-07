chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var title = $("h1:first").text();//title of video
        if(request.message === "clicked_chords") {
            title = title + " chords";
        }
        else{
            title = title + " tab";
        } 
        var url = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + title;
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": url});
    }
  );
