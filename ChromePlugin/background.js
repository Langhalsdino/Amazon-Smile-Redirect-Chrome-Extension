/*
 * Add navigationBar that suggest redirect to each amazon.* page
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if tab.url is valid
    if (tab.url != null) {
        var redirects,
            amazonPattern,
            smilePattern,
            instantVideoPattern,
            amazon,
            smile,
            instantVideo,
            matchAmazon,
            matchsmile,
            matchInstantVideo;

        amazon = 'amazon\\.';
        smile = 'smile\\.amazon.';
        instantVideo = '=home';

        // Try to match regex with url
        try {
            amazonPattern = new RegExp(amazon, 'i');
            smilePattern = new RegExp(smile, 'i');
            instantVideoPattern = new RegExp(instantVideo);

            matchAmazon = tab.url.match(amazonPattern);
            matchsmile = !tab.url.match(smilePattern);
            matchInstantVideo = !tab.url.match(instantVideoPattern);
            console.log(matchInstantVideo);

            // Matched and not redirect activated, therefore add Navigation Bar
            if (matchAmazon && matchsmile && matchInstantVideo) {
                chrome.tabs.insertCSS(tabId, {
                    file: "contentNavBar.css"
                }, function(returnedValue) {
                    chrome.tabs.executeScript(tabId, {
                        file: "contentNavBar.js"
                    }, function(returnedValue) {
                        // finished
                    });
                });
            }
        } catch (err) {
            //bad pattern
        }
        return {};
    }
});
