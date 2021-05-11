import { Container, Card, Button,  } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

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
						<Card.Title>
							<i class="fas fa-user-circle" style={{ marginRight: '10px' }}></i>Account Information
						</Card.Title>
						<Card.Text>
							<h5>
								Name - <span>{JSON.parse(localStorage.getItem('authState')).name}</span>
							</h5>
							<h5>
								Email - <span>{JSON.parse(localStorage.getItem('authState')).email}</span>
							</h5>
						</Card.Text>
						<Link to="/profile/edit" style={{ textDecoration: 'none', color: 'white' }}>
							<Button variant="primary">
								<i class="fas fa-user-edit" style={{ marginRight : '5px'}}></i>Edit Information
							</Button>
						</Link>
						<Link to="/orders/history" style={{ textDecoration: 'none', color: 'white' }}>
							<Button variant="primary" style={{ marginLeft: '10px' }}>
								<i class="fas fa-clipboard-check" style={{ marginRight: '5px' }}></i>
								<span>Order History</span>
							</Button>
						</Link>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default Account;
