/* =========================================================
   CARAMEL LOUNGE — About 진입 연출 (about.html 전용)
   재생 여부는 about.html <head>의 ABOUT INTRO 스니펫이 html.about-intro-on 으로 결정.
   ========================================================= */
(function () {
  "use strict";

  /* --- 단어 목록: 마지막 단어에서 멈춘다 ------------------------- */
  var WORDS = ["LOUNGE", "DESIGNERS", "ENGINEERS", "ARCHITECTS", "CONSULTANTS", "LOUNGE"];

  /* --- 타이밍 (ms) ----------------------------------------------- */
  var TIMING = {
    thumbs:   500,  // 썸네일 페이드인
    caramel:  900,  // "CARAMEL —" 채움
    word:     600,  // 단어 하나당 간격
    wordFill: 500,  // 단어 하나가 채워지는 시간
    hold:     300,  // 마지막 단어 채운 뒤 유지
    exit:     600,  // 오버레이 페이드아웃
    reduced: 1000   // prefers-reduced-motion일 때 보여주는 시간
  };

  /* --- 배경 썸네일: 실제 caramellounge.imweb.me/PROJECT 이미지 --- */
  var CDN = "https://cdn.imweb.me/thumbnail/20250428/";
  var THUMBS = [
    { slug: "kanu-jayang",                src: "29509f6d15cf6.jpg" },
    { slug: "i-square-office-pangyo",     src: "e0b5b133f1239.jpg" },
    { slug: "cream-atelier-popup",        src: "3c26ebb4745a6.jpg" },
    { slug: "supervill-sports-club",      src: "f973ead4ebfd8.jpg" },
    { slug: "kanu-signature",             src: "a5d01a025efad.jpg" },
    { slug: "nautilus-investment-office", src: "da8e1268a8ef1.jpg" },
    { slug: "sevenbrau-popup",            src: "34c8387815e58.jpg" },
    { slug: "pavi-gym-twincity",          src: "0928d011c6431.jpg" }
  ];

  var root = document.documentElement;
  var el = document.getElementById("about-intro");
  if (!el) return;
  if (!root.classList.contains("about-intro-on")) { el.remove(); return; }

  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];
  var later = function (fn, ms) { timers.push(setTimeout(fn, ms)); };
  var done = false;

  el.style.setProperty("--ai-thumbs", TIMING.thumbs + "ms");
  el.style.setProperty("--ai-exit", TIMING.exit + "ms");

  // 썸네일
  el.querySelector(".ai-thumbs").innerHTML = THUMBS.map(function (t) {
    return '<a href="space.html#' + t.slug + '"><img src="' + CDN + t.src +
      '" alt="" loading="lazy" decoding="async"></a>';
  }).join("");

  // 단어 칸 폭 = 가장 긴 단어
  var longest = WORDS.reduce(function (a, b) { return b.length > a.length ? b : a; }, "");
  el.querySelector(".ai-ghost").textContent = longest;

  var head = el.querySelector(".ai-head");
  var word = el.querySelector(".ai-word");
  var count = el.querySelector(".ai-count");

  // 단어 칸은 가장 긴 단어 폭으로 고정돼 있어서 마지막 단어(LOUNGE) 기준으로는 줄이 왼쪽으로 치우친다.
  // 그 차이의 절반만큼 줄 전체를 오른쪽으로 밀어 "CARAMEL — LOUNGE"가 화면 정중앙에 오게 한다.
  function center() {
    var keep = word.textContent;
    word.textContent = WORDS[WORDS.length - 1];
    var d = el.querySelector(".ai-ghost").offsetWidth - word.offsetWidth;
    word.textContent = keep;
    el.style.setProperty("--ai-shift", (d / 2) + "px");
  }
  window.addEventListener("resize", center);

  // 단어 칸은 가장 긴 단어 폭으로 고정돼 있어서, 마지막 단어(LOUNGE) 기준으로는 줄이 왼쪽으로 치우친다.
  // 그 차이의 절반만큼 줄 전체를 오른쪽으로 밀어 "CARAMEL — LOUNGE"가 화면 정중앙에 오게 한다.
  function center() {
    var keep = word.textContent;
    word.textContent = WORDS[WORDS.length - 1];
    var d = el.querySelector(".ai-ghost").offsetWidth - word.offsetWidth;
    word.textContent = keep;
    el.style.setProperty("--ai-shift", (d / 2) + "px");
  }
  window.addEventListener("resize", center);

  function fill(node, ms) {
    node.classList.remove("on");
    node.style.setProperty("--ai-dur", ms + "ms");
    void node.offsetWidth;          // 회색 상태로 리셋 후
    node.classList.add("on");       // 왼→오 채움 시작
  }

  function finish() {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    el.classList.add("is-out");
    setTimeout(function () {
      el.remove();
      root.classList.remove("about-intro-on");
      document.body.style.overflow = "";
    }, TIMING.exit);
  }

  function play() {
    center();
    center();

    if (reduced) {
      word.textContent = WORDS[WORDS.length - 1];
      el.classList.add("is-thumbs");
      [head, word].forEach(function (n) { n.style.backgroundPosition = "0 0"; });
      count.textContent = "100";
      later(finish, TIMING.reduced);
      return;
    }

    var t = 0;
    requestAnimationFrame(function () { el.classList.add("is-thumbs"); });
    t += TIMING.thumbs;

    word.textContent = WORDS[0];
    later(function () { fill(head, TIMING.caramel); }, t);
    t += TIMING.caramel;

    WORDS.forEach(function (w, i) {
      later(function () {
        word.textContent = w;
        fill(word, TIMING.wordFill);
      }, t + i * TIMING.word);
    });
    t += WORDS.length * TIMING.word + TIMING.hold;

    // 진행률 카운터 000 → 100
    var total = t, t0 = performance.now();
    (function tick(now) {
      if (done) return;
      var p = Math.min(1, (now - t0) / total);
      count.textContent = ("00" + Math.round(p * 100)).slice(-3);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);

    later(finish, t);
  }

  // 건너뛰기: 썸네일(링크) 클릭은 그대로 이동, 그 외 클릭·키 입력은 스킵
  el.addEventListener("click", function (e) {
    if (!e.target.closest("a")) finish();
  });
  // 휠/스와이프로 내리면 연출을 끝내고 바로 본문 스크롤로 이어간다
  function onScrollIntent(dy) {
    if (root.classList.contains("locked") || dy <= 0) return;
    if (!done) {
      finish();
      el.style.pointerEvents = "none";
      document.body.style.overflow = "auto"; // 스크롤 잠금 즉시 해제 (오버레이는 그대로 페이드아웃)
      window.scrollBy(0, dy);
    }
    window.removeEventListener("wheel", onWheel);
  }
  function onWheel(e) { onScrollIntent(e.deltaY); }
  window.addEventListener("wheel", onWheel, { passive: true });
  var ty = null;
  window.addEventListener("touchstart", function (e) { ty = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchmove", function (e) {
    if (ty !== null) onScrollIntent(ty - e.touches[0].clientY);
  }, { passive: true });

  document.addEventListener("keydown", function onKey() {
    if (root.classList.contains("locked")) return;
    document.removeEventListener("keydown", onKey);
    finish();
  });

  // 비밀번호 가림막이 떠 있으면 풀린 뒤에 시작
  if (root.classList.contains("locked")) {
    var mo = new MutationObserver(function () {
      if (!root.classList.contains("locked")) { mo.disconnect(); play(); }
    });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
  } else {
    play();
  }
})();
