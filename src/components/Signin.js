import { Form, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';
import axios from 'axios';
import { authActions } from '../store/AuthSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cart from './Cart';

const SignIn = () => {
	const [toggle, setToggle] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const emailRef = useRef();
	const dispatch = useDispatch();
	const history = useHistory();

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		if (toggle) {
			const { data } = await axios.post('https://shoppall.herokuapp.com/signup', {
				name,
				email,
				password,
			});
			if ((data.message = 'User registered')) {
				setEmail('');
				setPassword('');
				setToggle(!toggle);
			}
		} else {
			const { data } = await axios.post('https://shoppall.herokuapp.com/signin', {
				email,
				password,
			});
			console.log(data);

			if (data.token) {
				dispatch(authActions.signin({ token: data.token, isAuth: true, name: data.name, email: data.email }));
				history.push('/');
			}

			
		}

		

	};

	const signin = (
		<div style={{ width: '40%', marginLeft: '30%', marginTop: '5%' }}>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
						<label>Email address</label>
						<input
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							style={{ width: '40%' }}
						/>
					</div>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
						<label>Password</label>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={{ width: '40%' }}
						/>
					</div>
				</Form.Group>

				<Button variant="primary" type="submit" onClick={onSubmitHandler}>
					Sign In
				</Button>
				<Form.Group style={{ marginTop: '15px' }}>
					<h6 onClick={() => setToggle(true)} style={{ cursor: 'pointer' }}>
						New User? Sign Up Now
					</h6>
				</Form.Group>
			</Form>
		</div>
	);

	const signup = (
		<div style={{ width: '40%', marginLeft: '30%', marginTop: '5%' }}>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<label>Name</label>
						<input
							type="name"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							style={{ width: '40%' }}
						/>
					</div>

					<Form.Text className="text-muted">We'll never share your name with anyone else.</Form.Text>
				</Form.Group>

				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
					<label>Email address</label>
					<input
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{ width: '40%' }}
					/>
				</div>

				<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>

				<Form.Group controlId="formBasicPassword">
					<div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
						<label>Password</label>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={{ width: '40%' }}
						/>
					</div>
				</Form.Group>

				<Button variant="primary" type="submit" onClick={onSubmitHandler}>
					Sign Up
				</Button>
				<Form.Group style={{ marginTop: '15px' }}>
					<h6 onClick={() => setToggle(false)} style={{ cursor: 'pointer' }}>
						Already Registered ? Sign In Now
					</h6>
				</Form.Group>
			</Form>
		</div>
	);
	return <>{toggle ? signup : signin}</>;
};

export default SignIn;
