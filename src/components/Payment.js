import { Col, Row, Container, ListGroup, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { orderActions } from '../store/OrderSlice';
import { cartActions } from '../store/CartSlice';
import Stripe from './Stripe';

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });

const Payment = () => {
	const { isAuth } = useSelector((state) => state.auth);
	const [paymentStatus, setPaymentStatus] = useState(false);
	const { currentOrder: order } = useSelector((state) => state.order);
	console.log(order);
	const state = useSelector((state) => state.order);
	const history = useHistory();
	const dispatch = useDispatch();

	const paymentSuccess = async () => {
		try {
			const { data } = await axios.post(
				'http://localhost:8000/cart/orderstatus',
				{
					isPaid: true,
					orderId: JSON.parse(localStorage.getItem('order'))?._id,
				},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
					},
				}
			);

			console.log(data);
			dispatch(orderActions.currentOrderHandler(data));

			history.push(`/order/${JSON.parse(localStorage.getItem('order'))?._id}/success`);
		} catch (error) {
			console.log(error.message);
		}
		//RESET THE CART TOO AFTER PAYMENT.
		setPaymentStatus(true);
		dispatch(cartActions.clearCart());
	};

	console.log(state.currentOrder.cartItems);

	/////////////////Paypal Setup
	const createOrder = (data, actions) => {
		console.log('order created');
		return actions.order.create({
			purchase_units: [
				{
					description: 'Shop All Order',
					amount: {
						value: order.totalPrice,
						currency: 'INR',
					},
				},
			],
		});
	};

	const onApprove = async (data, actions) => {
		const result = await actions.order.capture();
		console.log('approved', result);

		paymentSuccess();
	};

	const onError = (error) => {
		console.log(error);
		history.push(`/order/${order._id}`);
	};

	///////////////
	const orderItems = state.currentOrder.cartItems?.map((item) => {
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
					<Row style={{ maxWidth: '100%', overflowX: 'hidden' }}>
						<h2
							style={{
								textAlign: 'center',
								maxWidth: '100%',
								marginLeft: '40px',
								marginTop: '20px',
							}}
						>{`OrderId - ${order?._id}`}</h2>
					</Row>

					<Row style={{ overflowX: 'hidden', maxWidth: '100%', marginBottom: '50px' }}>
						<Col style={{ marginLeft: '20px', zIndex: '0.5' }}>
							<Card style={{ width: '45rem', marginTop: '20px' }}>
								<Card.Body>
									<Card.Title>
										<h3>Order Summary</h3>
									</Card.Title>
									<div>
										<Card.Body>
											<Col>
												<Card style={{ width: '100%', fontWeight: 'bold' }}>
													<Card.Body>
														<Card.Title>Order Items - </Card.Title>

														<Card.Text>{orderItems}</Card.Text>
													</Card.Body>
												</Card>
											</Col>
										</Card.Body>
									</div>
									<Card.Text>
										<p style={{ fontWeight: 'bold' }}>Total Items - {order?.totalItems}</p>
										<p style={{ fontWeight: 'bold' }}>Total Price - ${order?.totalPrice} </p>
									</Card.Text>
									{!paymentStatus && (
										<div>
											{JSON.parse(localStorage.getItem('order')).paymentMethod === 'paypal' &&
											order.isPaid === false ? (
												<>
													<PayPalButton
														createOrder={(data, actions) => createOrder(data, actions)}
														onApprove={(data, actions) => onApprove(data, actions)}
														onError={(error) => onError(error)}
													/>
													<div>
														<Card style={{ maxWidth: '100%', marginTop: '20px' }}>
															<Card.Body>
																<Card.Title>Test Card Details</Card.Title>
																<Card.Text>
																	<h6>
																		Country
																		<span> - Australia</span>
																	</h6>
																	<h6>
																		Card Number
																		<span> - 4242 4242 4242 4242</span>
																	</h6>
																	<h6>
																		Expiry Date<span> - 11/33</span>
																	</h6>
																	<h6>
																		Security Code <span> - 424</span>
																	</h6>
																	<h6>
																		Name <span> - John Doe</span>
																	</h6>
																	<h6>
																		Address 1<span> - 51 Wollombi Street</span>
																	</h6>

																	<h6>
																		Town/City
																		<span> - Broke</span>
																	</h6>
																	<h6>
																		State <span> - New South Wales</span>
																	</h6>
																	<h6>
																		Postal Code <span> - 2330</span>
																	</h6>
																	<h6>
																		Mobile No <span> - 049151-5141</span>
																	</h6>
																	<h6>
																		Email Address <span> - test@gmail.com</span>
																	</h6>
																</Card.Text>
															</Card.Body>
														</Card>
													</div>
												</>
											) : (
												''
											)}
										</div>
									)}
									{!paymentStatus && (
										<div>
											{JSON.parse(localStorage.getItem('order')).paymentMethod === 'stripe' &&
											order.isPaid === false ? (
												<Stripe
													payment={() => setPaymentStatus(true)}
													data={JSON.parse(localStorage.getItem('order'))}
													paymentSuccess={paymentSuccess}
												/>
											) : (
												''
											)}
										</div>
									)}
									{JSON.parse(localStorage.getItem('order')).isPaid && <h3>Order - Paid</h3>}
								</Card.Body>
							</Card>
						</Col>

						<Col style={{ marginLeft: '20px', maxWidth: '100%' }}>
							<Card style={{ width: '45rem', marginTop: '20px' }}>
								<Card.Body>
									<Card.Title>Shipping Details</Card.Title>
									<Card.Text>
										<h6>
											Address - <span>{order.shippingAddress?.address}</span>
										</h6>
										<h6>
											Country - <span>{order.shippingAddress?.country}</span>
										</h6>
										<h6>
											City - <span>{order.shippingAddress?.city}</span>
										</h6>
										<h6>
											Postal Code - <span>{order.shippingAddress?.postalCode}</span>
										</h6>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</>
			) : (
				<h3 style={{ textAlign: 'center', marginTop: '40px' }}>Please Sign In to Place Order!</h3>
			)}
		</>
	);
};

export default Payment;
