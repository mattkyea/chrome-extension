/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "grab_link"){
            //console.log("wow really");
            alert("another link time");
            var link = $("a").text();//3rd link gets past two ads
            console.log(link);
            chrome.runtime.sendMessage({"message": "open_link", "link": link});
        }
        else{
            console.log("grabbin title");
            //alert("title time");
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
    }
  );
/*
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "grab_link"){
            console.log("wow really");
            var link = $("a").text();//3rd link gets past two ads
            console.log(link);
            chrome.runtime.sendMessage({"message": "open_link", "link": link});
        }
    }
  ); 
*/
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "defaultPort");
    port.onMessage.addListener(function(msg) {
        alert(msg.message);
        if(msg.message == "clicked_chords" || msg.message == "clicked_tab"){
            alert("come on");
            var title = $("h1:first").text();//title of video
            if (msg.message == "clicked_chords"){
                title = title + " chords";
            }else if(msg.message == "clicked_tab"){
                title = title + " tab";
            }
            var url = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + title;
            port.postMessage({"message": "open_new_tab", "url": url});
        }else{
            alert("no way");
            var link = $("a href").text();//3rd link gets past two ads
            port.postMessage({"message": "open_link", "url": link});
        }
    });
});
        

