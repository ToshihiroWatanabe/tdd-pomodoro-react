import React from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("初期表示のテスト", () => {
  test("「25:00」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timeLeft").textContent).toEqual("25:00");
  });
  test("「開始」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timerButton").textContent).toEqual("開始");
  });
  test("「作業」が描画されていること", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("timerMode").textContent).toEqual("作業");
  });
});

test("開始ボタンを押した直後にボタンの表示が「停止」になっていること", () => {
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  expect(getByTestId("timerButton").textContent).toEqual("停止");
});

test("開始ボタンを押してから999ミリ秒後に、「25:00」が描画されていること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  act(() => {
    jest.advanceTimersByTime(999);
  });
  expect(getByTestId("timeLeft").textContent).toEqual("25:00");
});

test("開始ボタンを押してから1000ミリ秒後に、「24:59」が描画されていること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(getByTestId("timeLeft").textContent).toEqual("24:59");
});

test("開始ボタンを押して作業時間(25分)が経過したときに、「00:00」が描画されていること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  act(() => {
    jest.advanceTimersByTime(25 * 60 * 1000);
  });
  expect(getByTestId("timeLeft").textContent).toEqual("00:00");
});

test("開始ボタンを押して作業時間(25分)が経過したときに、作業が描画されていること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  act(() => {
    jest.advanceTimersByTime(25 * 60 * 1000);
  });
  expect(getByTestId("timerMode").textContent).toEqual("作業");
});

test("開始ボタンを押して作業時間(25分) + 1秒が経過したときに、休憩が描画されていること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  act(() => {
    jest.advanceTimersByTime((25 * 60 + 1) * 1000);
  });
  expect(getByTestId("timerMode").textContent).toEqual("休憩");
});

test("開始ボタンを押して作業時間(25分) + 休憩時間(5分)が経過したときに、休憩が描画されていること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  act(() => {
    jest.advanceTimersByTime((25 * 60 + 5 * 60) * 1000);
  });
  expect(getByTestId("timerMode").textContent).toEqual("休憩");
});

test("開始ボタンを押して作業時間(25分) + 休憩時間(5分) + 1秒が経過したときに、作業が描画されていること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  act(() => {
    jest.advanceTimersByTime((25 * 60 + 5 * 60 + 1) * 1000);
  });
  expect(getByTestId("timerMode").textContent).toEqual("作業");
});

test("開始ボタンを押してから30分 + 1秒間は常にカウント表示の文字数が5であること", async () => {
  jest.useFakeTimers();
  const { getByTestId } = render(<App />);
  userEvent.click(getByTestId("timerButton"));
  let elapsedTime = 0;
  while (elapsedTime < (30 * 60 + 1) * 1000) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByTestId("timeLeft").textContent?.length).toEqual(5);
    elapsedTime += 1000;
  }
});

describe("タイマーの停止のテスト", () => {
  test("作業中に停止ボタンを押すとタイマーが停止し、残り時間がリセットされること", async () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<App />);
    userEvent.click(getByTestId("timerButton"));
    act(() => {
      jest.advanceTimersByTime(2 * 1000);
    });
    expect(getByTestId("timerMode").textContent).toEqual("作業");
    expect(getByTestId("timerButton").textContent).toEqual("停止");
    expect(getByTestId("timeLeft").textContent).not.toEqual("25:00");
    userEvent.click(getByTestId("timerButton"));
    expect(getByTestId("timerButton").textContent).toEqual("開始");
    expect(getByTestId("timeLeft").textContent).toEqual("25:00");
  });

  test("休憩中に停止ボタンを押すとタイマーが停止し、作業に切り替わり、残り時間がリセットされること", async () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<App />);
    userEvent.click(getByTestId("timerButton"));
    act(() => {
      jest.advanceTimersByTime((25 * 60 + 2) * 1000);
    });
    expect(getByTestId("timerMode").textContent).toEqual("休憩");
    expect(getByTestId("timerButton").textContent).toEqual("停止");
    expect(getByTestId("timeLeft").textContent).not.toEqual("25:00");
    userEvent.click(getByTestId("timerButton"));
    expect(getByTestId("timerMode").textContent).toEqual("作業");
    expect(getByTestId("timerButton").textContent).toEqual("開始");
    expect(getByTestId("timeLeft").textContent).toEqual("25:00");
  });
});
