/*
 * Add Listener to each webRequest and redirect to smile.amazon.*
 * Only if settings allow automatic redirection
 */
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    // Check if automatic redirection is activated
    if (false) {
        var redirects,
            amazonPattern,
            smilePattern,
            amazon,
            wwwAmazon,
            smile;

        url = details.tab.url;
        wwwAmazon = "www\\.amazon\\.";
        amazon = "amazon\\.";
        smile = "smile\\.";

        // Try to match regex with url
        try {
            amazonPattern = new RegExp(amazon, 'i');
            wwwAmazonPattern = new RegExp(wwwAmazon, 'i');
            smilePattern = new RegExp(smile, 'i');

            matchAmazon = url.match(amazonPattern);
            matchWwwAmazon = url.match(wwwAmazonPattern);
            matchsmile = !url.match(smilePattern);

            // insert smile. infront of amazon.* and remove www.
            if (matchWwwAmazon && matchsmile) {
                var newUrl = url.replace(wwwAmazonPattern, 'smile.amazon.').replace();
                // Redirect
                return {redirectUrl: newUrl};
            } else if (matchAmazon && matchsmile) {
                var newUrl = url.replace(amazonPattern, 'smile.amazon.').replace();
                // Redirect
                return {redirectUrl: newUrl};
            }
        } catch (err) {
            //bad pattern
        }
    }
    return {};
}, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
}, ["blocking"]);

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
