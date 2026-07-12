# 宠遇 - 宠物领养平台 (PetMeet)

> Neo-Brutalism 活泼风格 · 宠物领养公益平台 · Vue 3 + Spring Boot 3 + MySQL

---

## 项目简介

宠遇是一个公益宠物领养平台，用户可浏览待领养宠物、查看详情、注册登录、提交领养申请并追踪申请状态。采用前后端分离架构，前端为 Vue 3 + Vite + Tailwind CSS（Neo-Brutalism 设计风格），后端为 Spring Boot 3 + MyBatis + MySQL 8.0，通过 Docker Compose 一键部署。

---

## 技术栈

| 类别     | 技术                    | 版本  |
| -------- | ----------------------- | ----- |
| 前端框架 | Vue 3 (Composition API) | ^3.5  |
| 构建工具 | Vite                    | ^6.0  |
| 语言     | TypeScript              | ~5.7  |
| CSS      | Tailwind CSS            | ^3.4  |
| 路由     | Vue Router              | ^4.5  |
| 状态管理 | Pinia                   | ^2.3  |
| HTTP     | Axios                   | ^1.7  |
| 图标     | Font Awesome 6 (CDN)    | ^6.7  |
| 后端框架 | Spring Boot 3           | 3.x   |
| ORM      | MyBatis                 | 3.x   |
| 数据库   | MySQL                   | 8.0   |
| 认证     | JWT + BCrypt            | -     |
| 测试     | Playwright              | ^1.54 |
| 部署     | Docker Compose + Nginx  | -     |

---

## 核心功能

### 模块 A：首页与宠物浏览

- 首页品牌口号 + Hero 大图 + 搜索入口
- 宠物分类卡片（狗狗 / 猫咪 / 其他萌宠）
- "等待与你相遇"今日推荐区域（4-6 只精选宠物卡片）
- 宠物列表页（`/pets`）：分页展示 + 骨架屏加载
- 筛选：类型、品种（模糊搜索）、性别、体型、年龄范围
- 排序：最新发布 / 年龄升序 / 年龄降序
- 空状态："没有找到匹配的宠物"

### 模块 B：宠物详情与领养申请

- 宠物详情页（`/pet/:id`）：大图、品种、年龄、性别、体型、性格、健康状况
- "申请领养"按钮 → 申请页面（`/apply/:petId`，需登录）
- 未登录自动跳转登录页，登录后回跳
- 申请表单：姓名、电话（大陆手机号验证）、地址、居住类型、养宠经验、理由（500 字限）
- 提交成功页显示申请编号

### 模块 C：用户系统

- 注册（`/register`）：用户名 + 密码 + 确认密码 + 邮箱
- 登录（`/login`）：用户名 + 密码，JWT 7 天有效
- 导航栏：已登录显示头像下拉菜单（个人中心 / 申请记录 / 退出）
- 个人中心（`/user`）：申请统计（总数 / 审核中 / 已通过）
- 申请记录（`/user/applications`）：列表含宠物名、状态标签、申请编号、时间
- 个人资料（`/user/profile`）：修改电话、地址等信息

### 模块 D：后端 API

| 方法 | 路径                      | 说明                           |
| ---- | ------------------------- | ------------------------------ |
| GET  | `/api/pets`             | 宠物列表（筛选 + 排序 + 分页） |
| GET  | `/api/pets/:id`         | 宠物详情                       |
| POST | `/api/auth/register`    | 用户注册                       |
| POST | `/api/auth/login`       | 用户登录（返回 JWT）           |
| GET  | `/api/user/profile`     | 获取个人资料                   |
| PUT  | `/api/user/profile`     | 修改个人资料                   |
| POST | `/api/applications`     | 提交领养申请                   |
| GET  | `/api/applications`     | 用户申请列表                   |
| GET  | `/api/applications/:id` | 申请详情                       |

---

## 快速启动

### Docker（推荐）

```bash
docker compose up --build
```

- 前端：http://localhost:3000
- 后端：http://localhost:8000
- 数据库首次启动自动导入 16 条宠物数据

### 本地开发

```bash
# 前端
cd frontend && npm install && npm run dev

# 后端（需 MySQL 8.0 + Java 17 + Maven）
cd backend && mvn spring-boot:run
```

---

## 测试账号

| 用户名 | 密码    | 说明     |
| ------ | ------- | -------- |
| demo   | demo123 | 体验账号 |

---

## 项目结构

```
webdev-task-sxw-02/
├── docker-compose.yml        # Docker 编排
├── frontend/                 # Vue 3 前端
│   ├── src/
│   │   ├── App.vue           # 根组件（导航栏 + 底部 Tab + 路由）
│   │   ├── components/       # 通用组件
│   │   │   ├── PetCard.vue   # 宠物卡片
│   │   │   ├── PetSkeleton.vue  # 骨架屏
│   │   │   ├── AppHeader.vue    # 导航栏
│   │   │   ├── AppFooter.vue    # 页脚
│   │   │   └── EmptyState.vue   # 空状态
│   │   ├── views/            # 页面
│   │   │   ├── HomeView.vue      # 首页
│   │   │   ├── PetsView.vue      # 宠物列表
│   │   │   ├── PetDetailView.vue # 宠物详情
│   │   │   ├── LoginView.vue     # 登录
│   │   │   ├── RegisterView.vue  # 注册
│   │   │   ├── ApplyView.vue     # 领养申请
│   │   │   ├── ApplySuccessView.vue  # 申请成功
│   │   │   ├── UserView.vue      # 个人中心
│   │   │   ├── ApplicationsView.vue  # 申请记录
│   │   │   └── ProfileView.vue   # 个人资料
│   │   ├── stores/auth.ts    # 认证状态
│   │   ├── router.ts         # 路由配置
│   │   ├── api.ts            # API 封装
│   │   └── types.ts          # 类型定义
│   └── Dockerfile            # 前端 Docker 构建
├── backend/                  # Spring Boot 后端
│   ├── src/main/java/com/chongyu/
│   │   ├── PetAdoptionApplication.java
│   │   ├── controller/       # REST API
│   │   │   ├── PetController.java
│   │   │   ├── AuthController.java
│   │   │   ├── UserController.java
│   │   │   └── ApplicationController.java
│   │   ├── mapper/           # MyBatis Mapper
│   │   ├── dto/              # 请求 DTO
│   │   ├── common/           # 统一响应 + 异常处理
│   │   └── security/         # JWT + Security 配置
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/init.sql       # 初始化 16 条宠物数据
│   └── Dockerfile            # 后端 Docker 构建
├── tests/                    # Playwright 测试
└── mock-data/                # Mock 数据
```

---

## 已知限制

1. `docker-compose.yml` 中 `characterEncoding=utf8` 应为 `UTF-8`，否则中文乱码
2. 同一用户可对同一宠物重复提交申请，无去重检查
3. 申请记录时间显示为原始 ISO 格式，未格式化为可读日期
4. SOTA 仅生成 2 张截图（要求 8 张），UI 与参考图有差距
5. `init.sql` 中密码非 BCrypt 哈希
