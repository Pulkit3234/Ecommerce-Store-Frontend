import { Col, Row, ListGroup, Container, Card, Button, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';
import { useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
	let { cartItems, totalItems, totalPrice } = useSelector((state) => state.cart);
	console.log(JSON.parse(localStorage.getItem('state')));

	useEffect(() => {
		/*const fetch = async () => {
			
			try {
					const { data } = await axios.post('http://localhost:8000', {
						cartItems,
						totalPrice,
						totalItems,
					});
				console.log(data);
				dispatch()
			}
			catch (error) {
				console.log(error);
			}
			
		};



		


		if (localStorage.getItem('state')) {
			fetch();
		
	} */

		dispatch(cartActions.cartReset());
	}, []);

	console.log(totalPrice);
	const dispatch = useDispatch();

	const history = useHistory();

	const clearCartHandler = () => {
		dispatch(cartActions.clearCart({ cartItems: [], totalItems: 0, totalPrice: 0 }));
	};

	const incrementHandler = (item) => {
		dispatch(cartActions.addItem(item));
	};

	const decrementHandler = (item) => {
		dispatch(cartActions.removeItem(item));
	};
	const items = cartItems.map((item) => {
		return (
			<ListGroup.Item key={item._id} style={{ marginBottom: '20px' }}>
				<Row>
					<Col>
						<div>
							<Image src={item.image} style={{ width: '80%', height: '80%' }} />
						</div>
					</Col>

					<Col style={{ marginRight: '20px' }}>
						{item.name}
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'end',
								justifyContent: 'space-between',
							}}
						>
							<h3>
								Price - $<span>{item.price}</span>
							</h3>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'end',
									width: '10%',
									justifyContent: 'space-between',
									padding: '10px',
								}}
							>
								<div>
									<i
										class="fas fa-minus-circle"
										style={{ color: 'blue' }}
										onClick={() => decrementHandler(item)}
									></i>
								</div>
								<p>{item.qty}</p>
								<div>
									<i
										class="fas fa-plus-circle"
										style={{ color: 'blue' }}
										onClick={() => incrementHandler(item)}
									></i>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</ListGroup.Item>
		);
	});
	return (
		<>
			<div style={{ width: '100%', textAlign: 'center', marginTop: '40px' }}>
				<h2>
					My Cart <span>{`(${totalItems} Items)`}</span>
				</h2>
			</div>

			<Container style={{ alignItems: 'center' }}>
				<Row>
					<ListGroup style={{ width: '50%', marginLeft: '80px', marginTop: '40px' }}>{items}</ListGroup>

					<Col style={{ width: '50%', marginLeft: '80px', marginTop: '40px' }}>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>
									Total Amount - <span>{totalPrice}</span>
								</Card.Title>

								<Button
									variant="primary"
									style={{ marginTop: '20px' }}
									onClick={() => history.push('/cart/checkout')}
									disabled={cartItems.length === 0}
								>
									Proceed To Checkout
								</Button>
								<Button
									variant="primary"
									style={{ marginTop: '20px' }}
									onClick={clearCartHandler}
									disabled={cartItems.length === 0}
								>
									Clear Cart
								</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Cart;
