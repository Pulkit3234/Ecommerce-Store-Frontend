import Header from './components/Layout/Header';
import React from 'react';
import Products from './components/Products';
import { Switch, Route } from 'react-router-dom';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Signin from './components/Signin';
import Account from './components/Account';
import Footer from './components/Layout/Footer';
import Order from './components/Order'
import Payment from './components/Payment';
import OrderSuccess from './components/OrderSuccess';

function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route path='/order/:id/success' exact>
					<OrderSuccess/>
				</Route>
				<Route path="/order/:id" exact>
					<Payment />
				</Route>

				<Route path="/cart/checkout/order" exact>
					<Order />
				</Route>
				<Route path="/customer/account" exact>
					<Account />
				</Route>
				<Route path="/signin" exact>
					<Signin />
				</Route>
				<Route path="/cart/checkout" exact>
					<Checkout />
				</Route>
				<Route path="/cart" exact>
					<Cart />
				</Route>
				<Route path="/" exact>
					<Products />
				</Route>
				<Route path="/:id" exact>
					<Product />
				</Route>
			</Switch>
			<Footer />
		</>
	);
}

export default App;
//<Products />

/*<Route to="/product">
				<Product />
			</Route> */


			/* */