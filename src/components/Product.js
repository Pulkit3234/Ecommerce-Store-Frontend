import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';

const Product = () => {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const [btnToggle, setBtnToggle] = useState(false);

	const cart = useSelector((state) => state.cart);
	console.log(cart);
	console.log(JSON.parse(localStorage.getItem('state')))

	console.log(id);

	const addToCartHandler = () => {
		dispatch(cartActions.addItem(data));
		setBtnToggle(true);
	};

	const removeFromCartHandler = () => {
		dispatch(cartActions.removeItem(data));
		setBtnToggle(false);
	};

	const wishListHandler = (data) => {
		dispatch(cartActions.addWishlist(data));
	};

	useEffect(() => {
		const fetch = async () => {
			const { data } = await axios.get(`http://localhost:8000/product/${id}`);
			console.log(data);

			setData(data);
			setLoading(false);
		};

		fetch();
	}, []);

	return (
		<>
			{loading ? (
				<h2 style={{ paddingLeft: '100px', paddingTop: '40px' }}>Loading.....</h2>
			) : (
				<div>
					<Row style={{ overflowX: 'hidden', maxWidth: '100%', marginTop: '30px' }}>
						<Col>
							<Image
								src={data.image}
								rounded
								fluid
								style={{ height: '80%', margin: '30px', paddingLeft: '60px' }}
							/>
						</Col>
						<Col style={{ margin: '30px' }}>
							<h2>{data.brand}</h2>
							<p style={{ marginTop: '5%' }}>{data.description}</p>
							<h5 style={{ color: 'green', marginTop: '5%' }}>
								{data.countInStock > 0 ? 'In Stock' : 'Out of Stock'}{' '}
							</h5>
							<h4>{`Price - $ ${data.price}`}</h4>
							{btnToggle ? (
								<Button
									variant="primary"
									style={{ width: '20%', marginTop: '10%' }}
									onClick={removeFromCartHandler}
								>
									Remove Item
								</Button>
							) : (
								<Button
									variant="primary"
									style={{ width: '20%', marginTop: '10%' }}
									onClick={addToCartHandler}
								>
									Add To Cart
								</Button>
							)}
							<Button
								variant="success"
								style={{ width: '20%', marginTop: '10%', marginLeft: '10px' }}
								onClick={() => wishListHandler(data)}
							>
								{cart.wishlist.findIndex((item) => item._id === data._id) !== -1
									? 'wishlistButton'
									: 'Remove from Wishlist'}
							</Button>
						</Col>
					</Row>
					<Col>
						<h2 style={{ marginLeft: '10%' }}>No Reviews Yet</h2>
						<h4 style={{ marginLeft: '10%' }}>
							Write a Review
							<span style={{ cursor: 'pointer' }}>
								<i class="far fa-plus-square"></i>
							</span>
						</h4>
					</Col>
				</div>
			)}
		</>
	);
};

export default Product;
