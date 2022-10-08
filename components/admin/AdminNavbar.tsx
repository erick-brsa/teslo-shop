import { useEffect, useState, useContext } from 'react';
import NextLink from "next/link"
import { useRouter } from "next/router";
import {
	AppBar,
	Toolbar,
	Link,
	Typography,
	Box,
	Button,
} from "@mui/material"
import { UiContext, CartContext } from "../../context";

export const AdminNavbar = () => {
	const router = useRouter();

	const { toggleSideMenu } = useContext(UiContext);

	return (
		<AppBar elevation={2}>
			<Toolbar>
				<NextLink href="/" passHref>
					<Link display="flex" alignItems="center" underline="none">
						<Typography variant="h6">Teslo |</Typography>
						<Typography sx={{ ml: 0.5 }}>Shop</Typography>
					</Link>
				</NextLink>

				<Box flex={1} />

				<Button onClick={ toggleSideMenu }>Menú</Button>
			</Toolbar>
		</AppBar>
	)
}
