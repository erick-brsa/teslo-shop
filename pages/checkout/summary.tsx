import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Cookies from 'js-cookie';

import {
	Typography,
	Grid,
	Card,
	Divider,
	Box,
	Button,
	Link,
	Chip
} from '@mui/material';

import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
// import { countries } from '../../utils';

const SummaryPage = () => {

	const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
	const router = useRouter();
	
	const [isPosting, setIsPosting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (!Cookies.get('firstName')) {
			router.push('/checkout/address');
		}
	}, [router]);

	if (!shippingAddress) {
		return <></>
	}

	const onCreateOrder = async () => {
		setIsPosting(true);
		
		const { hasError, message } = await createOrder();

		if (hasError) {
			setIsPosting(false);
			setErrorMessage(message);
			return
		}

		router.replace(`/orders/${message}`)
	}

	const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

	return (
		<ShopLayout
			title={'Resumen de orden'}
			pageDescription={'Resumen de orden'}
		>
			<Typography variant="h1" component="h1">
				Resumen ({ numberOfItems > 1 ? 'productos' : 'producto' })
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
								<Link underline="always">Editar</Link>
							</NextLink>
						</Box>

						<Typography variant="subtitle1">
							Dirección de entrega
						</Typography>
						<Typography>{firstName} {lastName}</Typography>
						<Typography>{address},{address2 ? `, ${address2}`  : ''}</Typography>
						<Typography>{city}, {zip}</Typography>
						<Typography>{country}</Typography>
						{/* <Typography>{ countries.find(c => c.code === country)?.name }</Typography> */}
						<Typography>{phone}</Typography>

						<Divider sx={{ my: 1 }} />

						<Box display="flex" justifyContent="end">
							<NextLink href="/cart" passHref>
								<Link underline="always">Editar</Link>
							</NextLink>
						</Box>
						<OrderSummary />
						<Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
							<Button
								onClick={onCreateOrder}
								color="secondary"
								className="circular-btn"
								fullWidth
								disabled={isPosting}
							>
								Confirmar orden
							</Button>
							<Chip 
								color='error'
								label={errorMessage}
								sx={{ 
									display: errorMessage ? 'flex' : 'none', 
									mt: 2 
								}}
							/>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export default SummaryPage;
