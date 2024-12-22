import { createSlice } from '@reduxjs/toolkit';

const standardDataSlice = createSlice({
  name: 'standardData',
  initialState: {
    standardData: null,
  },
  reducers: {
    setStandardData: (state, action) => {
      state.standardData = action.payload;
    },
    resetStandardData: (state) => {
      state.standardData = null;
    },
  },
});

export const { setStandardData, resetStandardData } = standardDataSlice.actions;
export default standardDataSlice.reducer;