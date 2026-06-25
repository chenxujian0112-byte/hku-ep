const app = document.querySelector('#app');
const nav = document.querySelector('#site-nav');
const menuToggle = document.querySelector('.menu-toggle');

document.querySelector('#copyright-year').textContent = new Date().getFullYear();

const eventCategories = [
  {
    name: '2021 社会企业助力计划',
    period: '2021-2022',
    match: (article) => ['社会企业疫后助力计划', '社会企业助力计划'].includes(article.project) && Number(article.year) <= 2022,
    description: '从疫后纾困、种子基金到课程赋能与案例传播，支持社会企业恢复经营并提升长期发展能力。',
  },
  {
    name: '2022-2023 社会企业助力计划',
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
    name: '2025-2026 社会企业助力计划',
    period: '2025-2026',
    match: (article) => article.project === '2025 社会企业助力计划',
    description: '从项目启动、20强入围、决赛训练营到生态升级，呈现项目从资助支持走向长期社群建设。',
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

const projectDisplayNames = {
  '2021社企助力计划一期': '2021 社会企业助力计划',
  '2022-2023社企助力计划二期（社区民生）': '2022-2023 社会企业助力计划（社区民生）',
  '2023-2024她山之力女性社会企业家加速计划': '2023-2024 她山之力女性社会创业家加速计划',
  '2025-2026社企助力计划三期': '2025-2026 社会企业助力计划',
};

function displayProjectPlan(projectPlan) {
  return projectDisplayNames[projectPlan] || projectPlan || '';
}

const journeyItems = [
  {
    slug: 'se-2021',
    categoryName: '2021 社会企业助力计划',
    phase: '2021',
    period: '2021',
    title: '社会企业助力计划',
    theme: '疫情困境下的社会企业支持',
    data: '疫后纾困 · 种子基金 · 能力建设',
    text: '从疫情影响下的经营恢复出发，帮助社会企业获得资金、课程和传播支持，稳住组织基本盘。',
    banners: [
      { src: 'assets/project-banners/2021/phase-2021-01.jpg', title: '2021 上海沙龙合照' },
      { src: 'assets/project-banners/2021/phase-2021-02.jpg', title: '2021 深圳沙龙合照' },
    ],
  },
  {
    slug: 'se-2022-2023',
    categoryName: '2022-2023 社会企业助力计划',
    phase: '2022-2023',
    period: '2022-2023',
    title: '社会企业助力计划',
    theme: '社区及民生相关机构成长',
    data: '社区场景 · 民生议题 · 社企加速',
    text: '围绕社区服务、民生需求和影响力投资，推动社会企业在真实场景里验证服务与商业模式。',
    banners: [
      { src: 'assets/project-banners/2022-2023/phase-2022-2023-01.jpg', title: '2022-2023 上海沙龙合照' },
      { src: 'assets/project-banners/2022-2023/phase-2022-2023-02.jpg', title: '社会企业助力计划第二期合照' },
    ],
  },
  {
    slug: 'women-2023-2024',
    categoryName: '她山之力女性社会创业家加速计划',
    phase: '2023-2024',
    period: '2023-2024',
    title: '她山之力女性社会创业家加速计划',
    theme: '女性社会创业家加速',
    data: '女性社创 · 路演训练 · 议题表达',
    text: '专门支持女性社会创业者，把商业可持续、议题表达和组织成长放在同一张发展图谱里。',
    banners: [
      { src: 'assets/project-banners/2023-2024/phase-2023-2024-01.jpg', title: '她山之力第二期合影' },
      { src: 'assets/project-banners/2023-2024/phase-2023-2024-02.jpg', title: '青年女性赋能工作坊合照' },
    ],
  },
  {
    slug: 'se-2025-2026',
    categoryName: '2025-2026 社会企业助力计划',
    phase: '2025-2026',
    period: '2025-2026',
    title: '社会企业助力计划',
    theme: '1-10阶段社企的系统赋能',
    data: '205申请 · 97赋能 · 16资助 · 152家数据库',
    text: '在更宽的议题赛道中筛选和陪伴社会企业，形成从训练营、决赛到长期社群的支持闭环。',
    banners: [
      { src: 'assets/project-banners/2025-2026/phase-2025-2026-01.jpg', title: '2025 创业者社群合照' },
      { src: 'assets/project-banners/2025-2026/phase-2025-2026-02.jpg', title: '2025 社会企业助力计划资助仪式' },
      { src: 'assets/project-banners/2025-2026/phase-2025-2026-03.jpg', title: '2025 共创工作坊合照' },
    ],
  },
];

const dashboardStats = [
  { value: '5年', label: '项目沉淀周期' },
  { value: '4期', label: '项目迭代' },
  { value: '130+', label: '入选赋能社企' },
  { value: '40+', label: '获种子基金机构' },
  { value: '800+', label: '累计培训覆盖' },
  { value: '42城', label: '覆盖城市' },
];

const posterGroups = [
  {
    id: 'upper',
    title: '上半期 20 家机构介绍海报',
    subtitle: '2025-2026 社会企业助力计划 · 上半期',
    description: '以机构介绍为主，适合作为项目伙伴展示和社企名录的视觉补充。',
    folder: 'upper',
    prefix: 'upper',
    count: 20,
  },
  {
    id: 'lower',
    title: '下半期 20 家社企人物海报',
    subtitle: '2025-2026 社会企业助力计划 · 下半期',
    description: '以人物与议题表达为主，适合放在项目成果、创业家故事和活动传播入口。',
    folder: 'lower',
    prefix: 'lower',
    count: 20,
  },
];

const reports = [
  {
    title: '渣打-恩派社会企业助力计划实践与洞察报告',
    period: '2025-2026',
    description: '聚焦 2025-2026 社会企业助力计划的实践过程、项目数据、社企画像与洞察总结。',
    url: 'assets/reports/insight-report-2025-2026.pdf',
  },
  {
    title: '渣打-恩派社会企业助力计划实践与观察报告',
    period: '2024',
    description: '整理 2024 年项目实践观察，呈现社会企业支持过程中的经验、问题与阶段性发现。',
    url: 'assets/reports/insight-report-2024.pdf',
  },
];

const issueDistribution = [
  ['残障康复/融合', '19.7%'],
  ['教育公平/创新', '11.2%'],
  ['社区营造', '9.9%'],
  ['老年服务/照顾', '9.9%'],
  ['动保环保', '8.6%'],
  ['文化艺术', '7.2%'],
  ['性别平等/女性发展', '6.6%'],
  ['心理健康', '5.9%'],
];

const methodSteps = [
  '广泛筛选',
  '深度赋能',
  '决赛评选',
  '长期陪伴',
];

async function loadGrantees() {
  const response = await fetch('/grantees.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('无法读取 grantees.json');
  return response.json();
}

const aliases = {
  year: ['年份', 'year'],
  date: ['标准日期', '日期', 'date'],
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
    <section class="hero project-hero">
      <div>
        <p class="eyebrow">渣打银行 x 恩派公益</p>
        <h1>陪伴社会企业<span>走稳更远</span></h1>
        <p class="hero-lead">社会企业助力计划深度陪伴 130+ 社会企业，从“项目能做”走向“组织能稳”，用数据沉淀成果，也用案例呈现改变如何发生。</p>
        <div class="button-row">
          <a class="button primary" href="/#dashboard" data-link>了解项目成果</a>
          <a class="button" href="/examples" data-link>查看创业者故事</a>
          <a class="button" href="/content" data-link>进入项目档案</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <span class="orb orb-one"></span><span class="orb orb-two"></span><span class="orb orb-three"></span>
        <div class="visual-note"><strong>5年 · 4期<br>130+社企</strong><span>训练营、路演、种子基金与长期社群共同构成项目支持网络。</span></div>
      </div>
    </section>
    <section class="stats impact-strip" aria-label="项目核心数字">
      ${dashboardStats.slice(0, 5).map((item) => `<div class="stat"><strong>${item.value}</strong><span>${item.label}</span></div>`).join('')}
    </section>
    <section id="journey" class="feature-section home-block">
      <div class="section-heading"><h2>项目历程</h2><p>从疫后支持、社区民生、女性社创到 2025-2026 社会企业助力计划，项目在不同阶段回应不同社会议题。</p></div>
      <div class="timeline">
        ${journeyItems.map((item) => `<a class="timeline-card" href="/project?slug=${escapeHtml(item.slug)}" data-link>
          <div class="timeline-node">${item.phase}</div>
          <h3>${item.title}</h3>
          <p class="timeline-theme">${item.theme}</p>
          <p>${item.text}</p>
          <strong>${item.data}</strong>
          <span class="timeline-link">查看项目介绍 →</span>
        </a>`).join('')}
      </div>
      <div class="section-actions">
        <a class="button primary" href="/posters" data-link>查看 2025-2026 社企海报墙</a>
      </div>
    </section>
    <section id="dashboard" class="dashboard-section home-block">
      <div class="section-heading"><h2>数据看板</h2><p>先用可以公开展示的总量和结构数据搭建 1.0 版本，后续可接入更完整的全息数据库、地图和图表。</p></div>
      <div class="dashboard-grid">
        ${dashboardStats.map((item) => `<article class="dashboard-card"><strong>${item.value}</strong><span>${item.label}</span></article>`).join('')}
      </div>
      <div class="insight-grid">
        <article class="insight-card">
          <h3>议题分布</h3>
          ${issueDistribution.map(([name, value]) => `<div class="bar-row"><span>${name}</span><div><i style="width:${value}"></i></div><b>${value}</b></div>`).join('')}
        </article>
        <article class="insight-card">
          <h3>发展阶段</h3>
          <div class="stage-grid">
            <div><strong>44.7%</strong><span>0-1 验证期</span></div>
            <div><strong>50%</strong><span>1-10 建立期</span></div>
            <div><strong>3.9%</strong><span>重构期</span></div>
            <div><strong>1.3%</strong><span>10-100 阶段</span></div>
          </div>
          <p>这一块后续可以继续升级为四象限图、城市热力图和就业带动数据。</p>
        </article>
      </div>
    </section>
    <section id="stories" class="feature-section home-block">
      <div class="section-heading"><h2>创业家故事</h2><p>让数字回到具体的人和组织。这里集中呈现被支持社会企业的案例与成长实践。</p></div>
      <div class="story-grid">
        ${grantees.slice(0, 6).map((item) => `<article class="story-card">
          <div class="story-avatar">${item.name.slice(0, 2)}</div>
          <h3>${item.name}</h3>
          <p>${item.focus}</p>
          <span>相关故事：${item.article}</span>
        </article>`).join('')}
      </div>
      <div class="section-actions">
        <a class="button primary" href="/examples" data-link>查看全部创业者故事</a>
        <a class="button" href="/grantees" data-link>查看社企名录</a>
      </div>
    </section>
    <section id="method" class="method-section home-block">
      <div class="section-heading"><h2>方法论沉淀</h2><p>项目不只是“给钱”，也通过课程、辅导、路演和长期跟踪沉淀可复用的社会企业成长方法。</p></div>
      <div class="method-grid">
        <article class="method-card main-method">
          <p class="eyebrow">双核七步法</p>
          <h3>社会核 × 商业核</h3>
          <p>围绕社会价值与商业模式的咬合度，帮助社会企业看清服务对象、收入结构、组织能力与增长路径。</p>
        </article>
        <article class="method-card">
          <h3>项目机制</h3>
          <div class="method-steps">${methodSteps.map((step) => `<span>${step}</span>`).join('')}</div>
        </article>
        <article class="method-card">
          <h3>AI战略诊断</h3>
          <p>未来可接入全息数据库，展示五维评估、涌现洞察和脱敏后的诊断示例。</p>
        </article>
        <article class="method-card">
          <h3>洞察报告</h3>
          <p>集中收录项目实践与洞察报告，用于展示共性挑战、社企画像和资助方启示。</p>
          <a class="read-link method-link" href="/reports" data-link>查看洞察报告 →</a>
        </article>
      </div>
    </section>
    <section id="ecosystem" class="ecosystem-section home-block">
      <div class="section-heading"><h2>渣打社企生态圈</h2><p>项目结束后，创业者仍可通过社群、私董会、导师网络和伙伴资源继续连接。</p></div>
      <div class="ecosystem-grid">
        <article><span>01</span><h3>校友社群</h3><p>沉淀历期创业者网络，支持持续交流、互助和资源共享。</p></article>
        <article><span>02</span><h3>私董会机制</h3><p>以小组陪伴方式帮助创业者讨论真实经营问题，形成行动项。</p></article>
        <article><span>03</span><h3>资源网络</h3><p>连接企业志愿者、外部专家、合作伙伴与影响力投资资源。</p></article>
        <article><span>04</span><h3>品牌传播</h3><p>通过推文、媒体报道、理想者大会等渠道扩大优秀实践可见度。</p></article>
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
  ${pageHero('SUPPORTED CASES', '创业家故事', '呈现被支持社会企业的成长实践', '这里仅收录人物故事、企业案例和案例传播类内容，活动回顾、活动招募和沙龙内容不纳入本页。')}
  <section class="archive-shell">
    <div class="archive-meta"><span id="examples-count">正在读取案例…</span></div>
    <div id="examples-list" class="article-list"><div class="loading">正在整理创业家故事…</div></div>
  </section>
</div>`;

const granteesPage = () => `<div class="page">
  ${pageHero('GRANTEE DIRECTORY', '获项目支持的社企名录', '以下名录收录曾参加线下训练营的社会企业', '')}
  <section class="archive-shell grantee-shell">
    <div class="grantee-search">
      <label class="control"><span class="sr-only">搜索社企名录</span><input id="grantee-search" type="search" placeholder="搜索企业名称、方向、项目期数或关键词" /></label>
    </div>
    <div id="grantee-project-filters" class="project-checks" aria-label="按项目计划筛选"></div>
    <div id="grantee-city-filters" class="project-checks city-checks" aria-label="按城市筛选"></div>
    <div class="archive-meta"><span id="grantee-count">正在读取名录…</span></div>
    <div id="grantee-grid" class="grantee-grid"><div class="loading">正在整理社企名录…</div></div>
  </section>
</div>`;

const postersPage = () => `<div class="page">
  ${pageHero('POSTER GALLERY', '2025-2026 社企海报墙', '集中呈现上下半期 40 家社企海报', '这里收录 2025-2026 社会企业助力计划上下半期海报素材。上半期为机构介绍海报，下半期为社企人物海报。')}
  <section class="poster-shell">
    ${posterGroups.map((group) => `<article class="poster-group" id="${group.id}">
      <div class="section-heading poster-heading">
        <div>
          <p class="eyebrow">${group.subtitle}</p>
          <h2>${group.title}</h2>
        </div>
        <p>${group.description}</p>
      </div>
      <div class="poster-grid">
        ${Array.from({ length: group.count }, (_, index) => {
          const num = String(index + 1).padStart(2, '0');
          const src = `/assets/posters/2025-2026/${group.folder}/${group.prefix}-${num}.jpg`;
          return `<a class="poster-card" href="${src}" target="_blank" rel="noopener noreferrer" aria-label="${group.title} ${num}">
            <img src="${src}" alt="${group.title} ${num}" loading="lazy" />
            <span>${num}</span>
          </a>`;
        }).join('')}
      </div>
    </article>`).join('')}
  </section>
</div>`;

const reportsPage = () => `<div class="page">
  ${pageHero('INSIGHT REPORTS', '洞察报告', '项目实践与观察资料入口', '这里集中收录渣打-恩派社会企业助力计划的实践与洞察报告，可在线打开或下载保存。')}
  <section class="report-shell">
    <div class="report-grid">
      ${reports.map((report) => `<article class="report-card">
        <span class="pill accent">${escapeHtml(report.period)}</span>
        <h3>${escapeHtml(report.title)}</h3>
        <p>${escapeHtml(report.description)}</p>
        <div class="report-actions">
          <a class="button primary" href="${escapeHtml(report.url)}" target="_blank" rel="noopener noreferrer">打开报告</a>
          <a class="button" href="${escapeHtml(report.url)}" download>下载 PDF</a>
        </div>
      </article>`).join('')}
    </div>
  </section>
</div>`;

const projectPage = () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || journeyItems[0].slug;
  const item = journeyItems.find((entry) => entry.slug === slug) || journeyItems[0];
  return `<div class="page">
    ${pageHero('PROJECT DETAIL', `${item.period} ${item.title}`, item.theme, item.text)}
    <section class="project-detail-shell">
      ${item.banners && item.banners.length ? `<section class="project-photo-album" aria-label="项目合照">
        <div class="album-heading"><span>项目合照</span><small>横向滑动查看更多</small></div>
        <div class="project-banner-strip">
          ${item.banners.map((banner) => `<figure class="project-banner">
            <img src="${escapeHtml(banner.src)}" alt="${escapeHtml(banner.title)}" loading="lazy" />
            <figcaption>${escapeHtml(banner.title)}</figcaption>
          </figure>`).join('')}
        </div>
      </section>` : ''}
      <article class="project-intro-card">
        <div>
          <p class="eyebrow">项目介绍</p>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </div>
        <div class="project-facts">
          <span><strong>时间</strong>${escapeHtml(item.period)}</span>
          <span><strong>关键词</strong>${escapeHtml(item.data)}</span>
        </div>
      </article>
      ${item.slug === 'se-2025-2026' ? `<div class="project-extra-actions">
        <a class="button primary" href="/posters" data-link>查看 2025-2026 社企海报墙</a>
      </div>` : ''}
      <div class="section-heading project-article-heading">
        <h2>相关推文与活动</h2>
        <p>这里自动汇总项目档案中属于这一期的公开推文、招募、活动回顾、案例传播和成果内容。</p>
      </div>
      <div id="project-article-list" class="article-list"><div class="loading">正在读取相关内容…</div></div>
    </section>
  </div>`;
};

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function articleCard(article) {
  const detailItems = [
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
  const text = `${article.title} ${article.type} ${article.stage} ${article.tags.join(' ')}`;
  const isStory = article.type === '项目故事' ||
    article.stage === '案例传播' ||
    /社企档案|拿起画笔|小实验|初心8年|餐桌安全|农产品滞销|好好吃药/.test(text);
  const isActivity = /沙龙|招募|报名|回顾|开营|路演|决赛|入围|启动|预告/.test(text);
  return isStory && !isActivity;
}

function compactText(value, maxLength = 42) {
  const cleaned = String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/^公司方向[:：]\s*/, '')
    .replace(/^其他[:：]\s*/, '')
    .replace(/具体为[:：].*$/, '')
    .replace(/包括[:：].*$/, '')
    .trim();
  const firstPart = cleaned.split(/[。；;，,：:]/).map((part) => part.trim()).find(Boolean) || cleaned;
  return firstPart.length > maxLength ? `${firstPart.slice(0, maxLength)}…` : firstPart;
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

function granteeCard(item) {
  const summary = String(item.summary || '').replace(/\s+/g, ' ').trim();
  const shortDirection = compactText(item.direction, 38);
  const shortSummary = compactText(summary, 62);
  const logo = String(item.logo || '').trim();
  const wechatName = String(item.wechatName || '').trim();
  const wechatUrl = String(item.wechatUrl || '').trim();
  return `<article class="grantee-card">
    <div class="grantee-logo">${logo ? `<img src="${escapeHtml(logo)}" alt="${escapeHtml(item.name)} logo" loading="lazy" />` : escapeHtml(item.name.slice(0, 2))}</div>
    <div>
      <div class="article-meta">
        ${item.projectPlan ? `<span class="pill accent">${escapeHtml(displayProjectPlan(item.projectPlan))}</span>` : ''}
        ${item.city ? `<span class="pill city-pill">${escapeHtml(item.city)}</span>` : ''}
        ${item.grantAmount ? '<span class="pill funded-pill">获资助</span>' : ''}
      </div>
      <h3>${escapeHtml(item.name)}</h3>
      ${shortDirection ? `<p><strong>公司方向：</strong>${escapeHtml(shortDirection)}</p>` : ''}
      ${shortSummary ? `<span>${escapeHtml(shortSummary)}</span>` : ''}
      ${wechatName || wechatUrl ? `<div class="grantee-links">
        ${wechatUrl ? `<a href="${escapeHtml(wechatUrl)}" target="_blank" rel="noopener noreferrer">公众号：${escapeHtml(wechatName || '点击查看')}</a>` : `<span>公众号：${escapeHtml(wechatName)}</span>`}
      </div>` : ''}
    </div>
  </article>`;
}

async function initGrantees() {
  const grid = document.querySelector('#grantee-grid');
  if (!grid) return;
  try {
    const items = await loadGrantees();
    const filterWrap = document.querySelector('#grantee-project-filters');
    const cityWrap = document.querySelector('#grantee-city-filters');
    const searchInput = document.querySelector('#grantee-search');
    const projects = [...new Set(items.map((item) => item.projectPlan).filter(Boolean))].sort();
    const cities = [...new Set(items.map((item) => item.city).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
    let activeProject = '';
    let activeCity = '';
    filterWrap.innerHTML = `<button class="project-check active" type="button" data-project="">全部项目计划</button>` +
      projects.map((project) => `<button class="project-check" type="button" data-project="${escapeHtml(project)}">${escapeHtml(displayProjectPlan(project))}</button>`).join('');
    cityWrap.innerHTML = `<button class="project-check active" type="button" data-city="">全部城市</button>` +
      cities.map((city) => `<button class="project-check" type="button" data-city="${escapeHtml(city)}">${escapeHtml(city)}</button>`).join('');
    const render = () => {
      const keyword = searchInput.value.trim().toLowerCase();
      const filtered = items.filter((item) => {
        const searchText = [
          item.name,
          item.direction,
          item.summary,
          item.projectPlan,
          displayProjectPlan(item.projectPlan),
          item.city,
          item.wechatName,
          item.location,
          item.area,
        ].filter(Boolean).join(' ').toLowerCase();
        return (!activeProject || item.projectPlan === activeProject) &&
          (!activeCity || item.city === activeCity) &&
          (!keyword || searchText.includes(keyword));
      });
      document.querySelector('#grantee-count').textContent = `共 ${filtered.length} 家社会企业`;
      grid.innerHTML = filtered.length ? filtered.map(granteeCard).join('') : '<div class="empty-state"><h3>没有找到匹配社企</h3><p>试试更换企业名称、城市或方向关键词。</p></div>';
    };
    searchInput.addEventListener('input', render);
    filterWrap.addEventListener('click', (event) => {
      const button = event.target.closest('.project-check');
      if (!button) return;
      activeProject = button.dataset.project;
      filterWrap.querySelectorAll('.project-check').forEach((item) => item.classList.toggle('active', item === button));
      render();
    });
    cityWrap.addEventListener('click', (event) => {
      const button = event.target.closest('.project-check');
      if (!button) return;
      activeCity = button.dataset.city;
      cityWrap.querySelectorAll('.project-check').forEach((item) => item.classList.toggle('active', item === button));
      render();
    });
    render();
  } catch (error) {
    document.querySelector('#grantee-count').textContent = '名录读取失败';
    grid.innerHTML = `<div class="empty-state"><h3>暂时无法读取社企名录</h3><p>${escapeHtml(error.message)}</p></div>`;
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

async function initProjectDetail() {
  const listEl = document.querySelector('#project-article-list');
  if (!listEl) return;
  const params = new URLSearchParams(window.location.search);
  const item = journeyItems.find((entry) => entry.slug === params.get('slug')) || journeyItems[0];
  const category = eventCategories.find((entry) => entry.name === item.categoryName);
  if (!category) {
    listEl.innerHTML = '<div class="empty-state"><h3>相关内容待补充</h3><p>这一阶段目前作为方向预留，后续可继续补充项目资料。</p></div>';
    return;
  }
  try {
    const articles = (await loadArticles()).filter(category.match);
    listEl.innerHTML = articles.length ? articles.map(articleCard).join('') : '<div class="empty-state"><h3>暂无匹配内容</h3><p>后续可继续补充这一期的推文和活动资料。</p></div>';
  } catch (error) {
    listEl.innerHTML = `<div class="empty-state"><h3>暂时无法读取相关内容</h3><p>${escapeHtml(error.message)}</p></div>`;
  }
}

const routes = { '/': homePage, '/content': contentPage, '/examples': examplesPage, '/review': reviewPage, '/grantees': granteesPage, '/posters': postersPage, '/reports': reportsPage, '/project': projectPage, '/about': aboutPage };

function renderRoute() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const renderer = routes[path] || homePage;
  app.innerHTML = renderer();
  const currentHash = window.location.hash;
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    const isHomeRoot = path === '/' && href === '/' && !currentHash;
    const isHomeSection = path === '/' && href === `/${currentHash}` && Boolean(currentHash);
    link.classList.toggle('active', href === path || isHomeRoot || isHomeSection);
  });
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  if (window.location.hash) {
    setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  initArchive();
  initExamples();
  initGrantees();
  initReview();
  initProjectDetail();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-link]');
  if (!link) return;
  const url = new URL(link.href, window.location.origin);
  if (url.origin !== window.location.origin) return;
  event.preventDefault(); window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`); renderRoute();
});
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
window.addEventListener('popstate', renderRoute);
renderRoute();
