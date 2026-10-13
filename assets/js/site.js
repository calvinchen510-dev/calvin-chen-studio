/* =========================================================
   Calvin Chen Studio · shared page behaviour
   No tracking, no cookies, no network calls.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Language switch ---------- */
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    try { window.localStorage.setItem("ccs-lang", lang); } catch (e) { /* storage blocked */ }
    document.querySelectorAll("[data-set-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === lang));
    });
    var t = document.querySelector('meta[name="ccs-title-' + lang + '"]');
    if (t) document.title = t.getAttribute("content");
  }
  document.querySelectorAll("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-set-lang")); });
  });
  setLang(root.getAttribute("data-lang") || "zh");

  /* ---------- Header hairline after scrolling ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Hero load sequence is pure CSS (components.css), so the page is complete even without this script. */

  /* ---------- Hero film: respect reduced motion, offer pause ---------- */
  var video = document.querySelector("[data-film]");
  var toggle = document.querySelector("[data-film-toggle]");
  if (video) {
    if (reduceMotion) { video.removeAttribute("autoplay"); video.pause(); }
    else { var p = video.play(); if (p && p.catch) p.catch(function () { /* autoplay blocked: poster stays */ }); }
    if (toggle) {
      var sync = function () {
        var playing = !video.paused;
        toggle.setAttribute("aria-pressed", String(!playing));
        toggle.querySelectorAll("[data-state]").forEach(function (el) {
          el.hidden = el.getAttribute("data-state") !== (playing ? "playing" : "paused");
        });
      };
      toggle.addEventListener("click", function () { if (video.paused) video.play(); else video.pause(); });
      video.addEventListener("play", sync);
      video.addEventListener("pause", sync);
      sync();
    }
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        btn.classList.add("is-copied");
        btn.querySelectorAll("[data-copy-state]").forEach(function (el) {
          el.hidden = el.getAttribute("data-copy-state") !== "done";
        });
        window.setTimeout(function () {
          btn.classList.remove("is-copied");
          btn.querySelectorAll("[data-copy-state]").forEach(function (el) {
            el.hidden = el.getAttribute("data-copy-state") !== "idle";
          });
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { window.location.href = "mailto:" + text; });
      } else {
        window.location.href = "mailto:" + text;
      }
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
