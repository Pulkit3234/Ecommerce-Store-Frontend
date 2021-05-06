import { Form, Button, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signin from './Signin';

const Checkout = () => {
	const history = useHistory();
	const { isAuth } = useSelector(state => state.auth);
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
								<Button
									variant="primary"
									type="submit"
									style={{ marginRight: '20px' }}
									onClick={() => history.push('/cart/checkout/order')}
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
						<h4>Please Sign In To Proceed!</h4>
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
