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

	// jwt: {
	// 	secret: process.env.JWT_SECRET_SEED
	// }

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
						// TODO: Crear usuario o verificar si existe en la BD
						// token.user = account;
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
