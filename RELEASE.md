# Release Management

本项目使用 `release-it` 和 `@release-it/bumper` 实现 monorepo 统一版本管理。

## 功能特性

- 🔄 **统一版本管理**: 所有 workspace 包版本保持同步
- 🤖 **自动化发布**: GitHub Action 自动触发版本发布
- 📝 **自动生成 Changelog**: 基于 commit 信息自动生成发布说明
- 🏷️ **Git 标签**: 自动创建版本标签
- 📦 **GitHub Release**: 自动创建 GitHub Release

## 配置文件

### `.release-it.json`
主要配置文件，定义了：
- Git 提交信息和标签格式
- GitHub Release 配置
- 需要同步版本的包列表

### `.github/workflows/release.yml`
GitHub Action 工作流，支持：
- 自动发布：当代码合并到 `main` 分支时自动执行 patch 版本发布
- 手动发布：通过 GitHub Actions 界面手动触发，可选择版本类型

## 使用方法

### 本地发布

```bash
# 预览发布（不实际执行）
pnpm release:dry

# 发布 patch 版本 (0.0.1 -> 0.0.2)
pnpm release:patch

# 发布 minor 版本 (0.0.1 -> 0.1.0)
pnpm release:minor

# 发布 major 版本 (0.0.1 -> 1.0.0)
pnpm release:major
```

### 自动发布

1. **自动触发**: 当 PR 合并到 `main` 分支时，会自动执行 patch 版本发布
2. **手动触发**: 在 GitHub Actions 页面手动触发 workflow，可选择版本类型

### 版本同步的包

当前配置会同步以下包的版本：
- `package.json` (根目录)
- `apps/web/package.json`
- `packages/ui/package.json`
- `packages/typescript-config/package.json`
- `packages/eslint-config/package.json`

## 工作流程

1. 开发完成后，创建 PR 到 `main` 分支
2. PR 合并后，GitHub Action 自动触发
3. 执行构建和测试
4. 自动更新所有包的版本号
5. 创建 commit 和 git tag
6. 创建 GitHub Release
7. 推送更改到仓库

## 注意事项

- 确保 `GITHUB_TOKEN` 有足够的权限
- 发布 commit 会被自动跳过，避免无限循环
- 建议在发布前确保所有测试通过
- 可以通过 `release:dry` 命令预览发布内容

## 自定义配置

如果需要添加新的包到版本同步列表，请修改 `.release-it.json` 文件中的 `plugins["@release-it/bumper"]` 配置。 