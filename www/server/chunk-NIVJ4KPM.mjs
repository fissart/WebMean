import './polyfills.server.mjs';

// node_modules/js-cookie/dist/js.cookie.mjs
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (key === "__proto__") continue;
      target[key] = source[key];
    }
  }
  return target;
}
var defaultConverter = {
  read: function(value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function init(converter, defaultAttributes) {
  function set(name, value, attributes) {
    if (typeof document === "undefined") {
      return;
    }
    attributes = assign({}, defaultAttributes, attributes);
    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }
    name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }
      stringifiedAttributes += "; " + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }
      stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
    }
    return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
  }
  function get(name) {
    if (typeof document === "undefined" || arguments.length && !name) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      try {
        var found = decodeURIComponent(parts[0]);
        if (!(found in jar)) jar[found] = converter.read(value, found);
        if (name === found) {
          break;
        }
      } catch (_e) {
      }
    }
    return name ? jar[name] : jar;
  }
  return Object.create(
    {
      set,
      get,
      remove: function(name, attributes) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function(attributes) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function(converter2) {
        return init(assign({}, this.converter, converter2), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}
var api = init(defaultConverter, { path: "/" });

// src/app/componentes/auth.ts
var setCokie = (key, value) => {
  if (typeof window !== "undefined") {
    api.set(key, value);
  }
};
var removeCokie = (key) => {
  if (typeof window !== "undefined") {
    api.remove(key);
  }
};
var getCokie = (key) => {
  if (typeof window !== "undefined") {
    return api.get(key);
  }
  return void 0;
};
var setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
var removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
var authenticate = (response, next) => {
  if (response) {
    setCokie("token", response.token);
    setLocalStorage("token", response.token);
    setLocalStorage("user", response.user);
  }
  if (next)
    next();
};
var isAuth = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
        return false;
      }
    }
  }
  return false;
};
var isAsignature = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCokie("token");
    if (cookieChecked) {
      const curse = localStorage.getItem("curse");
      if (curse) {
        try {
          return JSON.parse(curse);
        } catch (e) {
          return false;
        }
      }
    }
  }
  return false;
};
var signout = (next) => {
  removeCokie("token");
  removeLocalStorage("user");
  removeLocalStorage("token");
  removeCokie("idcat");
  removeLocalStorage("idcat");
  removeCokie("idc");
  removeLocalStorage("idc");
  removeCokie("curse");
  removeLocalStorage("curse");
  if (next)
    next();
};

export {
  getCokie,
  authenticate,
  isAuth,
  isAsignature,
  signout
};
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.8 | MIT *)
*/
//# sourceMappingURL=chunk-NIVJ4KPM.mjs.map
