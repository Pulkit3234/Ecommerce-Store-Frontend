import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: { cartItems: [], totalPrice: 0, totalItems: 0 },
	reducers: {
		addItem(state, action) {
			console.log(action.payload.price);

			if (state.cartItems.findIndex((item) => item._id === action.payload._id) !== -1) {
				console.log('hello');
				const index = state.cartItems.findIndex((item) => item._id === action.payload._id);
				if (state.cartItems[index].countInStock === 0) {
					return;
				}

				console.log(index);
				state.cartItems[index].countInStock = state.cartItems[index].countInStock - 1;
				state.cartItems[index].qty++;
				console.log(state.cartItems);
			} else {
				action.payload['qty'] = 1;
				console.log(action.payload);

				state.cartItems.push(action.payload);
				console.log(action.payload.price);
			}

			state.totalPrice = state.totalPrice + action.payload.price;
			state.totalPrice = Number(state.totalPrice.toFixed(2));
			state.totalItems = state.totalItems + 1;
			localStorage.setItem('state', JSON.stringify(state));
		},

		removeItem(state, action) {
			console.log('hi');
			const result = state.cartItems.find((item) => item._id === action.payload._id);
			const resultIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
			if (result.qty === 1) {
				state.cartItems[resultIndex].stockInCount--;

				//result.stockInCount++;
				state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);

				//console.log(result);
			} else {
				result.qty--;
				result.stockInCount++;
			}

			state.totalItems--;
			state.totalPrice = (state.totalPrice - result.price).toFixed(2);
			localStorage.setItem('state', JSON.stringify(state.cartItems));
		},
		clearCart(state, action) {
			state.cartItems = [];
			state.totalPrice = action.payload.totalPrice;
			state.totalItems = action.payload.totalItems;
			localStorage.setItem('state', JSON.stringify(state));
		},
		cartReset(state, action) {
			const {cartItems, totalItems, totalPrice} = JSON.parse(localStorage.getItem('state'));
			state.cartItems = cartItems;
			state.totalItems = totalItems;
			state.totalPrice = totalPrice;
		}
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice;
