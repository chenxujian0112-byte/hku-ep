const app = document.querySelector('#app');
const nav = document.querySelector('#site-nav');
const menuToggle = document.querySelector('.menu-toggle');

document.querySelector('#copyright-year').textContent = new Date().getFullYear();

const aliases = {
  year: ['年份', 'year'],
  date: ['标准日期', '日期', 'date'],
  source: ['来源公众号', '来源', 'source'],
  project: ['项目名称', '项目', 'project'],
  type: ['内容类型', '类型', 'contentType', 'type'],
  stage: ['项目阶段', '阶段', 'stage'],
  title: ['标题', 'title'],
  summary: ['网站简介', '简介', '摘要', 'summary', 'description'],
  tags: ['标签', 'tags'],
  url: ['URL', 'url', '链接'],
  visible: ['展示状态', '是否展示', 'visible', 'status'],
  image: ['图片', '图片路径', 'image', 'cover'],
  imageMode: ['图片样式', 'imageMode'],
};

function pick(item, keys) {
  const key = keys.find((name) => item[name] !== undefined && item[name] !== null);
  return key ? item[key] : '';
}

function normalizeArticle(item, index) {
  const rawTags = pick(item, aliases.tags);
  const date = String(pick(item, aliases.date));
  return {
    id: item.id || `${date}-${index}`,
    year: String(pick(item, aliases.year) || date.slice(0, 4)),
    date,
    source: String(pick(item, aliases.source)),
    project: String(pick(item, aliases.project)),
    type: String(pick(item, aliases.type)),
    stage: String(pick(item, aliases.stage)),
    title: String(pick(item, aliases.title)),
    summary: String(pick(item, aliases.summary)),
    tags: Array.isArray(rawTags) ? rawTags : String(rawTags || '').split(/[，,、]/).map((tag) => tag.trim()).filter(Boolean),
    url: String(pick(item, aliases.url)),
    visible: String(pick(item, aliases.visible) || '是').trim(),
    image: String(pick(item, aliases.image)),
    imageMode: String(pick(item, aliases.imageMode) || 'cover'),
  };
}

async function loadArticles() {
  const response = await fetch('/articles.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('无法读取 articles.json');
  const data = await response.json();
  const list = Array.isArray(data) ? data : (data.articles || data.data || []);
  const dateScore = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) ? Date.parse(date) : 0;
  return list.map(normalizeArticle)
    .filter((article) => ['是', 'yes', 'true', '1'].includes(article.visible.toLowerCase()))
    .sort((a, b) =>
      (Number(b.year) || 0) - (Number(a.year) || 0) ||
      dateScore(b.date) - dateScore(a.date) ||
      b.date.localeCompare(a.date, 'zh-CN') ||
      a.title.localeCompare(b.title, 'zh-CN')
    );
}

const homePage = () => `
  <div class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">Standard Chartered × NPI</p>
        <h1>Futuremakers<span>内容档案</span></h1>
        <p class="hero-lead">汇集项目传播、青年故事与实践洞察，让每一次行动留下清晰、可检索的记录。</p>
        <div class="button-row">
          <a class="button primary" href="/content" data-link>进入内容档案</a>
          <a class="button" href="/about" data-link>了解项目</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <span class="orb orb-one"></span><span class="orb orb-two"></span><span class="orb orb-three"></span>
        <div class="visual-note"><strong>让改变<br>被看见</strong><span>青年、就业、创新与社区行动的长期记录。</span></div>
      </div>
    </section>
    <section class="stats" aria-label="档案概览">
      <div class="stat"><strong>持续记录</strong><span>沉淀项目成长轨迹</span></div>
      <div class="stat"><strong>多维检索</strong><span>按年份、类型与项目浏览</span></div>
      <div class="stat"><strong>开放连接</strong><span>回到每篇内容的原始现场</span></div>
    </section>
    <section class="feature-section">
      <div class="section-heading"><h2>一份持续生长的档案</h2><p>这里不只保存发布过的文章，也保留项目如何回应议题、连接青年并形成影响力的过程。</p></div>
      <div class="feature-cards">
        <article class="feature-card"><span class="feature-number">01 / 记录</span><h3>项目进程</h3><p>从招募、培育到成果发布，按时间看见项目每一步。</p></article>
        <article class="feature-card"><span class="feature-number">02 / 看见</span><h3>青年故事</h3><p>关注参与者真实经历，以及改变如何在个人和社区中发生。</p></article>
        <article class="feature-card"><span class="feature-number">03 / 分享</span><h3>实践洞察</h3><p>整理项目经验、行业观察与可供同行参考的方法。</p></article>
      </div>
    </section>
  </div>`;

