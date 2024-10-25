(async () => {
  try {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  } catch {}
  function set_to_storage(e) {
    return new Promise((t) => {
      chrome.storage.local.set(e, t);
    });
  }
  function get_from_storage(e) {
    return new Promise((t) => {
      chrome.storage.local.get(e, t);
    });
  }
  function prepare_local_text() {
    for (
      let t = document.getElementsByTagName("html"), e = 0;
      e < t.length;
      e++
    ) {
      let n = t[e],
        s = n.innerHTML.toString(),
        o = s.replace(/__MSG_(\w+)__/g, function (e, t) {
          return t ? chrome.i18n.getMessage(t) : "";
        });
      o != s && (n.innerHTML = o);
    }
  }
  function s(e) {
    let t = $("#" + e + " option:first"),
      n = $("#" + e + " option:not(:first)").sort(function (e, t) {
        return e.text == t.text.toLowerCase()
          ? 0
          : e.text.toLowerCase() < t.text.toLowerCase()
          ? -1
          : 1;
      });
    $("#" + e)
      .html(n)
      .prepend(t);
  }
  async function o() {
    const t = await get_from_storage();
    t &&
      Object.keys(t).forEach((e) => {
        if (t[e].status == "enabled") {
          $('option[value="' + e + '"]').removeAttr("disabled");
          try {
            $("#country_select").wSelect("reset");
          } catch {}
        }
        if (t[e].status == "disabled") {
          $('option[value="' + e + '"]').attr("disabled", "disabled");
          try {
            $("#country_select").wSelect("reset");
          } catch {}
        }
      });
  }
  function prepare_ad() {
    const e = chrome.i18n.getUILanguage(),
      n = "https://vpn-free.pro",
      i = "https://free-vpn.pro",
      t =
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600",
      s = "VPN-FREE.PRO - Free Unlimited and Secure VPN Proxy",
      o = "VPN-FREE.PRO - бесплатный и безлимитный VPN",
      a =
        "VPN-FREE.PRO is a powerful browser extension, turning your browser into a powerful SSL VPN proxy and let you unblock websites, protect privac and hide IP address.",
      r =
        "VPN-FREE.PRO - бесплатное расширение для браузера, которое позволяет использовать VPN сервера для разблокировки веб-сайтов, защиты конфиденциальноси и скрытия своего реального IP-адреса.",
      c = "vpn, proxy, hide, free, secure";
    $(".share").on("click", function (c) {
      switch ((c.preventDefault(), this.id)) {
        case "ok":
          e.indexOf("ru") != -1 || e.indexOf("uk") != -1
            ? window.open(
                "https://connect.ok.ru/offer?url=" +
                  n +
                  "&?utm_source=ok_share&title=" +
                  o +
                  "&description=" +
                  r,
                "",
                t
              )
            : window.open(
                "https://connect.ok.ru/offer?url=" +
                  n +
                  "&?utm_source=ok_share&title=" +
                  s +
                  "&description=" +
                  a,
                "",
                t
              );
          break;
        case "fb":
          e.indexOf("ru") != -1 || e.indexOf("uk") != -1
            ? window.open(
                "https://www.facebook.com/sharer.php?u=" +
                  i +
                  "&?utm_source=fb_share&title=" +
                  o,
                "",
                t
              )
            : window.open(
                "https://www.facebook.com/sharer.php?u=" +
                  i +
                  "&?utm_source=fb_share&title=" +
                  s,
                "",
                t
              );
          break;
        default:
          e.indexOf("ru") != -1 || e.indexOf("uk") != -1
            ? window.open(
                "https://vk.com/share.php?url=" +
                  n +
                  "&?utm_source=vk_share&title=" +
                  o +
                  "&description=" +
                  r,
                "",
                t
              )
            : window.open(
                "https://vk.com/share.php?url=" +
                  n +
                  "&?utm_source=vk_share&title=" +
                  s +
                  "&description=" +
                  a,
                "",
                t
              );
          break;
      }
    });
  }
  async function main() {
    o();
    prepare_local_text();
    s("country_select");
    prepare_ad();

    try {
      $("select").wSelect();
    } catch {}

    $("#country_select").change(() => {
      set_to_storage({ choice: $("#country_select").val() }),
        chrome.runtime.sendMessage({ choice: $("#country_select").val() });
    });

    /** @type {HTMLTextAreaElement} */
    const textarea = document.querySelector(".my_box>textarea");
    textarea.value =
      (await chrome.storage.local.get("hosts"))?.hosts?.join("\n") || "";

    $(".my_box>button").on("click", () => {
      let values = $(textarea).val() || "";

      if (typeof values === "string") {
        values = values.split("\n");
        values = values.filter(Boolean);
      } else {
        values = [];
      }

      chrome.runtime.sendMessage({ update_hosts: values });
    });

    const { choice } = await get_from_storage("choice");

    if (choice) {
      $("#country_select").val(choice).change();
    }
  }
  await main();
})();
