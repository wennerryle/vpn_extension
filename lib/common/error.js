(() => {
  const e = document.querySelectorAll("[id]"),
    t = () => {
      document.getElementById("settings").onclick = () => {
        chrome.tabs.create({
          url: `chrome://extensions/?id=${chrome.runtime.id}`,
        });
      };
    },
    n = () => {
      e.forEach((e) => {
        const n = e.id,
          t = chrome.i18n.getMessage(`error_page_${n}`);
        t && (e.innerHTML = t);
      });
    };
  t(), n();
})();
