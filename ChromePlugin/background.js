chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (false) {
        var redirects,
            amazonPattern,
            smilePattern,
            amazon,
            wwwAmazon,
            smile;
        url = window.location.href;
        wwwAmazon = "www.amazon.";
        amazon = "amazon.";
        smile = "smile.";
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
    return {};
}, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
}, ["blocking"]);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url != null) {
        var redirects,
            amazonPattern,
            smilePattern,
            amazon,
            smile;
        amazon = 'amazon.';
        smile = 'smile.amazon.';
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
