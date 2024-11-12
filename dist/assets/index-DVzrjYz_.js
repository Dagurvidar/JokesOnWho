(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const s of e)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(e) {
    const s = {};
    return (
      e.integrity && (s.integrity = e.integrity),
      e.referrerPolicy && (s.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const s = r(e);
    fetch(e.href, s);
  }
})();
function c(o, t = {}, ...r) {
  const n = document.createElement(o);
  for (const e of Object.keys(t)) {
    if (typeof t[e] == "function") {
      n.addEventListener(e, t[e]);
      continue;
    }
    n.setAttribute(e, t[e]);
  }
  for (const e of r) {
    if (!e) {
      console.warn("Child is null", o, t);
      continue;
    }
    typeof e == "string" || typeof e == "number"
      ? n.appendChild(document.createTextNode(e.toString()))
      : n.appendChild(e);
  }
  return n;
}
function p(o) {
  if (!(!o || !o.firstChild))
    for (; o.firstChild; ) o.removeChild(o.firstChild);
}
async function m(o) {
  return new Promise((t) => setTimeout(t, o));
}
function d(o, t, r) {
  const n = c("div", { class: "card" }),
    e = c("p", {}, o),
    s = c("button", { id: `${r}` }, `${t}`);
  return n.appendChild(e), n.appendChild(s), n;
}
function h(o, t, r = 30) {
  let n = 0;
  function e() {
    n < t.length && ((o.textContent += t[n]), n++, setTimeout(e, r));
  }
  e();
}
const y = "https://v2.jokeapi.dev/joke/Any?type=twopart";
document.getElementById("jokeButton").addEventListener("click", B);
async function g() {
  try {
    const t = await (await fetch(y)).json(),
      r = t.setup,
      n = t.delivery;
    return [r, n];
  } catch (o) {
    return u(o), ["", ""];
  }
}
function u(o) {
  console.error("Something went wrong: ", o);
  const t = document.querySelector("main");
  p(t);
  const r = c("p", {}, c("strong", {}, "Eitthvað fór úrskeiðis")),
    n = c("div", { class: "card", id: "errorSection" }, r),
    e = c("button", { id: "retryButton" }, "Reyna aftur");
  e.addEventListener("click", () => {
    location.reload();
  }),
    n.appendChild(e),
    t.appendChild(n);
}
async function B() {
  try {
    document.getElementById("firstButton").classList.add("hidden");
    const t = document.getElementById("setup"),
      r = c("p", {}),
      n = t.appendChild(r);
    console.log(n),
      document.getElementById("setupCard").classList.remove("hidden"),
      (n.textContent = "Finn brandara..."),
      await m(1e3);
    const [s, i] = await g();
    (n.textContent = s), I(i);
  } catch (o) {
    u(o);
  }
}
async function I(o) {
  try {
    const t = document.getElementById("userInput"),
      r = document.getElementById("userPunchline"),
      n = c(
        "p",
        {},
        "Sláðu inn þitt eigið punchline, svo kýstu hvort þú eða bottinn hafi sigrað!",
      );
    t.insertBefore(n, r), r.classList.remove("hidden");
    const e = c("button", { id: "sendUserInputButton" }, "Senda");
    t.appendChild(e), e.addEventListener("click", () => v(o));
  } catch (t) {
    u(t);
  }
}
async function v(o) {
  const t = document.getElementById("userPunchline").value;
  if (t.length <= 150 && t.trim()) {
    const r = document.getElementById("comparison"),
      n = d(t, "Vote for user", "voteUser");
    document.getElementById("userInput").classList.add("hidden");
    const s = d("", "Vote for API", "voteApi"),
      i = s.querySelector("p");
    h(i, o), r.appendChild(n), r.appendChild(s);
    const a = document.getElementById("voteUser"),
      f = document.getElementById("voteApi");
    a.addEventListener("click", () => l(!0)),
      f.addEventListener("click", () => l(!1));
  } else
    document
      .getElementById("userInput")
      .appendChild(c("p", {}, "Vinsamlegast haltu orðafjölda milli 1 og 150"));
}
function l(o) {
  const t = document.getElementById("setupCard"),
    r = document.getElementById("comparison");
  t.classList.add("hidden"), p(r);
  const n = document.getElementById("results"),
    e = o
      ? "You beat me &#128546"
      : "Hahahahaahah gotcha! &#128514&#128521&#128526&#128523&#128536;",
    s = d(e, "fetch new joke?", "resetButton"),
    i = s.querySelector("p");
  (i.innerHTML = e),
    n.appendChild(s),
    document.getElementById("resetButton").addEventListener("click", () => {
      location.reload();
    });
}
