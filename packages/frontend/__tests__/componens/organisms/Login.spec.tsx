import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { LoginForm } from "~/components/organisms/LoginForm";

expect.extend(toHaveNoViolations);

describe("Login", () => {
  test("should render correctly", () => {
    render(<LoginForm />);
  });

  test("should render username input", () => {
    render(<LoginForm />);
    const input = screen.getByLabelText("Your email");
    expect(input).toBeInTheDocument();
  });

  test("should render password input", () => {
    render(<LoginForm />);
    const input = screen.getByLabelText("Your password");
    expect(input).toBeInTheDocument();
  });

  test("should render submit button", () => {
    render(<LoginForm />);
    const button = screen.getByText("Login");
    expect(button).toBeInTheDocument();
  });

  test("should be accessible", async () => {
    const { container } = render(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
