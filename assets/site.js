/* =========================================================
   CARAMEL LOUNGE — shared script
   ========================================================= */
(function () {
  "use strict";

  /* --- sticky header hairline ------------------------------------ */
  var head = document.querySelector(".site-head");
  if (head) {
    var onScroll = function () {
      head.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- reveal on scroll ------------------------------------------ */
  var targets = document.querySelectorAll(".rv");
  if (targets.length) {
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      targets.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i, 6) * 60) + "ms";
        io.observe(el);
      });
    }
  }

  /* --- image placeholders ----------------------------------------
     assets/projects/ 에 사진을 넣기 전까지는 빗금 플레이스홀더를 보여준다.
     파일을 넣으면 자동으로 사진이 표시된다.                          */
  window.wireThumb = function (box) {
    var img = box.querySelector("img");
    if (!img) { box.classList.add("is-empty"); return; }
    var fail = function () { img.style.display = "none"; box.classList.add("is-empty"); };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
    img.addEventListener("load", function () {
      if (img.naturalWidth === 0) fail();
      else box.classList.remove("is-empty");
    });
  };
  document.querySelectorAll(".thumb").forEach(window.wireThumb);
})();
