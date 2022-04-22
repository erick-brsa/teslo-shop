import { Typography, Grid, Card, Divider, Box, Button } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
const CartPage = () => {
	return (
		<ShopLayout
			title={"Carrito - 3"}
			pageDescription={"Carrito de compras de la tienda"}
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
							>
								Comprar
							</Button>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	)
}

export default CartPage
