import { Container, Card, Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


const Account = () => {
	const { wishlist } = useSelector((state) => state.cart);
	const { name, email } = useSelector((state) => state.auth);
	
	console.log('account', name, email);
	console.log(name, email);

	
	const wishlistItems = wishlist.map((item) => {
		return (
			<div>
				<NavLink to={`/${item.id}`}>
					{item.name}
					<span>{item.price}</span>
				</NavLink>
			</div>
		);
	});
	return (
		<>
			<Container style={{ position: 'fixed', top: '10%', left: '30%' }}>
				<Card style={{ width: '30rem' }}>
					<Card.Body>
						<Card.Title>Account Information</Card.Title>
						<Card.Text>
							<h5>
								Name - <span>{name}</span>
							</h5>
							<h5>
								Email - <span>{email}</span>
							</h5>
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
								<Card.Body>{wishlistItems}</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</Card>
			</Container>
		</>
	);
};

export default Account;
