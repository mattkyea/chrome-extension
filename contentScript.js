chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "defaultPort");
    port.onMessage.addListener(function(msg) {
        if(msg.message == "clicked_chords" || msg.message == "clicked_tab"){
            var title = $("h1:first").text();//title of video
            if (msg.message == "clicked_chords"){
                title = title + " chords";
            }else if(msg.message == "clicked_tab"){
                title = title + " tab";
            }
            var url = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + title;
            port.postMessage({"message": "open_new_tab", "url": url});
        }else{
            $.get(msg.url, function(data){
                var begin = data.indexOf("\"tab_url\":\"https:\\/\\/tabs.ultimate-guitar.com\\/tab\\/");
                var end = data.indexOf("\",\"type_name\"");
                var url = "https://tabs.ultimate-guitar.com/tab/" + data.substring(begin, end);
                port.postMessage({"message": "open_link", "url": url, "text": data});
            })
        }
    });
});
        

