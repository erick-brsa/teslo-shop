import {
	Typography,
	Grid,
	Card,
	Divider,
	Box,
	Link,
    Chip
} from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { CartList, OrderSummary } from "../../components/cart"
import NextLink from "next/link"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"

const OrderPage = () => {
    return (
		<ShopLayout
			title={"Resumen de la orden 8768768"}
			pageDescription={"Resumen de orden"}
		>
			<Typography variant="h1" component="h1">
				Orden: ASDHE
			</Typography>

            {/* <Chip 
                sx={{my: 2}}
                label="Pendiente de pago"
                variant='outlined'
                color="error"
                icon={<CreditCardOffOutlined />}
            /> */}
            <Chip 
                sx={{my: 2}}
                label="La orden ya fue pagada"
                variant='outlined'
                color="success"
                icon={<CreditScoreOutlined />}
            />

			<Grid container spacing={4}>
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
                            {/* TODO: Pagar */}
							<h3>Pagar</h3>
                            <Chip 
                                sx={{my: 2}}
                                label="La orden ya fue pagada"
                                variant='outlined'
                                color="success"
                                icon={<CreditScoreOutlined />}
                            />
						</Box>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	)
}

export default OrderPage