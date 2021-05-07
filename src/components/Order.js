import { Col, Row, Container, ListGroup, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Order = () => {
	const { isAuth } = useSelector(state => state.auth);
	let order = {};
	useEffect(() => {
		if (JSON.parse(localStorage.getItem('order'))) {
			
			order = JSON.parse(localStorage.getItem('order'));
		}
		
	}, [])
    return (
		<>
			{isAuth ? (
				<>
					<Row>
						<h2
							style={{ textAlign: 'center', padding: '10px', marginLeft: '40px' }}
						>{`OrderId - ${order._id}`}</h2>
					</Row>
					<Row>
						<Col style={{ marginLeft: '20px' }}>
							<Card style={{ width: '45rem', marginTop: '20px' }}>
								<Card.Body>
									<Card.Title>Shipping Details</Card.Title>
									<Card.Text>
										<h6>
											Address - <span>{order.shippingAddress.address}</span>
										</h6>
										<h6>Country - <span>{order.shippingAddress.country}</h6>
										<h6>City - <span>{order.shippingAddress.city}</h6>
										<h6>Postal Code - <span>{order.shippingAddress.postalCode}</h6>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>

						<Col>
							<Card style={{ width: '45rem', marginTop: '20px' }}>
								<Card.Body>
									<Card.Title>Order Summary</Card.Title>
									<Card.Text>
										<p>Total Items - </p>
										<p>Total Price - </p>
									</Card.Text>
									<Button variant="primary" type="submit" style={{ marginRight: '20px' }}>
										Pay with Stripe
									</Button>
									<Button variant="primary" type="submit" style={{ marginRight: '20px' }}>
										Pay with Paypal
									</Button>
								</Card.Body>
							</Card>
						</Col>

						<Col style={{ marginLeft: '20px' }}>
							<Card style={{ width: '45rem', marginTop: '20px' }}>
								<Card.Body>
									<Card.Title>Order Items</Card.Title>
									<Card.Text>
										<p>Total iItems - </p>
										<p>Total Price - </p>
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

export default Order;