// content.js

console.log("Content.js is loaded");

browser.runtime.onMessage.addListener((message) => {
    console.log(`Received message: ${message}`);
});
