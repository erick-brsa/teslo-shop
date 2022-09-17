import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';
import tesloApi from '../../config/tesloAPI';
import { useRouter } from 'next/router';

interface FormData {
	name: string;
	email: string;
	password: string;
}

const RegisterPage = () => {
	
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const { registerUser } = useContext(AuthContext);
	const router = useRouter()

	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('')

	const onRegisterUser = async ({ name, email, password }: FormData) => {

		const { hasError, message } = await registerUser(name, email, password) ;

		setShowError(false);
		
		if(hasError) {
			setShowError(true);
			setErrorMessage(message || '');
			setTimeout(() => setShowError(false), 3000);
			return;
		}

		// TODO: navegar a la pantalla en la que estaba el usuario
		router.replace('/');
	};

	return (
		<AuthLayout title={'Ingresar'}>
			<form onSubmit={handleSubmit(onRegisterUser)} noValidate>
				<Box sx={{ width: 350, padding: '10px 20px' }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h1" component="h1">
								Registro
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
								label="Nombre"
								variant="filled"
								fullWidth
								{...register('name', {
									required: 'Este campo es requerido',
									minLength: {
										value: 2,
										message: 'Mínimo 2 caracteres'
									}
								})}
								error={ !!errors.name }
								helperText={ errors.name?.message }
							/>
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
								Crear cuenta
							</Button>
						</Grid>
						<Grid item xs={12} display="flex" justifyContent="end">
							<NextLink href="/auth/login" passHref>
								<Link>
									¿Ya tienes una cuenta? Inicia sesión
								</Link>
							</NextLink>
						</Grid>
					</Grid>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
