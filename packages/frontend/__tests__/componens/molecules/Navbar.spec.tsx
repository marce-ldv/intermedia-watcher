import { render, screen } from "@testing-library/react";
import { CustomNavbar } from "~/components/molecules/Navbar";

describe("Navbar", () => {
  test('mocks the useRouter hook', () => {
    render(<CustomNavbar />);
  });

  test('should render the logo', () => {
    render(<CustomNavbar />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  })
});
