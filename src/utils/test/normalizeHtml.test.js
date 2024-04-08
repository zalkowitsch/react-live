import normalizeHtml from '../normalizeHtml'

describe('normalizeHtml', () => {
  it('replaces newlines with <br> tags', () => {
    const input = '\n';
    const expectedOutput = '<br>';
    expect(normalizeHtml(input)).toBe(expectedOutput);
  });

  it('replaces multiple newlines with multiple <br> tags', () => {
    const input = '\n\n';
    const expectedOutput = '<br><br>';
    expect(normalizeHtml(input)).toBe(expectedOutput);
  });

  it('does not alter a string without newlines', () => {
    const input = 'Hello World';
    const expectedOutput = 'Hello World';
    expect(normalizeHtml(input)).toBe(expectedOutput);
  });

  it('preserves existing HTML tags', () => {
    const input = '<p>Hello\nWorld</p>';
    const expectedOutput = '<p>Hello<br>World</p>';
    expect(normalizeHtml(input)).toBe(expectedOutput);
  });

  it('handles a mix of whitespace characters', () => {
    const input = ' \n \t\n';
    const expectedOutput = ' <br> \t<br>';
    expect(normalizeHtml(input)).toBe(expectedOutput);
  });
});
