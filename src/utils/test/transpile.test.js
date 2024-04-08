import React from 'react';
import { generateElement, renderElementAsync } from '../transpile';
import { render, screen } from '@testing-library/react';

describe('transpile', () => {
  describe('generateElement', () => {
    it('should transpile JSX', () => {
      const code = '<div>Hello World!</div>';
      const Component = generateElement({ code });
      render(<Component />);

      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

    it('should transpile PFCs', () => {
      const code = '() => <div>Hello World!</div>';
      const Component = generateElement({ code });
      render(<Component />);

      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

    it('should transpile components', () => {
      const code = 'class Test extends React.Component { render() { return <div>Hello World!</div> }}';
      const Component = generateElement({ code });
      render(<Component />);

      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

    it('should handle trailing semicolons', () => {
      const code = '<div>Hello World!</div>;\n';
      const Component = generateElement({ code });
      render(<Component />);

      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

    it('should emit errors on error callback', () => {
      const code = '<div>';

      expect(() => {
        generateElement({ code });
      }).toThrow();
    });

    it('should not throw on Object.assign usage', () => {
      const code = '() => { const props = { b: "b" }; return <div a="a" {...props} /> }';

      expect(() => {
        generateElement({ code });
      }).not.toThrow();
    });

    it('should ignore comments', () => {
      const code = '// Comment\n<div>Hello World!</div>';
      const Component = generateElement({ code });
      render(<Component />);

      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
  });

  describe('renderElementAsync', () => {
    // Async tests need to be handled differently since renderElementAsync seems to be a custom function.
    // Assuming renderElementAsync somehow eventually calls the callback with a React component
    // we can simulate this async behavior as follows:
    it('should emit error if render is not called', async () => {
      const errorCb = jest.fn();

      renderElementAsync({ code: '' }, null, errorCb);

      // wait for any async actions to settle
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(errorCb).toHaveBeenCalledWith(
        new SyntaxError('No-Inline evaluations must call `render`.')
      );
    });

    it('should emit result via the result callback', async () => {
      const resultCb = jest.fn();
      const code = 'render(<div>Hello World!</div>)';

      renderElementAsync({ code }, resultCb);

      // Assuming renderElementAsync calls resultCb asynchronously
      await new Promise(resolve => setTimeout(resolve, 0));

      const Component = resultCb.mock.calls[0][0];
      render(<Component />);

      expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
  });
});
