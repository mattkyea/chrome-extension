chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        var firstHref = $("a[href^='http']").eq(0).attr("href");

        var url = document.getElementsById("container");
        url = url.getElementsByTagName("h1");
        url = url.getElementsByTagName("yt-formatted-string");
        //document.getElementByID("info").innerHTML;
        //url  = url[0].innerHTML;
        //console.log(url);
        //alert(url + "  URL");

        if(request.message === "clicked_chords") {
            alert(firstHref+" chords");
            alert(url + " chords");
        }
        else{
            alert(firstHref+" tab");
            alert(url + " tab");
        } 
    }
  );
  //*[@id="container"]/h1/yt-formatted-string
  //"style-scope ytd-video-primary-info-renderer"