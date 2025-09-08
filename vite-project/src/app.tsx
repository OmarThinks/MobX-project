import React, { useEffect, useState } from "react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

const myTimer = new Timer();

const TimerView = observer(() => {
  const [timer] = useState(() => new Timer()); // See the Timer definition above.

  useEffect(() => {
    const handle = setInterval(() => {
      timer.increaseTimer();
    }, 1000);
    return () => {
      clearInterval(handle);
    };
  }, [timer]);

  return <span>Seconds passed: {timer.secondsPassed}</span>;
});

function App() {
  return <TimerView timer={myTimer} />;
}

export { App };
