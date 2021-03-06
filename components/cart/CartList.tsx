import {
	CardActionArea,
	Grid,
	Link,
	Typography,
	CardMedia,
	Box,
	Button
} from "@mui/material";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { FC, useContext } from 'react';
import { CartContext } from "../../context";
import { ICartProduct } from "../../interfaces";

interface Props {
	editable: boolean
}

export const CartList: FC<Props> = ({ editable }) => {

	const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);
	const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
		product.quantity = newQuantityValue;
		updateCartQuantity(product);
	} 
	
	return (
		<>
			{cart.map((product) => (
				<Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
					<Grid item xs={3}>
						{/* TODO: Llevar a la página del producto */}
						<NextLink href={`/product/${product.slug}`} passHref>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.images}`}
										title={product.title}
										component="img"
										sx={{ borderRadius: "5px" }}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display="flex" flexDirection="column">
							<Typography variant="body1">
								{product.title}
							</Typography>
							<Typography variant="body1">
								Talla: <strong>{product.size}</strong>
							</Typography>
						</Box>
						{/* Condicional */}
						{editable ? (
							<ItemCounter 
								currentValue={ product.quantity }
								maxValue={ 5 }
								updateQuantity={(value) => onNewCartQuantityValue(product, value)}
							/>
						) : (
							<Typography variant="h4">{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
						)}
					</Grid>
					<Grid
						item
						xs={2}
						display="flex"
						alignItems="center"
						flexDirection="column"
					>
						<Typography variant="subtitle1">{`$${product.price}`}</Typography>
						{editable && (
							<Button 
								variant="text" 
								color="secondary"
								onClick={() => removeCartProduct(product)}
							>
								Eliminar
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	)
}
