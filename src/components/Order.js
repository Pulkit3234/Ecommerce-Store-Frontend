import { Col, Row, Container, ListGroup, Card, Button} from 'react-bootstrap';

const Order = () => {
    return (
		<>
			<Row>
				<Col style={{ marginLeft: '20px' }}>
					<Card style={{ width: '45rem', marginTop: '20px' }}>
						<Card.Body>
							<Card.Title>Shipping Details</Card.Title>
							<Card.Text>
								<h6>Address -</h6>
								<h6>Country - </h6>
								<h6>City -</h6>
								<h6>Postal Code -</h6>
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
	);

};

export default Order;