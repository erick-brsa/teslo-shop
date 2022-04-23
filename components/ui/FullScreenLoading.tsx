import { Box, CircularProgress, Typography } from "@mui/material"
export const FullScreenLoading = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			height="calc(100vh - 200px)"
			sx={{ flexDirection: { xs: "column", md: "row" } }}
		>
			<CircularProgress thickness={4} />
		</Box>
	)
}
