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
	IconButton,
	Badge,
	Input,
	InputAdornment
} from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCart } from "@mui/icons-material"
import { UiContext } from "../../context";

export const Navbar = () => {
	const router = useRouter();
	const [pathname, setPathname] = useState('/');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const { toggleSideMenu } = useContext(UiContext);
	
	const onSearchTerm = () => {
		if(searchTerm.trim().length > 0) {
			router.push(`/search/${searchTerm}`);
		}
	}

	useEffect(() => {
		setPathname(router.pathname);
	}, [router.pathname]);


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

				<Box sx={{display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }}} className="fadeIn">
					<NextLink href="/category/men" passHref>
						<Link underline="none">
							<Button color={pathname ==='/category/men' ? "primary" : "info"}>Hombres</Button>
						</Link>
					</NextLink>
					<NextLink href="/category/women" passHref>
						<Link underline="none">
							<Button  color={pathname ==='/category/women' ? "primary" : "info"}>Mujeres</Button>
						</Link>
					</NextLink>
					<NextLink href="/category/kid" passHref>
						<Link underline="none">
							<Button  color={pathname ==='/category/kid' ? "primary" : "info"}>Niños</Button>
						</Link>
					</NextLink>
				</Box>

				<Box flex={1} />

				{/* Pantallas grandes */}
				{isSearchVisible ? (				
					<Input
					className="fadeIn"
					autoFocus={true}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					type="text"
					placeholder="Buscar..."
					onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
					endAdornment={
						<InputAdornment position="end">
							<IconButton 
								aria-label="toggle password visibility"
								onClick={() => setIsSearchVisible(false)}
							>
								<ClearOutlined />
							</IconButton>
						</InputAdornment>
					}
					/>
				) : (
					<IconButton
						sx={{display: { xs: 'none', sm: 'block' }}}
						onClick={() => setIsSearchVisible(true)}
					>
						<SearchOutlined />
					</IconButton>
				)}

				{/* Pantallas pequeñas */}
				<IconButton 
					sx={{display: { xs: 'flex', sm: 'none' }}}
					onClick={toggleSideMenu}
				>
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

				<Button onClick={ toggleSideMenu }>Menú</Button>
			</Toolbar>
		</AppBar>
	)
}
