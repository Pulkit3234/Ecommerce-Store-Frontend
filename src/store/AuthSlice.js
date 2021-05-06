import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { isAuth: false, token: JSON.stringify(localStorage.getItem('auth'))?.token },
	reducers: {
		signin(state, action) {},
		signup(state, action) {},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
