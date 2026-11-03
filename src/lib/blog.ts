import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"articles">;
export type Category = CollectionEntry<"categories">;

/** Accent tokens available to categories in `global.css`. */
export type Accent = Category["data"]["accent"];

/** Chip colour pairs per accent, kept in one place so cards/pills agree. */
export const accentClasses: Record<
  Accent,
  { text: string; border: string; bg: string; dot: string; hover: string }
> = {
  brand: {
    text: "text-brand-ink",
    border: "border-brand/35",
    bg: "bg-brand-soft",
    dot: "bg-brand",
    hover: "hover:border-brand/50",
  },
  "tag-a": {
    text: "text-tag-a",
    border: "border-tag-a/35",
    bg: "bg-tag-a/10",
    dot: "bg-tag-a",
    hover: "hover:border-tag-a/50",
  },
  "tag-b": {
    text: "text-tag-b",
    border: "border-tag-b/35",
    bg: "bg-tag-b/10",
    dot: "bg-tag-b",
    hover: "hover:border-tag-b/50",
  },
  "tag-c": {
    text: "text-tag-c",
    border: "border-tag-c/35",
    bg: "bg-tag-c/10",
    dot: "bg-tag-c",
    hover: "hover:border-tag-c/50",
  },
};

/** Newest first; drafts are stripped outside of dev builds. */
export function sortArticles(entries: Article[]): Article[] {
  return [...entries].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/** Every published article, newest first. */
export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection("articles", ({ data }) => {
    return import.meta.env.DEV || !data.draft;
  });
  return sortArticles(entries);
}

/** Categories ordered by their explicit weight, then by name. */
export async function getCategories(): Promise<Category[]> {
  const entries = await getCollection("categories");
  return [...entries].sort(
    (a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name),
  );
}

export type CategoryWithCount = {
  category: Category;
  articles: Article[];
};

/**
 * Categories paired with their published articles (newest first). Built from a
 * single pass over the article list so the two pages stay in sync.
 */
export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const [categories, articles] = await Promise.all([getCategories(), getArticles()]);
  const byCategory = new Map<string, Article[]>();
  for (const article of articles) {
    const key = article.data.category.id;
    const bucket = byCategory.get(key);
    if (bucket) bucket.push(article);
    else byCategory.set(key, [article]);
  }
  return categories.map((category) => ({
    category,
    articles: byCategory.get(category.id) ?? [],
  }));
}

/** id -> category, for resolving references without N+1 collection calls. */
export async function getCategoryMap(): Promise<Map<string, Category>> {
  const categories = await getCategories();
  return new Map(categories.map((category) => [category.id, category]));
}

/** Chronological neighbours within the category, used for prev/next links. */
export function getSiblings(
  article: Article,
  all: Article[],
): { newer: Article | null; older: Article | null } {
  const index = all.findIndex((entry) => entry.id === article.id);
  if (index === -1) return { newer: null, older: null };
  return {
    // `all` is newest first, so the previous index is newer.
    newer: index > 0 ? all[index - 1] : null,
    older: index < all.length - 1 ? all[index + 1] : null,
  };
}

/** Tag frequency across the given articles, most common first. */
export function collectTags(articles: Article[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Paginate a list without throwing on out-of-range pages. */
export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): { items: T[]; page: number; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
  };
}

/** Rough read time from the raw markdown body, at 200 words per minute. */
export function estimateMinutes(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Resolved read time: an explicit frontmatter value always wins. */
export function readMinutes(article: Article): number {
  return article.data.minutes ?? estimateMinutes(article.body);
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

/** `2026-01-18` — machine readable value for <time datetime>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export const ARTICLES_PER_PAGE = 5;
