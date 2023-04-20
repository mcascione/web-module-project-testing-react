import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./../Display";
import * as FetchShow from "./../../api/fetchShow";

const testShow = {
  name: "test show",
  summary: "test summary",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 1,
      name: "Season 2",
      episodes: [],
    },
  ],
};

test("renders without errors with no props", async () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
    const mockFetchShow = jest.spyOn(FetchShow, "default").mockResolvedValue(testShow);
    render(<Display />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockFetchShow).toHaveBeenCalledTimes(1);
    const show = await screen.findByTestId("show-container");
    expect(show).toBeInTheDocument;
});

test("renders show season options matching your data when the button is clicked", async () => {
  jest.spyOn(FetchShow, "default").mockResolvedValue(testShow);
  render(<Display />);
  fireEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    const season = screen.queryAllByTestId("season-option");
    expect(season).toHaveLength(2);
  })
});

test("displayFunc is called when the fetch button is pressed", async() => {
    jest.spyOn(FetchShow, "default").mockResolvedValue(testShow);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc}/>);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
});