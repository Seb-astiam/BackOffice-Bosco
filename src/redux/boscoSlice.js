import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
};

const boscoSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    getAllUsers (state, action) {
        state.allUsers = action.payload;
    },
  },
});

export const { getAllUsers } = boscoSlice.actions;

export default boscoSlice.reducer;
