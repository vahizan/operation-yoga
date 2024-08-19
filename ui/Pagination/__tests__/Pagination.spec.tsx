import Pagination from "@/ui/Pagination/Pagination";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Pagination", () => {
  it("should render", () => {
    const fetchUrl = "https://api.example.com";
    const page = 0;
    const limit = 10;
    const { container } = render(
      <Pagination fetchUrl={fetchUrl} page={page} limit={limit} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render with data", () => {
    const fetchUrl = "https://api.example.com";
    const page = 0;
    const limit = 10;
    const { container } = render(
      <Pagination fetchUrl={fetchUrl} page={page} limit={limit} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render with previous and next buttons", () => {
    const fetchUrl = "https://api.example.com";
    const page = 0;
    const limit = 10;
    const { container } = render(
      <Pagination fetchUrl={fetchUrl} page={page} limit={limit} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should go to next page", async () => {
    const fetchUrl = "https://api.example.com";
    const page = 0;
    const limit = 10;
    const { container } = render(
      <Pagination fetchUrl={fetchUrl} page={page} limit={limit} />
    );
    const nextButton = screen.getByRole("button", { name: "Next" });
    await userEvent.click(nextButton);
    const label = screen.getByLabelText("currentPage");
    expect(label).toHaveValue("1");
  });
});
