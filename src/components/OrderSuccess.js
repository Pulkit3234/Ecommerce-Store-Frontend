const OrderSuccess = () => {
	return (
		<>
			<div style={{ textAlign: 'center', marginTop: '50px' }}>
				<i
					class="fas fa-check-circle fa-8x"
					style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}
				></i>
			</div>
			<h2 style={{ textAlign: 'center' }}>
				Order has been Successfully placed! You will recieve your order shortly{' '}
				<i class="fas fa-smile" style={{ color: 'orange' }}></i>
			</h2>
			<h3 style={{ textAlign: 'center' }}>
				You can see your Order <i class="fas fa-shopping-bag" style={{ color: 'blue' }}></i> from the Order
				history in My Account!
			</h3>
		</>
	);
};

export default OrderSuccess;
