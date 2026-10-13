/* Runs in <head> before paint: picks the language so the page never flashes the wrong one.
   Order: the visitor's last choice, then their browser language, then Chinese. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var saved = null;
  try { saved = window.localStorage.getItem("ccs-lang"); } catch (e) { /* storage blocked: ignore */ }
  var browser = (navigator.language || "").toLowerCase();
  var lang = saved === "zh" || saved === "en" ? saved : (browser.indexOf("zh") === 0 ? "zh" : "en");
  root.setAttribute("data-lang", lang);
  root.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
})();
