import {
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	Box,
	Typography,
	Link
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces/products";
import NextLink from "next/link";
import { Chip } from "@mui/material";

interface Props {
	product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false)
	const [isImageLoaded, setIsImageLoaded] = useState(false)
	const productImage = useMemo(() => {
		return isHovered
			? `/products/${product.images[1]}`
			: `/products/${product.images[0]}`
	}, [isHovered, product.images])

	return (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Card>
				<NextLink href={`/product/${product.slug}`} passHref>
					<Link>
						<CardActionArea>
							{product.inStock === 0 && (
								<Chip
									color="primary"
									label="No hay disponibles"
									sx={{
										position: "absolute",
										top: "10px",
										left: "10px",
										zIndex: "10"
									}}
								/>
							)}
							<CardMedia
								component="img"
								image={productImage}
								alt={product.title}
								onLoad={() => setIsImageLoaded(true)}
							/>
						</CardActionArea>
					</Link>
				</NextLink>
			</Card>

			<Box
				sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }}
				className="fadeIn"
			>
				<Typography fontWeight={700}>{product.title}</Typography>
				<Typography fontWeight={500}>{`$${product.price}`}</Typography>
			</Box>
		</Grid>
	)
}
