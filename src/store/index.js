import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './CartSlice';
import authSlice from './AuthSlice';
import orderSlice from './OrderSlice';

const store = configureStore({
	reducer: { cart: CartSlice.reducer, auth : authSlice.reducer, order : orderSlice.reducer },
});

export default store;
