import axios from 'axios';
import { Card, Button, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const successfulOrders = () => {

    const [orders, setOrders] = useState([]);
   

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get('http:/localhost:8000/paid');
                setOrders(data);
                
            } catch (error) {
                console.log(error);
                
            }
            
        };

        fetch();

    }, []);

     const paidOrders = orders.map((order) => {
			<Card style={{ width: '18rem' }}>
				<Card.Img variant="top" src={order._id} />
				<Card.Body>
					<Card.Title>
						<p>{order.totalPrice}</p>
						<p>{order.totalItems}</p>
					</Card.Title>
				</Card.Body>
			</Card>;
		});
    return (<>
        <Row>
            {paidOrders}
            
        </Row>
    </>);
};

export default successfulOrders;
