import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { AdminNavbar } from '../admin';
import { Box, Typography } from '@mui/material';
import { SideMenu } from '../ui';

interface Props {
	title: string;
	subTitle: string;
	children?: ReactNode;
	pageDescription?: string;
	icon?: ReactNode;
}

export const AdminLayout: FC<Props> = ({
	children,
	title,
	pageDescription,
	subTitle,
	icon
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={pageDescription} />
				<meta property="og:title" content={title} />
				<meta name="og:description" content={pageDescription} />
			</Head>

			<nav>
				<AdminNavbar />
			</nav>

			<SideMenu />

			<main
				style={{
					margin: '80px auto',
					maxWidth: '1440px',
					padding: '0px 30px'
				}}
			>
				<Box display="flex" flexDirection="column">
					<Typography variant="h1" component="h1">
						{icon}
						{title}
					</Typography>
					<Typography variant="h2" sx={{ mb: 2 }}>
                        {subTitle}
                    </Typography>
				</Box>
                <Box className="fadeIn">
				    {children}
                </Box>
			</main>
		</>
	);
};
