import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const MenCategoryPage: NextPage = () => {
    const { products, isError, isLoading } = useProducts("/products?gender=men")

	return (
		<ShopLayout
			title={"Teslo-Shop - Men"}
			pageDescription={"Encuentra los mejores porductos aquí"}
		>
			<Typography variant="h1" component="h1">
				Tienda
			</Typography>
			<Typography variant="h2" sx={{ mb: 1 }}>
				Ropa para hombre
			</Typography>

			{isLoading ? (
				<FullScreenLoading />
			) : (
				<ProductList products={products} />
			)}
		</ShopLayout>
	)
}

export default MenCategoryPage