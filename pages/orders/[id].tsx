import { getSession } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';

import NextLink from 'next/link';
import {
	Typography,
	Grid,
	Card,
	Divider,
	Box,
	Link,
	Chip
} from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { IOrder } from '../../interfaces';
import { dbOrders } from '../../database';

interface Props {
	order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

	const { isPaid, shippingAddress, numberOfItems, orderItems } = order;
	
	return (
		<ShopLayout
			title={'Resumen de la orden'}
			pageDescription={'Resumen de orden'}
		>
			<Typography variant="h1" component="h1">
				Orden: ASDHE
			</Typography>

			{
				isPaid ? (
					<Chip
						sx={{ my: 2 }}
						label="La orden ya fue pagada"
						variant="outlined"
						color="success"
						icon={<CreditScoreOutlined />}
					/>
				) : (
					<Chip 
						sx={{my: 2}}
						label="Pendiente de pago"
						variant='outlined'
						color="error"
						icon={<CreditCardOffOutlined />}
					/>
				)
			}

			<Grid container spacing={4} className='fadeIn'>
				
				<Grid item xs={12} sm={7}>
					<CartList 
							products={orderItems}
							editable={false} 
					/>
				</Grid>

				<Grid item xs={12} sm={5}>
					<Card className="summary-card" sx={{ p: 2 }}>
						<Typography variant="h4" component="h4">
							Resumen ({ numberOfItems }) { numberOfItems > 1 ? 'productos' : 'producto' }
						</Typography>
						<Divider sx={{ my: 1 }} />

						<Box display="flex" justifyContent="end">
							<NextLink href="/checkout/address" passHref>
								<Link underline="always">Editar</Link>
							</NextLink>
						</Box>

						<Typography variant="subtitle1">
							Dirección de entrega
						</Typography>
						<Typography>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</Typography>
						<Typography>{`${shippingAddress.address} ${shippingAddress.address2 ? `, ${shippingAddress.address2}` : '' }`}</Typography>
						<Typography>{`${shippingAddress.city}, ${shippingAddress.zip}`}</Typography>
						<Typography>{shippingAddress.country}</Typography>
						<Typography>{shippingAddress.phone}</Typography>

						<Divider sx={{ my: 1 }} />

						{/* <Box display="flex" justifyContent="end">
							<NextLink href="/cart" passHref>
								<Link underline="always">Editar</Link>
							</NextLink>
						</Box> */}
						
						<OrderSummary orderValues={{
								numberOfItems: order.numberOfItems,
								subTotal: order.subTotal,
								total: order.total,
								tax: order.tax	
						}} />

						<Box sx={{ mt: 3 }} display="flex" flexDirection="column">
							{/* TODO: Pagar */}
							{
								isPaid ? (
									<Chip
										sx={{ my: 2 }}
										label="La orden ya fue pagada"
										variant="outlined"
										color="success"
										icon={<CreditScoreOutlined />}
									/>
								)
								: (
									<h3>Pagar</h3>
								)
							}
						</Box>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

	const { id = '' } = query;
	const session: any = await getSession({ req })

	if (!session) {
		return {
			redirect: {
				destination: `/auth/login?/orders/${id}`,
				permanent: false
			}
		}
	}
	
	const order = await dbOrders.getOrderById(id.toString());
	
	if (!order) {
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false
			}
		}
	}
	
	if (order.user !== session.user._id) {
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false
			}
		}	
	}

	return {
		props: {
			order
		}
	}
}

export default OrderPage;
