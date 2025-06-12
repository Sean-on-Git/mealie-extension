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

document.addEventListener('DOMContentLoaded', function () {
  const saveBtn = document.getElementById('save');
  saveBtn.addEventListener('click', function () {
    saveBtn.classList.add('saved');
    // Optionally, you can disable the button here
    // saveBtn.disabled = true;
    setTimeout(() => {
      saveBtn.classList.remove('saved');
      // saveBtn.disabled = false;
    }, 1500); // 1.5 seconds
  });
});
