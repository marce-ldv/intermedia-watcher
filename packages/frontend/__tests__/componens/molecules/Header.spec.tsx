import { render, screen } from '@testing-library/react';
import Header from "~/components/molecules/Header";

describe('Header', () => {
  test('should render correctly', () => {
    render(<Header />);
  });

  test('should render the title', () => {
    render(<Header />);
    const title = screen.getByText(/All products/i);
    expect(title).toBeInTheDocument();
  });

  test('should render the breadcrumb', () => {
    render(<Header />);
    const breadcrumb = screen.getByText(/Home/i);
    expect(breadcrumb).toBeInTheDocument();
  });

  test('should render the cog icon', () => {
    render(<Header />);
    const cogIcon = screen.getByText(/Configure/i);
    expect(cogIcon).toBeInTheDocument();
  });

  test('should render the trash icon', () => {
    render(<Header />);
    const trashIcon = screen.getByText(/Delete/i);
    expect(trashIcon).toBeInTheDocument();
  });
});
