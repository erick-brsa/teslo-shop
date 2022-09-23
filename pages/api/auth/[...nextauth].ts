import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { dbUsers } from '../../../database';

export default NextAuth({
	providers: [
		Credentials({
			name: 'Custom Login',
			credentials: {
				email: {
					label: 'Correo:',
					type: 'email',
					placeholder: 'name@example.com'
				},
				password: {
					label: 'Contraseña:',
					type: 'password',
					placeholder: '*******'
				}
			},
			async authorize(credentials) {
				// * Validar contra base de datos
				return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
			}
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || ''
		})
	],

	// Custom pages
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register'
	},

	jwt: {
		// secret: process.env.JWT_SECRET_SEED
	},

	session: {
		maxAge: 2592999, // 30d
		strategy: 'jwt',
		updateAge: 86400
	},

	// Callbacks
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
				switch (account.type) {
					case 'credentials':
						token.user = user;
						break;
					case 'oauth':
						token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
						break;
				}
			}

			return token;
		},

		async session({ session, token, user }) {

			session.accessToken = token.accessToken;
			session.user = token.user as any;


			
			return session;
		}
	}
});
