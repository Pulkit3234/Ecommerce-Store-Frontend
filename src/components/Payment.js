import { Col, Row, Container, ListGroup, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { orderActions } from '../store/OrderSlice';
import { cartActions } from '../store/CartSlice';

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });

const Payment = () => {
	const { isAuth } = useSelector((state) => state.auth);
	const [paymentStatus, setPaymentStatus] = useState(false);
	const { currentOrder: order } = useSelector((state) => state.order);
	console.log(order);
	const state = useSelector((state) => state.order);
	const history = useHistory();
	const dispatch = useDispatch();

	console.log(state.currentOrder.cartItems);

	/////////////////Paypal Setup
	const createOrder = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					description: 'Shop All Order',
					amount: {
						
						value: order.totalPrice,
					},
				},
			],
		});
	};

	const onApprove = async (data, actions) => {
		const result = await actions.order.capture();
		console.log('approved', result);
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
		localStorage.removeItem()
		
		
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
					<div style={{ marginLeft: '60px' }}>{item.price}</div>
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
					<Row style={{ overflowX: 'hidden', maxWidth: '100%' }}>
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

						<Col style={{ marginLeft: '20px' }}>
							<Card style={{ width: '45rem', marginTop: '20px' }}>
								<Card.Body>
									<Card.Title>
										<h3>Order Summary</h3>
									</Card.Title>
									<Card.Text>
										<p style={{ fontWeight: 'bold' }}>Total Items - {order?.totalItems}</p>
										<p style={{ fontWeight: 'bold' }}>Total Price - {order?.totalPrice} </p>
									</Card.Text>

									{!paymentStatus && (
										<div>
											{JSON.parse(localStorage.getItem('order')).paymentMethod === 'paypal' &&
											order.isPaid === false ? (
												<PayPalButton
													createOrder={(data, actions) => createOrder(data, actions)}
													onApprove={(data, actions) => onApprove(data, actions)}
													onError={(error) => onError(error)}
												/>
											) : (
												''
											)}
										</div>
									)}
									{paymentStatus && (
										<div>
											<h2>Order - Paid</h2>
										</div>
									)}
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
				<h3 style={{ textAlign: 'center', marginTop: '40px' }}>Please Sign In to Place Order!</h3>
			)}
		</>
	);
};

export default Payment;
