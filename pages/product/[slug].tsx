import {useState, useEffect} from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from "next"
import { Box, Button, Chip, Grid, Typography } from "@mui/material"

import { ShopLayout } from "../../components/layouts"
import { ProductSlideshow, SizeSelector } from "../../components/products"
import { ItemCounter } from "../../components/ui"

import { getProductBySlug, getAllProductSlugs } from "../../database/"
import { IProduct, ICartProduct, ISize } from "../../interfaces"

interface Props {
	product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		images: product.images[0],
		price: product.price,
		size: 'XS',
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 2,
	})
	
	const handleOnSelectedSize = ( size: ISize ) => {
		setTempCartProduct(currentProduct => ({
			...currentProduct, size
		}))
	}
	
	const onUpdateQuantity = (quantity: number) => {
		setTempCartProduct(currentProduct => ({
			...currentProduct, quantity
		}))
	}

	const handleOnAddProduct = () => {
		console.log({ tempCartProduct })
	}

	return (
		<ShopLayout title={product.title} pageDescription={product.description}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={7}>
					{/* Slideshow */}
					<ProductSlideshow images={product.images} />
				</Grid>

				<Grid item xs={12} sm={5}>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						{/* Títulos */}
						<Typography variant="h1" component="h1">
							{product.title}
						</Typography>
						<Typography
							variant="subtitle1"
							component="h2"
						>{`$${product.price}`}</Typography>

						{/* Cantidad */}
						<Box sx={{ my: 2 }}>
							<Typography variant="subtitle2">
								Cantidad
							</Typography>
							<ItemCounter 
								currentValue={tempCartProduct.quantity}
								updateQuantity={onUpdateQuantity}
								maxValue={product.inStock > 5 ? 5 : product.inStock}
							/>
							<SizeSelector
								sizes={product.sizes}
								selectedSize={tempCartProduct.size}
								onSelectSize={handleOnSelectedSize}
							/>
						</Box>

						{product.inStock > 0 ? (
							<Button 
								color="secondary" 
								className="circular-btn"
								// onClick={handleOnAddProduct}
							>
								Agregar al carrito
								{tempCartProduct.size
								? 'Agregar al carrito'
								: 'Seleccione una talla'}
							</Button>
						) : (
							<Chip
								label="No hay disponible"
								color="error"
								variant="outlined"
							/>
						)}

						<Box sx={{ mt: 3 }}>
							<Typography variant="subtitle2">
								Descripción
							</Typography>
							<Typography variant="body2">
								{product.description}
							</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayout>
	)
}

// !getServerSideProps
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const {slug = ''} = params as {slug: string};
//   const product = await getProductBySlug(slug);
//   if (!product) return {
//       redirect: {
//           destination: '/',
//           permanent: false,
//       }
//   }
//   return {
//     props: {
//       product,
//     }
//   }
// }

// !getStaticPaths

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const productsSlugs = await getAllProductSlugs()

	return {
		paths: productsSlugs.map(({ slug }) => ({
			params: { slug }
		})),
		fallback: "blocking"
	}
}

// !getStaticProps

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = "" } = params as { slug: string }
	const product = await getProductBySlug(slug)

	if (!product)
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		}

	return {
		props: {
			product
		},
		revalidate: 60 * 60 * 24 // 1 day
	}
}

export default ProductPage
