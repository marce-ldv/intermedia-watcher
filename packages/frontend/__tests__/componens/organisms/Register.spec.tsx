import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";

import { RegisterForm } from "~/components/organisms/RegisterForm";

expect.extend(toHaveNoViolations);

describe("Register", () => {
  test("should render correctly", () => {
    render(<RegisterForm />);
  });

  test("should render username input", () => {
    render(<RegisterForm />);
    const input = screen.getByLabelText("Your email");
    expect(input).toBeInTheDocument();
  });

  test("should render password input", () => {
    render(<RegisterForm />);
    const input = screen.getByLabelText("Your password");
    expect(input).toBeInTheDocument();
  });

  test("should render submit button", () => {
    render(<RegisterForm />);
    const button = screen.getByText("Sign up");
    expect(button).toBeInTheDocument();
  });

  test("should click submit button with userEvent", async () => {
    render(<RegisterForm />);
    const button = screen.getByText("Sign up");
    await userEvent.click(button);
  });

  test("should be accessible", async () => {
    const { container } = render(<RegisterForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
