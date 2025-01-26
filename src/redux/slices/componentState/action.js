import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStatus: "",
};

export const componentState = createSlice({
  name: "componentState",
  initialState,
  reducers: {
    setSelectedStatus: (state, { payload }) => {
      state.selectedStatus = payload;
    },
  },
});

export const { setSelectedStatus } = componentState.actions;

export default componentState.reducer;
