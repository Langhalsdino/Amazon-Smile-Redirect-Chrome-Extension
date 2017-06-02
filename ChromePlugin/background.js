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
            blackListAmazon;

        amazon = 'amazon\\.';
        smile = 'smile\\.amazon.';
        var blackList = "(sa-no-redirect=)"
               + "|(redirect=true)"
               + "|(redirect.html)"
               + "|(r.html)"
               + "|(f.html)"
               + "|(/gp/dmusic/cloudplayer)"
               + "|(/gp/photos)"
               + "|(/gp/wishlist)"
               + "|(/ap/)"
               + "|(aws.amazon.com)"
               + "|(read.amazon.com)"
               + "|(login.amazon.com)"
               + "|(payments.amazon.com)"
               + "|(amazon.com/clouddrive)"
               + "|(aws.amazon.de)"
               + "|(read.amazon.de)"
               + "|(login.amazon.de)"
               + "|(payments.amazon.de)"
               + "|(amazon.de/clouddrive)"
               + "|(http://)";

        // Try to match regex with url
        try {
            amazonPattern = new RegExp(amazon, 'i');
            smilePattern = new RegExp(smile, 'i');

            matchAmazon = tab.url.match(amazonPattern);
            matchsmile = !tab.url.match(smilePattern);
            blackListAmazon = !tab.url.match(blackList);

            // Matched and not redirect activated, therefore add Navigation Bar
            if (matchAmazon && matchsmile && blackListAmazon) {
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
