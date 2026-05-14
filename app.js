/* =====================================================================
   C Mastery — main app script
   - Builds the curriculum (lessons + problems + projects) into the sidebar
   - Renders rich lesson content blocks
   - Tracks per-item completion in localStorage
   - Provides a code playground that compiles+runs C via Piston (free, no key)
   ===================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. CURRICULUM STRUCTURE
     We turn the LESSONS / PROBLEMS / PROJECTS data into a unified list
     of "items" that the sidebar can render and the user can navigate.
     ------------------------------------------------------------------ */
  const SECTIONS = [
    {
      title: "Mindset & Methodology",
      items: filterLessons(["mindset-1", "mindset-2"])
    },
    {
      title: "1. Foundations",
      items: filterLessons(["found-1", "found-2", "found-3", "found-4"])
    },
    {
      title: "2. Control Flow",
      items: filterLessons(["ctrl-1", "ctrl-2", "ctrl-3"])
    },
    {
      title: "3. Functions",
      items: filterLessons(["func-1"])
    },
    {
      title: "4. Arrays & Strings",
      items: filterLessons(["arr-1", "arr-2"])
    },
    {
      title: "5. Pointers",
      items: filterLessons(["ptr-1", "ptr-2"])
    },
    {
      title: "6. Structs",
      items: filterLessons(["struct-1"])
    },
    {
      title: "7. File I/O",
      items: filterLessons(["file-1"])
    },
    {
      title: "8. Dynamic Memory",
      items: filterLessons(["mem-1"])
    },
    {
      title: "9. Debug & Exam Strategy",
      items: filterLessons(["debug-1", "exam-1"])
    },
    {
      title: "Practice Problems",
      items: [{
        kind: "problems",
        id: "all-problems",
        title: "25 Problems (graded)",
        section: "Practice"
      }]
    },
    {
      title: "Guided Projects",
      items: window.PROJECTS.map(p => ({
        kind: "project",
        id: p.id,
        title: p.title,
        section: "Projects",
        data: p
      }))
    }
  ];

  function filterLessons(ids) {
    return ids.map(id => {
      const l = window.LESSONS.find(x => x.id === id);
      return { kind: "lesson", id: l.id, title: l.title, section: "Lessons", data: l };
    });
  }

  // Flat list for prev/next navigation
  const FLAT = SECTIONS.flatMap(s => s.items.map(it => ({ ...it, sectionTitle: s.title })));

  /* ------------------------------------------------------------------
     2. PROGRESS TRACKING (localStorage)
     ------------------------------------------------------------------ */
  const STORAGE_KEY = "c-mastery-progress-v1";
  const THEME_KEY   = "c-mastery-theme";

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }
  function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
  let progress = loadProgress();

  function isDone(id) { return !!progress[id]; }
  function setDone(id, val) {
    if (val) progress[id] = true;
    else delete progress[id];
    saveProgress(progress);
    refreshProgress();
    renderNav();
  }
  function refreshProgress() {
    const trackable = FLAT.filter(it => it.kind !== "problems");
    const done = trackable.filter(it => isDone(it.id)).length;
    const pct = trackable.length === 0 ? 0 : Math.round(done / trackable.length * 100);
    document.getElementById("progress-pct").textContent = pct + "%";
    document.getElementById("progress-fill").style.width = pct + "%";
  }

  /* ------------------------------------------------------------------
     3. SIDEBAR / NAVIGATION
     ------------------------------------------------------------------ */
  const navEl    = document.getElementById("nav");
  const crumbEl  = document.getElementById("crumb");
  const contentEl= document.getElementById("content");
  const sidebar  = document.getElementById("sidebar");

  let currentId = null;

  function renderNav() {
    navEl.innerHTML = "";
    SECTIONS.forEach(section => {
      const wrap = document.createElement("div");
      wrap.className = "nav-section";
      const title = document.createElement("div");
      title.className = "nav-section-title";
      title.textContent = section.title;
      wrap.appendChild(title);

      section.items.forEach(item => {
        const el = document.createElement("div");
        el.className = "nav-item" + (currentId === item.id ? " active" : "") + (isDone(item.id) ? " done" : "");
        const check = document.createElement("span");
        check.className = "check";
        check.textContent = isDone(item.id) ? "✓" : "";
        const t = document.createElement("span");
        t.textContent = item.title;
        el.appendChild(check);
        el.appendChild(t);
        el.addEventListener("click", () => {
          openItem(item.id);
          if (window.innerWidth <= 900) sidebar.classList.remove("open");
        });
        wrap.appendChild(el);
      });
      navEl.appendChild(wrap);
    });
  }

  function openItem(id) {
    const item = FLAT.find(x => x.id === id);
    if (!item) return;
    currentId = id;
    crumbEl.innerHTML = `${item.sectionTitle} <span style="opacity:.5;margin:0 6px">›</span> <b>${escapeHtml(item.title)}</b>`;
    if (item.kind === "lesson")     renderLesson(item.data);
    else if (item.kind === "problems") renderProblems();
    else if (item.kind === "project")  renderProject(item.data);
    renderNav();
    contentEl.scrollTop = 0;
    document.getElementById("mark-done-btn").textContent = isDone(id) ? "Marked as done ✓" : "Mark as done";
  }

  /* ------------------------------------------------------------------
     4. RENDERING — lessons, problems, projects
     ------------------------------------------------------------------ */
  function renderLesson(lesson) {
    const wrap = document.createElement("div");
    wrap.className = "lesson";
    wrap.innerHTML = `
      <h1>${escapeHtml(lesson.title)}</h1>
      <div class="subtitle">${escapeHtml(lesson.subtitle || "")}</div>
    `;
    lesson.blocks.forEach(b => wrap.appendChild(renderBlock(b, lesson.starter)));

    if (lesson.starter) {
      const tryBtn = document.createElement("button");
      tryBtn.className = "primary-btn";
      tryBtn.style.marginTop = "16px";
      tryBtn.textContent = "Open this lesson's example in the Playground →";
      tryBtn.onclick = () => openPlayground(lesson.starter);
      wrap.appendChild(tryBtn);
    }
    contentEl.innerHTML = "";
    contentEl.appendChild(wrap);
  }

  function renderProblems() {
    const wrap = document.createElement("div");
    wrap.className = "lesson";
    wrap.innerHTML = `
      <h1>25 Practice Problems</h1>
      <div class="subtitle">Struggle for 10+ minutes before opening "Show solution". That struggle IS the learning.</div>
    `;
    const groups = { easy: [], medium: [], hard: [] };
    window.PROBLEMS.forEach(p => groups[p.difficulty].push(p));

    [["easy", "Easy"], ["medium", "Medium"], ["hard", "Hard"]].forEach(([key, label]) => {
      const h = document.createElement("h2");
      h.textContent = label;
      wrap.appendChild(h);
      groups[key].forEach(p => wrap.appendChild(renderProblemCard(p)));
    });
    contentEl.innerHTML = "";
    contentEl.appendChild(wrap);
  }

  function renderProblemCard(p) {
    const card = document.createElement("div");
    card.className = "problem-card";
    const diffClass = p.difficulty === "easy" ? "diff-easy" : p.difficulty === "medium" ? "diff-med" : "diff-hard";
    card.innerHTML = `
      <span class="difficulty ${diffClass}">${p.difficulty}</span>
      <h3 style="margin:4px 0 6px">${escapeHtml(p.title)} <span style="color:var(--text-mute);font-weight:400;font-size:13px">— ${escapeHtml(p.module)}</span></h3>
      <p>${escapeHtml(p.statement)}</p>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="primary-btn" data-act="try">Open in Playground</button>
        <button class="ghost-btn" data-act="hint">Show hint</button>
      </div>
      <details><summary>Show solution</summary></details>
    `;
    card.querySelector('[data-act="try"]').onclick = () =>
      openPlayground(`#include <stdio.h>\n\n// ${p.title}\n// ${p.statement}\n\nint main(void) {\n    // your code here\n    return 0;\n}\n`);
    card.querySelector('[data-act="hint"]').onclick = (e) => {
      const span = document.createElement("div");
      span.className = "callout tip";
      span.style.marginTop = "8px";
      span.innerHTML = `<span class="label">Hint</span>${escapeHtml(p.hint)}`;
      e.target.replaceWith(span);
    };
    const details = card.querySelector("details");
    details.addEventListener("toggle", () => {
      if (details.open && !details.dataset.loaded) {
        details.dataset.loaded = "1";
        details.appendChild(renderBlock({ type: "code", lang: "c", code: p.solution }, p.solution));
      }
    });
    return card;
  }

  function renderProject(proj) {
    const wrap = document.createElement("div");
    wrap.className = "lesson";
    wrap.innerHTML = `
      <h1>${escapeHtml(proj.title)}</h1>
      <div class="subtitle">${escapeHtml(proj.summary)}</div>
    `;
    const stageNav = document.createElement("div");
    stageNav.className = "stage-nav";
    proj.stages.forEach((s, i) => {
      const pill = document.createElement("div");
      pill.className = "stage-pill" + (i === 0 ? " active" : "");
      pill.textContent = `Stage ${i + 1}`;
      pill.title = s.title;
      pill.onclick = () => {
        [...stageNav.children].forEach(c => c.classList.remove("active"));
        pill.classList.add("active");
        showStage(i);
      };
      stageNav.appendChild(pill);
    });
    wrap.appendChild(stageNav);

    const stageBox = document.createElement("div");
    wrap.appendChild(stageBox);

    function showStage(i) {
      stageBox.innerHTML = "";
      const s = proj.stages[i];
      const h = document.createElement("h2");
      h.textContent = s.title;
      stageBox.appendChild(h);
      s.blocks.forEach(b => stageBox.appendChild(renderBlock(b, s.starter)));
      if (s.starter) {
        const btn = document.createElement("button");
        btn.className = "primary-btn";
        btn.style.marginTop = "12px";
        btn.textContent = "Load this stage into the Playground →";
        btn.onclick = () => openPlayground(s.starter);
        stageBox.appendChild(btn);
      }
    }
    showStage(0);

    contentEl.innerHTML = "";
    contentEl.appendChild(wrap);
  }

  /* ------------------------------------------------------------------
     5. BLOCK RENDERER — converts lesson "blocks" into DOM
     ------------------------------------------------------------------ */
  function renderBlock(b, starterCode) {
    let el;
    switch (b.type) {
      case "p": {
        el = document.createElement("p");
        el.innerHTML = b.text;     // already trusted curated content
        break;
      }
      case "h2": {
        el = document.createElement("h2");
        el.textContent = b.text;
        break;
      }
      case "h3": {
        el = document.createElement("h3");
        el.textContent = b.text;
        break;
      }
      case "list": {
        el = document.createElement("ul");
        b.items.forEach(it => {
          const li = document.createElement("li");
          li.innerHTML = it;
          el.appendChild(li);
        });
        break;
      }
      case "ol": {
        el = document.createElement("ol");
        b.items.forEach(it => {
          const li = document.createElement("li");
          li.innerHTML = it;
          el.appendChild(li);
        });
        break;
      }
      case "callout": {
        el = document.createElement("div");
        el.className = "callout " + (b.style || "");
        el.innerHTML = `<span class="label">${escapeHtml(b.title || "Note")}</span>${b.text}`;
        break;
      }
      case "code": {
        el = document.createElement("div");
        el.className = "code-block";
        const head = document.createElement("div");
        head.className = "code-head";
        head.innerHTML = `<span class="lang">${b.lang || "c"}</span>`;
        const tryBtn = document.createElement("button");
        tryBtn.className = "try-btn";
        tryBtn.textContent = "Try it ▶";
        tryBtn.onclick = () => openPlayground(b.code);
        head.appendChild(tryBtn);
        el.appendChild(head);
        const pre = document.createElement("pre");
        pre.innerHTML = highlightC(b.code);
        el.appendChild(pre);
        break;
      }
      case "checklist": {
        el = document.createElement("ul");
        el.className = "checklist";
        b.items.forEach(it => {
          const li = document.createElement("li");
          li.innerHTML = `<span class="box">✓</span><span>${it}</span>`;
          li.onclick = () => li.classList.toggle("checked");
          el.appendChild(li);
        });
        break;
      }
      default:
        el = document.createElement("div");
        el.textContent = JSON.stringify(b);
    }
    return el;
  }

  /* ------------------------------------------------------------------
     6. C SYNTAX HIGHLIGHTING (small, hand-rolled)
     ------------------------------------------------------------------ */
  function highlightC(src) {
    const KW = new Set([
      "auto","break","case","char","const","continue","default","do","double","else",
      "enum","extern","float","for","goto","if","int","long","register","return","short",
      "signed","sizeof","static","struct","switch","typedef","union","unsigned","void",
      "volatile","while","NULL","true","false","bool"
    ]);
    let out = "";
    let i = 0;
    while (i < src.length) {
      const ch = src[i];

      // line comment //
      if (ch === "/" && src[i + 1] === "/") {
        let j = src.indexOf("\n", i);
        if (j < 0) j = src.length;
        out += `<span class="tok-com">${escapeHtml(src.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      // block comment /* */
      if (ch === "/" && src[i + 1] === "*") {
        let j = src.indexOf("*/", i + 2);
        if (j < 0) j = src.length; else j += 2;
        out += `<span class="tok-com">${escapeHtml(src.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      // preprocessor (line starting with #)
      if (ch === "#" && (i === 0 || src[i - 1] === "\n")) {
        let j = src.indexOf("\n", i);
        if (j < 0) j = src.length;
        out += `<span class="tok-pre">${escapeHtml(src.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      // string "..."
      if (ch === '"') {
        let j = i + 1;
        while (j < src.length && !(src[j] === '"' && src[j - 1] !== "\\")) j++;
        j++;
        out += `<span class="tok-str">${escapeHtml(src.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      // char '...'
      if (ch === "'") {
        let j = i + 1;
        while (j < src.length && !(src[j] === "'" && src[j - 1] !== "\\")) j++;
        j++;
        out += `<span class="tok-str">${escapeHtml(src.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      // number
      if (/[0-9]/.test(ch)) {
        let j = i;
        while (j < src.length && /[0-9.xXa-fA-F]/.test(src[j])) j++;
        out += `<span class="tok-num">${escapeHtml(src.slice(i, j))}</span>`;
        i = j;
        continue;
      }
      // identifier / keyword
      if (/[A-Za-z_]/.test(ch)) {
        let j = i;
        while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
        const word = src.slice(i, j);
        if (KW.has(word)) {
          out += `<span class="tok-kw">${escapeHtml(word)}</span>`;
        } else if (src[j] === "(") {
          out += `<span class="tok-fn">${escapeHtml(word)}</span>`;
        } else {
          out += escapeHtml(word);
        }
        i = j;
        continue;
      }
      out += escapeHtml(ch);
      i++;
    }
    return out;
  }

  /* ------------------------------------------------------------------
     7. PLAYGROUND — CodeMirror editor + Piston compile/run
     ------------------------------------------------------------------ */
  let editor = null;
  const playground   = document.getElementById("playground");
  const editorEl     = document.getElementById("editor");
  const stdinEl      = document.getElementById("stdin");
  const outputEl     = document.getElementById("output");
  const runBtn       = document.getElementById("run-btn");
  const closeBtn     = document.getElementById("close-playground");
  const playgroundBtn= document.getElementById("playground-btn");
  const copyBtn      = document.getElementById("copy-btn");
  const resetCodeBtn = document.getElementById("reset-code-btn");
  const externalBtn  = document.getElementById("open-external-btn");

  const DEFAULT_CODE = `#include <stdio.h>

int main(void) {
    printf("Hello, C Mastery!\\n");
    return 0;
}
`;

  function ensureEditor() {
    if (editor) return;
    editor = CodeMirror.fromTextArea(editorEl, {
      mode: "text/x-csrc",
      theme: "dracula",
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      autoCloseBrackets: true,
      matchBrackets: true,
      lineWrapping: false
    });
    editor.setValue(DEFAULT_CODE);
  }

  let lastLoaded = DEFAULT_CODE;
  function openPlayground(code) {
    playground.classList.remove("hidden");
    setTimeout(() => {
      ensureEditor();
      const c = code || lastLoaded || DEFAULT_CODE;
      editor.setValue(c);
      lastLoaded = c;
      editor.refresh();
      editor.focus();
    }, 50);
  }
  function closePlayground() { playground.classList.add("hidden"); }

  playgroundBtn.onclick = () => openPlayground(lastLoaded);
  closeBtn.onclick = closePlayground;
  playground.addEventListener("click", (e) => { if (e.target === playground) closePlayground(); });
  copyBtn.onclick = async () => {
    try { await navigator.clipboard.writeText(editor.getValue()); flash(copyBtn, "Copied ✓"); }
    catch { flash(copyBtn, "Copy failed"); }
  };
  resetCodeBtn.onclick = () => editor.setValue(lastLoaded);

  externalBtn.onclick = async () => {
    const code = editor.getValue();
    try { await navigator.clipboard.writeText(code); } catch {}
    flash(externalBtn, "Copied — paste in tab ✓");
    window.open("https://www.onlinegdb.com/online_c_compiler", "_blank", "noopener,noreferrer");
  };

  function flash(btn, msg) {
    const orig = btn.textContent;
    btn.textContent = msg;
    setTimeout(() => { btn.textContent = orig; }, 1200);
  }

  // ---- Compile & Run via Piston (https://github.com/engineer-man/piston) ----
  // Public endpoint. No API key. Rate-limited but fine for learning.
  async function runCode() {
    const code = editor.getValue();
    const stdin = stdinEl.value;
    outputEl.className = "";
    outputEl.innerHTML = `<span class="spinner"></span> Compiling and running...`;
    try {
      const resp = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "c",
          version: "10.2.0",
          files: [{ name: "main.c", content: code }],
          stdin: stdin
        })
      });
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      const data = await resp.json();

      let out = "";
      const compile = data.compile || {};
      const run     = data.run     || {};

      if (compile.stderr && compile.stderr.trim()) {
        out += "[Compile errors]\n" + compile.stderr + "\n";
      }
      if (run.stdout) out += run.stdout;
      if (run.stderr && run.stderr.trim()) out += "\n[Runtime stderr]\n" + run.stderr;
      if (!out.trim()) out = "(program produced no output)";

      const failed = (compile.code && compile.code !== 0) || (run.code && run.code !== 0);
      outputEl.className = failed ? "error" : "success";
      outputEl.textContent = out;
    } catch (e) {
      outputEl.className = "error";
      outputEl.textContent =
        "Could not reach the in-browser C compiler (emkc.org/Piston).\n" +
        "This usually means your network is blocking it, or you're running offline.\n\n" +
        "Click the \"Open in OnlineGDB ↗\" button above — your code is copied to clipboard,\n" +
        "OnlineGDB opens in a new tab, paste with Ctrl+V and hit Run. Same result.\n\n" +
        "(Technical: " + e.message + ")";
    }
  }
  runBtn.onclick = runCode;

  /* ------------------------------------------------------------------
     8. THEME + RESET + KEYBOARD
     ------------------------------------------------------------------ */
  const themeBtn = document.getElementById("theme-toggle");
  function applyTheme(t) {
    if (t === "light") {
      document.body.setAttribute("data-theme", "light");
      themeBtn.textContent = "☀";
    } else {
      document.body.removeAttribute("data-theme");
      themeBtn.textContent = "🌙";
    }
  }
  applyTheme(localStorage.getItem(THEME_KEY) || "dark");
  themeBtn.onclick = () => {
    const cur = localStorage.getItem(THEME_KEY) || "dark";
    const nxt = cur === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nxt);
    applyTheme(nxt);
  };

  document.getElementById("reset-btn").onclick = () => {
    if (confirm("Clear all progress?")) {
      progress = {};
      saveProgress(progress);
      refreshProgress();
      renderNav();
    }
  };

  document.getElementById("menu-toggle").onclick = () => sidebar.classList.toggle("open");

  // Prev / Next
  document.getElementById("prev-btn").onclick = () => {
    const idx = FLAT.findIndex(x => x.id === currentId);
    if (idx > 0) openItem(FLAT[idx - 1].id);
  };
  document.getElementById("next-btn").onclick = () => {
    const idx = FLAT.findIndex(x => x.id === currentId);
    if (idx >= 0 && idx < FLAT.length - 1) openItem(FLAT[idx + 1].id);
  };
  document.getElementById("mark-done-btn").onclick = () => {
    setDone(currentId, !isDone(currentId));
    document.getElementById("mark-done-btn").textContent = isDone(currentId) ? "Marked as done ✓" : "Mark as done";
  };

  // Keyboard: Ctrl+Enter in editor runs the code
  document.addEventListener("keydown", (e) => {
    if (!playground.classList.contains("hidden")) {
      if (e.key === "Escape") closePlayground();
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); runCode(); }
    }
  });

  /* ------------------------------------------------------------------
     9. UTILITIES
     ------------------------------------------------------------------ */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
    }[c]));
  }

  /* ------------------------------------------------------------------
     10. BOOT
     ------------------------------------------------------------------ */
  renderNav();
  refreshProgress();
  // Open the first lesson by default
  openItem(FLAT[0].id);

  /* ------------------------------------------------------------------
     11. SERVICE WORKER — turns the app into an installable PWA
     ------------------------------------------------------------------ */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      // Use a relative path so it works on file://, localhost, and GitHub Pages alike.
      navigator.serviceWorker
        .register("sw.js")
        .catch((err) => console.warn("Service worker registration failed:", err));
    });
  }
})();
