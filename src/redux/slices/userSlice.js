import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  city: "",
  access_token: "",
  id: "",
  role: "",
  refreshToken: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        email = "",
        access_token = "",
        phone = "",
        address = "",
        avatar = "",
        _id = "",
        isAdmin,
        city = "",
        refreshToken = "",
        role = "",
      } = action.payload;
      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.address = address ? address : state.address;
      state.phone = phone ? phone : state.phone;
      state.avatar = avatar ? avatar : state.avatar;
      state.role = role ? role : state.role;
      state.id = _id ? _id : state.id;
      state.access_token = access_token ? access_token : state.access_token;
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
      state.city = city ? city : state.city;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.role = "";
      state.id = "";
      state.access_token = "";
      state.isAdmin = false;
      state.city = "";
      state.refreshToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
