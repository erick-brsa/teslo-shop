import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { IProduct } from '../../interfaces';
import { NextPage, GetServerSideProps } from 'next';
import { getProductBySlug, getAllProductSlugs } from '../../database/dbProducts';
// import { useRouter } from 'next/router';
// import { useProducts } from '../../hooks';

interface Props {
  product: IProduct;
}

const ProductPage:NextPage<Props> = ({product}) => {

  // const router = useRouter();
  // const {products: product, isLoading } = useProducts(`/api/products/${router.query.slug}`);
  // if (isLoading) return <h1>Loading...</h1>;

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* Slideshow */}
          <ProductSlideshow 
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>

          <Box display="flex" flexDirection="column" alignItems="center">
            {/* Títulos */}
            <Typography variant="h1" component="h1">{product.title}</Typography>
            <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

            {/* Cantidad */}
              <Box sx={{my:2}}>
                <Typography variant="subtitle2">Cantidad</Typography>
                <ItemCounter />
                <SizeSelector 
                  selectedSize={product.sizes[2]}
                  sizes={product.sizes}
                />
              </Box>

            {/* Agregar ak carrito */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponible" color="error" variant="outlined" /> */}

            <Box sx={{mt: 3}}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
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
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlugs = await getAllProductSlugs();

  return {
    paths: productsSlugs.map(({slug}) => ({
      params: {
        slug,
      }
    })), 
    fallback: "blocking"
  }
}

// !getStaticProps
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {slug = ''} = params as {slug: string};
  const product = await getProductBySlug(slug);

  if (!product) return {
      redirect: {
          destination: '/',
          permanent: false,
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