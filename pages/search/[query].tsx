import type { NextPage, GetServerSideProps } from "next"
import { ShopLayout } from "../../components/layouts"
import { Box, Typography } from "@mui/material"
import { ProductList } from "../../components/products/ProductList"
import { getProductsByTerm, getAllProducts } from '../../database/dbProducts';
import { IProduct } from "../../interfaces"

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const HomePage: NextPage<Props> = ({products, foundProducts, query}) => {

	return (
		<ShopLayout
			title={"Teslo-Shop - Búsqueda"}
			pageDescription={"Encuentra los mejores porductos aquí"}
		>
			<Typography variant="h1" component="h1">Búsqueda</Typography>
            {
                foundProducts 
                ? <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">Término: {query}</Typography>
                : (
                    <Box display="flex" >
                        <Typography variant="h2" sx={{ mb: 1 }}>No encontramos ningún producto</Typography>
                        <Typography variant="h2" sx={{ ml: 1 }} color="secondary">{query}</Typography>
                    </Box>
                )
            }
			<ProductList products={products} />
		</ShopLayout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { query = '' } = params as { query: string }
    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    let products = await getProductsByTerm(query);
    const foundProducts = products.length > 0;
    if (!foundProducts) { 
        products = await getAllProducts();
    }
    
    // TODO: retornar otros productos
    
    return {
        props: {
            products,
            foundProducts, 
            query
        }
    }
}

export default HomePage
