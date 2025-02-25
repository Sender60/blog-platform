import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authorized: false,
  username: '',
  email: '',
  password: '',
  image: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => ({
      ...state,
      authorized: true,
      username: action.payload.username,
      image: action.payload.image || 'https://www.gravatar.com/avatar/?d=identicon',
    }),
    setLogout: (state) => ({
      ...state,
      authorized: false,
      username: '',
      image: '',
    }),
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
