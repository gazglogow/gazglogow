import type { MarkdownInstance } from 'astro';

export interface Post {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  imageAlt?: string;
}

const entries = import.meta.glob<MarkdownInstance<Post>>('../content/blog/*.md', { eager: true });
export const posts = Object.values(entries).sort((a, b) => String(b.frontmatter.date).localeCompare(String(a.frontmatter.date)));
export const postDate = (date: string) => new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
