import React from 'react';
import errorBoundary from '../transpile/errorBoundary';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('errorBoundary', () => {
  // Definindo um manipulador para erros não capturados para evitar que o Jest falhe o teste prematuramente
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should wrap PFCs in an error boundary and catch errors', () => {
    const errorCb = jest.fn();

    const ProblematicComponent = () => {
      throw new Error('test');
    };
    const WrappedComponent = errorBoundary(ProblematicComponent, errorCb);

    expect(() => render(<WrappedComponent />)).not.toThrow();
    expect(errorCb).toHaveBeenCalled();
  });

  it('should wrap Components in an error boundary and catch errors', () => {
    const errorCb = jest.fn();

    class ProblematicComponent extends React.Component {
      render() {
        throw new Error('test');
      }
    }
    const WrappedComponent = errorBoundary(ProblematicComponent, errorCb);

    expect(() => render(<WrappedComponent />)).not.toThrow();
    expect(errorCb).toHaveBeenCalled();
  });
});
