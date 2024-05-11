import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTimer,
  setDefault,
  setRunning,
  setMessage,
} from "./store/slice/timerSlice.js";

function toTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function toSeconds(time: string) {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export default function Controls() {
  const dispatch = useDispatch();
  const { timer } = useSelector((state: any) => state.timer) || 99; // Assuming timer state is stored in Redux
  const { state } = useSelector((state: any) => state.timer) || "running";
  const { defaultValue } = useSelector((state: any) => state.timer) || 300;
  const { message } = useSelector((state: any) => state.timer) || "";

  const [newTimer, setNewTimer] = useState("300");

  const handleChange = (event: any) => {
    setNewTimer("" + toSeconds(event.target.value));
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (state !== "stopped") {
      // Check if state is not "stopped" before starting the timer
      intervalId = setInterval(() => {
        dispatch(setTimer(timer - 1));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer, state, dispatch]);

  const setTimerHandler = () => {
    dispatch(setDefault(newTimer)); // Dispatching action to set timer value in Redux
    dispatch(setTimer(newTimer)); // Dispatching action to set timer value in Redux
  };

  return (
    <div className="w-full h-48 flex items-center justify-center">
      <div className="p-5 flex flex-col">
        <div className="flex justify-center gap-3">
          <div
            className={`px-3 py-1.5 my-3 w-20 rounded-md text-white text-center ${
              state === "running" ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={() =>
              dispatch(setRunning(state === "running" ? "stopped" : "running"))
            }
          >
            {state === "running" ? "Stop" : "Resume"}
          </div>
          <button
            className="px-3 py-1.5 my-3 w-20 rounded-md bg-gray-300"
            onClick={() => dispatch(setTimer(defaultValue))}
          >
            Restart
          </button>
        </div>
        <div>
          <input
            className="p-1 px-3 -mx-3 mr-2 rounded-lg bg-white"
            type="time"
            step="1"
            value={toTime(Number(newTimer))}
            onChange={handleChange}
          />
          <button
            className="p-1 px-2 m-1 bg-yellow-500 text-white rounded-md"
            onClick={setTimerHandler}
          >
            Set Timer
          </button>
        </div>
      </div>

      {message != "" && (
        <article className="fixed animate-appear bottom-20 bg-orange-200 border-orange-400 border-2 rounded-xl px-6 pr-16 py-3 text-black font-semibold text-xl min-w-96 text-center">
          {message}

          <button
            className="text-red-500 font-black absolute right-3 rounded-full bg-yellow-100 border-yellow-600 border w-8 h-8"
            onClick={() => dispatch(setMessage(""))}
          >
            X
          </button>
        </article>
      )}
    </div>
  );
}
