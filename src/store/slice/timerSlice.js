import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 300,
  defaultValue: 300,
  state: "running",
  message: "",
  isStopped: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimer: (state, action) => {
      if (state.isStopped && action.payload <= 0) {
        return;
      } else if (action.payload > 0) {
        state.isStopped = false;
      }
      if (action.payload > 359000) {
        state.message = "Timer cannot be more than 100 hours";
        return;
      }
      if (action.payload < 0) {
        state.isStopped = true;
        state.message = "Timer ended";
        state.state = "stopped";
        return;
      }
      state.timer = action.payload;
    },
    setDefault: (state, action) => {
      if (action.payload > 359000) {
        state.message = "Timer cannot be more than 100 hours";
        return;
      }
      state.defaultValue = action.payload;
    },
    setRunning: (state, action) => {
      if (action.payload === "running" && state.timer === 0) {
        return;
      }
      state.state = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setIsStopped: (state, action) => {
      state.isStopped = action.payload;
    },
  },
});

export const { setTimer, setDefault, setRunning, setMessage } =
  timerSlice.actions;

export default timerSlice.reducer;
