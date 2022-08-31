import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TUserState } from "types/store/user.store";

const initialState: TUserState = {
  id: null,
  name: null,
  email: null,
  isAuthenticated: false,
  token: null,
};

export const Slice = createSlice<
  TUserState,
  {
    login: (
      state: TUserState,
      action: PayloadAction<Omit<TUserState, "isAuthenticated">>
    ) => void;
    logout: (state: TUserState) => void;
  }
>({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, name, id, token } = action.payload;

      if (!token) throw new Error("Token is Required");

      state.isAuthenticated = true;
      state.id = id;
      state.name = name;
      state.email = email;
      state.token = token;

      /** Set default axios authorization header */
      axios.defaults.headers.common["x-access-token"] = token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});

export const setUser = Slice.actions;

export const getUser = (state: { user: TUserState }) => state.user;

export default Slice.reducer;
