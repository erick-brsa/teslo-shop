import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { tesloApi } from '../../config';
import { AuthContext, authReducer } from '../../context';
import { useRouter } from 'next/router';

interface FormData {
	email: string;
	password: string;
}

const LoginPage = () => {

	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

	const router = useRouter();

	const [showError, setShowError] = useState(false);
	const { loginUser } = useContext(AuthContext);

	const onLoginUser = async ({ email, password }: FormData) => {
		
		setShowError(false);

		const isValidLogin = await loginUser(email, password);

		if (!isValidLogin) {
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			return
		}

		// TODO: Navegar a la patalla en la que se encontraba el usuario
		router.replace('/')

	};

	return (
		<AuthLayout title={'Ingresar'}>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h1" component="h1">
								Iniciar sesión
							</Typography>
							{showError && (
								<Chip 
									label="No reconocemos ese usuario y/o contraseña"
									color="error"
									icon={ <ErrorOutline /> }
									className="fadeId"
								/>
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								type="email"
								label="Correo"
								variant="filled"
								fullWidth
								{ ...register('email', {
										required: 'Este campo es requerido',
										validate: validations.isEmail
								})}
								error={ !!errors.email }
								helperText={ errors.email?.message }
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Contraseña"
								type="password"
								variant="filled"
								fullWidth
								{ ...register('password', {
									required: 'Este campo es requerido',
									minLength: {
										value: 6, message: 'ínimo 6 caracteres'
									}
								})}
								error={ !!errors.password }
								helperText={ errors.password?.message }
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								color="secondary"
								className="circular-btn"
								size="large"
								fullWidth
							>
								Ingresar
							</Button>
						</Grid>
						<Grid item xs={12} display="flex" justifyContent="end">
							<NextLink href="/auth/register" passHref>
								<Link>¿No tienes una cuenta? Regístrate</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
