import React from "react";
import { render } from "@testing-library/react";
import Estado from "../controllers/Estado";

// eslint-disable-next-line no-undef
test("renders learn react link", () => {
  const { getByText } = render(<Estado />);
  const linkElement = getByText("Estado");
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});