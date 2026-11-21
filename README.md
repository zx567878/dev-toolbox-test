# 恒温箱 · 43102620.xyz

个人博客。Astro 静态站，Markdown 写作，GitHub Actions 自动发布。

## 技术栈

| 项 | 值 |
|---|---|
| 框架 | Astro 6.4.8（**锁定，勿升 7**，见下） |
| 内容 | Markdown（`src/content/posts/`） |
| 附加 | `@astrojs/rss`、`@astrojs/sitemap` |
| 托管 | GitHub Pages（仓库 `zx567878/dev-toolbox`） |
| 发布 | push `main` → Actions 构建 → `gh-pages` 分支 |

## 本地开发

```bash
npm ci          # 安装依赖
npm run dev     # 本地预览 http://localhost:4321
npm run build   # 构建到 dist/
npm run preview # 预览构建产物
```

## 写文章

在 `src/content/posts/` 下新建 `.md` 文件，文件名即 URL（`foo.md` → `/posts/foo.html`）。

```yaml
---
title: 标题
date: 2026-11-21 13:30:00
description: 一句话摘要，显示在列表卡片
tags:
  - 杂记
draft: false
---
```

`draft: true` 的文章不构建、不显示。

## 发布

```bash
git add -A
git commit -m "post: 新文章标题"
git push
```

推送后 GitHub Actions 自动构建并发布，无需本地构建。进度见仓库 Actions 页。

## 目录

```
src/
  components/     BaseHead Header Footer HeaderLink FormattedDate
  content/posts/  文章 Markdown
  layouts/        BlogPost 布局
  pages/          index posts about 404 rss.xml posts/[slug]
  styles/         global.css
public/           favicon / img / robots.txt / .nojekyll
```

## 红线

1. **不要升级 Astro 到 7.x** —— 本机 Smart App Control 会拦截其原生 Markdown 解析器，构建直接失败。
2. **不要删除 `public/.nojekyll`** —— 否则 `/_astro/` 下的字体全部 404。
3. **不要改 `build.format`** —— 它是 `'file'`，保证文章 URL 为 `/posts/<id>.html`，改动会造成全站死链。
4. **不要把大文件放进本仓库** —— 素材统一放 `D:/incubator/_assets/`，与仓库物理隔离。
