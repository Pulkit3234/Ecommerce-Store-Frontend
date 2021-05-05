import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const SignIn = () => {
	const [toggle, setToggle] = useState(false);

	const form = (
		<div style={{ width: '40%', marginLeft: '30%', marginTop: '5%' }}>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Sign In
				</Button>
				<Form.Group style={{ marginTop: '15px' }}>
					<h4 onClick={() => setToggle(true)} style={{ cursor: 'pointer' }}>
						New User? Sign Up Now
					</h4>
				</Form.Group>
			</Form>
		</div>
	);

	const form1 = (
		<div style={{ width: '40%', marginLeft: '30%', marginTop: '5%' }}>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Name</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">We'll never share your name with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Sign Up
				</Button>
				<Form.Group style={{ marginTop: '15px' }}>
					<h4 onClick={() => setToggle(false)} style={{ cursor: 'pointer' }}>
						Already Registered ? Sign In Now
					</h4>
				</Form.Group>
			</Form>
		</div>
	);
	return <>{toggle ? form1 : form}</>;
};

export default SignIn;
