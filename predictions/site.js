/* Site navigation and table containment for the forecast pages (predmarkets.site_chrome). */
(function () {
  "use strict";
  if (window.__siteChrome) return;
  window.__siteChrome = true;
  var SECTIONS = [["Elections","elections"],["Cricket","cricket"],["Basketball","basketball"],["Economy","economy"],["Racing","racing"],["Research","research"]], ROWS = 20;
  var me = document.currentScript || document.querySelector("script[data-site-chrome]");
  var current = me && me.getAttribute("data-section");
  var path = location.pathname.split("/").pop();
  var isIndex = path === "" || path === "index.html";

  var CSS = [
    ".sc-bar{all:initial;display:block;box-sizing:border-box;width:100%;font:13px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;",
    "  background:var(--sc-bg);color:var(--sc-fg);border-bottom:1px solid var(--sc-line);position:relative;z-index:40}",
    ".sc-bar *{box-sizing:border-box;font:inherit}",
    ".sc-in{max-width:1180px;margin:0 auto;padding:7px 16px;display:flex;align-items:center;gap:6px 14px;flex-wrap:wrap}",
    ".sc-bar a{color:var(--sc-fg);text-decoration:none}",
    ".sc-home{font-weight:650;white-space:nowrap}",
    ".sc-home:hover,.sc-links a:hover{text-decoration:underline}",
    ".sc-links{display:flex;gap:2px 12px;flex-wrap:wrap;color:var(--sc-muted)}",
    ".sc-links a{color:var(--sc-muted);white-space:nowrap}",
    ".sc-links a[aria-current]{color:var(--sc-fg);font-weight:650}",
    ".sc-sp{flex:1}",
    ".sc-btn{all:unset;box-sizing:border-box;cursor:pointer;padding:3px 10px;border:1px solid var(--sc-line);border-radius:999px;",
    "  color:var(--sc-fg);font:12px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;white-space:nowrap;background:var(--sc-bg)}",
    ".sc-btn:hover{border-color:var(--sc-muted)}",
    ".sc-btn:focus-visible,.sc-bar a:focus-visible{outline:2px solid #4c8bf5;outline-offset:2px}",
    ".sc-toc{position:absolute;right:16px;top:100%;margin-top:4px;max-height:70vh;overflow:auto;min-width:240px;max-width:min(420px,92vw);",
    "  background:var(--sc-bg);color:var(--sc-fg);border:1px solid var(--sc-line);border-radius:10px;padding:6px;",
    "  box-shadow:0 10px 30px rgba(0,0,0,.25);z-index:60}",
    ".sc-toc a{display:block;padding:5px 10px;border-radius:6px;color:var(--sc-fg)}",
    ".sc-toc a:hover,.sc-toc a:focus{background:var(--sc-hover);text-decoration:none}",
    ".sc-toc a.sc-sub{padding-left:22px;color:var(--sc-muted)}",
    ".sc-float{position:fixed;right:16px;bottom:16px;z-index:50;display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .2s}",
    ".sc-float.sc-on{opacity:1;pointer-events:auto}",
    ".sc-float .sc-btn{padding:6px 12px;box-shadow:0 4px 14px rgba(0,0,0,.2);text-decoration:none}",
    "@media print{.sc-bar,.sc-float,.sc-tt{display:none!important}.sc-tw{max-height:none!important;overflow:visible!important}}"
  ].join("\n");
  // Lives in every root that holds a contained table (the document and open shadow roots).
  var TABLE_CSS = [
    ".sc-tw{max-height:min(75vh,36rem);overflow:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--sc-line,rgba(127,127,127,.25));",
    "  border-radius:6px;overscroll-behavior:contain}",
    ".sc-tw.sc-open{max-height:none}",
    ".sc-tw>table{margin-top:0!important;margin-bottom:0!important}",
    ".sc-tw thead th,.sc-tw thead td{position:sticky;top:0;z-index:2;background:var(--sc-thbg,Canvas)}",
    ".sc-tt{display:flex;align-items:center;gap:10px;margin:6px 0 14px;font:12px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;opacity:.8}",
    ".sc-tt[hidden]{display:none}",
    ".sc-tt button{all:unset;cursor:pointer;padding:2px 10px;border:1px solid rgba(127,127,127,.4);border-radius:999px;font:inherit}",
    ".sc-tt button:hover{border-color:currentColor}",
    ".sc-tt button:focus-visible{outline:2px solid #4c8bf5;outline-offset:2px}"
  ].join("\n");

  function rgba(c) {
    var m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    var p = m[1].split(",").map(function (x) { return parseFloat(x); });
    return {r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1};
  }
  function background(el) {
    for (var n = el; n && n.nodeType === 1; n = n.parentElement || (n.getRootNode && n.getRootNode().host)) {
      var c = rgba(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.9) return c;
    }
    var h = rgba(getComputedStyle(document.documentElement).backgroundColor);
    if (h && h.a > 0.9) return h;
    return matchMedia("(prefers-color-scheme: dark)").matches ? {r: 18, g: 18, b: 18, a: 1} : {r: 255, g: 255, b: 255, a: 1};
  }
  function css(c) { return "rgb(" + Math.round(c.r) + "," + Math.round(c.g) + "," + Math.round(c.b) + ")"; }
  function dark(c) { return (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) < 128; }

  function theme(target) {
    var bg = background(document.body), d = dark(bg);
    var shade = function (k) { return {r: bg.r + (d ? k : -k), g: bg.g + (d ? k : -k), b: bg.b + (d ? k : -k)}; };
    target.style.setProperty("--sc-bg", css(shade(d ? 10 : 4)));
    target.style.setProperty("--sc-hover", css(shade(d ? 22 : 12)));
    target.style.setProperty("--sc-fg", d ? "#f2f1ec" : "#16161a");
    target.style.setProperty("--sc-muted", d ? "#a9a8a1" : "#5d5c58");
    target.style.setProperty("--sc-line", d ? "rgba(255,255,255,.14)" : "rgba(0,0,0,.12)");
  }

  function addStyle(root, id, text) {
    if (root.querySelector && root.querySelector("style[data-sc='" + id + "']")) return;
    var s = document.createElement("style");
    s.setAttribute("data-sc", id);
    s.textContent = text;
    (root === document ? document.head || document.documentElement : root).appendChild(s);
  }

  // ---- headings for "On this page"
  function roots() {
    var out = [document], seen = 0;
    (function walk(root) {
      var all = root.querySelectorAll("*");
      for (var i = 0; i < all.length; i++) {
        var sr = all[i].shadowRoot;
        if (sr && seen++ < 200) { out.push(sr); walk(sr); }
      }
    })(document);
    return out;
  }
  function visible(el) { return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length); }
  function headings() {
    var found = [];
    roots().forEach(function (root) {
      root.querySelectorAll("h1,h2,h3").forEach(function (h) {
        if (h.closest(".sc-bar,.sc-toc,table,figure,details:not([open]),[hidden]") || !visible(h)) return;
        var text = (h.textContent || "").replace(/\s+/g, " ").trim();
        if (!text || text.length > 90) return;
        found.push({el: h, text: text, level: +h.tagName[1]});
      });
    });
    found.sort(function (a, b) {
      return a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top;
    });
    var h2 = found.filter(function (f) { return f.level === 2; }).length;
    // Mostly h2 sections: list h2 with their h3s indented; a page of h3s only lists those.
    return found.filter(function (f) { return f.level === 2 || (f.level === 3 && (h2 < 25)); }).slice(0, 80);
  }

  function bar() {
    if (document.querySelector(".sc-bar")) return;
    var nav = document.createElement("nav");
    nav.className = "sc-bar";
    nav.setAttribute("aria-label", "Site");
    theme(nav);
    var inner = document.createElement("div");
    inner.className = "sc-in";
    var home = document.createElement("a");
    home.className = "sc-home";
    home.href = isIndex ? "https://srepho.github.io/" : "index.html";
    home.textContent = isIndex ? "← srepho.github.io" : "← All forecasts";
    inner.appendChild(home);
    var links = document.createElement("div");
    links.className = "sc-links";
    SECTIONS.forEach(function (s) {
      var a = document.createElement("a");
      a.href = "index.html#" + s[1];
      a.textContent = s[0];
      if (s[1] === current) a.setAttribute("aria-current", "true");
      links.appendChild(a);
    });
    var results = document.createElement("a");
    results.href = "results.html";
    results.textContent = "Results";
    if (path === "results.html") results.setAttribute("aria-current", "page");
    links.appendChild(results);
    inner.appendChild(links);
    var sp = document.createElement("span");
    sp.className = "sc-sp";
    inner.appendChild(sp);
    if (!isIndex) {
      var btn = document.createElement("button");
      btn.className = "sc-btn";
      btn.type = "button";
      btn.textContent = "On this page ▾";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-haspopup", "true");
      var menu = document.createElement("div");
      menu.className = "sc-toc";
      menu.hidden = true;
      menu.setAttribute("role", "menu");
      var close = function () { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); };
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (!menu.hidden) return close();
        menu.textContent = "";
        var list = headings();
        if (!list.length) {
          var none = document.createElement("div");
          none.style.cssText = "padding:6px 10px;opacity:.7";
          none.textContent = "No sections on this page";
          menu.appendChild(none);
        }
        list.forEach(function (h) {
          var a = document.createElement("a");
          a.href = "#";
          a.setAttribute("role", "menuitem");
          a.textContent = h.text;
          if (h.level === 3) a.className = "sc-sub";
          a.addEventListener("click", function (ev) {
            ev.preventDefault();
            close();
            h.el.scrollIntoView({behavior: "smooth", block: "start"});
            if (!h.el.hasAttribute("tabindex")) h.el.setAttribute("tabindex", "-1");
            h.el.focus({preventScroll: true});
          });
          menu.appendChild(a);
        });
        menu.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        var first = menu.querySelector("a");
        if (first) first.focus();
      });
      document.addEventListener("click", function (e) { if (!nav.contains(e.target)) close(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { close(); btn.focus(); } });
      inner.appendChild(btn);
      nav.appendChild(menu);
    }
    nav.insertBefore(inner, nav.firstChild);
    document.body.insertBefore(nav, document.body.firstChild);
    // Run edge to edge even when the page pads its body.
    var bs = getComputedStyle(document.body);
    if (bs.display === "block") {
      var px = function (v) { return parseFloat(v) || 0; };
      var top = px(bs.paddingTop) + px(bs.marginTop), left = px(bs.paddingLeft) + px(bs.marginLeft);
      var right = px(bs.paddingRight) + px(bs.marginRight);
      nav.style.margin = (-top) + "px " + (-right) + "px " + px(bs.paddingTop) + "px " + (-left) + "px";
      nav.style.width = "calc(100% + " + (left + right) + "px)";
    }

    var float = document.createElement("div");
    float.className = "sc-float";
    theme(float);
    var top = document.createElement("button");
    top.className = "sc-btn";
    top.type = "button";
    top.textContent = "↑ Top";
    top.addEventListener("click", function () { scrollTo({top: 0, behavior: "smooth"}); });
    float.appendChild(top);
    if (!isIndex) {
      var back = document.createElement("a");
      back.className = "sc-btn";
      back.href = "index.html";
      back.textContent = "All forecasts";
      float.appendChild(back);
    }
    document.body.appendChild(float);
    var tick = function () { float.classList.toggle("sc-on", scrollY > 700); };
    addEventListener("scroll", tick, {passive: true});
    tick();
  }

  // ---- Australian dates (display text only; data, links and code stay verbatim)
  function auDateText(text) {
    if (!/\d{4}-\d{2}-\d{2}/.test(text) || /^https?:\/\//.test(text.trim())) return text;
    // Explicitly zoned timestamps can be converted to Sydney without guessing.
    text = text.replace(/(^|[^\w.\/-])(\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2}| UTC))(?=$|[^\w\/-])/g, function (_, before, value) {
      var iso = value.replace(" UTC", "Z").replace(" ", "T"), d = new Date(iso);
      return isNaN(d.getTime()) ? _ : before + d.toLocaleString("en-AU", {timeZone:"Australia/Sydney", day:"2-digit", month:"2-digit", year:"numeric", hour:"numeric", minute:"2-digit", timeZoneName:"short"});
    });
    return text.replace(/(^|[^\w.\/-])(\d{4})-(\d{2})-(\d{2})(?=$|[^\w\/-]|T\d{2}:)/g, function (_, before, y, m, d) {
      var date = new Date(y + "-" + m + "-" + d + "T00:00:00Z");
      if (isNaN(date.getTime()) || date.getUTCMonth() + 1 !== +m || date.getUTCDate() !== +d) return _;
      return before + d + "/" + m + "/" + y;
    }).replace(/(\d{2}\/\d{2}\/\d{4})T(?=\d{2}:)/g, "$1 ");
  }
  function formatDates(root) {
    var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), node;
    while ((node = walk.nextNode())) {
      if (!node.parentElement || node.parentElement.closest("script,style,code,pre,textarea,input,select,[contenteditable]")) continue;
      var formatted = auDateText(node.nodeValue);
      if (formatted !== node.nodeValue) node.nodeValue = formatted;
    }
  }

  // ---- long tables
  function constrained(table) {
    for (var n = table.parentElement, i = 0; n && i < 4; n = n.parentElement, i++) {
      var s = getComputedStyle(n);
      if ((s.overflowY === "auto" || s.overflowY === "scroll") && s.maxHeight !== "none") return true;
      if ((s.overflowY === "auto" || s.overflowY === "scroll") && n.clientHeight && n.clientHeight < innerHeight * 0.85) return true;
    }
    return false;
  }
  function bodyRows(table) {
    var n = 0;
    for (var i = 0; i < table.tBodies.length; i++) n += table.tBodies[i].rows.length;
    return n || Math.max(0, table.rows.length - (table.tHead ? table.tHead.rows.length : 0));
  }
  function contain(table, root) {
    if (table.__sc || table.closest(".sc-tw")) return;
    if (bodyRows(table) <= ROWS) return;  // revisit later: rows may still be rendering
    table.__sc = true;
    if (constrained(table)) return;
    addStyle(root, "tables", TABLE_CSS);
    var wrap = document.createElement("div");
    wrap.className = "sc-tw";
    wrap.style.setProperty("--sc-thbg", css(background(table.parentElement || table)));
    var tools = document.createElement("div");
    tools.className = "sc-tt";
    var label = document.createElement("span");
    var toggle = document.createElement("button");
    toggle.type = "button";
    tools.appendChild(label);
    tools.appendChild(toggle);
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
    wrap.parentNode.insertBefore(tools, wrap.nextSibling);
    // Writes only on change: every DOM write would wake the mutation observer again.
    var set = function (el, text) { if (el.textContent !== text) el.textContent = text; };
    var refresh = function () {
      var open = wrap.classList.contains("sc-open");
      var hide = !open && wrap.scrollHeight <= wrap.clientHeight + 4;
      if (tools.hidden !== hide) tools.hidden = hide;
      set(label, bodyRows(table) + " rows" + (open ? "" : " · scroll inside the table"));
      set(toggle, open ? "Collapse table" : "Expand table");
      if (toggle.getAttribute("aria-expanded") !== String(open)) toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () {
      var open = wrap.classList.toggle("sc-open");
      if (!open) wrap.scrollIntoView({block: "nearest"});
      refresh();
    });
    table.__scRefresh = refresh;
    refresh();
    // Tables in tabs hidden at load only overflow once shown.
    if (window.ResizeObserver) new ResizeObserver(refresh).observe(wrap);
  }
  function scan() {
    roots().forEach(function (root) {
      formatDates(root);
      root.querySelectorAll("table").forEach(function (t) {
        if (t.__sc) { if (t.__scRefresh) t.__scRefresh(); return; }
        contain(t, root);
      });
      if (root !== document && !root.__scObserved) {
        root.__scObserved = true;
        new MutationObserver(schedule).observe(root, {childList: true, characterData: true, subtree: true});
      }
    });
  }
  var pending = null;
  function schedule() {
    if (pending) return;
    pending = setTimeout(function () { pending = null; scan(); }, 200);
  }

  function start() {
    addStyle(document, "chrome", CSS);
    try { bar(); } catch (e) { if (window.console) console.warn("site chrome", e); }
    scan();
    new MutationObserver(schedule).observe(document.body, {childList: true, characterData: true, subtree: true});
    addEventListener("load", schedule);
    addEventListener("resize", schedule);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
