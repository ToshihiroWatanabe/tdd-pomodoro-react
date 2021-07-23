import React, { useState } from "react";

/** タイマーの長さ */
const TIMER_LENGTH = { work: 25 * 60, break: 5 * 60 } as const;
type TIMER_LENGTH = typeof TIMER_LENGTH[keyof typeof TIMER_LENGTH];

interface State {
  timeLeft: number;
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
  });
  return (
    <>
      <div data-testid="timeLeft">{secondToMMSS(state.timeLeft)}</div>
    </>
  );
};

export default App;
