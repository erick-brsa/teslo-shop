import { Chip, Grid, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid"
import NextLink from 'next/link';

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 100,
    }, {
        field: "fullname",
        headerName: "Nombre",
        width: 300,
        sortable: false,
    },
    {
        field: "paid",
        headerName: "Pagado",
        width: 200,
        description: 'Muestra información si está pagado o no',
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid 
                ? <Chip color="success" label="Pagado" variant="outlined" />
                : <Chip color="error" label="No pagado" variant="outlined" />
            )
        },
    },
    {
        field: "order",
        headerName: "Ver orden",
        width: 100,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.order}`} passHref>
                    <Link underline="always">
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
]

const rows = [
    { id: 1, paid: false, fullname: "Erick Briones", order: "139" },
    { id: 2, paid: true, fullname: "Erick Briones", order: "139" },
    { id: 3, paid: false, fullname: "Erick Briones", order: "139" },
    { id: 4, paid: true, fullname: "Erick Briones", order: "139" },
    { id: 5, paid: false, fullname: "Erick Briones", order: "139" },
]

const HistoryPage = () => {
	return (
		<ShopLayout
			title="Historial de ordenes"
			pageDescription="Historial de ordenes de cliente"
		>
			<Typography variant="h1" component="h1">
				Historial de ordenes
			</Typography>

			<Grid container>
				<Grid item xs={12} sx={{ height: 650, width: '100%' }} sm={7}>
					<DataGrid columns={columns} rows={rows} pageSize={10} rowsPerPageOptions={[10]} />
				</Grid>
			</Grid>
		</ShopLayout>
	)
}

export default HistoryPage
