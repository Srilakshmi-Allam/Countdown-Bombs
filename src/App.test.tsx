import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Explode button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Explode/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders all bombs initially", () => {
  render(<App />);
  const bombElements = screen.getAllByText(/Time left:/i);
  expect(bombElements.length).toBe(3);
});

test("all bombs explode eventually", async () => {
  render(<App />);
  const buttonElement = screen.getByText(/Explode/i);
  buttonElement.click();

  jest.useFakeTimers();
  jest.runAllTimers();

  const explodedElements = await screen.findAllByText(/Exploded/i);
  expect(explodedElements.length).toBe(3);
});
