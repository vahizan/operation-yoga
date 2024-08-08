import Pagination from "@/ui/Pagination/Pagination";
import { render } from "@testing-library/react";

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
});
