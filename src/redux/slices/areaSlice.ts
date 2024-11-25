import { createSlice } from '@reduxjs/toolkit';

const areaSlice = createSlice({
  name: 'farmArea',
  initialState: {
    farmAreaDetail: null,
  },
  reducers: {
    setFarmAreaDetail: (state, action) => {
      state.farmAreaDetail = action.payload;
    },
    resetFarmAreaDetail: (state) => {
      state.farmAreaDetail = null;
    },
  },
});

export const { setFarmAreaDetail, resetFarmAreaDetail } = areaSlice.actions;
export default areaSlice.reducer;