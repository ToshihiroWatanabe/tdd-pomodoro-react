import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { ONCE_COUNT, COUNT_INTERVAL } from "./App";

describe("初期表示のテスト", () => {
  test("「25:00」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timeLeft").innerHTML).toMatch(/25:00/);
  });
  test("「開始」と書かれたボタンが1つ描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timerButton").innerHTML).toMatch(/開始/);
  });
  test("「作業」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timerMode").innerHTML).toMatch(/作業/);
  });
});

test("開始ボタンを押した直後にボタンの表示が「停止」になっていること", () => {
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  expect(getByTestId("timerButton").innerHTML).toMatch(/停止/);
});

test("開始ボタンを押してからCOUNT_INTERVAL - 1ミリ秒後に、「25:00」が描画されていること", () => {
  // const { getByTestId } = render(<App />);
  // userEvent.click(getByTestId("timerButton"));
  // jest.useFakeTimers();
  // jest.advanceTimersByTime(COUNT_INTERVAL - 1);
  // expect(getByTestId("timeLeft").innerHTML).toMatch(/25:00/);
});

test("開始ボタンを押してからCOUNT_INTERVAL + 10ミリ秒後に、「24:59」が描画されていること", () => {
  // const { getByTestId } = render(<App />);
  // userEvent.click(getByTestId("timerButton"));
  // jest.useFakeTimers();
  // jest.advanceTimersByTime(1010);
  // expect(getByTestId("timeLeft").innerHTML).toMatch(/24:59/);
});

test("休憩が描画されていること", () => {
  // const { getByTestId } = render(<App />);
  // userEvent.click(getByTestId("timerButton"));
  // jest.useFakeTimers();
  // jest.advanceTimersByTime(25 * 60 + 1);
  // expect(getByTestId("timerMode").innerHTML).toMatch(/休憩/);
});

test("ONCE_COUNTが2のとき、開始ボタンを押してからCOUNT_INTERVALミリ秒後に、「24:58」が描画されていること", () => {});

// describe("作業と休憩の切り替わりのテスト", () => {
//   test("作業タイマーの残り時間が0になった次のカウントの直後に、休憩と表示されていること", () => {
//     render(<App />);
//   });
// });
