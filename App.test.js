import React from "react";
import renderer from "react-test-renderer";

import App from "./App";
// Import the modules you want to mock
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Mock the modules using Jest's jest.mock() function
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("redux-persist", () => {
  const real = jest.requireActual("redux-persist");
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});
jest.mock("redux-persist/es/integration/react", () => ({
  PersistGate: (props) => props.children,
}));

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
