const app = document.querySelector('#app');
const nav = document.querySelector('#site-nav');
const menuToggle = document.querySelector('.menu-toggle');

document.querySelector('#copyright-year').textContent = new Date().getFullYear();

const eventCategories = [
  {
    name: '社会企业助力计划（一期）',
    period: '2021-2022',
    match: (article) => ['社会企业疫后助力计划', '社会企业助力计划'].includes(article.project) && Number(article.year) <= 2022,
    description: '从疫后纾困、种子基金到课程赋能与案例传播，支持社会企业恢复经营并提升长期发展能力。',
  },
  {
    name: '社会企业助力计划（二期）',
    period: '2022-2024',
    match: (article) => article.project === '社会企业助力计划（二期）',
    description: '围绕社企加速营、影响力投资、社区服务场景与种子基金支持，形成第二阶段项目陪伴。',
  },
  {
    name: '她山之力女性社会创业家加速计划',
    period: '2023-2024',
    match: (article) => article.project === '「她山之力」女性社会创业家加速计划',
    description: '聚焦女性社会创业家，记录项目招募、主题沙龙、线上路演、开营和线下路演等关键节点。',
  },
  {
    name: '2025 社会企业助力计划（升级版）',
    period: '2025-2026',
    match: (article) => article.project === '2025 社会企业助力计划',
    description: '从新一期启动、20强入围、决赛训练营到生态升级，呈现项目从资助支持走向长期社群建设。',
  },
  {
    name: '「她力量」特别企划',
    period: '2025',
    match: (article) => article.project === '「她力量」特别企划',
    description: '以女性创业者与项目受益青年为主角，呈现残障融合、代际陪伴和女性创业支持案例。',
  },
  {
    name: '垂直赛道',
    period: '2025-2026',
    match: (article) => article.project.startsWith('垂直赛道'),
    description: '围绕商业向善与银发赛道，探索社会价值进入企业主航道和银发产业创新机会。',
  },
  {
    name: '其他社创活动（暂不纳入主分类）',
    period: '待核查',
    match: (article) => ['待分类', '其他社创活动（待核查）'].includes(article.project),
    description: '保留暂未纳入主线项目的社创观察、对谈和资料内容，后续可继续归类。',
  },
];

const grantees = [
  { name: '致汇圆梦', focus: '无障碍环境建设、残障人士就业与社会融入', article: '为推动无障碍环境建设 她们坚守“助残圆梦”初心8年' },
  { name: '田园公社', focus: '乡村食物系统、餐桌安全与社区支持农业', article: '从城市到乡村 为解决餐桌安全问题 她和团队一直在努力' },
  { name: '雪山明珠', focus: '高半山区农产品销售、乡村振兴与社区发展', article: '投身扶贫工作多年的他 为高半山区农产品滞销问题找到了新出路' },
  { name: '人人壮', focus: '大湾区老人用药提醒与银发健康服务', article: '好好吃药,大湾区青年这样提醒老人' },
  { name: '学境教育', focus: '社区教育、终身学习与儿童成长支持', article: '从小朋友到大朋友,他致力于构建学无止境的社区' },
  { name: '小岛生活 IsleLife', focus: '社区生活服务、女性社会创业与可持续社区', article: '小岛生活IsleLife' },
  { name: '残艺文创', focus: '绘画疗愈、残障融合与文创产品', article: '她让视障人士拿起画笔，疗愈他们的世界' },
  { name: '老友青年 / 鸣渊园', focus: '代际陪伴、社区活动与银发友好连接', article: '她用一个小实验，搭建起年轻人与老年人的温暖桥梁' },
];

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
        <p class="eyebrow">渣打银行 x 恩派公益</p>
        <h1>社会企业助力计划<span>项目档案</span></h1>
        <p class="hero-lead">汇集项目传播、青年故事与实践洞察，让每一次行动留下清晰、可检索的记录。</p>
        <div class="button-row">
          <a class="button primary" href="/content" data-link>进入项目档案</a>
          <a class="button" href="/examples" data-link>创业家故事</a>
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
    ${pageHero('CONTENT ARCHIVE', '项目档案', '记录每一次行动的生长轨迹', '这里收录社会企业助力计划相关文章，可按年份、内容类型和项目名称筛选查看。')}
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
  ${pageHero('PROJECT REVIEW', '项目回顾', '按项目事件回看成长路径', '以项目阶段和事件分类整理内容，并在每个分类下标注对应年度区间。')}
  <section id="review-grid" class="review-grid"><div class="loading">正在整理年度档案…</div></section>
</div>`;

const aboutPage = () => `<div class="page">
  ${pageHero('ABOUT PROJECT', '关于项目', '以能力建设、资金支持与社群陪伴支持社会企业成长', '社会企业助力计划由渣打银行与恩派公益携手推进，关注社会企业的商业可持续能力、社会价值创造和长期生态建设。')}
  <section class="about-grid">
    <article class="about-card green"><p class="eyebrow">我们的关注</p><h3>让青年拥有创造未来的能力与机会</h3><p>围绕就业、创业与社会创新，连接资源、伙伴和真实实践场景。</p></article>
    <article class="about-card"><h3>为什么建立项目档案</h3><p>项目的价值不仅存在于结果中，也存在于每一次尝试、协作与经验分享中。这座档案希望让分散的内容重新形成脉络，让参与者、伙伴与公众更容易理解项目如何生长。</p><p>本网站收录公开发布内容，并通过标准化字段进行整理。点击文章卡片中的“阅读原文”，可前往对应发布平台查看完整内容。</p></article>
  </section>
