# 宠遇 - 宠物领养平台

## 背景与目标

你正在为一个宠物领养平台开发完整的前后端应用。平台允许用户浏览待领养宠物、查看宠物详情、注册登录、提交领养申请并追踪申请状态。项目采用前后端分离架构，前端使用 Vue 3 + Vite + Tailwind CSS，后端使用 Spring Boot + MyBatis + MySQL，通过 Docker Compose 一键部署。

你的目标是从零搭建完整的宠物领养系统，确保前后端功能完整、视觉风格还原、交互流畅，并通过 Playwright 测试验证关键流程。

## 功能要求

### 模块 A：首页与宠物浏览

- 首页展示品牌口号、搜索入口、宠物分类卡片（狗、猫、其他）。
- "今日推荐"区域展示 4-6 只精选宠物卡片，每张卡片显示宠物照片、名称、品种、年龄、性别标签。
- 宠物列表页（`/pets`）展示所有宠物，支持分页加载（每页 12 条）。
- 列表支持按类型（狗、猫、其他）、品种、年龄范围、性别、体型（小型、中型、大型）筛选。
- 列表支持按发布时间、年龄排序。
- 筛选和排序切换时显示加载骨架屏。

### 模块 B：宠物详情与领养申请

- 点击宠物卡片进入宠物详情页（`/pet/:id`），展示宠物大图、名称、品种、年龄、性别、体型、疫苗接种情况、性格描述、健康状况等详细信息。
- 提供"申请领养"按钮，点击跳转到申请页面（`/apply/:petId`，需登录）。
- 未登录用户点击"申请领养"时，重定向到登录页，登录成功后自动跳回申请页面。
- 申请页面包含表单：申请人姓名、联系电话、居住地址、居住类型（自有房/租房/合租）、是否有养宠经验、领养理由（文本域）。
- 表单验证：姓名和电话必填，电话需符合中国大陆手机号格式。
- 提交成功后跳转到"申请已提交"提示页，显示申请编号。

### 模块 C：用户系统

- 用户注册（`/register`）：用户名、密码、确认密码、邮箱。
- 用户名 3-20 字符，密码 6-20 字符，前端+后端双重验证。
- 用户登录（`/login`）：用户名+密码登录，登录成功后跳转回来源页或首页。
- 已登录状态下导航栏显示用户头像和用户名，提供下拉菜单（个人中心、申请记录、退出登录）。
- 个人中心（`/user`）展示用户基本信息、领养申请数量统计。
- 申请记录（`/user/applications`）展示历史申请列表，每条显示宠物名称、申请时间、状态（审核中/已通过/已拒绝）。
- 个人资料（`/user/profile`）可修改联系电话、地址等信息。

### 模块 D：后端 API

- RESTful API 设计，统一返回格式 `{ code: 0, message: "success", data: ... }`。
- 宠物相关：GET `/api/pets`（列表+筛选）、GET `/api/pets/:id`（详情）。
- 用户相关：POST `/api/auth/register`、POST `/api/auth/login`、GET `/api/user/profile`、PUT `/api/user/profile`。
- 申请相关：POST `/api/applications`（需登录）、GET `/api/applications`（用户的申请列表）、GET `/api/applications/:id`（申请详情）。
- 使用 JWT Token 进行身份认证，Token 过期时间 7 天。
- 统一异常处理，返回友好的错误信息。

## 交互要求

- 宠物卡片 hover 时显示放大效果（scale: 1.03）和阴影加深，transition 200ms ease-out。
- 按钮点击有按压位移效果（translateY 2px），符合 Neo-Brutalism 风格。
- 导航栏移动端使用汉堡菜单，展开/收起动画 300ms。
- 表单输入框聚焦时向左上偏移 2px，出现彩色阴影。
- 空状态：筛选无结果时显示空状态插画与"没有找到匹配的宠物"文案。
- 加载态：数据请求时显示骨架屏（skeleton loader）。
- 错误态：网络错误、表单验证失败、登录失败等需有明确 toast 或行内提示。
- 移动端响应式：所有页面在 390px 视口下正常显示，导航切换为底部 Tab 栏。

## 视觉要求

### 参考截图

- `assets/screenshots/01-home.png`：首页
- `assets/screenshots/02-pet-list.png`：宠物列表
- `assets/screenshots/03-pet-detail.png`：宠物详情
- `assets/screenshots/04-login.png`：登录页
- `assets/screenshots/05-register.png`：注册页
- `assets/screenshots/06-user-center.png`：个人中心
- `assets/screenshots/07-user-applications.png`：申请记录
- `assets/screenshots/08-user-profile.png`：个人资料

### 设计规范

设计风格为 **Neo-Brutalism（新粗野主义）**，活泼、卡通、年轻化：

- 主色（Primary）：`#3B82F6`
- 成功/可领养（Secondary）：`#10B981`
- 警告（Warning）：`#F59E0B`
- 危险/错误（Danger）：`#EF4444`
- 页面背景（Background）：`#FFF4F4`
- 主要文字（Text）：`#4A2D2D`
- 装饰粉（Pink）：`#FF85A2`、`#F472B6`
- 装饰黄（Yellow）：`#FFD600`
- 字体：正文 `Noto Sans SC`，标题/品牌 `ZCOOL KuaiLe`
- 图标：Font Awesome 6 Free（CDN 引入）
- 卡片样式：白色背景 + 4px 黑色描边 + 2rem 大圆角 + `box-shadow: 6px 6px 0px black`
- 按钮样式：绿色背景 `#4ADE80` + 黑色描边 + 按压位移效果
- 页面最大宽度：1400px，居中
- 响应式断点：640px / 768px / 1024px / 1280px

## 约束条件

- 前端：Vue 3 + TypeScript + Vite + Tailwind CSS + Vue Router + Pinia
- 后端：Java 17 + Spring Boot 3 + MyBatis + MySQL 8.0
- 使用 Docker Compose 编排前后端与数据库服务
- 禁止使用 Element Plus、Ant Design Vue 等 UI 组件库（Tailwind CSS 原生样式即可）
- 后端数据初始化使用 SQL 脚本（`backend/src/main/resources/db/migration/` 或 init.sql）
- 所有 Mock 数据放在 `mock-data/` 目录下，包含宠物数据和用户数据
- Node.js >= 18，Java 17，Docker Desktop

## 交付标准

- [ ] `docker compose up --build` 能正常启动全部服务
- [ ] 前端 http://localhost:3000 可访问，后端 http://localhost:8000 可访问
- [ ] 所有页面路由可正常访问，无明显布局错位
- [ ] 宠物列表筛选、排序、分页功能正常
- [ ] 用户注册、登录、退出功能正常，JWT 认证有效
- [ ] 领养申请提交和查看功能正常
- [ ] 覆盖加载态、空态、错误态、hover/focus 态、移动端菜单态
- [ ] `tests/playwright.spec.ts` 中的核心测试通过
- [ ] 关键状态截图保存到 `screenshots/`

## 参考资料

- 参考截图用于布局和视觉风格对齐，不照搬品牌资产。
- 高保真区域：卡片样式、按钮状态、导航栏布局、动效参数。
- 风格对齐区域：具体宠物照片内容、品牌装饰元素。
- 设计参考详见 `assets/reference/design-reference.md`。
