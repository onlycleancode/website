import { execSync } from 'child_process';

export interface GitDates {
  created: Date;
  modified: Date;
}

/**
 * Get the first commit date (creation) and last commit date (modification) for a file.
 * Falls back to current date if git history is not available.
 */
export function getGitDates(filePath: string): GitDates {
  const now = new Date();

  try {
    // Get the first commit date (when the file was added)
    const createdTimestamp = execSync(
      `git log --follow --format=%aI --diff-filter=A -- "${filePath}" | tail -1`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim();

    // Get the last commit date (most recent modification)
    const modifiedTimestamp = execSync(
      `git log -1 --format=%aI -- "${filePath}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim();

    const created = createdTimestamp ? new Date(createdTimestamp) : now;
    const modified = modifiedTimestamp ? new Date(modifiedTimestamp) : now;

    return { created, modified };
  } catch {
    // If git is not available or file is not tracked, return current date
    return { created: now, modified: now };
  }
}

/**
 * Check if two dates are on different days (ignoring time)
 */
export function isDifferentDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
}
