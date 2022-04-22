import NextLink from "next/link"
import {
	AppBar,
	Toolbar,
	Link,
	Typography,
	Box,
	Button,
	IconButton,
	Badge
} from "@mui/material"
import { SearchOutlined, ShoppingCart } from "@mui/icons-material"

export const Navbar = () => {
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

				<Box sx={{display: { xs: 'none', sm: 'block' }}}>
					<NextLink href="/category/men" passHref>
						<Link underline="none">
							<Button>Hombres</Button>
						</Link>
					</NextLink>
					<NextLink href="/category/women" passHref>
						<Link underline="none">
							<Button>Mujeres</Button>
						</Link>
					</NextLink>
					<NextLink href="/category/kid" passHref>
						<Link underline="none">
							<Button>Niños</Button>
						</Link>
					</NextLink>
				</Box>

				<Box flex={1} />

				<IconButton>
					<SearchOutlined />
				</IconButton>

				<NextLink href="/cart" passHref>
					<Link underline="none">
						<IconButton>
							<Badge badgeContent={2} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</Link>
				</NextLink>

				<Button>Menú</Button>
			</Toolbar>
		</AppBar>
	)
}
