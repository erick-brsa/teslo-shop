import { useContext, useState } from 'react';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader
} from '@mui/material';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined
} from '@mui/icons-material';
import { useRouter } from 'next/router';

import { AuthContext, UiContext } from '../../context';

export const SideMenu = () => {

	const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
	const { isLoggedIn, user, logout } = useContext(AuthContext);
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

	const navigateTo = (url: string) => {
		toggleSideMenu();
		router.push(url);
	};

	const onSearchTerm = () => {
		if (searchTerm.trim().length > 0) {
			navigateTo(`/search/${searchTerm}`);
		}
	};

	const onLogout = () => {
		logout();
	}

	return (
		<Drawer
			open={isMenuOpen}
			anchor="right"
			sx={{
				backdropFilter: 'blur(4px)',
				transition: 'all 0.5s ease-out'
			}}
			onClose={toggleSideMenu}
		>
			<Box sx={{ width: 250, paddingTop: 5 }}>
				<List>
					<ListItem>
						<Input
							autoFocus={true}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							type="text"
							placeholder="Buscar..."
							onKeyPress={(e) =>
								e.key === 'Enter' && onSearchTerm()
							}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={onSearchTerm}
									>
										<SearchOutlined />
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					{isLoggedIn && (
						<>
							<ListItem button>
								<ListItemIcon>
									<AccountCircleOutlined />
								</ListItemIcon>
								<ListItemText primary={'Perfil'} />
							</ListItem>

							<ListItem button onClick={() => navigateTo('/orders/summary')}>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Mis Ordenes'} />
							</ListItem>
						</>
					)}

					<ListItem
						onClick={() => navigateTo('/admincatetory/men')}
						button
						sx={{ display: { xs: '', sm: 'none' } }}
					>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Hombres'} />
					</ListItem>

					<ListItem
						onClick={() => navigateTo('/category/women')}
						button
						sx={{ display: { xs: '', sm: 'none' } }}
					>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mujeres'} />
					</ListItem>

					<ListItem
						onClick={() => navigateTo('/category/kid')}
						button
						sx={{ display: { xs: '', sm: 'none' } }}
					>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText primary={'Niños'} />
					</ListItem>

					{isLoggedIn ? (
						<ListItem button onClick={onLogout}>
							<ListItemIcon>
								<LoginOutlined />
							</ListItemIcon>
							<ListItemText primary={'Salir'} />
						</ListItem>
					) : (
						<ListItem button onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
							<ListItemIcon>
								<VpnKeyOutlined />
							</ListItemIcon>
							<ListItemText primary={'Ingresar'} />
						</ListItem>
					)}

					{/* Admin */}
					{user?.role === 'admin' && (
						<>
							<Divider />
							<ListSubheader>Admin Panel</ListSubheader>

							<ListItem button>
								<ListItemIcon>
									<CategoryOutlined />
								</ListItemIcon>
								<ListItemText primary={'Productos'} />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<ConfirmationNumberOutlined />
								</ListItemIcon>
								<ListItemText primary={'Ordenes'} />
							</ListItem>

							<ListItem button>
								<ListItemIcon>
									<AdminPanelSettings />
								</ListItemIcon>
								<ListItemText primary={'Usuarios'} />
							</ListItem>
						</>
					)}
				</List>
			</Box>
		</Drawer>
	);
};
