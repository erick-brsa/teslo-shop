import { initialData } from "../../database/products"
import {
	CardActionArea,
	Grid,
	Link,
	Typography,
	CardMedia,
	Box,
	Button
} from "@mui/material"
import NextLink from "next/link"
import { ItemCounter } from "../ui"
import { FC } from "react"

const productsInCart = [
	initialData.products[0],
	initialData.products[2],
	initialData.products[3]
]

interface Props {
	editable: boolean
}

export const CartList: FC<Props> = ({ editable }) => {
	return (
		<>
			{productsInCart.map((product) => (
				<Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
					<Grid item xs={3}>
						{/* TODO: Llevar a la página del producto */}
						<NextLink href={"/product/slug"} passHref>
							<Link>
								<CardActionArea>
									<CardMedia
										image={`/products/${product.images[0]}`}
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
								Talla: <strong>M</strong>
							</Typography>
						</Box>
						{/* Condicional */}
						{editable ? (
							<ItemCounter />
						) : (
							<Typography variant="h4">3 items</Typography>
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
							<Button variant="text" color="secondary">
								Eliminar
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	)
}
