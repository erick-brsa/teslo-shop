import {
	Typography,
	Grid,
	Card,
	Divider,
	Box,
	Button,
	Link
} from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { CartList, OrderSummary } from "../../components/cart"
import NextLink from "next/link"

const SummaryPage = () => {
	return (
		<ShopLayout
			title={"Resumen de orden"}
			pageDescription={"Resumen de orden"}
		>
			<Typography variant="h1" component="h1">
				Resumen de la orden
			</Typography>

			<Grid container spacing={4} sx={{ mt: 0.5 }}>
				<Grid item xs={12} sm={7}>
					<CartList editable={false} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card" sx={{ p: 2 }}>
						<Typography variant="h4" component="h4">
							Orden
						</Typography>
                        <Divider sx={{ my: 1 }} />

						<Box display="flex" justifyContent="end">
							<NextLink href="/checkout/address" passHref>
								<Link underline='always'>Editar</Link>
							</NextLink>
						</Box>

                        <Typography variant="subtitle1">Dirección de entrega</Typography>
                        <Typography>Erick Briones</Typography>
                        <Typography>Naucalpan, Estado de México</Typography>
                        <Typography>+52 55 4862 6042</Typography>
                        <Typography>México</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" justifyContent="end">
							<NextLink href="/cart" passHref>
								<Link underline='always'>Editar</Link>
							</NextLink>
						</Box>
						<OrderSummary />
						<Box sx={{ mt: 3 }}>
							<Button
								color="secondary"
								className="circular-btn"
								fullWidth
							>
								Confirmar orden
							</Button>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	)
}

export default SummaryPage
