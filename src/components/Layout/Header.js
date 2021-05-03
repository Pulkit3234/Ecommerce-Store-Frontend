import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

const Header = () => {
	return (
		<>
			<div>
				<Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
					<Navbar.Brand href="#home">
						<div style={{display:'inline-block', paddingRight:'15px'}}>
							<i class="fas fa-shopping-basket"></i>
						</div>
						Shop All
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto text-white">
							<Nav.Link href="/">
								<i class="fas fa-home"></i>Home
							</Nav.Link>
							<Nav.Link href="/">
								<i class="fas fa-sign-in-alt"></i>SignIn
							</Nav.Link>
							<Nav.Link href="/">
								<i class="fas fa-cart-plus"></i>Cart
							</Nav.Link>
							<Nav.Link>My Account</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</>
	);
};

export default Header;
