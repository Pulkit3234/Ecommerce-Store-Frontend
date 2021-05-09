import { Col, Row, Container, ListGroup, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { orderActions } from '../store/OrderSlice';
import  axios  from 'axios';
import { useHistory } from 'react-router-dom';

const Order = () => {
	const { isAuth } = useSelector((state) => state.auth);
	const { currentOrder: order } = useSelector((state) => state.order);
	const state = useSelector((state) => state.order);
	const cartState = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const history = useHistory();
	const inputRef = useRef();
	const [payment, setPayment] = useState('');
	
	const { address, city, postalCode, country } = JSON.parse(localStorage.getItem('shippingAddress'));

	const placeOrderHandler = () => {
		console.log(payment);
		const sendCartData = async () => {
			try {
				const { data } = await axios.post(
					'http://localhost:8000/cart',
					{
						...cartState,
						shippingAddress: {
							...JSON.parse(localStorage.getItem('shippingAddress')),
						},
						paymentMethod : payment
					},
					{
						headers: {
							Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
						},
					}
				);

				console.log(data);
				dispatch(orderActions.currentOrderHandler(data));
				
				history.push(`/order/${JSON.parse(localStorage.getItem('order'))._id}`);
			} catch (error) {
				console.log(error.message);
			}
		};

		if (payment) {
			sendCartData();
		}
		
	};

	console.log(JSON.parse(localStorage.getItem(state)));
	const orderItems = JSON.parse(localStorage.getItem('state'))?.cartItems.map((item) => {
		return (
			<div
				key={item._id}
				style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: '20px' }}
			>
				<div>
					<img style={{ width: '30%', height: '100%' }} src={item.image} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<div>{item.name}</div>
					<div style={{ marginLeft: '60px' }}>${item.price}</div>
				</div>
				<div>
					<div style={{ marginLeft: '60px' }}>{item.qty}</div>
				</div>
			</div>
		);
	});

	return (
		<>
			{isAuth ? (
				<>
					{state ? (
						<>
							<Row style={{ overflowX: 'hidden', maxWidth: '100%' }}>
								<Col style={{ marginLeft: '20px', maxWidth: '100%' }}>
									<Card style={{ width: '45rem', marginTop: '20px' }}>
										<Card.Body>
											<Card.Title>Shipping Details</Card.Title>
											<Card.Text>
												<h6>
													Address - <span>{address}</span>
												</h6>
												<h6>
													Country - <span>{country}</span>
												</h6>
												<h6>
													City - <span>{city}</span>
												</h6>
												<h6>
													Postal Code - <span>{postalCode}</span>
												</h6>
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>

								<Col style={{ marginLeft: '20px' }}>
									<Card style={{ width: '45rem', marginTop: '20px' }}>
										<Card.Body>
											<Card.Title>
												<h3>Order Summary</h3>
											</Card.Title>
											<Card.Text>
												<p style={{ fontWeight: 'bold' }}>
													Total Items - {JSON.parse(localStorage.getItem('state')).totalItems}
												</p>
												<p style={{ fontWeight: 'bold' }}>
													Total Price - ${JSON.parse(localStorage.getItem('state')).totalPrice}
												</p>
											</Card.Text>
											<div class="form-check" style={{ marginBottom: '15px' }}>
												<input
													class="form-check-input"
													type="radio"
													name="flexRadioDefault"
													id="flexRadioDefault1"
													value="stripe"
													onChange={(e) => setPayment(e.target.value)}
												/>
												<label class="form-check-label" for="flexRadioDefault1">
													Stripe
												</label>
											</div>
											<div class="form-check">
												<input
													class="form-check-input"
													type="radio"
													name="flexRadioDefault"
													id="flexRadioDefault1"
													value="paypal"
													onClick={(e) => setPayment(e.target.value)}
												/>
												<label class="form-check-label" for="flexRadioDefault1">
													Paypal
												</label>
											</div>

											<Button
												variant="primary"
												type="submit"
												style={{ marginRight: '20px', marginTop: '20px' }}
												onClick={placeOrderHandler}
											>
												Select Payment Method
											</Button>
										</Card.Body>
									</Card>
								</Col>

								<Col style={{ marginLeft: '20px' }}>
									<Card style={{ width: '45rem', marginTop: '20px', fontWeight: 'bold' }}>
										<Card.Body>
											<Card.Title>Order Items - </Card.Title>

											<Card.Text>{orderItems}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</>
					) : (
						<p>Loading</p>
					)}
				</>
			) : (
				<h3 style={{ textAlign: 'center', marginTop: '40px' }}>Please Sign In to Place Order!</h3>
			)}
		</>
	);
};

export default Order;
