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

function App() {
	return (
		<>
			<Header />
			<Switch>
				<Route path='/customer/account'>
					<Account/>

				</Route>
				<Route path="/signin">
					<Signin />
				</Route>
				<Route path="/cart/checkout">
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
			<Footer/>
			
		</>
	);
}

export default App;
//<Products />

/*<Route to="/product">
				<Product />
			</Route> */
