import { Container, Card, Button, Accordion } from 'react-bootstrap';

const Account = () => {
	return (
		<>
			<Container style={{ position: 'fixed', top: '10%', left: '30%' }}>
				<Card style={{ width: '30rem' }}>
					<Card.Body>
						<Card.Title>Account Information</Card.Title>
						<Card.Text>
							<h5>Name - </h5>
							<h5>Email - </h5>
							<h3> - </h3>
						</Card.Text>
						<Button variant="primary">Edit Information</Button>
						<Button variant="primary" style={{ marginLeft: '10px' }}>
							<i class="fas fa-clipboard-check" style={{ marginRight: '5px' }}></i>
							<span>Order History</span>
						</Button>
					</Card.Body>
					<Accordion defaultActiveKey="0">
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Button} variant="link" eventKey="0">
									<h5 style={{ width: '100%', textAlign: 'center' }}>Wishlist</h5>
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									Hello! I'm the body
									<h2>Hello</h2>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</Card>
			</Container>
		</>
	);
};

export default Account;
