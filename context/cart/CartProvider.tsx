import { FC, useReducer, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '../../config';
import axios from 'axios';

export interface CartState {
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
	isLoaded: false,
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
	shippingAddress: undefined
};

interface Props {
	children: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {

	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	useEffect(() => {
		try {
			const cookieProducts = Cookies.get('cart')
				? JSON.parse(Cookies.get('cart')!)
				: [];
			dispatch({
				type: '[Cart] - LoadCart from cookies | storage',
				payload: cookieProducts
			});
		} catch (error) {
			dispatch({
				type: '[Cart] - LoadCart from cookies | storage',
				payload: []
			});
		}
	}, []);

	useEffect(() => {
		if (state.cart.length > 0){
			Cookies.set('cart', JSON.stringify(state.cart));
		}
	}, [state.cart]);

	useEffect(() => {
		if (Cookies.get('firstName')) {
			const shippingAddress = {
				firstName: Cookies.get('firstName') || '',
				lastName: Cookies.get('lastName') || '',
				address: Cookies.get('address') || '',
				address2: Cookies.get('address2') || '',
				zip: Cookies.get('zip') || '',
				city: Cookies.get('city') || '',
				country: Cookies.get('country') || '', 
				phone: Cookies.get('phone') || ''
			}
	
			dispatch({
				type: '[Cart] - LoadAddress from cookies',
				payload: shippingAddress
			})
		}
	}, [])
	

	useEffect(() => {
		const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
		const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0);
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

		const orderSummary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal * (taxRate + 1)
		};

		dispatch({
			type: '[Cart] - Update order summary',
			payload: orderSummary
		});
	}, [state.cart]);

	const addProductToCart = (product: ICartProduct) => {
		const productInCart = state.cart.some(p => p._id === product._id);
		if (!productInCart) {
			return dispatch({
				type: '[Cart] - Update products in cart',
				payload: [...state.cart, product]
			});
		}

		const productInCartButWithDifferentSize = state.cart.some(p => p._id === product._id && p.size !== product.size);
		if (productInCartButWithDifferentSize){
			return dispatch({
				type: '[Cart] - Update products in cart',
				payload: [...state.cart, product]
			});
		}
		
		// Acumular
		const updatedProducts = state.cart.map(p => {
			if (p._id !== product._id) return p;
			if (p.size !== product.size) return p;
			// Actualizar la cantidad

			p.quantity += product.quantity;
			return p;
		});

		dispatch({
			type: '[Cart] - Update products in cart',
			payload: updatedProducts
		});
	};

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Change cart quantity', payload: product });
	};

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Remove product in cart', payload: product });
	};

	const updateAddress = ( address: ShippingAddress ) => {
        Cookies.set('firstName',address.firstName);
        Cookies.set('lastName',address.lastName);
        Cookies.set('address',address.address);
        Cookies.set('address2',address.address2 || '');
        Cookies.set('zip',address.zip);
        Cookies.set('city',address.city);
        Cookies.set('country',address.country);
        Cookies.set('phone',address.phone);
        dispatch({ type: '[Cart] - Update address', payload: address });
    }

	const createOrder = async(): Promise<{ hasError: boolean; message: string; }> => {

		if (!state.shippingAddress) {
			throw new Error('No hay dirección de entrega');
		}

		const body: IOrder = {
			orderItems: state.cart.map(p => ({
				...p,
				size: p.size!
			})),
			shippingAddress: state.shippingAddress,
			numberOfItems: state.numberOfItems,
			subTotal: state.subTotal,
			tax: state.tax,
			total: state.total,
			isPaid: false,
		}
		
		try {
			const { data } = await tesloApi.post('/orders', body);
			// TODO: Dispatch
			return {
				hasError: false,
				message: data._id!
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const { message } = error.response?.data as { message: string }
				return {
					hasError: true,
					message
				}
			}
			return {
				hasError: true,
				message: 'Error no controlado, hable con el administrador'
			}
		}
    }

	return (
		<CartContext.Provider
			value={{
				...state,

				// Methods
				addProductToCart,
				removeCartProduct,
				updateCartQuantity,

				updateAddress,

				// Orders
				createOrder
		}}>
			{children}
		</CartContext.Provider>
	);
};
