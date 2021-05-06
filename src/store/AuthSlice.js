import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuth: JSON.parse(localStorage.getItem('authState'))?.isAuth
			? JSON.parse(localStorage.getItem('authState')).isAuth
			: false,
		token: JSON.parse(localStorage.getItem('authState'))?.token
			? JSON.parse(localStorage.getItem('authState')).token
			: '',
		name: JSON.parse(localStorage.getItem('authState'))?.name
			? JSON.parse(localStorage.getItem('authState')).name
			: '',
		email: JSON.parse(localStorage.getItem('authState'))?.email
			? JSON.parse(localStorage.getItem('authState')).email
			: '',
	},
	reducers: {
		signin(state, action) {
			
			localStorage.setItem('authState', JSON.stringify(action.payload)); // authState object has token and isAuth property.
			state.isAuth = true;
		},
		signout(state, action) {
			//localStorage.removeItem('token');
			localStorage.clear();
			state.isAuth = false;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
