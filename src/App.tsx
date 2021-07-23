import { exception } from "console";
import React, { useState } from "react";

/** 一度にカウントする秒数 */
export const ONCE_COUNT = 1;
/** カウントの間隔(ミリ秒) */
export const COUNT_INTERVAL = 1000;
/** カウントのsetIntervalのID */
let countInterval = 0;

/** タイマーモード */
type TimerMode = "work" | "break";

/** タイマーの長さ */
const TIMER_LENGTH = { work: 25 * 60, break: 5 * 60 } as const;
type TIMER_LENGTH = typeof TIMER_LENGTH[keyof typeof TIMER_LENGTH];

interface State {
  timeLeft: number;
  timerMode: TimerMode;
  isTimerOn: boolean;
}

/**
 * 秒の数値をMM:SS形式の文字列に変換します。
 * @param {number} second 秒
 * @returns MM:SS形式の文字列
 */
const secondToMMSS = (second: number) => {
  const MM =
    second >= 10 * 60
      ? Math.floor(second / 60).toString()
      : second >= 1 * 60
      ? "0" + Math.floor(second / 60).toString()
      : "00";
  const SS = second % 60 >= 10 ? second % 60 : "0" + (second % 60);
  return MM + ":" + SS;
};

const App = () => {
  const [state, setState] = useState<State>({
    timeLeft: TIMER_LENGTH.work,
    timerMode: "work",
    isTimerOn: false,
  });

  const onButtonClick = () => {
    setState((state) => {
      clearInterval(countInterval);
      if (state.isTimerOn) {
        return {
          ...state,
          timeLeft: TIMER_LENGTH.work,
          timerMode: "work",
          isTimerOn: false,
        };
      } else {
        countInterval = window.setInterval(() => {
          count();
        }, COUNT_INTERVAL);
        return { ...state, isTimerOn: true };
      }
    });
  };

  const count = () => {
    setState((state) => {
      if (state.timeLeft < 1) {
        state = toggleTimerMode(state);
      }
      return { ...state, timeLeft: state.timeLeft - ONCE_COUNT };
    });
  };

  const toggleTimerMode = (state: State): State => {
    const timeLeft =
      state.timerMode === "work" ? TIMER_LENGTH.break : TIMER_LENGTH.work;
    const timerMode = state.timerMode === "work" ? "break" : "work";
    return {
      ...state,
      timeLeft: timeLeft,
      timerMode: timerMode,
    };
  };

  return (
    <>
      <div data-testid="timeLeft">{secondToMMSS(state.timeLeft)}</div>
      <button onClick={onButtonClick} data-testid="timerButton">
        {state.isTimerOn ? "停止" : "開始"}
      </button>
      <div data-testid="timerMode">
        {state.timerMode === "work" ? "作業" : "休憩"}
      </div>
    </>
  );
};

export default App;