const pageHero = (eyebrow, title, subtitle, description) => `
  <section class="page-hero">
    <p class="eyebrow">${eyebrow}</p><h1>${title}</h1><h2>${subtitle}</h2><p>${description}</p>
  </section>`;

function contentPage() {
  return `<div class="page">
    ${pageHero('CONTENT ARCHIVE', '内容档案', '记录每一次行动的生长轨迹', '这里收录 Futuremakers 项目相关文章，可按年份、内容类型和项目名称筛选查看。')}
    <section class="archive-shell">
      <div class="filters" aria-label="文章筛选">
        <label class="control"><span class="sr-only">搜索标题</span><input id="search" type="search" placeholder="搜索标题关键词" /></label>
        <label class="control"><span class="sr-only">按年份筛选</span><select id="year-filter"><option value="">全部年份</option></select></label>
        <label class="control"><span class="sr-only">按内容类型筛选</span><select id="type-filter"><option value="">全部内容类型</option></select></label>
        <label class="control"><span class="sr-only">按项目名称筛选</span><select id="project-filter"><option value="">全部项目</option></select></label>
      </div>
      <div class="archive-meta"><span id="result-count">正在读取档案…</span><button class="clear-button" id="clear-filters" type="button">清除筛选</button></div>
      <div id="article-list" class="article-list"><div class="loading">正在读取 articles.json…</div></div>
    </section>
  </div>`;
}

const reviewPage = () => `<div class="page">
  ${pageHero('ANNUAL REVIEW', '年度回顾', '沿时间回看项目的成长', '以年度为线索，整理关键行动、阶段成果与值得再次阅读的项目故事。')}
  <section id="review-grid" class="review-grid"><div class="loading">正在整理年度档案…</div></section>
</div>`;

