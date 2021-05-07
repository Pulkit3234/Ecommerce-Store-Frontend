import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		pastOrders: [],
		currentOrder: JSON.parse(localStorage.getItem('order')) || {},
		paymentMethod: JSON.parse(localStorage.getItem('order'))?.paymentMethod || '',
		address: JSON.parse(localStorage.getItem('order'))?.shippingAddress || {},
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

/*export const order = () => {
    return (dispatch) => {

        
    };
} */

export const orderActions = orderSlice.actions;
export default orderSlice;
