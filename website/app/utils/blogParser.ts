import {
  BlogBlock,
  HeadingBlock,
  ParagraphBlock,
  ListBlock,
} from "../types/blog";

/**
 * Parses HTML content into structured blog blocks
 *
 * @param htmlContent The HTML content to parse
 * @returns An array of structured blog blocks
 */
export function parseHtmlToBlocks(htmlContent: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];

  // Simple regex-based parser (note: a DOM parser would be more robust in a production environment)
  // For headings
  const headingRegex = /<h([1-6])>(.*?)<\/h\1>/g;
  let headingMatch;
  while ((headingMatch = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(headingMatch[1], 10) as 1 | 2 | 3 | 4 | 5 | 6;
    const text = headingMatch[2].trim();

    blocks.push({
      type: "heading",
      level,
      text,
    } as HeadingBlock);
  }

  // For paragraphs
  const paragraphRegex = /<p>(.*?)<\/p>/gs;
  let paragraphMatch;
  while ((paragraphMatch = paragraphRegex.exec(htmlContent)) !== null) {
    const text = paragraphMatch[1].trim();

    blocks.push({
      type: "paragraph",
      text,
    } as ParagraphBlock);
  }

  // For lists
  const listRegex = /<ul>(.*?)<\/ul>/gs;
  let listMatch;
  while ((listMatch = listRegex.exec(htmlContent)) !== null) {
    const listContent = listMatch[1].trim();
    const itemRegex = /<li>(.*?)<\/li>/g;
    const items: string[] = [];

    let itemMatch;
    while ((itemMatch = itemRegex.exec(listContent)) !== null) {
      items.push(itemMatch[1].trim());
    }

    blocks.push({
      type: "list",
      style: "bullet",
      items,
    } as ListBlock);
  }

  return blocks;
}
