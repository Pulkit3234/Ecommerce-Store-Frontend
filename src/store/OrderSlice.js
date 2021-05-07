import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		pastOrders: [],
		currentOrder: {},
		paymentMethod: '',
		address: {},
	},
	reducers: {
		currentOrderHandler(state, action) {
            console.log(action.payload);
            localStorage.setItem('order', JSON.stringify(action.payload.order));
            state.currentOrder = action.payload.order;
           
		},
		pastOrdersHandler(state, action) {},
		orderSuccess(state, action) {},
		orderFailed(state, action) {},
	},
});

export const orderActions = orderSlice.actions;
export default orderSlice;
