import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const CategoryKidPage: NextPage = () => {
    const { products, isError, isLoading } = useProducts("/products?gender=kid")

	return (
		<ShopLayout
			title={"Teslo-Shop - Kid"}
			pageDescription={"Encuentra los mejores porductos aquí"}
		>
			<Typography variant="h1" component="h1">
				Tienda
			</Typography>
			<Typography variant="h2" sx={{ mb: 1 }}>
				Ropa para niños
			</Typography>

			{isLoading ? (
				<FullScreenLoading />
			) : (
				<ProductList products={products} />
			)}
		</ShopLayout>
	)
}

export default CategoryKidPage