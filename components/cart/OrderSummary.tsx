import { Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>3</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{`$${2340.00}`}</Typography>
        </Grid>
        
        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{`$${45.00}`}</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
            <Typography variant="subtitle1">{`$${2385.00}`}</Typography>
        </Grid>

    </Grid>
  )
}
