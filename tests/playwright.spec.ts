import { test, expect } from '@playwright/test';

const TEST_USER = {
  username: 'zhangsan',
  password: '123456',
};

test.describe('宠遇 - 核心验收', () => {
  test('首页加载正常，展示分类入口与今日推荐', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=宠遇')).toBeVisible();
    await expect(page.locator('text=今日推荐')).toBeVisible();
    // 断言分类卡片存在（狗、猫、其他）
    await expect(page.locator('text=狗')).toBeVisible();
    await expect(page.locator('text=猫')).toBeVisible();
  });

  test('宠物列表加载并支持筛选', async ({ page }) => {
    await page.goto('/pets');
    await expect(page.locator('[data-testid="pet-card"]').first()).toBeVisible();
    // 点击"狗"分类筛选
    await page.locator('button:has-text("狗")').first().click();
    // 断言列表更新
    await expect(page.locator('[data-testid="pet-card"]')).not.toHaveCount(0);
  });

  test('宠物列表支持排序切换', async ({ page }) => {
    await page.goto('/pets');
    // 点击排序按钮切换
    await page.locator('[data-testid="sort-select"]').click();
    await page.locator('text=年龄').click();
    await expect(page.locator('[data-testid="pet-card"]').first()).toBeVisible();
  });

  test('点击宠物卡片进入详情页', async ({ page }) => {
    await page.goto('/pets');
    await page.locator('[data-testid="pet-card"]').first().click();
    // 断言路由跳转到 /pet/:id
    await expect(page).toHaveURL(/\/pet\/\d+/);
    await expect(page.locator('[data-testid="pet-name"]')).toBeVisible();
  });

  test('详情页"申请领养"未登录时重定向到登录页', async ({ page }) => {
    await page.goto('/pet/1');
    await page.locator('text=申请领养').click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('用户注册流程', async ({ page }) => {
    await page.goto('/register');
    const uniqueUser = `testuser_${Date.now()}`;
    await page.fill('input[name="username"]', uniqueUser);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirmPassword"]', '123456');
    await page.fill('input[name="email"]', `${uniqueUser}@test.com`);
    await page.click('button[type="submit"]');
    // 注册成功应跳转到登录页
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
  });

  test('用户登录流程', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', TEST_USER.username);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    // 登录成功后导航栏显示用户名
    await expect(page.locator(`text=${TEST_USER.username}`)).toBeVisible({ timeout: 5000 });
  });

  test('登录后可提交领养申请', async ({ page }) => {
    // 先登录
    await page.goto('/login');
    await page.fill('input[name="username"]', TEST_USER.username);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/');
    // 进入宠物详情
    await page.goto('/pet/1');
    await page.locator('text=申请领养').click();
    await expect(page).toHaveURL(/\/apply\/1/);
    // 填写申请表
    await page.fill('input[name="realName"]', '张三');
    await page.fill('input[name="phone"]', '13800138000');
    await page.fill('input[name="address"]', '北京市朝阳区');
    await page.click('button[type="submit"]');
    // 断言申请提交成功
    await expect(page.locator('text=申请已提交')).toBeVisible({ timeout: 5000 });
  });

  test('登录后表单验证 - 无效手机号', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', TEST_USER.username);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/');
    await page.goto('/apply/1');
    // 提交空手机号
    await page.fill('input[name="phone"]', '12345');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=手机号格式不正确')).toBeVisible();
  });

  test('个人中心与申请记录页面', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="username"]', TEST_USER.username);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/');
    // 进入个人中心
    await page.goto('/user');
    await expect(page.locator(`text=${TEST_USER.username}`)).toBeVisible();
    // 进入申请记录
    await page.goto('/user/applications');
    await expect(page.locator('[data-testid="application-item"]').first()).toBeVisible();
  });

  test('移动端汉堡菜单可交互', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    // 点击汉堡菜单按钮
    await page.locator('[data-testid="hamburger-btn"]').click();
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
    // 点击导航链接
    await page.locator('[data-testid="mobile-nav"] a:has-text("宠物列表")').click();
    await expect(page).toHaveURL(/\/pets/);
  });

  test('筛选无结果时显示空态', async ({ page }) => {
    await page.goto('/pets');
    // 触发一个不太可能匹配的组合筛选
    await page.locator('select[name="type"]').selectOption('dog');
    await page.locator('select[name="size"]').selectOption('large');
    // 如果结果为空，应显示空态
    const emptyState = page.locator('text=没有找到匹配的宠物');
    const petCards = page.locator('[data-testid="pet-card"]');
    const cardCount = await petCards.count();
    if (cardCount === 0) {
      await expect(emptyState).toBeVisible();
    }
  });
});
