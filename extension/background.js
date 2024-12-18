async function Clicked() {
    // Grabs our Token and URL from the Preferences page
    const { token, url } = await browser.storage.local.get(['token', 'url']);

    // Pull current site's URL
    let [tab] = await browser.tabs.query({active: true, currentWindow: true});
    // removes a traling forward slash
    let site_url = tab.url.endsWith('/') ?
        tab.url.slice(0, -1) :
        tab.url;

    let mealie_url = url;

    /***
     * NO LONGER USED
     * Was originally designed based off of the bookmarklet example on Mealie's GitHub
     * 
     * 
    let site_url = document.URL.endsWith('/') ?
        document.URL.slice(0, -1) :
        document.URL;
    // let group_slug = "" // Change this to your group slug. You can obtain this from your URL after logging-in to Mealie
    // let use_keywords= "&use_keywords=0" // Optional - use keywords from recipe - update to "" if you don't want that
    // let edity = "&edit=0" // Optional - keep in edit mode - update to "" if you don't want that

    if (mealie.slice(-1) === "/") {
        mealie = mealie.slice(0, -1)
    }
    let dest = mealie + "/recipe/create/url?recipe_import_url=" + site_url;

       // Send a message to the content script
    browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log("Sending message to content script");
        browser.tabs.sendMessage(tabs[0].id, `Token: ${token}, URL: ${url}`).then(() => {
            console.log("Message sent to content script");
        }).catch((error) => {
            console.error("Error sending message to content script:", error);
        });
    });

    // Open a new tab with the destination URL
    browser.tabs.create({ url: dest }).then(() => {
        console.log(`New tab opened with URL: ${dest}`);
    }).catch((error) => {
        console.error("Error opening new tab:", error);
    });
    *
    */

    // Submit POST request to your Mealie server
    const postUrl = `${mealie_url}/api/recipes/create/url`;
    const requestBody = {
        includeTags: false,
        url: site_url
    };

    const response = await fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log("POST request successful:", responseData);
    } else {
        const errorText = await response.text();
        console.error("POST request failed:", response.statusTextm, errorText);
    }
}

// background.js

// Create a context menu item
browser.contextMenus.create({
    id: "clickHere",
    title: "Add to Mealie",
    contexts: ["all"],
});

// Add a listener for the context menu item
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "clickHere") {
        Clicked();
    }
});

// Add a listener for the keyboard shortcut
browser.commands.onCommand.addListener((command) => {
    if (command === "activateClick") {
        Clicked();
    }
});
