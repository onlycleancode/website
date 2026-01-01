import type { CollectionEntry } from 'astro:content';
import { getGitDates, isDifferentDay } from './gitDates';
import path from 'path';

export interface EnrichedBlogData {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate: Date | undefined;
  author: string;
  tags: string[];
  draft: boolean;
  image?: string;
}

/**
 * Enriches a blog entry with git-based dates.
 * - pubDate: Uses frontmatter pubDate if provided, otherwise uses git first commit date
 * - updatedDate: Uses git last commit date if different from pubDate
 */
export function enrichBlogEntry(post: CollectionEntry<'blog'>): EnrichedBlogData {
  // Construct the file path for the blog post
  const filePath = path.join(process.cwd(), 'src/content/blog', `${post.id}.md`);

  // Get git dates
  const gitDates = getGitDates(filePath);

  // Use frontmatter pubDate if provided, otherwise use git creation date
  const pubDate = post.data.pubDate ?? gitDates.created;

  // Use git modified date as updatedDate if it's a different day than pubDate
  // and no explicit updatedDate was set in frontmatter
  let updatedDate = post.data.updatedDate;
  if (!updatedDate && isDifferentDay(pubDate, gitDates.modified)) {
    updatedDate = gitDates.modified;
  }

  return {
    ...post.data,
    pubDate,
    updatedDate,
  };
}

/**
 * Sort blog posts by publication date (newest first)
 */
export function sortByPubDate(
  a: { data: EnrichedBlogData },
  b: { data: EnrichedBlogData }
): number {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}
