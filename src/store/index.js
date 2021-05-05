import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './CartSlice';
import authSlice from './AuthSlice';

const store = configureStore({
	reducer: { cart: CartSlice.reducer, auth : authSlice.reducer },
});

export default store;
