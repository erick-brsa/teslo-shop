import { useContext, useEffect } from 'react';
import { Typography, Grid, Card, Divider, Box, Button } from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';

const CartPage = () => {

	const { isLoaded, numberOfItems, cart } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		if (isLoaded && cart.length === 0) {
			router.replace('/cart/empty')
		}
	}, [isLoaded, cart, router]);
	
	if (!isLoaded || cart.length === 0) {
		return (<></>)
	}

	return (
		<ShopLayout
			title={`Carrito - ${numberOfItems}`}
			pageDescription={'Carrito de compras de la tienda'}
		>
			<Typography variant="h1" component="h1">
				Carrito
			</Typography>

			<Grid container spacing={4} sx={{ mt: 0.5 }}>
				<Grid item xs={12} sm={7}>
					<CartList editable />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card" sx={{ p: 2 }}>
						<Typography variant="h4" component="h4">
							Orden
						</Typography>
						<Divider sx={{ my: 1 }} />

						<OrderSummary />
						<Box sx={{ mt: 3 }}>
							<Button
								color="secondary"
								className="circular-btn"
								fullWidth
								href='/checkout/address'
							>
								Comprar
							</Button>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default CartPage;
