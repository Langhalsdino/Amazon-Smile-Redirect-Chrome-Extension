/*
 * Add navigationBar that suggest redirect to each amazon.* page
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if tab.url is valid
    if (tab.url != null) {
        var redirects,
            amazonPattern,
            smilePattern,
            amazon,
            smile;

        amazon = 'amazon\\.';
        smile = 'smile\\.amazon.';

        // Try to match regex with url
        try {
            amazonPattern = new RegExp(amazon, 'i');
            smilePattern = new RegExp(smile, 'i');

            matchAmazon = tab.url.match(amazonPattern);
            matchsmile = !tab.url.match(smilePattern);

            // Matched and not redirect activated, therefore add Navigation Bar
            if (matchAmazon && matchsmile) {
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
