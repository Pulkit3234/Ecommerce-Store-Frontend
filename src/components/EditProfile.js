import { Form, Button, Row } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
	const emailRef = useRef();
	const nameRef = useRef();
	const passwordRef = useRef();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		emailRef.current.value = JSON.parse(localStorage.getItem('authState')).name;
		nameRef.current.value = JSON.parse(localStorage.getItem('authState')).email;
	}, []);

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		const name = nameRef.current.value;
		const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
		console.log(email, name, password);
		

		try {
			const { data } = await axios.post(
				'http://localhost:8000/profile/edit',
				{
					name,
					email,
					password,
				},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
					},
				}
			);
			console.log(data);
			//At the backend the data is updated, now update data in to local storage also.

			const token = JSON.parse(localStorage.getItem('authState')).token;
			const isAuth = JSON.parse(localStorage.getItem('authState')).token;
			const newAuthState = {
				name: data.updatedName,
				email: data.updatedEmail,
				token,
				isAuth,
			};

			localStorage.setItem('authState', JSON.stringify(newAuthState));
			console.log(JSON.parse(localStorage.getItem('authState')));

			history.push('/customer/account');

			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Edit Profile Details</h2>
			{loading ? (
				<h4 style={{ textAlign: 'center' }}>Updating Details.....</h4>
			) : (
				<Row
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '40px',
					}}
				>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" ref={emailRef} />
							<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Name</Form.Label>
							<Form.Control type="name" placeholder="Enter email" ref={nameRef} />
							<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" ref={passwordRef} />
							<Form.Text className="text-muted">
								If you want to change the password change it otherwise leave it blank.
							</Form.Text>
						</Form.Group>

						<Button variant="primary" type="submit" onClick={formSubmitHandler}>
							Update Profile
						</Button>
					</Form>
				</Row>
			)}
		</>
	);
};

export default EditProfile;
