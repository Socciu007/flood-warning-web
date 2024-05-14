import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  logo: "",
  description: "",
  user: "",
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    updateStore: (state, action) => {
      const {
        email = "",
        name = "",
        logo = "",
        description = "",
        user = "",
      } = action.payload;
      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.logo = logo ? logo : state.logo;
      state.description = description ? description : state.description;
    },
  },
});

export const { updateStore } = storeSlice.actions;

export default storeSlice.reducer;
