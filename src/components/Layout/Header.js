import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
	const { totalItems } = useSelector((state) => state.cart);
	//console.log(cart);
	return (
		<>
			<div>
				<Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
					<Navbar.Brand href="#home">
						<div style={{ display: 'inline-block', paddingRight: '15px' }}>
							<i class="fas fa-shopping-basket"></i>
						</div>
						Shop All
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto text-white">
							<Nav.Link>
								<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
									<i class="fas fa-home"></i>Home
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
									<i class="fas fa-sign-in-alt"></i>SignIn
								</Link>
							</Nav.Link>

							<Nav.Link>
								<Link to="/customer/account" style={{ textDecoration: 'none', color: 'white' }}>
									My Account
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
									<i class="fas fa-cart-plus"></i>
									{totalItems !== 0 && (
										<span
											style={{
												height: '5px',
												width: '20%px',
												backgroundColor: 'red',
												color: 'white',
												marginLeft: '5.5px',
												marginRight: '2px',
												borderRadius: '100%',
												padding: '3px',
											}}
										>
											{totalItems}
										</span>
									)}
									<span style={{ marginLeft: '10px' }}>Cart</span>
								</Link>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</>
	);
};

export default Header;
