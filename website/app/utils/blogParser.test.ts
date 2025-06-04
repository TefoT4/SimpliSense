import { parseHtmlToBlocks } from './blogParser';

describe('parseHtmlToBlocks', () => {
  it('parses headings correctly', () => {
    const html = '<h1>Main Title</h1><h2>Sub Title</h2>';
    const result = parseHtmlToBlocks(html);
    expect(result).toContainEqual({ type: 'heading', level: 1, text: 'Main Title' });
    expect(result).toContainEqual({ type: 'heading', level: 2, text: 'Sub Title' });
  });

  it('parses paragraphs correctly', () => {
    const html = '<p>This is a paragraph.</p>';
    const result = parseHtmlToBlocks(html);
    expect(result).toEqual([
      { type: 'paragraph', text: 'This is a paragraph.' }
    ]);
  });

  it('parses lists correctly', () => {
    const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
    const result = parseHtmlToBlocks(html);
    expect(result).toEqual([
      { type: 'list', style: 'bullet', items: ['Item 1', 'Item 2'] }
    ]);
  });

  it('parses mixed content correctly', () => {
    const html = '<h1>Title</h1><p>Intro</p><ul><li>A</li><li>B</li></ul>';
    const result = parseHtmlToBlocks(html);
    expect(result).toEqual([
      { type: 'heading', level: 1, text: 'Title' },
      { type: 'paragraph', text: 'Intro' },
      { type: 'list', style: 'bullet', items: ['A', 'B'] }
    ]);
  });
});
