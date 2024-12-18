// options.js

document.getElementById('save').addEventListener("click", async () => {
    const token = document.getElementById('token').value;
    const url = document.getElementById('url').value;

    await browser.storage.local.set({ token, url });
    alert('Options saved!');
});

// Load saved settings if they exist
(async () => {
    const { token, url } = await browser.storage.local.get(['token', 'url']);
    if (token) document.getElementById('token').value = token;
    if (url) document.getElementById('url').value = url;
})();
