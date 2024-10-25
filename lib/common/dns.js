(() => {
  const e = document.querySelectorAll("[id]"),
    t = () => {
      try {
        document.getElementById("button_chrome").onclick = () => {
          chrome.tabs.create({ url: `chrome://settings/security` });
        };
      } catch {}
      try {
        document.getElementById("button_edge").onclick = () => {
          chrome.tabs.create({ url: `edge://settings/privacy` });
        };
      } catch {}
      try {
        document.getElementById("button_yandex").onclick = () => {
          chrome.tabs.create({ url: `browser://protect` });
        };
      } catch {}
    },
    n = () => {
      const e = chrome.i18n.getUILanguage(),
        t = e.indexOf("ru") !== -1 ? "en" : "ru",
        n = document.getElementsByClassName(t);
      [].forEach.call(n, (e) => {
        e.style.display = "none";
      });
    },
    s = () => {
      e.forEach((e) => {
        const n = e.id,
          t = chrome.i18n.getMessage(`dns_page_${n}`);
        t && (e.innerHTML = t);
      });
    };
  n(), s(), t();
})();
