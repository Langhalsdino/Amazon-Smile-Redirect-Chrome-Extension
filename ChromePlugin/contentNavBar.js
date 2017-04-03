/*
 * Redirect to about this plugin page at github
 */
function aboutSmilesPluginChrome(){
    var aboutPageUrl = "https://github.com/Langhalsdino/Amazon-Smile-Redirect-Chrome-Extension/tree/master/ChromePlugin";
    window.location.href = aboutPageUrl;
};

/*
 * Redirect to smile.amazon.*
 */
function redirectMeToSmilesChromePlugin(){
    var url,
        redirects,
        amazonPattern,
        smilePattern,
        instantVideoPattern,
        wwwAmazonPattern,
        amazon,
        smile,
        instantVideo,
        wwwAmazon,
        matchAmazon,
        matchsmile,
        matchInstantVideo,
        matchWwwAmazon;

    url = window.location.href;
    wwwAmazon = "www\\.amazon\\.";
    amazon = "amazon\\.";
    smile = "smile\\.";
    instantVideo = '=home';

    // Try to match regex with url
    try {
        amazonPattern = new RegExp(amazon, 'i');
        wwwAmazonPattern = new RegExp(wwwAmazon, 'i');
        smilePattern = new RegExp(smile, 'i');
        instantVideoPattern = new RegExp(instantVideo);

        matchAmazon = url.match(amazonPattern);
        matchWwwAmazon = url.match(wwwAmazonPattern);
        matchsmile = !url.match(smilePattern);
        matchInstantVideo = !url.match(instantVideoPattern);

        // insert smile. infront of amazon.* and remove www.
        if (matchWwwAmazon && matchsmile && matchInstantVideo) {
            var newUrl = url.replace(wwwAmazonPattern, 'smile.amazon.').replace();
            // Redirect
            window.location.href = newUrl;
        } else if (matchAmazon && matchsmile && matchInstantVideo) {
            var newUrl = url.replace(amazonPattern, 'smile.amazon.').replace();
            // Redirect
            window.location.href = newUrl;
        }
    } catch (err) {
        //bad pattern
    }
}


/*
 * Add NavBar to Page, but only add one navBar per page
 */
if(document.getElementById('smileRedirectExtension') === null){
    var navBar = "<ul id='smileRedirectExtension'>\
                    <div class='floatLeft'>\
                        <li>\
                            Amazon Smile Redirector\
                        </li>\
                    </div>\
                    <div class='floatRight'>\
                        <li id='aboutSmilesPluginLiItem'>\
                            About\
                        </li>\
                        <li id='redirectToSmilesLiItem'>\
                            Get me smiling!\
                        </li>\
                    </div>\
                </ul>";
    document.body.innerHTML = navBar + document.body.innerHTML;

    // Add click functions to Buttons
    document.getElementById('redirectToSmilesLiItem').addEventListener("click", redirectMeToSmilesChromePlugin);
    document.getElementById('aboutSmilesPluginLiItem').addEventListener("click", aboutSmilesPluginChrome);

}
