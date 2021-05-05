import { Form, Button, Col, Container } from 'react-bootstrap';


const Checkout = () => {

	
   
	return (
		<>
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
							<Form.Control placeholder="1234 Main St" />
						</Form.Group>

						<Form.Row>
							<Form.Group as={Col} controlId="formGridCity">
								<Form.Label>Country</Form.Label>
								<Form.Control />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridCity">
								<Form.Label>City</Form.Label>
								<Form.Control />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridZip">
								<Form.Label>Postal Code</Form.Label>
								<Form.Control />
							</Form.Group>
						</Form.Row>

						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<Button variant="primary" type="submit" style={{ marginRight: '20px' }}>
								Pay with Stripe
							</Button>
							<Button variant="primary" type="submit" style={{ marginRight: '20px' }}>
								Pay with Paypal
							</Button>
							<Button variant="primary" type="submit" style={{ marginRight: '20px' }}>
								Pay with Cryptocurrency
							</Button>
						</div>
					</Form>
				</Container>
			</div>
		</>
	);
};

export default Checkout;
