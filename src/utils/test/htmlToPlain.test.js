import htmlToPlain from '../htmlToPlain'

describe('htmlToPlain', () => {
  it('converts escaped html to a plain string', () => {
    const html = '&lt;div&gt;abc&lt;/div&gt;<br><span>';
    expect(htmlToPlain(html)).toBe('<div>abc</div>\n');
  });

  it('removes HTML tags and keeps the content', () => {
    const complexHtml = '<p>Hello, <strong>World!</strong></p>';
    expect(htmlToPlain(complexHtml)).toBe('Hello, World!');
  });

  it('converts HTML entities to their corresponding characters', () => {
    const entitiesHtml = 'The &amp; symbol is called an ampersand.';
    expect(htmlToPlain(entitiesHtml)).toBe('The & symbol is called an ampersand.');
  });

  it('preserves newlines from <br> tags', () => {
    const newlinesHtml = 'First line.<br>Second line.<br/>Third line.<br />Fourth line.';
    expect(htmlToPlain(newlinesHtml)).toBe('First line.\nSecond line.\nThird line.\nFourth line.');
  });

  it('removes unnecessary whitespace', () => {
    const spacedHtml = '<div>    Hello,    <span> World! </span> </div>';
    expect(htmlToPlain(spacedHtml)).toBe('Hello, World!');
  });

  it('handles unclosed tags', () => {
    const unclosedHtml = '<div>Some text <span>and more text';
    expect(htmlToPlain(unclosedHtml)).toBe('Some text and more text');
  });

  it('ignores script and style content', () => {
    const scriptStyleHtml = '<style>div { color: red; }</style><div>Visible text</div><script>console.log("Hidden text");</script>';
    expect(htmlToPlain(scriptStyleHtml)).toBe('Visible text');
  });
})
