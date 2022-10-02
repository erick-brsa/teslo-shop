import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Chip, Grid, Link, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { getSession } from 'next-auth/react';

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 100
	},
	{
		field: 'fullname',
		headerName: 'Nombre',
		width: 300,
		sortable: false
	},
	{
		field: 'paid',
		headerName: 'Pagado',
		width: 200,
		description: 'Muestra información si está pagado o no',
		renderCell: (params: GridRenderCellParams) => {
			return params.row.paid ? (
				<Chip color="success" label="Pagado" variant="outlined" />
			) : (
				<Chip color="error" label="No pagado" variant="outlined" />
			);
		}
	},
	{
		field: 'order',
		headerName: 'Ver orden',
		width: 100,
		sortable: false,
		renderCell: (params: GridRenderCellParams) => {
			return (
				<NextLink href={`/orders/${params.row.orderId}`} passHref>
					<Link underline="always">Ver orden</Link>
				</NextLink>
			);
		}
	}
];

interface Props {
	orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
	const rows = orders.map((order, i) => ({
		id: i + 1,
		paid: order.isPaid,
		fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
		orderId: order._id
	}));

	return (
		<ShopLayout
			title="Historial de ordenes"
			pageDescription="Historial de ordenes de cliente"
		>
			<Typography variant="h1" component="h1">
				Historial de ordenes
			</Typography>

			<Grid container className='fadeIn'>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }} sm={7}>
					<DataGrid
						columns={columns}
						rows={rows}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Grid>
			</Grid>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (!session)
		return {
			redirect: {
				destination: '/auth/login?p=/orders/history',
				permanent: false
			}
		};

	const id = session.user._id;

	const orders = await dbOrders.getOrdersByUser(id);

	return {
		props: {
			orders
		}
	};
};

export default HistoryPage;