</div>`;

const examplesPage = () => `<div class="page">
  ${pageHero('SUPPORTED CASES', '创业家故事', '把被支持企业的故事单独看见', '这里集中呈现项目故事、案例传播和特别企划中的企业案例，方便快速了解资助企业的实践方向。')}
  <section class="archive-shell">
    <div class="archive-meta"><span id="examples-count">正在读取案例…</span></div>
    <div id="examples-list" class="article-list"><div class="loading">正在整理创业家故事…</div></div>
  </section>
</div>`;

const granteesPage = () => `<div class="page">
  ${pageHero('GRANTEE DIRECTORY', '获项目支持的社企名录', '以下名录收录曾参加线下训练营的社会企业', '目前先以文字徽标和简介呈现，后续拿到正式 logo 后可替换为图片版名录。')}
  <section class="grantee-grid">
    ${grantees.map((item) => `<article class="grantee-card">
      <div class="grantee-logo">${escapeHtml(item.name.slice(0, 2))}</div>
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.focus)}</p>
        <span>关联文章：${escapeHtml(item.article)}</span>
      </div>
    </article>`).join('')}
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

function isExampleArticle(article) {
  const text = `${article.title} ${article.project} ${article.type} ${article.stage} ${article.tags.join(' ')}`;
  return article.type === '项目故事' ||
    article.type === '特别企划' ||
    article.stage === '案例传播' ||
    /案例|故事|社企档案|她力量/.test(text);
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

    const params = new URLSearchParams(window.location.search);
    const requestedYear = params.get('year');
    const requestedProject = params.get('project');
    const requestedType = params.get('type');
    let activeCategory = eventCategories.find((category) => category.name === params.get('category')) || null;
    if (requestedYear && [...controls.year.options].some((option) => option.value === requestedYear)) {
      controls.year.value = requestedYear;
    }
    if (requestedProject && [...controls.project.options].some((option) => option.value === requestedProject)) {
      controls.project.value = requestedProject;
    }
    if (requestedType && [...controls.type.options].some((option) => option.value === requestedType)) {
      controls.type.value = requestedType;
    }

    const render = () => {
      const keyword = controls.search.value.trim().toLowerCase();
      const filtered = articles.filter((item) =>
        (!keyword || item.title.toLowerCase().includes(keyword)) &&
        (!activeCategory || activeCategory.match(item)) &&
        (!controls.year.value || item.year === controls.year.value) &&
        (!controls.type.value || item.type === controls.type.value) &&
        (!controls.project.value || item.project === controls.project.value)
      );
      document.querySelector('#result-count').textContent = `${activeCategory ? `${activeCategory.name}：` : ''}共 ${filtered.length} 篇内容`;
      listEl.innerHTML = filtered.length ? filtered.map(articleCard).join('') : '<div class="empty-state"><h3>没有找到匹配内容</h3><p>试试清除部分筛选条件或更换关键词。</p></div>';
    };
    Object.values(controls).forEach((control) => control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', render));
    document.querySelector('#clear-filters').addEventListener('click', () => { activeCategory = null; Object.values(controls).forEach((control) => { control.value = ''; }); render(); });
    render();
  } catch (error) {
    document.querySelector('#result-count').textContent = '档案读取失败';
    listEl.innerHTML = `<div class="empty-state"><h3>暂时无法读取内容</h3><p>${escapeHtml(error.message)}，请确认文件位于网站根目录。</p></div>`;
  }
}

async function initExamples() {
  const listEl = document.querySelector('#examples-list');
  if (!listEl) return;
  try {
    const examples = (await loadArticles()).filter(isExampleArticle);
    document.querySelector('#examples-count').textContent = `共 ${examples.length} 篇创业家故事`;
    listEl.innerHTML = examples.length ? examples.map(articleCard).join('') : '<div class="empty-state"><h3>暂无创业家故事</h3><p>后续可继续补充项目故事、案例传播与特别企划文章。</p></div>';
  } catch (error) {
    document.querySelector('#examples-count').textContent = '案例读取失败';
    listEl.innerHTML = `<div class="empty-state"><h3>暂时无法读取案例</h3><p>${escapeHtml(error.message)}</p></div>`;
  }
}

async function initReview() {
  const grid = document.querySelector('#review-grid');
  if (!grid) return;
  try {
    const articles = await loadArticles();
    grid.innerHTML = eventCategories.map((category) => {
      const items = articles.filter(category.match);
      const types = [...new Set(items.map((item) => item.type).filter(Boolean))];
      const years = [...new Set(items.map((item) => item.year).filter(Boolean))].sort();
      return `<article class="year-card">
        <div class="year-number">${escapeHtml(category.period)}</div>
        <div>
          <h3>${escapeHtml(category.name)}</h3>
          <p>${escapeHtml(category.description)}</p>
          <div class="tag-list year-tags">
            <span class="pill accent">${items.length} 篇内容</span>
            ${years.length ? `<span class="pill">年度：${escapeHtml(years.join(' / '))}</span>` : ''}
            ${types.slice(0, 4).map((type) => `<span class="pill">${escapeHtml(type)}</span>`).join('')}
          </div>
          ${items.length ? `<a class="read-link" href="/content?category=${encodeURIComponent(category.name)}" data-link>查看相关内容 →</a>` : '<span class="muted-note">暂无匹配内容</span>'}
        </div>
      </article>`;
    }).join('');
  } catch (error) {
    grid.innerHTML = `<div class="empty-state"><h3>暂时无法读取年度档案</h3><p>${escapeHtml(error.message)}</p></div>`;
  }
}

const routes = { '/': homePage, '/content': contentPage, '/examples': examplesPage, '/review': reviewPage, '/grantees': granteesPage, '/about': aboutPage };

function renderRoute() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const renderer = routes[path] || homePage;
  app.innerHTML = renderer();
  document.querySelectorAll('.site-nav a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === path));
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'instant' });
  initArchive();
  initExamples();
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
