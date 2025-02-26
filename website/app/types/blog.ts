// Define the structure for blog content blocks
export type BlogBlockType = 
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'image'
  | 'quote';

// Define the base interface for all blog blocks
export interface BaseBlogBlock {
  type: BlogBlockType;
  id?: string;
}

// Heading block
export interface HeadingBlock extends BaseBlogBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

// Paragraph block
export interface ParagraphBlock extends BaseBlogBlock {
  type: 'paragraph';
  text: string;
}

// List block
export interface ListBlock extends BaseBlogBlock {
  type: 'list';
  style: 'bullet' | 'numbered';
  items: string[];
}

// Image block
export interface ImageBlock extends BaseBlogBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

// Quote block
export interface QuoteBlock extends BaseBlogBlock {
  type: 'quote';
  text: string;
  author?: string;
}

// Union type for all possible blog blocks
export type BlogBlock = 
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | ImageBlock
  | QuoteBlock;

// Extended Post interface with structured content
export interface PostContent {
  blocks: BlogBlock[];
} 