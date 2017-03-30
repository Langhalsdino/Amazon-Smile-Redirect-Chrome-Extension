function aboutSmilesPluginChrome(){
    var aboutPageUrl = "www.tausch.me/SmileRedirector";
    window.location.href = aboutPageUrl;
};

function redirectMeToSmilesChromePlugin(){
    var url = window.location.href;
    var wwwAmazon = "www.amazon.";
    var amazon = "amazon.";
    var smile = "smile.";
    try {
        amazonPattern = new RegExp(amazon, 'i');
        wwwAmazonPattern = new RegExp(wwwAmazon, 'i');
        smilePattern = new RegExp(smile, 'i');

        matchAmazon = url.match(amazonPattern);
        matchWwwAmazon = url.match(wwwAmazonPattern);
        matchsmile = !url.match(smilePattern);
        if (matchWwwAmazon && matchsmile) {
            // Redirect
            var newUrl = url.replace(wwwAmazonPattern, 'smile.amazon.').replace();
            window.location.href = newUrl;
        } else if (matchAmazon && matchsmile) {
            // Redirect
            var newUrl = url.replace(amazonPattern, 'smile.amazon.').replace();
            window.location.href = newUrl;
        }
    } catch (err) {
        //bad pattern
    }
}


// Only add one navBar per Page
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
                            Redirect me!\
                        </li>\
                    </div>\
                </ul>";
    document.body.innerHTML = navBar + document.body.innerHTML;
    document.getElementById('redirectToSmilesLiItem').addEventListener("click", redirectMeToSmilesChromePlugin);
    document.getElementById('aboutSmilesPluginLiItem').addEventListener("click", aboutSmilesPluginChrome);

}
