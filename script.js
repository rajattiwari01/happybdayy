/* ============================================================
   Happy Birthday, Khushi Jain — interactions
   ============================================================ */
(() => {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NAME = "Khushi";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---- toast ---- */
  let toastT;
  function toast(msg) {
    const t = $("#toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---- floating gold dust ---- */
  (function dust() {
    const c = $("#dust"), ctx = c.getContext("2d");
    let w, h, pts = [];
    const tint = ["#c78a90", "#b28a5c", "#d9c3a1", "#e6d0d2"];
    function size() {
      w = c.width = innerWidth; h = c.height = innerHeight;
      const n = Math.min(90, Math.floor(w * h / 16000));
      pts = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + .4,
        a: Math.random(), s: Math.random() * .015 + .003, vy: Math.random() * .2 + .04,
        c: tint[i % tint.length]
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.a += p.s; if (p.a > 1 || p.a < 0) p.s *= -1;
        p.y -= p.vy; if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.globalAlpha = Math.abs(p.a) * .5; ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    size(); addEventListener("resize", size); if (!reduce) draw();
  })();

  /* ---- confetti (soft gold/rose) ---- */
  const confetti = (() => {
    const c = $("#confetti"), ctx = c.getContext("2d");
    let w, h, bits = [], raf = null;
    const cols = ["#b28a5c", "#d9b892", "#c78a90", "#efe3d3", "#5e3550"];
    function size() { w = c.width = innerWidth; h = c.height = innerHeight; }
    size(); addEventListener("resize", size);
    function burst(n = 90, ox = w / 2, oy = h / 3) {
      for (let i = 0; i < n; i++) bits.push({
        x: ox, y: oy, vx: (Math.random() - .5) * 11, vy: Math.random() * -11 - 3,
        g: .26 + Math.random() * .16, size: Math.random() * 7 + 3, color: cols[(Math.random() * cols.length) | 0],
        rot: Math.random() * 6, vr: (Math.random() - .5) * .3, life: 1
      });
      if (!raf) loop();
    }
    function loop() {
      ctx.clearRect(0, 0, w, h);
      bits = bits.filter(b => b.life > 0 && b.y < h + 40);
      for (const b of bits) {
        b.vy += b.g; b.x += b.vx; b.y += b.vy; b.rot += b.vr; b.life -= .006;
        ctx.save(); ctx.globalAlpha = Math.max(0, b.life); ctx.translate(b.x, b.y); ctx.rotate(b.rot);
        ctx.fillStyle = b.color; ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * .5); ctx.restore();
      }
      if (bits.length) raf = requestAnimationFrame(loop); else { ctx.clearRect(0, 0, w, h); raf = null; }
    }
    return { burst };
  })();
  function celebrate() {
    if (reduce) return;
    confetti.burst(110, innerWidth / 2, innerHeight / 3);
    setTimeout(() => confetti.burst(70, innerWidth * .2, innerHeight * .4), 160);
    setTimeout(() => confetti.burst(70, innerWidth * .8, innerHeight * .4), 320);
  }

  /* ---- intro ---- */
  const intro = $("#intro");
  $("#giftBtn").addEventListener("click", () => {
    celebrate();
    setTimeout(() => intro.classList.add("hidden"), 300);
  }, { once: true });

  /* ---- typed hero line ---- */
  (function typed() {
    const el = $("#typed"); if (!el) return;
    const lines = [
      "another year, quietly extraordinary",
      "here's to you, and everything ahead",
      "the world is lovelier with you in it",
      "make a wish — you've earned it"
    ];
    let li = 0, ci = 0, del = false;
    (function tick() {
      const cur = lines[li]; el.textContent = cur.slice(0, ci);
      if (!del && ci < cur.length) ci++;
      else if (!del) { del = true; setTimeout(tick, 1700); return; }
      else if (ci > 0) ci--;
      else { del = false; li = (li + 1) % lines.length; }
      setTimeout(tick, del ? 28 : 52);
    })();
  })();

  /* ============================================================
     Carousel + riddles + per-image song
     ============================================================ */
  const yt = (q) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  const SLIDES = [
    { img: "c1", cap: "sunny & unbothered", song: ["Put Your Records On", "Corinne Bailey Rae"],
      q: "Perched on her head, useless up there — I block the sun only when she remembers. What am I?", a: "→ Sunglasses (currently working as a hairband)." },
    { img: "c2", cap: "highlighter energy", song: ["Sofia", "Clairo"],
      q: "So bright I could guide planes in to land. Officially a top, unofficially a safety vest. My colour?", a: "→ Neon green." },
    { img: "c3", cap: "monument mode", song: ["Kesariya", "Arijit Singh"],
      q: "Someone spent 20 years and a fortune building me — and I STILL ended up as her photo backdrop. Name me.", a: "→ The Taj Mahal." },
    { img: "c4", cap: "certified chaos", song: ["Husn", "Anuv Jain"],
      q: "Blue on one palm, yellow on the other. Mix us and you get the colour of her mood. Which festival?", a: "→ Holi." },
    { img: "c5", cap: "stylishly freezing", song: ["The Night We Met", "Lord Huron"],
      q: "One cream shawl, two red sleeves, an entire mountain range as set design. Where's she posing?", a: "→ Up in the hills." },
    { img: "c6", cap: "peak main-character", song: ["Ophelia", "The Lumineers"],
      q: "One arm does all the work holding the phone; a whole valley photobombs. What's the crime scene?", a: "→ A hilltop selfie." },
    { img: "c7", cap: "shampoo-ad moment", song: ["Lover", "Taylor Swift"],
      q: "Same teal shirt, hand sweeping through the hair like a slow-mo commercial. The vibe?", a: "→ Main-character energy, obviously." },
    { img: "c8", cap: "tis the season", song: ["Sweater Weather", "The Neighbourhood"],
      q: "Baubles, skyscrapers, and a sweater fluffier than the tree beside her. What season is it?", a: "→ Christmas." },
    { img: "c9", cap: "blue-city aesthetic", song: ["cold/mess", "Prateek Kuhad"],
      q: "Two smiley flowerpots judge me; one blue door is older than her entire playlist. Which aesthetic?", a: "→ The blue-doorway, Rajasthan look." },
  ];
  (function reel() {
    const track = $("#reelTrack"); if (!track) return;
    SLIDES.forEach((s, i) => {
      const el = document.createElement("div");
      el.className = "slide";
      el.innerHTML = `
        <div class="slide__media"><img src="assets/carousel/${s.img}.jpg" alt="Khushi" loading="lazy"></div>
        <div class="slide__panel">
          <span class="slide__idx">frame ${String(i + 1).padStart(2, "0")} / ${SLIDES.length} · ${s.cap}</span>
          <p class="riddle__q"><span class="mono">// riddle</span>${s.q}</p>
          <p class="riddle__a">${s.a}</p>
          <div class="slide__actions">
            <button class="chip chip--reveal">reveal answer</button>
            <button class="chip chip--song" data-yt="${s.song[1]} ${s.song[0]}">♪ its song · ${s.song[0]}</button>
          </div>
        </div>`;
      track.appendChild(el);
    });

    const slides = $$(".slide", track);
    const dotsWrap = $("#reelDots");
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", () => go(i));
      dotsWrap.appendChild(b);
    });
    const dots = $$("button", dotsWrap);
    let idx = 0, timer;
    function render() {
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }
    function go(i) { idx = (i + slides.length) % slides.length; render(); resetAuto(); }
    function next() { go(idx + 1); } function prev() { go(idx - 1); }
    $("#reelNext").addEventListener("click", next);
    $("#reelPrev").addEventListener("click", prev);

    // reveal + song (event delegation) — each song opens on YouTube
    track.addEventListener("click", (e) => {
      const rev = e.target.closest(".chip--reveal");
      const song = e.target.closest(".chip--song");
      if (rev) {
        const a = rev.closest(".slide__panel").querySelector(".riddle__a");
        const open = a.classList.toggle("show");
        rev.textContent = open ? "hide answer" : "reveal answer";
      }
      if (song) {
        window.open(yt(song.dataset.yt), "_blank", "noopener");
        toast("Opening “" + song.dataset.yt + "” on YouTube ♪");
      }
    });

    // swipe
    let x0 = null;
    const vp = $(".reel__viewport");
    vp.addEventListener("pointerdown", e => { x0 = e.clientX; });
    vp.addEventListener("pointerup", e => {
      if (x0 === null) return; const dx = e.clientX - x0;
      if (Math.abs(dx) > 45) (dx < 0 ? next : prev)(); x0 = null;
    });

    function resetAuto() { clearInterval(timer); if (!reduce) timer = setInterval(next, 6500); }
    render(); resetAuto();
    $("#reel").addEventListener("mouseenter", () => clearInterval(timer));
    $("#reel").addEventListener("mouseleave", resetAuto);
  })();

  /* ============================================================
     Wish-bot (geeky terminal)
     ============================================================ */
  (function bot() {
    const out = $("#botOut"), robot = $("#robot"), btn = $("#botBtn"); if (!out) return;
    const WISHES = [
      `$ sudo wish --user=khushi --happiness=MAX\n> permission granted ✔\n> Happy Birthday, ${NAME}! 🎂`,
      `> Loading birthday.protocol...\n> 01001000 01000010 = "HB"\n> decoded: Happy Birthday, ${NAME}!`,
      `$ ./celebrate.sh\n> deploying confetti... done\n> ${NAME}.exe is now +1 year and 100% iconic.`,
      `> WARNING: cuteness overflow at line ${NAME}\n> unable to handle. throwing a party instead. 🎉`,
      `$ git commit -m "another great year"\n> [main ✨] happy birthday ${NAME}\n> 365 files changed, all for the better.`,
      `> AI verdict after 1e9 computations:\n> you are, statistically, the best. Happy Birthday! 💫`,
    ];
    let qi = 0, typing = false;
    function type(txt) {
      if (typing) return; typing = true; out.textContent = ""; robot.classList.add("speaking");
      let i = 0;
      (function step() {
        out.textContent = txt.slice(0, i++);
        if (i <= txt.length) setTimeout(step, 22);
        else { typing = false; robot.classList.remove("speaking"); }
      })();
    }
    btn.addEventListener("click", () => { type(WISHES[qi % WISHES.length]); qi++; });
    // first run when scrolled into view
    const io = new IntersectionObserver((es) => es.forEach(e => {
      if (e.isIntersecting) { type(WISHES[0]); qi = 1; io.disconnect(); }
    }), { threshold: .4 });
    io.observe($("#bot"));
  })();

  /* ============================================================
     Quotes
     ============================================================ */
  (function quotes() {
    const q = $("#quoteText"), by = $("#quoteBy"), btn = $("#quoteBtn"); if (!q) return;
    const Q = [
      ["Count your age by friends, not years. Count your life by smiles, not tears.", "John Lennon"],
      ["The more you praise and celebrate your life, the more there is in life to celebrate.", "Oprah Winfrey"],
      ["Do not count the candles; see the lights they give. Celebrate the moments that made you live.", "Anonymous"],
      ["And in the end, it's not the years in your life that count. It's the life in your years.", "Abraham Lincoln"],
      ["We do not remember days, we remember moments.", "Cesare Pavese"],
      ["To live would be an awfully big adventure — so go have one this year.", "J.M. Barrie"],
    ];
    let i = 0, timer;
    function show(n) {
      i = (n + Q.length) % Q.length;
      q.style.opacity = 0; by.style.opacity = 0;
      setTimeout(() => { q.textContent = Q[i][0]; by.textContent = "— " + Q[i][1]; q.style.opacity = 1; by.style.opacity = 1; }, 320);
    }
    function auto() { clearInterval(timer); if (!reduce) timer = setInterval(() => show(i + 1), 7000); }
    btn.addEventListener("click", () => { show(i + 1); auto(); });
    show(0); auto();
  })();

  /* ---- video fallback message ---- */
  (function video() {
    const v = $("#bdayVideo"), fb = $("#videoFallback"); if (!v) return;
    v.addEventListener("loadeddata", () => { fb.style.display = "none"; });
    v.addEventListener("error", () => { fb.style.display = "block"; }, true);
  })();

  /* ---- candle wish ---- */
  const cake = $("#cake"), cakeMsg = $("#cakeMsg");
  function blow() {
    if (cake.classList.contains("out")) return;
    cake.classList.add("out");
    cakeMsg.textContent = "Wish made. It's already on its way.";
    celebrate();
  }
  cake?.addEventListener("click", blow);
  cake?.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blow(); } });

  /* ---- reveal on scroll ---- */
  const io = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));

  /* ---- 3D tilt (fine pointers only) ---- */
  if (!reduce && matchMedia("(hover:hover)").matches) {
    $$(".tilt").forEach(el => {
      el.addEventListener("mousemove", ev => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(800px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---- drawer ---- */
  const drawer = $("#drawer"), scrim = $("#scrim");
  function openDrawer(o) { drawer.classList.toggle("open", o); scrim.classList.toggle("show", o); drawer.setAttribute("aria-hidden", !o); }
  $("#drawerBtn").addEventListener("click", () => openDrawer(true));
  $("#drawerClose").addEventListener("click", () => openDrawer(false));
  scrim.addEventListener("click", () => openDrawer(false));
  addEventListener("keydown", e => { if (e.key === "Escape") openDrawer(false); });

  /* ---- music toggle ---- */
  (function music() {
    const btn = $("#musicBtn"), bgm = $("#bgm"); let on = false;
    btn.addEventListener("click", async () => {
      if (!on) {
        try { await bgm.play(); on = true; btn.classList.add("playing"); }
        catch { toast("Add a song at assets/song.mp3 to play music ♪"); }
      } else { bgm.pause(); on = false; btn.classList.remove("playing"); }
    });
  })();

  /* ---- misc buttons ---- */
  $("#finaleBtn").addEventListener("click", celebrate);

  /* ============================================================
     Speech (AI voices)
     ============================================================ */
  const synth = window.speechSynthesis;
  let voices = [];
  function loadVoices() { voices = synth ? synth.getVoices() : []; }
  if (synth) { loadVoices(); synth.addEventListener?.("voiceschanged", loadVoices); }
  function pickVoice(hint) {
    if (!voices.length) loadVoices();
    if (!voices.length || !hint) return null;
    hint = hint.toLowerCase();
    return voices.find(v => v.name.toLowerCase().includes(hint) || v.lang.toLowerCase().includes(hint)) || null;
  }
  function say(text, o = {}) {
    if (!synth) { toast("Your browser can't speak — try Chrome or Safari 🔊"); o.onend && o.onend(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = o.rate || 1; u.pitch = o.pitch || 1;
    const v = pickVoice(o.voiceHint); if (v) u.voice = v;
    if (o.onstart) u.onstart = o.onstart;
    if (o.onend) u.onend = o.onend;
    synth.speak(u);
  }

  /* ---- red carpet walk ---- */
  (function carpet() {
    const btn = $("#walkBtn"), flash = $("#flash"), cap = $("#carpetCaption"), star = $(".carpet__star");
    if (!btn) return;
    let busy = false;
    btn.addEventListener("click", () => {
      if (busy) return; busy = true;
      cap.textContent = "✦ Make way — Khushi is walking ✦";
      star && star.classList.add("walking");
      say("Make way! Khushi has arrived on the red carpet!", { rate: .95, pitch: 1.05, voiceHint: "en-gb" });
      let n = 0;
      (function pop() {
        if (n++ >= 9) {
          flash.style.opacity = 0; celebrate();
          setTimeout(() => { star && star.classList.remove("walking"); cap.textContent = "Khushi Jain owns this carpet 👑"; busy = false; }, 600);
          return;
        }
        flash.style.opacity = .9;
        setTimeout(() => { flash.style.opacity = 0; setTimeout(pop, 90 + Math.random() * 130); }, 55);
      })();
    });
  })();

  /* ---- star wishes (AI voices) ---- */
  (function stars() {
    const grid = $("#starsGrid"), cap = $("#wishCaption"); if (!grid) return;
    const PERSONAS = [
      { av: "🎬", name: "The Narrator", tag: "award-show host", rate: .86, pitch: .7, hint: "en-gb", line: "Ladies and gentlemen, presenting the one, the only — Khushi. Happy birthday, superstar!" },
      { av: "🎧", name: "DJ Pixel", tag: "hype machine", rate: 1.2, pitch: 1.4, hint: "en-us", line: "Yo yo yo! Big birthday shout-out to Khushi! Turn it all the way up, let's go!" },
      { av: "👑", name: "Lady Seraphina", tag: "royal court", rate: .9, pitch: 1.3, hint: "female", line: "Happiest of birthdays, Your Highness Khushi. May your year be nothing short of golden." },
      { av: "🤖", name: "Robo-9000", tag: "birthday subroutine", rate: .88, pitch: .5, hint: "male", line: "Beep. Boop. Birthday protocol executed. Happy birthday, Khushi. You are one hundred percent iconic." },
      { av: "🍰", name: "Chef Antoine", tag: "patisserie", rate: .95, pitch: 1.1, hint: "fr", line: "Today, we prepare zee finest dish — a very happy birthday, for mademoiselle Khushi!" },
      { av: "🪄", name: "The Poet", tag: "soft words", rate: .82, pitch: 1.0, hint: "en-in", line: "Roses are red, the spotlight is you. Happy birthday Khushi — the whole world cheers too." },
    ];
    PERSONAS.forEach(p => {
      const el = document.createElement("button");
      el.className = "starcard";
      el.innerHTML = `<span class="starcard__av">${p.av}</span><span class="starcard__name">${p.name}</span><span class="starcard__tag">${p.tag}</span><span class="starcard__play">▶ play</span>`;
      el.addEventListener("click", () => { synth && synth.cancel(); speak(p, el); });
      grid.appendChild(el);
    });
    const cards = $$(".starcard", grid);
    function speak(p, el, then) {
      cap.textContent = `${p.name}: “${p.line}”`;
      el && el.classList.add("speaking");
      if (!reduce) confetti.burst(45, innerWidth / 2, innerHeight * .42);
      say(p.line, { rate: p.rate, pitch: p.pitch, voiceHint: p.hint, onend: () => {
        el && el.classList.remove("speaking");
        if (then) then();
        else setTimeout(() => { if (cap.textContent.startsWith(p.name)) cap.textContent = ""; }, 1400);
      }});
    }
    $("#playAllWishes").addEventListener("click", () => {
      synth && synth.cancel(); let i = 0;
      (function next() {
        if (i >= PERSONAS.length) { cap.textContent = "🎉 That's a wrap — happy birthday, Khushi!"; celebrate(); return; }
        speak(PERSONAS[i], cards[i], () => { i++; setTimeout(next, 350); });
      })();
    });
  })();

  /* ---- mix shuffle ---- */
  (function mix() {
    const b = $("#shuffleBtn"); if (!b) return;
    b.addEventListener("click", () => {
      const t = $$("#mix .track"); if (!t.length) return;
      const pick = t[(Math.random() * t.length) | 0];
      window.open(pick.href, "_blank", "noopener");
      toast("🎲 " + pick.dataset.title + " — enjoy!");
    });
  })();

  /* ---- back to top ---- */
  const toTop = $("#toTop");
  addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > innerHeight * .9), { passive: true });
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
})();
