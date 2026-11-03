# Hako Hub

Astro 7 + Tailwind CSS 4 personal site, with a content-collection driven blog.

```sh
npm run dev      # dev server (or: npx astro dev --background)
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Blog structure

```
src/
├─ content.config.ts        # collections: articles (md) + categories (json)
├─ content/
│  ├─ articles/*.md         # one file per post
│  └─ categories/*.json     # one file per category
├─ lib/blog.ts              # queries, sorting, pagination, accents
├─ components/blog/         # ArticleCard, CategoryCard, CategoryChip, Pagination
├─ layouts/PageLayout.astro  # inner-page shell (navbar + footer + theme)
└─ pages/
   ├─ articles/index.astro          # /articles
   ├─ articles/page/[page].astro    # /articles/page/2 ...
   ├─ articles/[slug].astro         # /articles/<file-name>
   ├─ categories/index.astro        # /categories
   ├─ categories/[slug].astro       # /categories/<json-file-name>
   └─ projects/index.astro          # /projects
```

## Adding a project

Projects are a plain array in `src/data/site.ts`. Set `featured: true` on the two
headline pieces — those are what the landing page shows; everything appears on
`/projects`, grouped by `track`.

## Adding a post

Create `src/content/articles/my-post.md` — the filename becomes the URL
(`/articles/my-post`).

```yaml
---
title: "Post title"
description: "One sentence used for cards, meta description and OG tags."
pubDate: 2026-02-01
updatedDate: 2026-02-10 # optional
category: systems # must match a file name in src/content/categories
tags: ["Rust", "Networking"]
draft: false # drafts are hidden in production, visible in dev
minutes: 7 # optional; otherwise estimated at ~200 wpm
---
```

Headings (`##`) are picked up automatically for the on-page table of contents.

## Adding a category

Create `src/content/categories/my-topic.json`. An empty category is fine — its
page renders an empty state instead of 404-ing.

```json
{
  "name": "My Topic",
  "abbr": "MTP",
  "description": "What belongs in this category.",
  "accent": "tag-b",
  "order": 50
}
```

`accent` must be one of `brand`, `tag-a`, `tag-b`, `tag-c` — those map to the
theme tokens in `src/styles/global.css`, so chips stay correct in light mode.
