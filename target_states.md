# 宠遇 - 关键状态验收清单

本文件列出任务必须验收的关键状态。SOTA Agent 应提供对应截图或测试证据。

## 状态列表

| 编号 | 状态名称 | 触发方式 | 验收标准 | 证据位置 |
|---|---|---|---|---|
| s001 | 加载态 | 进入宠物列表 / 筛选切换 | 显示骨架屏或 loading spinner，无白屏 | `screenshots/state_loading.png` |
| s002 | 空态 | 筛选无匹配宠物 | 显示空状态插画与"没有找到匹配的宠物"文案 | `screenshots/state_empty.png` |
| s003 | 错误态 | 网络断开 / 后端不可用 | 显示错误提示 toast 或错误页面，不影响导航 | `screenshots/state_error.png` |
| s004 | 登录成功态 | 正确输入用户名密码登录 | 导航栏显示用户头像和用户名，重定向到目标页 | `screenshots/state_login_success.png` |
| s005 | 申请成功态 | 提交领养申请表单 | 显示成功提示与申请编号 | `screenshots/state_apply_success.png` |
| s006 | hover 交互态 | 鼠标悬停宠物卡片 | 卡片 scale(1.03) + 阴影加深 | `screenshots/state_hover_card.png` |
| s007 | 按钮按压态 | 点击按钮 | 按钮 translateY(2px)，阴影缩小 | `screenshots/state_button_press.png` |
| s008 | 输入框聚焦态 | 聚焦输入框 | 输入框向左上偏移 2px + 彩色阴影 | `screenshots/state_input_focus.png` |
| s009 | 移动端菜单态 | 视口宽度 < 768px | 汉堡菜单可展开/收起，显示导航链接 | `screenshots/state_mobile_menu.png` |
| s010 | 表单验证错误态 | 提交空表单 / 无效手机号 | 行内错误提示红色文字 | `screenshots/state_form_error.png` |

## 截图要求

- 桌面端截图宽度：1440px
- 移动端截图宽度：390px
- 每张截图需包含浏览器地址栏与完整页面
