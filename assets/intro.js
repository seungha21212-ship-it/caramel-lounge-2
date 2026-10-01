/* =========================================================
   CARAMEL LOUNGE — logo intro (index.html 전용)
   재생 여부는 index.html <head>의 INTRO 스니펫이 html.intro-on 으로 결정.
   타이밍은 assets/intro.css 상단 :root 변수에서 조절.
   ========================================================= */
(function () {
  "use strict";
  var root = document.documentElement;
  var intro = document.getElementById("intro");
  if (!intro) return;
  if (!root.classList.contains("intro-on")) { intro.remove(); return; }

  // 비밀번호 가림막이 떠 있는 동안은 #intro가 display:none 이라 애니메이션이 멈춰 있다가,
  // 잠금이 풀리는 순간 자연스럽게 처음부터 재생된다.
  intro.addEventListener("animationstart", function (e) {
    if (e.target === intro && e.animationName === "intro-exit") {
      try { sessionStorage.setItem("cl_intro_seen", "1"); } catch (err) {}
      root.classList.add("intro-out");
    }
  });

  intro.addEventListener("animationend", function (e) {
    if (e.target !== intro || e.animationName !== "intro-exit") return;
    intro.remove();
    root.classList.remove("intro-on");
    setTimeout(function () { root.classList.remove("intro-out"); }, 1500);
  });

  intro.addEventListener("click", function () {
    if (!root.classList.contains("intro-out")) intro.classList.add("is-skip");
  });
})();
