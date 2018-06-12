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
        //alert(msg.message);
        if(msg.message == "clicked_chords" || msg.message == "clicked_tab"){
            //alert("come on");
            var title = $("h1:first").text();//title of video
            if (msg.message == "clicked_chords"){
                title = title + " chords";
            }else if(msg.message == "clicked_tab"){
                title = title + " tab";
            }
            var url = "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + title;
            port.postMessage({"message": "open_new_tab", "url": url});
        }else{
            //alert("no way");
            //var link = $("a").text();//3rd link gets past two ads
            //var link = $("a[href^='http']").eq(0).attr("href");
            var link = $.get(msg.url, "text", function(data){
                //alert(data);
                var begin = data.indexOf("<a href=\"https://tabs.ultimate-guitar.com/tab/");
                //<a href="https://tabs.ultimate-guitar.com/tab/pink_floyd/comfortably_numb_tabs_79177" class="link-primary _1kcZ5"><span><span><b>Comfortably</b></span><span> </span><span><b>Numb</b></span></span></a>
                //alert(begin);
                var end = data.indexOf("\" class=\"link-primary _1kcZ5\">");
                //alert(end);
                var finalURl = data.substring(begin, end);
                alert(finalURL);
            });
            //alert(link);
            port.postMessage({"message": "open_link", "url": finalURL});
        }
    });
});
        

