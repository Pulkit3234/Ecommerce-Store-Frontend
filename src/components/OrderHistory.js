import axios from 'axios';
import { Card, Button, Row, Accordion, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const SuccessfulOrders = () => {
	const [orders, setOrders] = useState([]); 
	const [noOrder, setNoOrder] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			try {
				const { data } = await axios.get('https://shoppall.herokuapp.com/paid', {
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
					},
				});
				console.log(data);
				if ((data.message = 'No orders placed')) {
					setNoOrder(true);
				}
					setOrders(data.paidOrders);

				//setOrders(data);

			} catch (error) {
				console.log(error);
			}
		};

		fetch();
	}, []);

	const paidOrders = orders.map((order) => {
		console.log(order);
		return (
			<Col style={{ marginLeft: '20px', marginBottom: '30px' }}>
				<Card style={{ width: '35rem' }}>
					<Card.Img variant="top" src={order.image} />
					<Card.Body>
						<Card.Title>
							<h4>{`Order Id - ${order._id}`}</h4>
							<p>
								<span>Total Price - </span>${order.totalPrice}
							</p>
							<p>
								<span>Total Items - </span>
								{order.totalItems}
							</p>
							<p>
								<span>Order Status - </span>
								{'Paid'}
							</p>
							<p>
								<span>Payment Method - </span>
								{order.paymentMethod.toUpperCase(0)}
							</p>
							<p>
								<span>Order Date - </span>
								{new Date(order.createdAt).toDateString()}
							</p>
						</Card.Title>
						<Accordion defaultActiveKey="0">
							<Card>
								<Card.Header>
									<Accordion.Toggle as={Button} variant="link" eventKey="0">
										Order Items
									</Accordion.Toggle>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Row>
											{order.cartItems.map((item) => {
												return (
													<Card style={{ width: '18rem', marginTop: '20px' }}>
														<Card.Img variant="top" src={item.image} />
														<Card.Body>
															<Card.Title>{item.name}</Card.Title>
															<Card.Text>Quantity - {item.qty}</Card.Text>
															<Card.Text>Price - ${item.price}</Card.Text>
														</Card.Body>
													</Card>
												);
											})}
										</Row>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					</Card.Body>
				</Card>
			</Col>
		);
	});
	console.log(paidOrders);
	return (
		<>
			<h2 style={{ textAlign: 'center', marginTop: '20px' }}>Orders Placed</h2>
			{orders.length === 0 ? 
				<>{noOrder ? <h2 style={{ textAlign: 'center', marginTop: '20px' }}>No Order Found</h2> : <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Loading....</h2>}</>
				
			 : (
				<>
					<div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}></div>

					<Row
						style={{
							maxWidth: '100%',
							justifyContent: 'space-between',
							marginBottom: '40px',
							marginTop: '40px',
						}}
					>
						{paidOrders}
					</Row>
				</>
			)}
		</>
	);
};

export default SuccessfulOrders;
