import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { CartProvider, UiProvider, AuthProvider } from '../context';
import { lightTheme } from '../themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<PayPalScriptProvider
				options={{
					'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''
				}}
			>
				<SWRConfig
					value={{
						// refreshInterval: 3000,
						fetcher: (resource, init) =>
							fetch(resource, init).then((res) => res.json())
					}}
				>
					<AuthProvider>
						<CartProvider>
							<UiProvider>
								<ThemeProvider theme={lightTheme}>
									<CssBaseline />
									<Component {...pageProps} />
								</ThemeProvider>
							</UiProvider>
						</CartProvider>
					</AuthProvider>
				</SWRConfig>
			</PayPalScriptProvider>
		</SessionProvider>
	);
}

export default MyApp;
