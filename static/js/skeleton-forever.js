(function () {
  // 只对这一篇文章生效：把 slug 改成你的文章路径片段
  // 例如文章 URL 是 /posts/my-broken-post/ 就写 "/posts/my-broken-post/"
  const TARGET = "posts/my-time";
  if (!location.pathname.includes(TARGET)) return;

  // 创建遮罩层
  const overlay = document.createElement("div");
  overlay.id = "skeleton-loading-overlay";
  overlay.setAttribute("aria-busy", "true");
  overlay.innerHTML = `
    <div class="sk-wrap">
      <div class="sk-title sk"></div>
      <div class="sk-meta sk"></div>

      <div class="sk-block">
        <div class="sk-line sk w95"></div>
        <div class="sk-line sk w88"></div>
        <div class="sk-line sk w92"></div>
        <div class="sk-line sk w80"></div>
      </div>

      <div class="sk-block">
        <div class="sk-line sk w90"></div>
        <div class="sk-line sk w96"></div>
        <div class="sk-line sk w84"></div>
        <div class="sk-line sk w70"></div>
      </div>

      <div class="sk-img sk"></div>

      <div class="sk-block">
        <div class="sk-line sk w93"></div>
        <div class="sk-line sk w87"></div>
        <div class="sk-line sk w91"></div>
        <div class="sk-line sk w76"></div>
      </div>

      <div class="sk-hint">Loading…</div>
    </div>
  `;

  // 注入样式
  const style = document.createElement("style");
  style.textContent = `
    #skeleton-loading-overlay{
      position:fixed; inset:0; z-index:2147483647;
      background:rgba(255,255,255,0.98);
      display:flex; align-items:center; justify-content:center;
      padding:24px;
    }
    .sk-wrap{
      width:min(720px, 92vw);
    }
    .sk-hint{
      margin-top:14px;
      font: 12px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Arial;
      color:#666;
      letter-spacing:0.2px;
    }

    /* skeleton base */
    .sk{
      background: #eee;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
    }
    .sk::after{
      content:"";
      position:absolute; inset:0;
      transform: translateX(-60%);
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
      animation: sk-shimmer 1.1s infinite;
    }
    @keyframes sk-shimmer{
      100% { transform: translateX(60%); }
    }

    /* blocks */
    .sk-title{ height:34px; margin: 6px 0 12px; }
    .sk-meta{ height:14px; width: 55%; margin-bottom: 22px; border-radius: 8px; }
    .sk-block{ margin: 18px 0; }
    .sk-line{ height:14px; margin: 10px 0; border-radius: 8px; }
    .sk-img{ height: 220px; margin: 18px 0; border-radius: 16px; }

    /* widths */
    .w70{ width:70%; }
    .w76{ width:76%; }
    .w80{ width:80%; }
    .w84{ width:84%; }
    .w87{ width:87%; }
    .w88{ width:88%; }
    .w90{ width:90%; }
    .w91{ width:91%; }
    .w92{ width:92%; }
    .w93{ width:93%; }
    .w95{ width:95%; }
    .w96{ width:96%; }
  `;
  document.head.appendChild(style);

  // 盖住页面（永不移除）
  document.documentElement.appendChild(overlay);

  // 可选：防止用户滚动到底下看到真实内容的“闪现”
  document.documentElement.style.overflow = "hidden";
})();
