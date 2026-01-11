import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.firstChild as HTMLElement;
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    });
  });

  it('should render spinner element', () => {
    const { container } = render(<Spinner />);

    const spinnerElement = container.querySelector(
      'div[style*="width: 40px"]'
    ) as HTMLElement;
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveStyle({
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    });
  });
});
