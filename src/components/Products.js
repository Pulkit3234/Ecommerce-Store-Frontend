import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	useEffect(() => {
		const fetch = async () => {
			try {
				const { data } = await axios.get('http://localhost:8000/products');
				console.log(data);
				setProducts(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		fetch();
	}, []);
	console.log(products);

	const clickHandler = (id) => {
		history.push(id);
	};

	return (
		<Container style={{ paddingTop: '25px' }}>
			{loading ? <h2>Loading ....</h2> : <Row>
				{products?.map((product) => {
					return (
						<Col style={{ paddingBottom: '25px' }}>
							<Card style={{ width: '18rem' }}>
								<Card.Img variant="top" src={product.image} />
								<Card.Body>
									<Card.Title>{product.name}</Card.Title>
									<Card.Text>
										<p>{`Brand - ${product.brand}`}</p>
										<h3>{`$${product.price} `}</h3>
										<div>
											{product.numReviews > 1
												? `${product.numReviews} reviews`
												: `${product.numReviews} review`}
										</div>
									</Card.Text>
									<Button variant="success" onClick={() => clickHandler(product._id)}>
										Know More
									</Button>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row>}
		</Container>
	);
};
export default Products;