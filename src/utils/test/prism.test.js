import prism from '../prism';

describe('Prism Syntax Highlighter', () => {
  describe('when highlighting JavaScript code', () => {
    const input = 'var x = "Hello World!";';
    const expectedOutput = '<span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span>';

    it('should return HTML string with correct syntax highlighting classes', () => {
      const result = prism(input);
      expect(result).toBe(expectedOutput);
    });

  });
});