const aboutPage = () => `<div class="page">
  ${pageHero('ABOUT FUTUREMAKERS', '关于项目', '以教育、就业与创业支持青年成长', 'Futuremakers 是渣打集团推动青年经济融入的全球公益项目，恩派与合作伙伴共同支持项目在地实践。')}
  <section class="about-grid">
    <article class="about-card green"><p class="eyebrow">我们的关注</p><h3>让青年拥有创造未来的能力与机会</h3><p>围绕就业、创业与社会创新，连接资源、伙伴和真实实践场景。</p></article>
    <article class="about-card"><h3>为什么建立内容档案</h3><p>项目的价值不仅存在于结果中，也存在于每一次尝试、协作与经验分享中。这座档案希望让分散的内容重新形成脉络，让参与者、伙伴与公众更容易理解项目如何生长。</p><p>本网站收录公开发布内容，并通过标准化字段进行整理。点击文章卡片中的“阅读原文”，可前往对应发布平台查看完整内容。</p></article>
  </section>
</div>`;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function articleCard(article) {
  const detailItems = [
    article.source && `<span><strong>来源公众号：</strong>${escapeHtml(article.source)}</span>`,
    article.project && `<span><strong>项目名称：</strong>${escapeHtml(article.project)}</span>`,
    article.type && `<span><strong>内容类型：</strong>${escapeHtml(article.type)}</span>`,
    article.stage && `<span><strong>项目阶段：</strong>${escapeHtml(article.stage)}</span>`,
  ].filter(Boolean).join('');
  return `<article class="article-card${article.image ? ' has-image' : ''}">
    ${article.image ? `<img class="article-image${article.imageMode === 'contain' ? ' contain' : ''}" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}配图" loading="lazy" />` : ''}
    <div class="article-content">
      <div class="article-meta">
        ${article.year ? `<span class="pill accent">${escapeHtml(article.year)}</span>` : ''}
        ${article.date ? `<span class="pill">${escapeHtml(article.date)}</span>` : ''}
        ${article.type ? `<span class="pill">${escapeHtml(article.type)}</span>` : ''}
      </div>
      <h3>${escapeHtml(article.title || '未命名文章')}</h3>
      ${article.summary ? `<p class="article-summary">${escapeHtml(article.summary)}</p>` : ''}
      ${detailItems ? `<div class="article-details">${detailItems}</div>` : ''}
      <div class="article-bottom">
        <div class="tag-list">${article.tags.map((tag) => `<span class="pill"># ${escapeHtml(tag)}</span>`).join('')}</div>
        ${article.url ? `<a class="read-link" href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">阅读原文 →</a>` : ''}
      </div>
    </div>
  </article>`;
}

async function initArchive() {
  const listEl = document.querySelector('#article-list');
  if (!listEl) return;
  try {
    const articles = await loadArticles();
    const controls = {
      search: document.querySelector('#search'),
      year: document.querySelector('#year-filter'),
      type: document.querySelector('#type-filter'),
      project: document.querySelector('#project-filter'),
    };
    const fillOptions = (select, values) => {
      [...new Set(values.filter(Boolean))].sort((a, b) => b.localeCompare(a, 'zh-CN')).forEach((value) => {
        const option = document.createElement('option'); option.value = value; option.textContent = value; select.append(option);
      });
    };
    fillOptions(controls.year, articles.map((item) => item.year));
    fillOptions(controls.type, articles.map((item) => item.type));
    fillOptions(controls.project, articles.map((item) => item.project));

    const requestedYear = new URLSearchParams(window.location.search).get('year');
    if (requestedYear && [...controls.year.options].some((option) => option.value === requestedYear)) {
      controls.year.value = requestedYear;
    }

    const render = () => {
      const keyword = controls.search.value.trim().toLowerCase();
      const filtered = articles.filter((item) =>
        (!keyword || item.title.toLowerCase().includes(keyword)) &&
        (!controls.year.value || item.year === controls.year.value) &&
        (!controls.type.value || item.type === controls.type.value) &&
        (!controls.project.value || item.project === controls.project.value)
      );
      document.querySelector('#result-count').textContent = `共 ${filtered.length} 篇内容`;
      listEl.innerHTML = filtered.length ? filtered.map(articleCard).join('') : '<div class="empty-state"><h3>没有找到匹配内容</h3><p>试试清除部分筛选条件或更换关键词。</p></div>';
    };
    Object.values(controls).forEach((control) => control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', render));
    document.querySelector('#clear-filters').addEventListener('click', () => { Object.values(controls).forEach((control) => { control.value = ''; }); render(); });
    render();
  } catch (error) {
    document.querySelector('#result-count').textContent = '档案读取失败';
    listEl.innerHTML = `<div class="empty-state"><h3>暂时无法读取内容</h3><p>${escapeHtml(error.message)}，请确认文件位于网站根目录。</p></div>`;
  }
}

async function initReview() {
  const grid = document.querySelector('#review-grid');
  if (!grid) return;
  try {
    const articles = await loadArticles();
    const grouped = articles.reduce((years, article) => {
      if (!years[article.year]) years[article.year] = [];
      years[article.year].push(article);
      return years;
    }, {});
    const descriptions = {
      '2025': '社会企业助力计划持续升级，并通过女性力量、商业向善与银发赛道等特别企划拓展社会创新的更多可能。',
      '2024': '聚焦女性社会创业家成长与社会企业案例传播，记录加速、路演和项目协作中的真实经验。',
      '2023': '社会企业助力计划二期与「她山之力」项目逐步展开，从公开招募到主题沙龙连接更多创变者。',
      '2022': '通过课程赋能、案例传播与社群交流，支持社会企业疫后恢复，并沉淀面向未来的实践方法。',
      '2021': '社会企业疫后助力计划启动，以种子基金、训练营和系列沙龙陪伴社会企业应对挑战、恢复成长。',
    };
    grid.innerHTML = Object.keys(grouped).sort((a, b) => b.localeCompare(a)).map((year) => {
      const items = grouped[year];
      const projects = [...new Set(items.map((item) => item.project).filter(Boolean))];
      const projectText = projects.slice(0, 3).join('、');
      return `<article class="year-card">
        <div class="year-number">${escapeHtml(year)}</div>
        <div>
          <h3>${items.length} 篇年度内容</h3>
          <p>${escapeHtml(descriptions[year] || `本年度围绕${projectText || '青年发展与社会创新'}，记录项目行动、参与者故事与阶段成果。`)}</p>
          ${projectText ? `<div class="tag-list year-tags">${projects.slice(0, 3).map((project) => `<span class="pill">${escapeHtml(project)}</span>`).join('')}</div>` : ''}
          <a class="read-link" href="/content?year=${encodeURIComponent(year)}" data-link>查看 ${escapeHtml(year)} 年内容 →</a>
        </div>
      </article>`;
    }).join('');
  } catch (error) {
    grid.innerHTML = `<div class="empty-state"><h3>暂时无法读取年度档案</h3><p>${escapeHtml(error.message)}</p></div>`;
  }
}

const routes = { '/': homePage, '/content': contentPage, '/review': reviewPage, '/about': aboutPage };

function renderRoute() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const renderer = routes[path] || homePage;
  app.innerHTML = renderer();
  document.querySelectorAll('.site-nav a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === path));
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
  initArchive();
  initReview();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-link]');
  if (!link) return;
  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;
  event.preventDefault(); window.history.pushState({}, '', `${url.pathname}${url.search}`); renderRoute();
});
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
window.addEventListener('popstate', renderRoute);
renderRoute();
