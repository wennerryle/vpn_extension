const MAIN_HTTPS_ARRAY = [
  "HTTPS sg1.frmdom.com:1022;",
  "HTTPS sg2.frmdom.com:1022;",
  "HTTPS sg3.frmdom.com:1022;",
  "HTTPS sg4.frmdom.com:1022;",
  "HTTPS sg5.frmdom.com:1022;",
  "HTTPS sg6.frmdom.com:1022;",
  "HTTPS sg7.frmdom.com:1022;",
  "HTTPS sg8.frmdom.com:1022;",
  "HTTPS sg9.frmdom.com:1022;",
];
const GLOBAL_HTTPS_ARRAY = [
  "HTTPS sg1.frmdom.com:1022;",
  "HTTPS sg2.frmdom.com:1022;",
  "HTTPS sg3.frmdom.com:1022;",
  "HTTPS sg4.frmdom.com:1022;",
  "HTTPS sg5.frmdom.com:1022;",
  "HTTPS sg6.frmdom.com:1022;",
  "HTTPS sg7.frmdom.com:1022;",
  "HTTPS sg8.frmdom.com:1022;",
  "HTTPS sg9.frmdom.com:1022;",
];
let MAIN_HTTPS = "",
  GLOBAL_HTTPS = "",
  i;
const MAIN_HTTPS_SORTED = MAIN_HTTPS_ARRAY.sort(function () {
  return Math.random() - 0.5;
});
const GLOBAL_HTTPS_SORTED = GLOBAL_HTTPS_ARRAY.sort(function () {
  return Math.random() - 0.5;
});
while ((i = MAIN_HTTPS_SORTED.pop())) {
  MAIN_HTTPS += i;
}
while ((i = GLOBAL_HTTPS_SORTED.pop())) {
  GLOBAL_HTTPS += i;
}
const VPN = MAIN_HTTPS + GLOBAL_HTTPS + "DIRECT;";
const BLOCK_PROXY = "PROXY 127.0.0.1:1111;";
const WHITE_LIST = [
  "*.google-analytics.com",
  "*.play.google.com",
  "*.free-vpn.pro",
  "*.vpn-free.pro",
  "*.trafflink.xyz",
  "*.trafcfy.com",
  "*.frmdom.com",
  "*.liveanalytics.xyz",
  "*.procompany.top",
  "*.checkconnection.online",
  "*.yt4.ggpht.com",
  "*.ads.google.com",
];
const BLACK_LIST = [
  "*.scorecardresearch.com",
  "*.tns-counter.ru",
  "*.mc.yandex.ru",
  "*.an.yandex.ru",
  "*.doubleclick.net",
  "*.graph.instagram.com",
  "*.ok-portal.mail.ru",
  "*.hit.gemius.pl",
  "*.rs.mail.ru",
  "*.pushads.biz",
  "*.weborama.fr",
];
const GLOBAL_LIST = ["*.vcdn.biz"];
function FindProxyForURL(url, host) {
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
}
