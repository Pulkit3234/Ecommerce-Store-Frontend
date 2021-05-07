import { Form, Button, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Signin from './Signin';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { orderActions } from '../store/OrderSlice';

const Checkout = () => {
	const history = useHistory();
	const { isAuth, token } = useSelector((state) => state.auth);
	const cartState = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const addressRef = useRef();
	const countryRef = useRef();
	const cityRef = useRef();
	const postalCodeRef = useRef();

	useEffect(() => {
		if (JSON.parse(localStorage.getItem('shippingAddress'))) {
			const { address, postalCode, country, city } = JSON.parse(localStorage.getItem('shippingAddress'));

			addressRef.current.value = address;
			cityRef.current.value = city;
			countryRef.current.value = country;
			postalCodeRef.current.value = postalCode;
		}
	}, []);

	const checkoutHandler = (e) => {
		e.preventDefault();
		console.log('click');

		if (
			!addressRef.current?.value ||
			!countryRef.current?.value ||
			!cityRef.current?.value ||
			!postalCodeRef.current?.value
		) {
			console.log('clicked');
			return;
		}

		localStorage.setItem(
			'shippingAddress',
			JSON.stringify({
				address: addressRef.current.value,
				country: countryRef.current.value,
				city: cityRef.current.value,
				postalCode: postalCodeRef.current.value,
			})
		);

		const sendCartData = async () => {
			try {
				const { data } = await axios.post(
					'http://localhost:8000/cart',
					{
						...cartState,
						shippingAddress: {
							address: addressRef.current.value,
							country: countryRef.current.value,
							city: cityRef.current.value,
							postalCode: postalCodeRef.current.value,
						},
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				
				console.log(data);
				dispatch(orderActions.currentOrderHandler(data));

			} catch (error) {
				console.log(error);
			}
		};

		sendCartData();
		history.push(`/cart/checkout/order/${JSON.parse(localStorage.getItem('order'))._id}`);
	};

	return (
		<>
			{isAuth ? (
				<div
					style={{
						maxWidth: '40%',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Container style={{ alignItems: 'center' }}>
						<Form style={{ position: 'fixed', top: '100px', left: '30vw' }}>
							<Form.Group controlId="formGridAddress1">
								<Form.Label>Address</Form.Label>
								<Form.Control placeholder="1234 Main St" ref={addressRef} />
							</Form.Group>

							<Form.Row>
								<Form.Group as={Col} controlId="formGridCity">
									<Form.Label>Country</Form.Label>
									<Form.Control ref={countryRef} />
								</Form.Group>

								<Form.Group as={Col} controlId="formGridCity">
									<Form.Label>City</Form.Label>
									<Form.Control ref={cityRef} />
								</Form.Group>

								<Form.Group as={Col} controlId="formGridZip">
									<Form.Label>Postal Code</Form.Label>
									<Form.Control ref={postalCodeRef} />
								</Form.Group>
							</Form.Row>

							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<Button
									variant="primary"
									type="submit"
									style={{ marginRight: '20px' }}
									onClick={checkoutHandler}
								>
									Continue To Order
								</Button>
							</div>
						</Form>
					</Container>
				</div>
			) : (
				<div>
					<div style={{ width: '40%', marginLeft: '30%', marginTop: '5%' }}>
						<h4 onClick={checkoutHandler}>Please Sign In To Proceed!</h4>
					</div>
					<div>
						<Signin />
					</div>
				</div>
			)}
		</>
	);
};

export default Checkout;
