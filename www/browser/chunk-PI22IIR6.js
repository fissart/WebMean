import {
  __commonJS
} from "./chunk-3WPM564S.js";

// node_modules/timeago.js/lib/lang/es.js
var require_es = __commonJS({
  "node_modules/timeago.js/lib/lang/es.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(number, index) {
      return [
        ["justo ahora", "en un rato"],
        ["hace %s segundos", "en %s segundos"],
        ["hace 1 minuto", "en 1 minuto"],
        ["hace %s minutos", "en %s minutos"],
        ["hace 1 hora", "en 1 hora"],
        ["hace %s horas", "en %s horas"],
        ["hace 1 d\xEDa", "en 1 d\xEDa"],
        ["hace %s d\xEDas", "en %s d\xEDas"],
        ["hace 1 semana", "en 1 semana"],
        ["hace %s semanas", "en %s semanas"],
        ["hace 1 mes", "en 1 mes"],
        ["hace %s meses", "en %s meses"],
        ["hace 1 a\xF1o", "en 1 a\xF1o"],
        ["hace %s a\xF1os", "en %s a\xF1os"]
      ][index];
    }
    exports.default = default_1;
  }
});

// node_modules/timeago.js/esm/register.js
var Locales = {};
var register = function(locale, func) {
  Locales[locale] = func;
};
var getLocale = function(locale) {
  return Locales[locale] || Locales["en_US"];
};

// node_modules/timeago.js/esm/utils/date.js
var SEC_ARRAY = [
  60,
  60,
  24,
  7,
  365 / 7 / 12,
  12
];
function toDate(input) {
  if (input instanceof Date)
    return input;
  if (!isNaN(input) || /^\d+$/.test(input))
    return new Date(parseInt(input));
  input = (input || "").trim().replace(/\.\d+/, "").replace(/-/, "/").replace(/-/, "/").replace(/(\d)T(\d)/, "$1 $2").replace(/Z/, " UTC").replace(/([+-]\d\d):?(\d\d)/, " $1$2");
  return new Date(input);
}
function formatDiff(diff, localeFunc) {
  var agoIn = diff < 0 ? 1 : 0;
  diff = Math.abs(diff);
  var totalSec = diff;
  var idx = 0;
  for (; diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length; idx++) {
    diff /= SEC_ARRAY[idx];
  }
  diff = Math.floor(diff);
  idx *= 2;
  if (diff > (idx === 0 ? 9 : 1))
    idx += 1;
  return localeFunc(diff, idx, totalSec)[agoIn].replace("%s", diff.toString());
}
function diffSec(date, relativeDate) {
  var relDate = relativeDate ? toDate(relativeDate) : /* @__PURE__ */ new Date();
  return (+relDate - +toDate(date)) / 1e3;
}

// node_modules/timeago.js/esm/format.js
var format = function(date, locale, opts) {
  var sec = diffSec(date, opts && opts.relativeDate);
  return formatDiff(sec, getLocale(locale));
};

// node_modules/timeago.js/esm/lang/en_US.js
var EN_US = ["second", "minute", "hour", "day", "week", "month", "year"];
function en_US_default(diff, idx) {
  if (idx === 0)
    return ["just now", "right now"];
  var unit = EN_US[Math.floor(idx / 2)];
  if (diff > 1)
    unit += "s";
  return [diff + " " + unit + " ago", "in " + diff + " " + unit];
}

// node_modules/timeago.js/esm/lang/zh_CN.js
var ZH_CN = ["\u79D2", "\u5206\u949F", "\u5C0F\u65F6", "\u5929", "\u5468", "\u4E2A\u6708", "\u5E74"];
function zh_CN_default(diff, idx) {
  if (idx === 0)
    return ["\u521A\u521A", "\u7247\u523B\u540E"];
  var unit = ZH_CN[~~(idx / 2)];
  return [diff + " " + unit + "\u524D", diff + " " + unit + "\u540E"];
}

// node_modules/timeago.js/esm/index.js
register("en_US", en_US_default);
register("zh_CN", zh_CN_default);

export {
  register,
  format,
  require_es
};
//# sourceMappingURL=chunk-PI22IIR6.js.map
