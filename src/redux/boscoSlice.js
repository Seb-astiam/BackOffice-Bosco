import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  AllLocation: [],
  AllService: [],
  allAlojamientos: [],
  AllCities: [],
  Allreservas:[],
};

const boscoSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    getAllUsers (state, action) {
        state.allUsers = action.payload;
    },
    
    getAllLocation (state, action) {
      state.AllLocation = action.payload
    },
    getAllService (state, action) {
      state.AllService = action.payload
    },
    getAllAlojamientos (state, action) {
      state.allAlojamientos = action.payload;
     
  },
  getAllCities (state, action) {
    state.AllCities = action.payload
  },
  getAllReservas(state, action) {
    state.AllReservas = action.payload
  },
  },
});

export const { getAllUsers, getAllLocation, getAllService,  getAllAlojamientos ,getAllCities,getAllReservas} = boscoSlice.actions;

export default boscoSlice.reducer;
