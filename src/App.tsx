import React, { useEffect, useState } from "react";

/** タイマーの長さ */
const TIMER_LENGTH = { work: 25 * 60, break: 5 * 60 } as const;
type TIMER_LENGTH = typeof TIMER_LENGTH[keyof typeof TIMER_LENGTH];

/** タイマーモード */
type TimerMode = "work" | "break";

interface State {
  timeLeft: number;
  isTimerOn: boolean;
  timerMode: TimerMode;
}

/** タイマーのカウントのsetIntervalのID */
let timerCountInterval = 0;

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
    isTimerOn: false,
    timerMode: "work",
  });

  useEffect(() => {
    return () => {
      clearInterval(timerCountInterval);
    };
  }, []);

  const onButtonClick = () => {
    setState((state) => {
      if (state.isTimerOn) {
        return {
          ...state,
          timeLeft: TIMER_LENGTH.work,
          timerMode: "work",
          isTimerOn: false,
        };
      }
      timerCountInterval = window.setInterval(() => {
        timerCount();
      }, 1000);
      return { ...state, isTimerOn: true };
    });
  };

  const timerCount = () => {
    setState((state) => {
      if (state.timeLeft <= 0) {
        state = toggleTimerMode(state);
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
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
      <button data-testid="timerButton" onClick={onButtonClick}>
        {state.isTimerOn ? "停止" : "開始"}
      </button>
      <div data-testid="timerMode">
        {state.timerMode === "work" ? "作業" : "休憩"}
      </div>
    </>
  );
};

export default App;
